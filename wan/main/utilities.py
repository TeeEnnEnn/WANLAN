import uuid

from wan.main.models import Room


def gen_uuid_str():
    return str(uuid.uuid4())


default_room = Room(room_id="co-hack", room_name="Co.Hack PARTY 🎉🎉🎉", host_id="5e5807ae-efb5-467d-abe2-51e173271ecc")
default_room.vid_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUkcmljayBhc3RsZXkgbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXAg'

rooms = [
    default_room
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
