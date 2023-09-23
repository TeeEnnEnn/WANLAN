import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { Chat } from "../components/Chat";
import {VideoForm} from "../components/VideoForm.jsx";

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

        <div className={"flex flex-row gap-4 flex-wrap"}>
            <div className={"flex flex-col gap-2"}>
                <h1>Room {roomId}</h1>
                <VideoForm />
                <div className={"aspect-video bg-white"}></div>
            </div>
            <Chat />
        </div>
    )
}