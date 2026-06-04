import { getStrapiURL } from "./utils"

export const NEWS_DEFAULT_COVER_URL = "/image_default_post.jpg"

/** Dev: luôn fetch mới. Production: ISR (mặc định 10s, set NEWS_REVALIDATE_SECONDS=0 để tắt cache) */
export function getStrapiFetchOptions(): RequestInit {
  const configured = process.env.NEWS_REVALIDATE_SECONDS
  const parsed = configured != null ? Number(configured) : NaN

  if (process.env.NODE_ENV === "development" || parsed === 0) {
    return { cache: "no-store" }
  }

  const revalidate =
    Number.isFinite(parsed) && parsed > 0 ? parsed : 10

  return { next: { revalidate } }
}

export function getNewsCoverUrl(coverUrl?: string | null): string {
  const trimmed = coverUrl?.trim()
  if (!trimmed) return NEWS_DEFAULT_COVER_URL
  if (trimmed === NEWS_DEFAULT_COVER_URL) return NEWS_DEFAULT_COVER_URL
  if (trimmed.startsWith("http") || trimmed.startsWith("//") || trimmed.startsWith("data:")) {
    return trimmed
  }
  if (trimmed.startsWith("/uploads")) {
    return `${getStrapiURL()}${trimmed}`
  }
  return trimmed
}

export type NewsListItem = {
  id: number
  documentId: string
  slug: string
  title: string
  description: string
  publishedAt: string
  coverUrl: string
  coverAlt: string
  /** Giá trị enum category từ Strapi (vd: ad, as, af, ag) */
  category: string
  categoryLabel: string
  filterCategory: string
}

export type NewsFilterTab = {
  id: string
  label: string
}

export type NewsDetailPost = NewsListItem & {
  author: string
  bodyBlocks: unknown[]
}

export const newsListItems: NewsListItem[] = []

type StrapiRelation<T> =
  | T
  | {
      data?: T | null
    }
  | null
  | undefined

type StrapiMedia = {
  url?: string | null
  alternativeText?: string | null
}

type StrapiPostEntry = {
  id?: number
  documentId?: string
  title?: string
  slug?: string
  description?: string | null
  publishedAt?: string | null
  createdAt?: string
  thumbnail?: StrapiRelation<StrapiMedia>
  category?: string | null
  author?: string | null
  body?: unknown[]
  attributes?: Omit<StrapiPostEntry, "attributes">
}

