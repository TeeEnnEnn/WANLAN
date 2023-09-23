class User:
    def __init__(self, name, sid):
        self.name = name
        self.sid = sid
class Room:
    def __init__(self, roomid, vidurl, current_time, play_state, host_id, chat_message):
        self.roomid = roomid
        self.vidurl = vidurl
        self.current_time = current_time
        self.play_state = play_state
        self.host_id = host_id
        self.chat_message = chat_message
