import { NextResponse } from "next/server"
import {
  createAlumniRegistration,
  type AlumniRegistrationPayload,
} from "@/lib/alumni"

const REQUIRED_FIELDS: (keyof AlumniRegistrationPayload)[] = [
  "fullName",
  "dateOfBirth",
  "phoneNumber",
  "email",
  "currentAddress",
  "courseCode",
  "major",
  "faculty",
  "company",
  "jobTitle",
  "industry",
  "socialLink",
]

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<AlumniRegistrationPayload>

    for (const field of REQUIRED_FIELDS) {
      const value = body[field]
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          { error: `Thiếu thông tin: ${field}` },
          { status: 400 }
        )
      }
    }

    const payload: AlumniRegistrationPayload = {
      fullName: body.fullName!.trim(),
      dateOfBirth: body.dateOfBirth!.trim(),
      phoneNumber: body.phoneNumber!.trim(),
      email: body.email!.trim(),
      currentAddress: body.currentAddress!.trim(),
      courseCode: body.courseCode!.trim(),
      major: body.major!.trim(),
      faculty: body.faculty!.trim(),
      company: body.company!.trim(),
      jobTitle: body.jobTitle!.trim(),
      industry: body.industry!.trim(),
      socialLink: body.socialLink!.trim(),
      isFeatured: Boolean(body.isFeatured),
    }

    const result = await createAlumniRegistration(payload)

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
