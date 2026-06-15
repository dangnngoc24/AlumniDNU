import { NextResponse } from "next/server"
import {
  CONTRIBUTION_CATEGORIES,
  CONTRIBUTION_CONTENT_MAX_LENGTH,
  createContribution,
  type ContributionPayload,
} from "@/lib/contribute"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const REQUIRED_FIELDS: (keyof Pick<
  ContributionPayload,
  "fullName" | "phoneNumber" | "email" | "contribute_category"
>)[] = ["fullName", "phoneNumber", "email", "contribute_category"]

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContributionPayload>

    for (const field of REQUIRED_FIELDS) {
      const value = body[field]
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          { error: `Thiếu thông tin: ${field}` },
          { status: 400 }
        )
      }
    }

    const email = body.email!.trim()
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 })
    }

    const category = body.contribute_category!.trim()
    if (
      !CONTRIBUTION_CATEGORIES.includes(
        category as (typeof CONTRIBUTION_CATEGORIES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Hạng mục đóng góp không hợp lệ" },
        { status: 400 }
      )
    }

    const content = body.contribute_content?.trim() ?? ""
    if (content.length > CONTRIBUTION_CONTENT_MAX_LENGTH) {
      return NextResponse.json(
        {
          error: `Nội dung đóng góp tối đa ${CONTRIBUTION_CONTENT_MAX_LENGTH} ký tự`,
        },
        { status: 400 }
      )
    }

    const payload: ContributionPayload = {
      fullName: body.fullName!.trim(),
      phoneNumber: body.phoneNumber!.trim(),
      email,
      contribute_category: category as ContributionPayload["contribute_category"],
      ...(content ? { contribute_content: content } : {}),
    }

    const result = await createContribution(payload)

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 502 })
    }

    return NextResponse.json({ data: { success: true } })
  } catch {
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi gửi form." },
      { status: 500 }
    )
  }
}
