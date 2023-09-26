from flask import Blueprint, jsonify

from wan.main.utilities import make_json_room, find_room_by_id, rooms

main = Blueprint("main", __name__)


@main.route("/api/rooms", methods=["GET"])
def get_rooms():
    _rooms = list(map(make_json_room, rooms))
    return jsonify(_rooms)


@main.route("/api/rooms/<roomId>", methods=["GET"])
def get_room(roomId):
    _room = find_room_by_id(roomId)
    if _room is None:
        return jsonify(None)
    return jsonify(make_json_room(_room))


@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def catch_all(path):
    return main.send_static_file('index.html')
