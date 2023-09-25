import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { Chat } from "../components/Chat";
import { VideoForm } from "../components/VideoForm";
import { RoomVideo } from '../components/RoomVideo'
import { Card, CardHeader, CardTitle } from '../components/card'
import { RoomName } from '../components/RoomName'

export function Room() {
    const { roomId } = useParams()
    const [room, setRoom] = useState()
    const [hasHost, setHasHost] = useState(false)
    const [connected, setConnected] = useState(false)
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
        const handleConnect = () => {
            const username = window.localStorage.getItem('username') ?? 'Anonymous'
            const userId = window.localStorage.getItem('user_id')
            if (!userId) {
                return undefined
            }
            socket.emit('join', { room_id: roomId, username, user_id: userId });
            setConnected(true)
        }
        const handleDisconnect = () => {
            const userId = window.localStorage.getItem('user_id')
            socket.emit('leave', { room_id: roomId, user_id: userId })
            setConnected(false)
        }
        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        return () => {
            socket.off('connect', handleConnect)
            socket.off('disconnect', handleDisconnect)
            socket.disconnect()
        }
    }, [roomId])
    useEffect(() => {
        // mmsPacaYnpygLIz9AAAF
        if (room && connected) {
            const userId = window.localStorage.getItem('user_id')
            const hostId = room.host_id
            setHasHost(userId === hostId)
        }
    }, [room, connected])

    if (!room) {
        return null
    }

    return  (
        <div className={"grid grid-cols-1 md:grid-cols-12 md:gap-4 w-full"}>
            <div className={"flex flex-col gap-3.5 md:col-span-9"}>
                <RoomName roomName={room.name} />
                <VideoForm roomId={roomId} hasHost={hasHost} />
                <RoomVideo initialVideoURL={room.vid_url} roomId={roomId} hasHost={hasHost} initialTime={room?.current_time ?? 0} />
            </div>
            <aside className="md:col-span-3 h-full">
                <Card className='h-full flex flex-col'>
                    <CardHeader>
                        <CardTitle>Chat</CardTitle>
                    </CardHeader>
                    <Chat roomId={roomId} />
                </Card>
            </aside>
        </div>
    )
}