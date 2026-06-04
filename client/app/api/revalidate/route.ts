import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { slugifyAlbumTitle } from "@/lib/gallery-data"

type StrapiWebhookBody = {
  event?: string
  model?: string
  uid?: string
  entry?: {
    slug?: string
    title?: string
    documentId?: string
  }
}

function resolveAlbumDetailPath(entry?: StrapiWebhookBody["entry"]): string | null {
  if (!entry) return null
  const slug = entry.slug?.trim()
  if (slug) return `/thu-vien-anh/${slug}`
  const title = entry.title?.trim()
  if (title) {
    const fromTitle = slugifyAlbumTitle(title)
    if (fromTitle) return `/thu-vien-anh/${fromTitle}`
  }
  const documentId = entry.documentId?.trim()
  if (documentId) return `/thu-vien-anh/${documentId}`
  return null
}

function isAlbumWebhook(body: StrapiWebhookBody): boolean {
  const model = (body.model ?? body.uid ?? "").toLowerCase()
  return model.includes("album")
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const expected = process.env.REVALIDATE_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  let body: StrapiWebhookBody = {}
  try {
    body = (await request.json()) as StrapiWebhookBody
  } catch {
    body = {}
  }

  const postSlug = body.entry?.slug?.trim()
  const albumPath = isAlbumWebhook(body) ? resolveAlbumDetailPath(body.entry) : null

  const paths = new Set<string>(["/tin-tuc", "/thu-vien-anh", "/api/news"])

  revalidatePath("/tin-tuc", "layout")
  revalidatePath("/thu-vien-anh", "layout")

  if (postSlug) {
    paths.add(`/tin-tuc/${postSlug}`)
    revalidatePath(`/tin-tuc/${postSlug}`)
  }

  if (albumPath) {
    paths.add(albumPath)
    revalidatePath(albumPath)
  }

  revalidatePath("/api/news")

  return NextResponse.json({
    revalidated: true,
    paths: [...paths],
  })
}
