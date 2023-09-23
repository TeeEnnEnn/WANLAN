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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       defaultValue={username}
                       name={"username"}
                       className={"bg-amber-50 text-black"}/>
                <Button>Set Username</Button>
            </form>
        </div>
    )
}