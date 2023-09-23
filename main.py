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
    Room(room_id="b19988ea-dd30-46f1-8934-12d5ef4b6b55", room_name="Test")
]
messages = []


def make_json_room(room):
    _room = {
        "id": room.room_id,
        "name": room.room_name,
        "users": list(map(make_user_json, room.users)),
        "current_time": room.current_time,
        "host_id": room.host_id,
        "play_state": room.play_state,
        "vid_url": room.vid_url
    }
    return _room


def make_user_json(user):
    _user = {
        "id": user.sid,
        "name": user.name,

    }
    return _user

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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

######## RECEIVEING MESSAGES ########

@socketio.on('message')
def handle_message(data):
    emit('new_message', {"message": f"{data['username']}: {data['message']}" }, to=data["room_id"], include_self=False)
    message = Message(data['room_id'], request.sid, data['message'], data['username'])
    if len(rooms) != 0:
        for room in rooms:
            if room.room_id == message.roomid:
                room.chat_message.append(message)
                break

@socketio.on('sync-vid')
def sync_vid(data):

    room = find_room_by_id(data['room_id'])
    if room is None:
        return

    room.play_state = data['play_state']
    room.current_time = data['current_time']


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
    room_id = data['room_id']
    print(f"{room_id} room_id join")
    print(f"{username} username join")

    user = User(username, request.sid)

    room = find_room_by_id(room_id)
    print(f"{room} room join")
    if room is None:
        return

    print(f"{user} user join")

    room.users.append(user)

    join_room(room_id)
    emit('new_message', {"message": f"🎉 {username} has entered the party." }, to=room_id)


@socketio.on('leave')
def on_leave(data):
    current_user = None
    current_room = None
    user_id = request.sid
    room_id = data["room_id"]

    print(f"{user_id} user_id leave")
    print(f"{room_id} room_id leave")

    for room in rooms:
        if room.room_id == room_id:
            current_room: Room = room
            break

    if current_user is None:
        return

    for user in current_room.users:
        if user.sid == user_id:
            current_user = user 
            current_room.users.remove(user)
            break

    if current_room is None:
        return
    
    print(f"{current_user} user leave")
    print(f"{current_room} room leave")

    leave_room(room_id)
    emit('new_message', {"message": f"😭 {current_user.name} has left the party." }, to=room_id)


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('set-url')
def set_url(data):
    room = find_room_by_id(data['room_id'])
    if room is None:
        return
    room.vid_url = data['url']
    emit('url_update', {'url': data['url']}, to=data['room_id'])


if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
