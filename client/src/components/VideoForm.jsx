import {useEffect} from "react";
import {socket} from "../socket.js";
import {Button} from "./button.jsx";

export function VideoForm() {
    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData);
        console.log({data})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       name="url"
                       className="bg-blue-500 "/>
                <Button>Add URL</Button>
            </form>
        </div>
    );
}