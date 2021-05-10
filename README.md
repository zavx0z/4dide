# CLEAN

## удалить все остановленные контейнеры и неиспользуемые образы (а не только образы, не связанные с контейнерами), добавьте в эту команду флаг -a

```shell
docker system prune -a
```

# UP

```shell
docker-compose up -d --build
```

# BUILD

```shell
docker build -t zavx0z/opencv-gstreamer:latest .
```

# LOGS

```shell
docker logs -t rtsp
```

# RUN

## image interactive

```shell
docker run -it --rm opencv-gstreamer python3
```

# STOP

## Остановить все Docker контейнеры.

```shell
docker stop $(docker ps -a -q)
```

# PUSH

```shell
docker tag opencv-gstreamer:latest zavx0z/opencv-gstreamer
docker push zavx0z/opencv-gstreamer:latest
```

=====================================================

# NETWORK

```shell
docker network ls
```

### Flask-SocketIO

[documentation](https://flask-socketio.readthedocs.io/en/latest/)

### celery

* start

```bash
celery -A flask_app.celery worker --loglevel=info
```

### gunicorn

```bash
./start_gunicorn.sh 
```