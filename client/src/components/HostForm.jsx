import {useEffect} from "react";
import {socket} from "../socket.js";
import {Button} from "./button.jsx";

export function HostForm() {
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
                       name="Room Name"
                       placeholder={"Room Name"}
                       className="bg-blue-500 "/>
                <Button>Host A Room</Button>
            </form>
        </div>
    );
}