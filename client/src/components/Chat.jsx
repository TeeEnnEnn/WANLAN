import { useEffect } from "react"
import { socket } from "../socket"

export function Chat() {
    useEffect(() => {
        socket.on('new_message', (data) => {
            console.log({ new_message: data })
        })
    }, [])
    return (
        <div>
            
        </div>
    )
}