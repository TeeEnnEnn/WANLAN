from wanLan import create_app

app, socket = create_app()

if __name__ == "__main__":
    socket.run(app, debug=True, allow_unsafe_werkzeug=True)
