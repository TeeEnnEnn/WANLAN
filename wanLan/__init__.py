from flask import Flask

def create_app():
    app: Flask = Flask(__name__)
    app.config["SECRET_KEY"] = "WAN"

    return app

def register_blueprints(app):

    from wanLan.views import main

    app.register_blueprint(main, url_prefix="/")