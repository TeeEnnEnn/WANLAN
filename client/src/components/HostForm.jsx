import {socket} from "../socket.js";
import {Button} from "./button.jsx";

export function HostForm() {
    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData);
        const username = window.localStorage.getItem('username') ?? 'Anonymous'
        const userId = window.localStorage.getItem('user_id')
        if (!userId) return undefined
        socket.emit('create_room', { username, room_name: data.room_name ?? 'New Party', user_id: userId })
        evt.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}
            className="flex flex-row items-center gap-4"
        >
            <input type="text"
                    name="room_name"
                    placeholder={"Room Name"}
                    className="bg-gray-700 w-full rounded-md px-4 py-2.5"/>
            <Button className="flex-shrink-0">Host A Room</Button>
        </form>
    );
}