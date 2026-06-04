import { NextResponse } from "next/server"
import {
  buildNewsFilterTabs,
  fetchNewsListItemsFromStrapi,
} from "@/lib/news-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const posts = await fetchNewsListItemsFromStrapi()
    const tabs = buildNewsFilterTabs(posts)
    return NextResponse.json(
      { data: { posts, tabs } },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    )
  } catch {
    return NextResponse.json(
      { error: "Không tải được dữ liệu tin tức." },
      { status: 500 }
    )
  }
}
