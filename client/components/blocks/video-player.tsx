"use client"

type VideoPlayerProps = {
  src: string
  title?: string
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      className="w-full rounded-lg bg-black"
      aria-label={title || "Video"}
    >
      Trình duyệt không hỗ trợ phát video.
    </video>
  )
}
