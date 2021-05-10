import eventlet
import msgpack_numpy as m
import redis
from flask import Flask, request
from flask_socketio import SocketIO, join_room

# ======================================INIT===========================================================
m.patch()

eventlet.monkey_patch()
app = Flask(__name__, static_folder="./build", static_url_path="/")
cp = SocketIO(app, message_queue='redis://', cors_allowed_origins="*", async_mode="eventlet")
r = redis.StrictRedis(host='0.0.0.0', port=6379, db=4)


# ======================================RESTapi =======================================================
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")


# ==================================== SOCKET.io ======================================================
def send_data_space():
    space_data = r.get('space')
    cp.emit('space', {'supervisor': m.unpackb(space_data)}, callback=send_data_space, room="space")


@cp.on('space')
def space(json):
    join_room("space")
    send_data_space()


# =====================================DEFAULT=========================================================
@cp.on('connect')
def connect():
    print('connect', request.sid)


@cp.on('disconnect')
def disconnect():
    print('disconnected', request.sid)


@cp.on('join')
def on_join(data):
    print(data)
    join_room(data)


if __name__ == '__main__':
    cp.run(app, host="0.0.0.0", port="1111", debug=True, log_output=True)

# class Listener(threading.Thread):
#     def __init__(self, r, channels):
#         threading.Thread.__init__(self)
#         self.daemon = True
#         self.redis = r
#         self.pubsub = self.redis.pubsub()
#         self.pubsub.psubscribe(channels)
#         self.socketio = SocketIO(message_queue='redis://redis')
#         # self.fps = coils.RateTicker((1,))
#
#     @staticmethod
#     def ack():
#         print('message was received!')
#
#     def work(self, item):
#         channel = item['channel'].decode("utf-8")
#         data = item['data']
#         frame = self.redis.get('frame')
#         if channel == 'stream' and frame:
#             np_arr = m.unpackb(frame)
#             self.socketio.emit('base64', {'frame': _to_b64(np_arr)}, broadcast=True, callback=self.ack)
#             # print(int(self.fps.tick()[0]))
#         else:
#             if isinstance(data, bytes):
#                 try:
#                     frame = m.unpackb(data)
#                     print(frame)
#                     # print(r.get('frame'))
#                 except ValueError as e:
#                     print("Error decoding msg to microservice: %s", str(e))
#
#     def run(self):
#         listen = self.pubsub.listen()
#         if listen:
#             for item in listen:
#                 self.work(item)
#
#
# client = Listener(r, ['stream'])
# client.start()
