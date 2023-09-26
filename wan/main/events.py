from flask_socketio import emit, join_room, leave_room

from main import socketio
from wan.main.models import Message, Room, User
from wan.main.utilities import rooms, find_room_by_id, gen_uuid_str, make_json_room


# This method is used for receiving messages from the server
@socketio.on('message')
def handle_message(data):
    emit('new_message', {"message": f"{data['username']}: {data['message']}"}, to=data["room_id"], include_self=False)
    message = Message(data['room_id'], data['user_id'], data['message'], data['username'])
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

    emit('vid_update', {'play_state': data['play_state'], 'current_time': data['current_time']}, to=data['room_id'],
         include_self=False)


@socketio.on('create_room')
def create(data):
    username = data['username']
    room_name = data["room_name"]
    user_id = data["user_id"]

    user = User(username, user_id)

    room = Room(room_id=gen_uuid_str(), room_name=room_name)

    room.host_id = user_id

    room.users.append(user)

    rooms.append(room)
    join_room(room_name)
    json_room = make_json_room(room)
    emit('room_created', json_room, broadcast=True)


@socketio.on('join')
def on_join(data):
    username = data['username']
    room_id = data['room_id']
    user_id = data['user_id']

    user = User(username, user_id)

    room = find_room_by_id(room_id)
    if room is None:
        return

    room.users.append(user)

    join_room(room_id)
    emit('new_message', {"message": f"🎉 {username} has entered the party."}, to=room_id)
    emit('room_count', {"userCount": len(room.users)}, to=room_id)


@socketio.on('leave')
def on_leave(data):
    current_user = None
    current_room = None
    user_id = data["user_id"]
    room_id = data["room_id"]

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

    leave_room(room_id)
    emit('new_message', {"message": f"😭 {current_user.name} has left the party."}, to=room_id)
    emit('room_count', {"userCount": len(current_room.users)}, to=room_id)


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
