import {useEffect, useState} from "react"
import { socket } from "../socket"
import {Button} from "./button.jsx";
import {data} from "autoprefixer";

export function Chat({roomId}) {

    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket.on('new_message', (data) => {
            console.log({ new_message: data })
            setMessages(prevState => [...prevState, data])
        })
    }, [])
    const handleSubmit = evt => {
        evt.preventDefault()
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData)
        const username = window.localStorage.getItem("username")??"anonymous"
        socket.emit("message", {roomid:roomId, message: data["message"], username});
        setMessages(prevState => [...prevState, `${username}: ${data["message"]}`])
        console.log({ data })
    }
    return (
        <div>
            {messages.map((message, index)=>{
                return (
                    <div key={index}>
                        {message}
                    </div>
                )
            })}
            <form onSubmit={handleSubmit} className={"flex flex-row gap-2 "}>
                <input
                    type="text"
                    name="message"
                    className="bg-gray-700 w-full"
                />
                <Button>Send</Button>
            </form>
        </div>
    )
}