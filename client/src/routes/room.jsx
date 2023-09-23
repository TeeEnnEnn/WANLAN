import { useEffect } from "react"
import { socket } from "../socket";
import { useParams } from "react-router-dom";

export function Room() {
    const { roomId } = useParams()
    useEffect(() => {
        console.log({ roomId })
        socket.on('connect', function() {
            socket.emit('join', { room: roomId, username: 'Test' });
        });
        socket.on('disconnect', function() {
            socket.emit('leave')
        })
        return () => {
            socket.emit('leave')
        }
    }, [roomId])
    return  (
        <div>
            <h1>Room {roomId}</h1>
        </div>
    )
}