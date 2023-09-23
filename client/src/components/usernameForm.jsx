import {useEffect, useState} from "react";
import {socket} from "../socket.js";
import {Button} from "./button.jsx";

export function UsernameForm() {
    const [username,] = useState(window.localStorage.getItem("username") ?? "")
    const handleSubmit = evt => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const data = Object.fromEntries(formData);
        window.localStorage.setItem("username", data.username);
    }

    return (
        <form onSubmit={handleSubmit}
              className="flex flex-row items-center gap-4">
            <input
                type="text"
                name="username"
                defaultValue={username}
                placeholder={"Room Name"}
                className="bg-gray-700 w-full rounded-md px-4 py-2.5"
            />
            <Button className="flex-shrink-0">Set Username</Button>
        </form>
    )
}