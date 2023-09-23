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
        <div className={""}>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       name="url"
                       className="bg-gray-700 w-full" disabled={!hasHost} />
                <Button>Add URL</Button>
            </form>
        </div>
    );
}