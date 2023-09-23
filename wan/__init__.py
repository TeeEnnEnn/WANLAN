from flask_socketio import SocketIO

from flask import Flask


def create_app():
    app: Flask = Flask(__name__)
    app.config["SECRET_KEY"] = "wan"
    socketio = SocketIO(app)

    from wan.main.views import main
    app.register_blueprint(main, url_prefix="/")

    return app, socketio
