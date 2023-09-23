import 'video.js/dist/video-js.css'
import 'videojs-youtube'
import { useVideoJS } from '../lib/useVideoJS'

export function VideoPlayer({ videoUrl }) {
  const { Video, player, ready } = useVideoJS(
    { sources: [{ src: videoUrl, type: 'video/youtube' }], techOrder: ['youtube'] },
    'aspect-video' // optional className
  )

  return <Video />
}