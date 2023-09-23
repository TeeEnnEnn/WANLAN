import socketio

from wan import create_app
from flask_socketio import join_room, leave_room, send, emit
from flask import request

app, socketio = create_app()

@socketio.on('asdf')
def handle_message(data):
    print(data)
    emit('spam', { 'hello from ' + request.sid })

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

if __name__ == "__main__":
    socketio.run(app, debug=True, port=3001, allow_unsafe_werkzeug=True)


