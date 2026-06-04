import Link from "next/link"
import { type GalleryAlbum } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"
import { GalleryImage } from "./gallery-image"

type GalleryAlbumCardProps = {
  album: GalleryAlbum
  className?: string
}

export function GalleryAlbumCard({ album, className }: GalleryAlbumCardProps) {
  return (
    <article
      className={cn(
        "h-[260px] max-h-[260px] overflow-hidden rounded-xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <Link
        href={`/thu-vien-anh/${album.slug}`}
        className="group relative block h-full"
      >
        <div className="relative h-full overflow-hidden bg-gray-200">
          <GalleryImage
            src={album.coverUrl}
            alt={album.coverAlt || album.title}
            className="transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />

          <div className="absolute inset-x-0 bottom-0 flex min-h-20 items-center justify-center bg-[#565656]/70 px-5 py-4 backdrop-blur-[4px]">
            <p className="line-clamp-2 text-center text-base font-semibold leading-snug text-white">
              {album.title}
            </p> 
          </div>
        </div>
      </Link>
    </article>
  )
}
