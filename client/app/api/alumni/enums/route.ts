import { NextResponse } from "next/server"
import { fetchAlumniEnumOptions } from "@/lib/alumni"

export async function GET() {
  try {
    const data = await fetchAlumniEnumOptions()
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { error: "Không tải được danh sách lựa chọn." },
      { status: 500 }
    )
  }
}
