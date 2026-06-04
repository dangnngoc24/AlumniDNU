import { getStrapiURL } from "./utils"

/** Fallback khi Strapi chưa chạy — đồng bộ với server/.../alumni/schema.json */
export const ALUMNI_ENUM_FALLBACK = {
  courseCode: ["k12", "k13", "k14"],
  major: [
    "Công nghệ thông tin",
    "An toàn thông tin",
    "Quản trị kinh doanh",
    "Kế toán",
  ],
  faculty: [
    "Khoa Công nghệ thông tin",
    "Khoa Điện tử viễn thông",
    "Khoa Kinh tế và Quản trị",
  ],
} as const

export type AlumniEnumOptions = {
  courseCode: string[]
  major: string[]
  faculty: string[]
}

export type AlumniRegistrationPayload = {
  fullName: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  currentAddress: string
  courseCode: string
  major: string
  faculty: string
  company: string
  jobTitle: string
  industry: string
  socialLink: string
  isFeatured?: boolean
}

export function formatCourseCodeLabel(value: string): string {
  if (/^k\d+$/i.test(value)) {
    return value.toUpperCase()
  }
  return value
}

export type FeaturedAlumniCard = {
  id: string
  name: string
  cohort: string
  role: string
  avatar?: string | null
}

type StrapiAlumniEntry = {
  id?: number | string
  documentId?: string
  fullName?: string
  courseCode?: string
  major?: string
  jobTitle?: string
  company?: string
  isFeatured?: boolean
}

function mapStrapiAlumniToCard(entry: StrapiAlumniEntry): FeaturedAlumniCard | null {
  const id = String(entry.documentId ?? entry.id ?? "")
  const fullName = entry.fullName?.trim()
  const courseCode = entry.courseCode?.trim()
  const major = entry.major?.trim()
  const jobTitle = entry.jobTitle?.trim()
  const company = entry.company?.trim()

  if (!id || !fullName || !courseCode || !major || !jobTitle || !company) {
    return null
  }

  return {
    id,
    name: fullName,
    cohort: `${formatCourseCodeLabel(courseCode)} - ${major}`,
    role: `${jobTitle} - ${company}`,
    avatar: null,
  }
}

export async function fetchFeaturedAlumni(): Promise<FeaturedAlumniCard[]> {
  const baseUrl = getStrapiURL()
  const params = new URLSearchParams({
    "filters[isFeatured][$eq]": "true",
    "sort[0]": "createdAt:desc",
    "pagination[pageSize]": "50",
  })

  const headers: HeadersInit = {}
  const token = process.env.STRAPI_API_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}/api/alumnis?${params.toString()}`, {
    headers,
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    return []
  }

  const json = (await response.json()) as { data?: StrapiAlumniEntry[] }
  const list = Array.isArray(json.data) ? json.data : []

  return list
    .filter((entry) => entry.isFeatured === true)
    .map(mapStrapiAlumniToCard)
    .filter((card): card is FeaturedAlumniCard => card !== null)
}

export async function fetchAlumniEnumOptions(): Promise<AlumniEnumOptions> {
  const baseUrl = getStrapiURL()
  const response = await fetch(`${baseUrl}/api/alumnis/form-options`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    return { ...ALUMNI_ENUM_FALLBACK }
  }

  const json = (await response.json()) as { data?: AlumniEnumOptions }
  return {
    courseCode: json.data?.courseCode?.length
      ? json.data.courseCode
      : [...ALUMNI_ENUM_FALLBACK.courseCode],
    major: json.data?.major?.length
      ? json.data.major
      : [...ALUMNI_ENUM_FALLBACK.major],
    faculty: json.data?.faculty?.length
      ? json.data.faculty
      : [...ALUMNI_ENUM_FALLBACK.faculty],
  }
}

export async function createAlumniRegistration(
  payload: AlumniRegistrationPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const baseUrl = getStrapiURL()
  const token = process.env.STRAPI_API_TOKEN

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}/api/alumnis`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data: payload }),
  })

  if (!response.ok) {
    let message = "Không thể lưu thông tin đăng ký. Vui lòng thử lại sau."
    try {
      const errorBody = (await response.json()) as {
        error?: { message?: string }
      }
      if (errorBody.error?.message) {
        message = errorBody.error.message
      }
    } catch {
      // ignore parse errors
    }
    return { ok: false, message }
  }

  return { ok: true }
}
