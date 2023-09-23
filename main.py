import socketio

from wan import create_app
from flask_socketio import send, emit


@socketio.on('message')
def handle_message(message):
    send(message)


@socketio.on('json')
def handle_json(json):
    send(json, json=True)


@socketio.on('my event')
def handle_my_custom_event(json):
    emit('my resposne', json)


app, socketio = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
