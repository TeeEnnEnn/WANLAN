from wan import create_app
from flask_socketio import join_room, leave_room, send, emit
from flask import request
from wan.main.util import User, Room, Message
from flask.json import jsonify
import uuid

app, socketio = create_app()

def gen_uuid_str():
    return str(uuid.uuid4())

rooms = [
    Room(room_id=gen_uuid_str(), room_name="Test")
]

def make_json_room(room):
    _room = {
        "id": room.room_id,
        "name": room.room_name
    }
    return _room

def find_room_by_id(room_id):
    existing_room = None
    for room in rooms:
        if room.room_id == room_id:
            existing_room = room
            break
    
    return existing_room

@app.route("/api/rooms", methods=["GET"])
def get_rooms():
    _rooms = list(map(make_json_room, rooms))
    return jsonify(_rooms)

@app.route("/api/rooms/<roomId>", methods=["GET"])
def get_room(roomId):
    _room = find_room_by_id(roomId)
    if _room is None:
        return jsonify(None)
    return jsonify(make_json_room(_room))


######## RECEIVEING MESSAGES ########
@socketio.on('message')
def handle_message(data):
    emit('new_message', {"message": f"{data['username']}: {data['message']}"}, broadcast=True, to=data["room_id"])
    message = Message(data['message_id'], data['room_id'], data['user_id'], data['timestamp'], data['message'], data['username'])
    if len(rooms) != 0:
        for room in rooms:
            if room.room_id == message.roomid:
                room.chat_message.append(message)
                break

@socketio.on('create_room')
def create(data):
    username = data['username']
    room_name = data["room_name"]

    user = User(username, request.sid)

    room = Room(room_id=gen_uuid_str(), room_name=room_name)

    room.host_id = user.sid

    room.users.append(user)

    rooms.append(room)
    join_room(room_name)
    json_room = make_json_room(room)
    emit('room_created', json_room, broadcast=True)

@socketio.on('join')
def on_join(data):
    username = data['username']
    room_id = data['room']

    user = User(username, request.sid)

    room = find_room_by_id(room_id)
    if room is None:
        return

    room.users.append(user)

    join_room(room_id)
    send(username + ' has entered the room', to=room_id)

@socketio.on('leave')
def on_leave(data):
    user = None
    current_room = None
    user_id = request.sid
    room_id = data["room"]

    for room in rooms:
        if room.room_id == room_id:
            current_room: Room = room
            break

    for user in current_room.users:
        if user.sid == user_id:
            current_room.users.remove(user)
            break

    room = data['room']
    leave_room(room)

    send(user_id + ' has left the room.', to=room)

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)

