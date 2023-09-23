import { useEffect, useState } from 'react'
import { VideoPlayer } from './VideoPlayer'
import { socket } from '../socket'

export function RoomVideo({ initialVideoURL }) {
    const [videoURL, setVideoURL] = useState(initialVideoURL)
    useEffect(() => {
        socket.on('url_update', (data) => {
            console.log(data);
            setVideoURL(data.url)
        })
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
        />
    )
}