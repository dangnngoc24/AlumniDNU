import type { GalleryAlbum } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"
import { GalleryAlbumCard } from "./gallery-album-card"

type GalleryAlbumGridProps = {
  albums: GalleryAlbum[]
  className?: string
}

export function GalleryAlbumGrid({ albums, className }: GalleryAlbumGridProps) {
  if (albums.length === 0) {
    return (
      <p className={cn("py-12 text-center text-gray-600", className)}>
        Chưa có album ảnh nào.
      </p>
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {albums.map((album) => (
        <GalleryAlbumCard key={album.documentId} album={album} />
      ))}
    </div>
  )
}
