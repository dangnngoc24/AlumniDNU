import { getStrapiURL } from "@/lib/utils"

function resolveUploadPath(raw: string | null): string | null {
  if (!raw?.trim()) return null

  const value = raw.trim()
  if (value.startsWith("/uploads/")) return value

  try {
    const base = getStrapiURL()
    const url = value.startsWith("http") ? new URL(value) : new URL(value, base)
    const baseHost = new URL(base).host
    if (url.host !== baseHost) return null
    if (!url.pathname.startsWith("/uploads/")) return null
    return url.pathname
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const path = resolveUploadPath(new URL(request.url).searchParams.get("path"))
  if (!path) {
    return new Response("Invalid path", { status: 400 })
  }

  const token = process.env.STRAPI_API_TOKEN
  const upstreamHeaders: HeadersInit = {}
  if (token) {
    upstreamHeaders.Authorization = `Bearer ${token}`
  }

  const range = request.headers.get("range")
  if (range) {
    upstreamHeaders.Range = range
  }

  const upstream = await fetch(`${getStrapiURL()}${path}`, {
    headers: upstreamHeaders,
  })

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("File not found", { status: upstream.status })
  }

  const contentType =
    upstream.headers.get("content-type")?.split(";")[0]?.trim() ||
    "application/octet-stream"

  const responseHeaders = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": "inline",
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    "Accept-Ranges": "bytes",
  })

  const contentRange = upstream.headers.get("content-range")
  const contentLength = upstream.headers.get("content-length")
  if (contentRange) responseHeaders.set("Content-Range", contentRange)
  if (contentLength) responseHeaders.set("Content-Length", contentLength)

  return new Response(upstream.body, {
    status: upstream.status === 206 ? 206 : 200,
    headers: responseHeaders,
  })
}
