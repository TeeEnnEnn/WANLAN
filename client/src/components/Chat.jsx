import { useEffect } from "react"
import { socket } from "../socket"

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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="message"
                    className="bg-red-500"
                />
            </form>
        </div>
    )
}