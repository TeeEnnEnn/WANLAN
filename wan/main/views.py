from flask import Blueprint, render_template, send_file

main = Blueprint("main", __name__)

@main.route("/", methods=["GET", "POST"])
def home():
    return render_template('index.html')