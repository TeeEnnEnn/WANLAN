import { useEffect, useState } from 'react'
import { VideoPlayer } from './VideoPlayer'
import { socket } from '../socket'

export function RoomVideo({ initialVideoURL, roomId, hasHost }) {
    const [videoURL, setVideoURL] = useState(initialVideoURL)
    useEffect(() => {
        const handleURLUpdate = data => {
            setVideoURL(data.url)
        }
        socket.on('url_update', handleURLUpdate)
        return () => {
            socket.off('url_update', handleURLUpdate)
        }
    }, [])
    if (!videoURL) {
        return (
            <div
                className='aspect-video bg-black flex flex-col items-center justify-center text-white'
            >
                <p>Waiting for Host to start video</p>
            </div>
        )
    }
    return (
        <VideoPlayer
            videoUrl={videoURL}
            roomId={roomId}
            hasHost={hasHost}
        />
    )
}