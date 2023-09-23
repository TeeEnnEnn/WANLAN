import os
from flask_socketio import SocketIO
from flask_cors import CORS

from flask import Flask

template_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'client', 'dist'))
asset_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'client', 'dist', 'assets'))

def create_app():
    app: Flask = Flask(__name__, static_folder=asset_path, template_folder=template_path)
    app.config["SECRET_KEY"] = "wan"
    CORS(app,resources={r"/*":{"origins":"*"}})
    socketio = SocketIO(app, cors_allowed_origins="*")

    from wan.main.views import main
    app.register_blueprint(main, url_prefix="/")

    return app, socketio
