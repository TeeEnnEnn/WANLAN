import {useEffect, useState} from "react"
import { socket } from "../socket"
import {Button} from "./button.jsx";
import { CardContent, CardFooter } from "./card";

export function Chat({roomId}) {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const handleNewMessage = (data) => {
            setMessages(prevState => [...prevState, data.message])
        }
        socket.on('new_message', handleNewMessage)
        return () => {
            socket.off('new_message', handleNewMessage)
        }
    }, [])
    const handleSubmit = evt => {
        evt.preventDefault()
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData)
        const username = window.localStorage.getItem("username") ?? "Anonymous"
        const user_id = window.localStorage.getItem("user_id")
        if (!user_id) {
            return undefined
        }
        socket.emit("message", {room_id:roomId, user_id, message: data["message"], username});
        setMessages(prevState => [...prevState, `${username}: ${data["message"]}`])
        console.log({ data })
        evt.target.reset()
    }
    return (
        <>
            <CardContent className="flex flex-col overflow-hidden h-full relative">
                <div className="flex flex-col gap-2 h-full overflow-auto max-h-[520px]">
                    {messages.map((message, index)=>{
                        return (
                            <div key={index} className="py-2">
                                {message}
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={handleSubmit} className={"flex flex-row gap-2 sticky bottom-0"}>
                    <input
                        type="text"
                        name="message"
                        className="bg-gray-700 w-full rounded-md px-3"
                        placeholder="Enter a message"
                    />
                    <Button className="flex-shrink-0">Send</Button>
                </form>
            </CardContent>
        </>
    )
}