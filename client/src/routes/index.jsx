import {UsernameForm} from "../components/usernameForm.jsx";
import {HostForm} from "../components/HostForm.jsx";
import { useEffect, useState } from "react";
import { socket } from "../socket.js";
import { ArrowRight } from 'lucide-react'
import {Link} from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card.jsx";

export function Index() {
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const abortController = new AbortController()
        fetch('/api/rooms', {
            headers: {
                'Content-Type': 'application/json',
            },
            signal: abortController.signal
        }).then(response => response.json()).then(data => setRooms(data))
        return () => {
            abortController.abort()
        }
    }, [])
    useEffect(() => {
        socket.connect()
        const handleRoomCreated = (room) => {
            setRooms(prevRooms => prevRooms.concat([room]))
        }
        socket.on('room_created', handleRoomCreated)
        return () => {
            socket.off('room_created', handleRoomCreated)
            socket.disconnect()
        }
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Choose your username</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UsernameForm />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Host your own room</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <HostForm />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader><CardTitle>Active Parties</CardTitle></CardHeader>
                    <CardContent>
                        {rooms.length === 0 && 'No Rooms Exist'}
                        {rooms.length > 0 && (
                            <div>
                                {rooms.map(room => (
                                    <Link key={room.id} to={`/room/${room.id}`} className="px-3 py-1.5 font-semibold text-xl flex items-center gap-2">
                                        {room.name}
                                        <ArrowRight className="w-8 h-8" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
                
            </div>
        </div>
    )
}