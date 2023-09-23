import 'video.js/dist/video-js.css'
import 'videojs-youtube'
import { useVideoJS } from '../lib/useVideoJS'
import { useEffect } from 'react'

export function VideoPlayer({ videoUrl }) {
  const { Video, player, ready } = useVideoJS(
    { sources: [{ src: videoUrl, type: 'video/youtube' }], techOrder: ['youtube'], aspectRatio: '16:9' },
    'aspect-video' // optional className
  )

  useEffect(() => {
    if (ready) {
      // player.on()
    }
  }, [ready, player])

  return <Video />
}