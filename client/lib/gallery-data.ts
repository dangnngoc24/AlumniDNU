import { getStrapiURL } from "./utils"

/** Album/ảnh: luôn fetch mới (tránh cache sau khi thêm ảnh trong admin) */
function getGalleryFetchOptions(): RequestInit {
  return { cache: "no-store" }
}

export const GALLERY_DEFAULT_COVER_URL = "/image_default_post.jpg"

export function getGalleryCoverUrl(coverUrl?: string | null): string {
  const trimmed = coverUrl?.trim()
  if (!trimmed) return GALLERY_DEFAULT_COVER_URL
  if (trimmed === GALLERY_DEFAULT_COVER_URL) return GALLERY_DEFAULT_COVER_URL
  if (trimmed.startsWith("http") || trimmed.startsWith("//") || trimmed.startsWith("data:")) {
    return trimmed
  }
  if (trimmed.startsWith("/uploads")) {
    return `${getStrapiURL()}${trimmed}`
  }
  return trimmed
}

export type GalleryAlbum = {
  id: number
  documentId: string
  slug: string
  title: string
  coverUrl: string
  coverAlt: string
}

type StrapiRelation<T> =
  | T
  | { data?: T | null }
  | null
  | undefined

type StrapiMedia = {
  id?: number
  url?: string | null
  alternativeText?: string | null
  caption?: string | null
  name?: string | null
}

export type GalleryPhoto = {
  id: number
  url: string
  alt: string
  caption: string
}

export type GalleryAlbumDetail = GalleryAlbum & {
  photos: GalleryPhoto[]
}

type StrapiAlbumEntry = {
  id?: number
  documentId?: string
  title?: string | null
  publishedAt?: string | null
  createdAt?: string
  cover?: StrapiRelation<StrapiMedia>
  photos?: StrapiRelation<StrapiMedia[]> | StrapiMedia[]
  attributes?: Omit<StrapiAlbumEntry, "attributes">
}

export function splitAlbumTitle(title: string): {
  primary: string
  accent: string | null
} {
  const match = title.match(/\s+(khóa\s.+)$/i)
  if (!match || match.index == null) {
    return { primary: title, accent: null }
  }
  return {
    primary: title.slice(0, match.index).trim(),
    accent: match[1].trim(),
  }
}

function mapStrapiMediaToPhoto(media: StrapiMedia, fallbackId: number): GalleryPhoto | null {
  const url = media.url?.trim()
  if (!url) return null

  const caption =
    media.caption?.trim() ||
    media.alternativeText?.trim() ||
    media.name?.trim() ||
    ""

  return {
    id: media.id ?? fallbackId,
    url,
    alt: media.alternativeText?.trim() || caption || "Ảnh album",
    caption,
  }
}

function extractMediaList(
  relation: StrapiAlbumEntry["photos"]
): StrapiMedia[] {
  if (!relation) return []
  if (Array.isArray(relation)) return relation
  if (
    typeof relation === "object" &&
    "data" in relation &&
    Array.isArray(relation.data)
  ) {
    return relation.data
  }
  return []
}

function mapAlbumPhotos(source: StrapiAlbumEntry, cover: StrapiMedia | null): GalleryPhoto[] {
  const fromPhotos = extractMediaList(source.photos)
    .map((media, index) => mapStrapiMediaToPhoto(media, index + 1))
    .filter((item): item is GalleryPhoto => item !== null)

  if (fromPhotos.length > 0) return fromPhotos

  if (cover?.url?.trim()) {
    const single = mapStrapiMediaToPhoto(cover, 1)
    return single ? [single] : []
  }

  return []
}

export function slugifyAlbumTitle(value: string): string {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function unwrapRelation<T>(relation: StrapiRelation<T>): T | null {
  if (!relation) return null
  if (
    typeof relation === "object" &&
    relation !== null &&
    Object.prototype.hasOwnProperty.call(relation, "data")
  ) {
    return (relation as { data?: T | null }).data ?? null
  }
  return relation as T
}

function mapStrapiAlbumToGalleryAlbum(
  entry: StrapiAlbumEntry,
  fallbackId: number
): GalleryAlbum | null {
  const source = entry.attributes ?? entry
  const title = source.title?.trim()
  if (!title) return null

  const documentId =
    entry.documentId?.trim() ||
    source.documentId?.trim() ||
    String(entry.id ?? source.id ?? fallbackId)

  const slug = slugifyAlbumTitle(title) || documentId
  const cover = unwrapRelation(source.cover)
  const coverUrl = cover?.url?.trim() || ""
  const coverAlt = cover?.alternativeText?.trim() || title

  return {
    id: entry.id ?? source.id ?? fallbackId,
    documentId,
    slug,
    title,
    coverUrl,
    coverAlt,
  }
}

async function requestAlbumEntriesFromStrapi(
  withPublishedStatus: boolean,
  withPhotos = false
): Promise<StrapiAlbumEntry[]> {
  const baseUrl = getStrapiURL()
  const token = process.env.STRAPI_API_TOKEN
  const headers: HeadersInit = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const params = new URLSearchParams({
    "populate[cover]": "true",
    "pagination[pageSize]": "100",
    "sort[0]": "publishedAt:desc",
    "sort[1]": "createdAt:desc",
  })

  if (withPhotos) {
    params.set("populate[photos]", "true")
  }

  if (withPublishedStatus) {
    params.set("status", "published")
  }

  const response = await fetch(`${baseUrl}/api/albums?${params.toString()}`, {
    headers,
    ...getGalleryFetchOptions(),
  })

  if (!response.ok) return []

  const payload = (await response.json()) as { data?: StrapiAlbumEntry[] }
  return Array.isArray(payload.data) ? payload.data : []
}

function mapEntryToAlbumDetail(
  entry: StrapiAlbumEntry,
  fallbackId: number
): GalleryAlbumDetail | null {
  const source = entry.attributes ?? entry
  const base = mapStrapiAlbumToGalleryAlbum(entry, fallbackId)
  if (!base) return null

  const cover = unwrapRelation(source.cover)
  const photos = mapAlbumPhotos(source, cover)

  return { ...base, photos }
}

async function requestAlbumsFromStrapi(
  withPublishedStatus: boolean
): Promise<GalleryAlbum[]> {
  const entries = await requestAlbumEntriesFromStrapi(withPublishedStatus)
  return entries
    .map((entry, index) => mapStrapiAlbumToGalleryAlbum(entry, index + 1))
    .filter((item): item is GalleryAlbum => item !== null)
}

export async function fetchGalleryAlbumsFromStrapi(): Promise<GalleryAlbum[]> {
  const published = await requestAlbumsFromStrapi(true)
  if (published.length > 0) return published
  return requestAlbumsFromStrapi(false)
}

export async function fetchGalleryAlbumBySlugFromStrapi(
  slug: string
): Promise<GalleryAlbum | null> {
  const detail = await fetchGalleryAlbumDetailBySlugFromStrapi(slug)
  return detail
}

export async function fetchGalleryAlbumDetailBySlugFromStrapi(
  slug: string
): Promise<GalleryAlbumDetail | null> {
  const normalized = slug.trim()
  if (!normalized) return null

  let entries = await requestAlbumEntriesFromStrapi(true, true)
  if (entries.length === 0) {
    entries = await requestAlbumEntriesFromStrapi(false, true)
  }

  for (const [index, entry] of entries.entries()) {
    const detail = mapEntryToAlbumDetail(entry, index + 1)
    if (!detail) continue
    if (detail.slug === normalized || detail.documentId === normalized) {
      return detail
    }
  }

  return null
}
