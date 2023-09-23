import {UsernameForm} from "../components/usernameForm.jsx";
import {HostForm} from "../components/HostForm.jsx";
import { useEffect, useState } from "react";
import { socket } from "../socket.js";
import {Link} from "react-router-dom";

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
        const handleRoomCreated = (room) => {
            setRooms(prevRooms => prevRooms.concat([room]))
        }
        socket.on('room_created', handleRoomCreated)
        return () => {
            socket.off('room_created', handleRoomCreated)
        }
    }, [])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <UsernameForm />
                <HostForm />
            </div>
            <div>
                {rooms.length === 0 && 'No Rooms Exist'}
                {rooms.length > 0 && rooms.map(room => (
                    <div key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}