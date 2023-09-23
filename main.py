from wan import create_app
from flask_socketio import join_room, leave_room, send, emit
from flask import request
from wan.main.util import User, Room

app, socketio = create_app()

rooms = []


######## RECEIVEING MESSAGES ########
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('json')
def handle_json(json):
    print('recieved json ' + str(json))


@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))


@socketio.event
def my_custom_event(arg1, arg2, arg3):
    print('received args: ' + arg1 + arg2 + arg3)


def my_function_handler(data):
    pass


socketio.on_event('my event', my_function_handler, namespace='/test')


@socketio.on('my event', namespace='/test')
def handle_my_custom_namespace_event(json):
    print('received json: ' + str(json))


@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
    return 'one', 2


@socketio.on('asdf')
def handle_message(data):
    print(data)
    emit('spam', {"message": 'hello from ' + request.sid}, broadcast=True)


@socketio.on('join')
def on_join(data):
    username = data['username']
    room_id = data['room']

    user = User(username, request.sid)

    room = Room(room_id=room_id)

    if len(room.users) == 0:
        room.host_id = user.sid
        # room is empty. The user is the host
    else:
        room.users.append(user)

    rooms.append(room)

    
    join_room(room_id)
    send(username + ' has entered the room', to=room_id)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@socketio.on('connect')
def test_connect(auth):
    emit('my response', {'data': 'Connected'})


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


if __name__ == "__main__":
    socketio.run(app, debug=True, port=3001, allow_unsafe_werkzeug=True)
