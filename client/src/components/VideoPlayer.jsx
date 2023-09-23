import 'video.js/dist/video-js.css'
import 'videojs-youtube'
import { useVideoJS } from '../lib/useVideoJS'
import { useEffect } from 'react'
import { socket } from '../socket'

export function VideoPlayer({ videoUrl, roomId, hasHost, initialTime }) {
  const { Video, player, ready } = useVideoJS(
    { sources: [{ src: videoUrl, type: 'video/youtube' }], techOrder: ['youtube'], aspectRatio: '16:9' },
    'aspect-video rounded-lg overflow-auto' // optional className
  )

  useEffect(() => {
    if (typeof initialTime !== 'undefined') {
      player.currentTime(initialTime)
    }
  }, [player, initialTime])

  useEffect(() => {
    const handleVideoUpdate = (data) => {
      let currentTime = player.currentTime()
      if (
        currentTime < data.currentTime - 0.5 || 
        currentTime > currentTime + 0.5
      ) {
        player.currentTime(data.currentTime)
        player.play()
      }
      player.currentTime(data.current_time)
      if (data.play_state === 'PLAYING') {
        player.play()
      } else if (data.play_state === 'PAUSED') {
        player.pause()
      }
    }
    socket.on('vid_update', handleVideoUpdate)
    return () => {
      socket.off('vid_update', handleVideoUpdate)
    }
  }, [player])

  useEffect(() => {
    const handleTimeUpdate = (evt) => {
      const currentTime = evt.target.player.currentTime()
      const playState = evt.target.player.paused() ? 'PAUSED' : 'PLAYING'
      socket.emit('sync-vid', { current_time: currentTime, play_state: playState, room_id: roomId })
    }
    if (ready && hasHost) {
      player.on('seeked', handleTimeUpdate)
    }

    return () => {
      player?.off('seeked', handleTimeUpdate)
    }
  }, [ready, player, roomId, hasHost])

  return <Video />
}