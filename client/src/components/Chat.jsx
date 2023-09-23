import { useEffect } from "react"
import { socket } from "../socket"
import {Button} from "./button.jsx";

export function Chat() {
    useEffect(() => {
        socket.on('new_message', (data) => {
            console.log({ new_message: data })
        })
    }, [])
    const handleSubmit = evt => {
        evt.preventDefault()
        const formData = new FormData(evt.target)
        const data = Object.fromEntries(formData)
        console.log({ data })
    }
    return (
        <div>
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