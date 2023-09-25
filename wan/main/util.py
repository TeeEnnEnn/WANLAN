class User:
    def __init__(self, name, sid):
        self.name = name
        self.sid = sid

    def __str__(self):
        return f"User: {self.name}, {self.sid}"


class Room:
    def __init__(self, room_id, room_name, host_id = None):
        self.room_id = room_id
        self.vid_url = None
        self.current_time = None
        self.play_state = None
        self.host_id = host_id
        self.chat_message = []
        self.users = []
        self.room_name = room_name

    def __str__(self):
        return f"Room:{self.room_id} : {self.users}"


class Message:
    def __init__(self, roomid, userid, message, username):
        self.roomid: str = roomid
        self.userid: str = userid
        self.message: str = message
        self.username: str = username
