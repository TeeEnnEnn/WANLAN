from flask import Flask
from flask_socketio import SocketIO


def create_app():
    app: Flask = Flask(__name__)
    app.config["SECRET_KEY"] = "WAN"

    socketio = SocketIO(app)

    return app, socketio


def register_blueprints(app):
    from wanLan.views import main
    app.register_blueprint(main, url_prefix="/")
