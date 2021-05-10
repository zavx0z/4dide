import pprint

import msgpack
import redis

receiver = redis.StrictRedis(host=host, port=port, db=db)

receiver.set('space', msgpack.packb({
    "position": list(position),
    "rotation": list(rotation),
}))

# pprint.pprint(msgpack.unpackb(receiver.get('space')))
