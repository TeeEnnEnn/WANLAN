import {socket} from "../socket.js";
import {Button} from "./button.jsx";

export function VideoForm({ roomId, hasHost }) {
    console.log({ roomId })
    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData);
        console.log({data})
        socket.emit("set-url", { url: data.url, room_id: roomId })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-row gap-4">
            <input type="text"
                    name="url"
                    className="bg-gray-700 w-full rounded-md px-4" placeholder="Enter YouTube URL" disabled={!hasHost} />
            <Button className="flex-shrink-0">Add URL</Button>
        </form>
    );
}