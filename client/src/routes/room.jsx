import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { Chat } from "../components/Chat";

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
            <Chat />
        </div>
    )
}