function slugifyCategory(value: string): string {
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

function mapStrapiPostToNewsItem(
  entry: StrapiPostEntry,
  fallbackId: number
): NewsListItem | null {
  const source = entry.attributes ?? entry
  const title = source.title?.trim()
  const slug = source.slug?.trim()
  const publishedAt = source.publishedAt ?? source.createdAt
  if (!title || !slug || !publishedAt) {
    return null
  }

  const category = source.category?.trim() || ""
  const categoryLabel = category || "Khác"
  const filterCategory = category || slugifyCategory(categoryLabel) || "khac"

  const cover = unwrapRelation(source.thumbnail)
  const coverUrl = cover?.url?.trim() || ""
  const coverAlt = cover?.alternativeText?.trim() || title

  const documentId =
    entry.documentId?.trim() ||
    source.documentId?.trim() ||
    String(entry.id ?? source.id ?? fallbackId)

  return {
    id: entry.id ?? source.id ?? fallbackId,
    documentId,
    slug,
    title,
    description: source.description?.trim() || "",
    publishedAt,
    coverUrl,
    coverAlt,
    category,
    categoryLabel,
    filterCategory,
  }
}

type FetchNewsPostsOptions = {
  category?: string
  pageSize?: number
}

function excludeCurrentPost(
  posts: NewsListItem[],
  exclude: { documentId: string; id: number }
): NewsListItem[] {
  return posts.filter(
    (post) =>
      post.documentId !== exclude.documentId &&
      post.id !== exclude.id
  )
}

async function requestNewsPostsFromStrapi(
  options: FetchNewsPostsOptions,
  withPublishedStatus: boolean
): Promise<NewsListItem[]> {
  const baseUrl = getStrapiURL()
  const token = process.env.STRAPI_API_TOKEN
  const headers: HeadersInit = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const params = new URLSearchParams({
    "populate[thumbnail]": "true",
    "pagination[pageSize]": String(options.pageSize ?? 100),
    "sort[0]": "publishedAt:desc",
    "sort[1]": "createdAt:desc",
  })

  if (withPublishedStatus) {
    params.set("status", "published")
  }

  if (options.category?.trim()) {
    params.set("filters[category][$eq]", options.category.trim())
  }

  const response = await fetch(`${baseUrl}/api/posts?${params.toString()}`, {
    headers,
    ...getStrapiFetchOptions(),
  })

  if (!response.ok) return []

  const payload = (await response.json()) as { data?: StrapiPostEntry[] }
  const entries = Array.isArray(payload.data) ? payload.data : []
  return entries
    .map((entry, index) => mapStrapiPostToNewsItem(entry, index + 1))
    .filter((item): item is NewsListItem => item !== null)
}

async function fetchNewsPostsFromStrapi(
  options: FetchNewsPostsOptions = {}
): Promise<NewsListItem[]> {
  const published = await requestNewsPostsFromStrapi(options, true)
  if (published.length > 0) return published
  return requestNewsPostsFromStrapi(options, false)
}

export function buildNewsFilterTabs(posts: NewsListItem[]): NewsFilterTab[] {
  const tabs: NewsFilterTab[] = [{ id: "all", label: "Tất cả" }]
  const seen = new Set<string>()

  for (const post of posts) {
    const id = post.filterCategory?.trim()
    if (!id || seen.has(id)) continue
    seen.add(id)
    tabs.push({ id, label: post.categoryLabel })
  }

  return tabs
}

export async function fetchNewsListItemsFromStrapi(): Promise<NewsListItem[]> {
  return fetchNewsPostsFromStrapi({ pageSize: 100 })
}

/** 3 bài mới nhất (mọi category), không gồm bài hiện tại */
export async function fetchLatestNewsPosts(
  exclude: { documentId: string; id: number },
  limit = 3
): Promise<NewsListItem[]> {
  const posts = await fetchNewsPostsFromStrapi({ pageSize: Math.max(limit + 5, 20) })
  return excludeCurrentPost(posts, exclude).slice(0, limit)
}

/** 3 bài mới nhất cùng category enum, không gồm bài hiện tại */
export async function fetchRelatedNewsPosts(
  exclude: { documentId: string; id: number },
  category: string,
  limit = 3
): Promise<NewsListItem[]> {
  const normalized = category.trim()
  if (!normalized) return []

  const posts = await fetchNewsPostsFromStrapi({
    category: normalized,
    pageSize: Math.max(limit + 5, 20),
  })
  return excludeCurrentPost(posts, exclude).slice(0, limit)
}

export async function fetchNewsDetailBySlugFromStrapi(
  slug: string
): Promise<NewsDetailPost | null> {
  const normalized = slug.trim()
  if (!normalized) return null

  const baseUrl = getStrapiURL()
  const token = process.env.STRAPI_API_TOKEN
  const headers: HeadersInit = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const params = new URLSearchParams({
    "filters[slug][$eq]": normalized,
    "populate[thumbnail]": "true",
    "populate[body][on][shared.rich-text]": "true",
    "populate[body][on][shared.quote]": "true",
    "populate[body][on][shared.slider][populate][files]": "true",
    "populate[body][on][shared.media][populate][file]": "true",
    "pagination[pageSize]": "1",
    status: "published",
  })

  const response = await fetch(`${baseUrl}/api/posts?${params.toString()}`, {
    headers,
    ...getStrapiFetchOptions(),
  })
  if (!response.ok) return null

  const payload = (await response.json()) as { data?: StrapiPostEntry[] }
  const first = Array.isArray(payload.data) ? payload.data[0] : undefined
  if (!first) return null

  const source = first.attributes ?? first
  const item = mapStrapiPostToNewsItem(first, source.id ?? first.id ?? 1)
  if (!item) return null

  return {
    ...item,
    author: source.author?.trim() || "",
    bodyBlocks: Array.isArray(source.body) ? source.body : [],
  }
}
