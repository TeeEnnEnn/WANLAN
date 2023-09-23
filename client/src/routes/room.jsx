import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { Chat } from "../components/Chat";
import { VideoForm } from "../components/VideoForm";
import { RoomVideo } from '../components/RoomVideo'

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
        <div className={"grid grid-cols-1 md:grid-cols-12 md:gap-4 w-full"}>
            <div className={"flex flex-col gap-2 md:col-span-9"}>
                <h1>Room {roomId}</h1>
                <VideoForm />
                <RoomVideo />
            </div>
            <aside className="md:col-span-3 bg-slate-700">
                <Chat />
            </aside>
        </div>
    )
}