import { useEffect, useState } from 'react'
import { VideoJS } from './VideoPlayer'
import { socket } from '../socket'

export function RoomVideo() {
    const [videoURL, setVideoURL] = useState()
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
        <VideoJS
            options={{
                techOrder: ['youtube'],
                sources: [
                    { "type": "video/youtube", "src": videoURL }
                ]
            }}
        />
    )
}