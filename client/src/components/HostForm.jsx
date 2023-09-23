import {useEffect} from "react";
import {socket} from "../socket.js";
import {Button} from "./button.jsx";

export function HostForm() {
    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData);
        const username = window.localStorage.getItem('username') ?? 'Anonymous'
        socket.emit('create_room', { username, room_name: data.room_name })
        evt.target.reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       name="room_name"
                       placeholder={"Room Name"}
                       className="bg-blue-500 "/>
                <Button>Host A Room</Button>
            </form>
        </div>
    );
}