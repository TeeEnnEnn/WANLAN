import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { Chat } from "../components/Chat";
import { VideoForm } from "../components/VideoForm";
import { RoomVideo } from '../components/RoomVideo'
import { Card, CardContent } from '../components/card'

export function Room() {
    const { roomId } = useParams()
    const [room, setRoom] = useState()
    useEffect(() => {
        const abortController = new AbortController()
        fetch(`/api/rooms/${roomId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            signal: abortController.signal
        }).then(response => response.json()).then(data => setRoom(data))
        return () => {
            abortController.abort()
        }
    }, [roomId])
    useEffect(() => {
        socket.connect()
        console.log({ roomId })
        const handleConnect = () => {
            const username = window.localStorage.getItem('username') ?? 'Anonymous'
            socket.emit('join', { room_id: roomId, username });
        }
        const handleDisconnect = () => {
            socket.emit('leave', { room_id: roomId })
        }
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        return () => {
            socket.off('connect', handleConnect)
            socket.off('disconnect', handleDisconnect)
            socket.disconnect()
        }
    }, [roomId])

    if (!room) {
        return null
    }
    console.log({ roomId })
    return  (
        <div className={"grid grid-cols-1 md:grid-cols-12 md:gap-4 w-full"}>
            <div className={"flex flex-col gap-2 md:col-span-9"}>
                <h1>{room.name}</h1>
                <VideoForm roomId={roomId} />
                <RoomVideo initialVideoURL={room.vid_url} />
            </div>
            <aside className="md:col-span-3">
                <Card className='h-full'>
                    <CardContent>
                        <Chat roomId={roomId} />
                    </CardContent>
                </Card>
            </aside>
        </div>
    )
}