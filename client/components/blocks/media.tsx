import Image from "next/image"
import { Download, FileText } from "lucide-react"
import type { MediaBlock } from "@/lib/types"
import {
  getStrapiMedia,
  getStrapiMediaProxyUrl,
  getStrapiPdfPreviewUrl,
} from "../custom/strapi-image"
import { PdfPreview } from "./pdf-preview"
import { VideoPlayer } from "./video-player"

type NormalizedMediaFile = {
  url: string
  alternativeText: string
  mime: string
  name: string
  ext: string
  width?: number
  height?: number
}

type MediaKind = "image" | "video" | "audio" | "pdf" | "file"

function normalizeMediaFile(file: unknown): NormalizedMediaFile | null {
  if (!file || typeof file !== "object") return null

  const source = file as Record<string, unknown>

  if (typeof source.id === "number" && !source.url && !source.data && !source.attributes) {
    return null
  }

  if (source.data && typeof source.data === "object") {
    return normalizeMediaFile(source.data)
  }

  if (source.attributes && typeof source.attributes === "object") {
    return normalizeMediaFile(source.attributes)
  }

  const url = typeof source.url === "string" ? source.url.trim() : ""
  if (!url) return null

  const mime =
    (typeof source.mime === "string" && source.mime) ||
    (typeof source.mimeType === "string" && source.mimeType) ||
    ""

  const name =
    (typeof source.name === "string" && source.name) ||
    (typeof source.hash === "string" && source.hash) ||
    ""

  let ext = typeof source.ext === "string" ? source.ext : ""
  if (!ext && name.includes(".")) {
    ext = name.slice(name.lastIndexOf("."))
  }

  return {
    url,
    alternativeText:
      typeof source.alternativeText === "string" ? source.alternativeText : "",
    mime,
    name,
    ext,
    width: typeof source.width === "number" ? source.width : undefined,
    height: typeof source.height === "number" ? source.height : undefined,
  }
}

function getFileProbe(file: NormalizedMediaFile): string {
  const ext = file.ext.trim()
  const normalizedExt = ext
    ? ext.startsWith(".")
      ? ext
      : `.${ext}`
    : ""
  return `${file.url} ${file.name} ${normalizedExt}`.toLowerCase()
}

function getMediaKind(file: NormalizedMediaFile): MediaKind {
  const mime = file.mime.toLowerCase()
  const probe = getFileProbe(file)

  const isVideoExt = /\.(mp4|webm|ogg|mov|m4v|avi|mkv)(\?|$)/i.test(probe)
  const isVideoMime = mime.startsWith("video/")

  if (isVideoMime || isVideoExt) return "video"

  const isAudioExt = /\.(mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(probe)
  if (mime.startsWith("audio/") || isAudioExt) return "audio"

  if (
    mime === "application/pdf" ||
    mime.endsWith("/pdf") ||
    mime.includes("pdf") ||
    /\.pdf(\?|$)/i.test(probe)
  ) {
    return "pdf"
  }
  if (mime === "application/octet-stream" && /\.pdf(\?|$)/i.test(probe)) {
    return "pdf"
  }

  const isImageExt =
    /\.(jpe?g|png|gif|webp|svg|avif|bmp|ico)(\?|$)/i.test(probe)
  if (mime.startsWith("image/") || isImageExt) return "image"

  if (mime === "application/octet-stream" && isVideoExt) return "video"

  return "file"
}

function MediaCaption({
  text,
  italic = false,
}: {
  text: string
  italic?: boolean
}) {
  return (
    <p
      className={`mt-2 text-center text-sm text-gray-600 ${italic ? "italic" : ""}`}
    >
      {text}
    </p>
  )
}

export default function Media({ data }: { data: MediaBlock }) {
  const file = normalizeMediaFile(data.file)
  if (!file) return null

  const src = getStrapiMedia(file.url)
  if (!src) return null

  const streamSrc = getStrapiMediaProxyUrl(file.url) ?? src
  const kind = getMediaKind(file)
  const caption =
    (typeof data.title === "string" && data.title.trim()) ||
    file.alternativeText ||
    file.name ||
    "Tài liệu đính kèm"

  if (kind === "image") {
    const width = file.width ?? 1200
    const height = file.height ?? 675
    const aspectRatio = width / height

    return (
      <figure className="my-8">
        <div
          className="relative w-full overflow-hidden rounded-lg bg-gray-100"
          style={{ aspectRatio: String(aspectRatio) }}
        >
          <Image
            src={src}
            alt={file.alternativeText || caption}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        {caption ? <MediaCaption text={caption} italic /> : null}
      </figure>
    )
  }

  if (kind === "video") {
    return (
      <figure className="my-8">
        <VideoPlayer src={streamSrc} title={caption} />
        {caption ? <MediaCaption text={caption} italic /> : null}
      </figure>
    )
  }

  if (kind === "audio") {
    return (
      <figure className="my-8">
        <audio src={streamSrc} controls className="w-full" preload="metadata">
          Trình duyệt không hỗ trợ phát audio.
        </audio>
        {caption ? <MediaCaption text={caption} /> : null}
      </figure>
    )
  }

  if (kind === "pdf") {
    const previewSrc = getStrapiPdfPreviewUrl(file.url) ?? src

    return (
      <figure className="my-8">
        <PdfPreview src={previewSrc} title={caption} />
      </figure>
    )
  }

  return (
    <figure className="my-8">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-xl border border-gray-200 bg-[#F8FAFF] px-5 py-4 transition-colors hover:bg-[#EEF4FF]"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white text-[#1D4393]">
          <FileText className="size-6" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-semibold text-gray-900">
            {file.name || caption}
          </span>
          <span className="mt-0.5 block text-sm text-gray-500">
            Nhấn để mở hoặc tải tệp
          </span>
        </span>
        <Download className="size-5 shrink-0 text-[#1D4393]" aria-hidden />
      </a>
      {caption && caption !== file.name ? <MediaCaption text={caption} /> : null}
    </figure>
  )
}
