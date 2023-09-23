import { useEffect, useState } from "react"
import { socket } from "../socket"

export function RoomName({ roomName }) {
    const [userCount, setUserCount] = useState(1)
    useEffect(() => {
        const handleUserCountUpdate = data => setUserCount(data.userCount)
        socket.on('room_count', handleUserCountUpdate)
        return () => {
            socket.off('room_count', handleUserCountUpdate)
        }
    }, [])
    return (
        <h1 className="text-white text-4xl font-black"><marquee>Partying in: {roomName} with {userCount} Users</marquee></h1>
    )
}