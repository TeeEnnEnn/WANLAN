from flask import Blueprint, render_template


main = Blueprint("main", __name__)

@main.route("/", methods=["GET", "POST"])
def home():
    return render_template('index.html')

# @main.route("/room/<room_id>", methods=["GET"])
# def room(room_id):
#     return render_template("room.html", room_id=room_id)
