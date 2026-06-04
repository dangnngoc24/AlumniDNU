import { NextResponse } from "next/server"
import { fetchFeaturedAlumni } from "@/lib/alumni"

export async function GET() {
  try {
    const data = await fetchFeaturedAlumni()
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { error: "Không tải được danh sách cựu sinh viên tiêu biểu." },
      { status: 500 }
    )
  }
}
