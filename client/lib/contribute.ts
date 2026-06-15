import { getStrapiURL } from "./utils"

/** Đồng bộ với server/src/api/contribute/content-types/contribute/schema.json */
export const CONTRIBUTION_CATEGORIES = [
  "Học bổng cho sinh viên",
  "Tài trợ thiết bị học tập",
  "Hỗ trợ thực tập – việc làm",
  "Tham gia giảng dạy chuyên đề",
  "Mentoring cho sinh viên",
  "Đóng góp quỹ phát triển",
] as const

export type ContributionCategory = (typeof CONTRIBUTION_CATEGORIES)[number]

export const CONTRIBUTION_CONTENT_MAX_LENGTH = 100

export type ContributionPayload = {
  fullName: string
  phoneNumber: string
  email: string
  contribute_category: ContributionCategory
  contribute_content?: string
}

export async function createContribution(
  payload: ContributionPayload
): Promise<{ ok: true } | { ok: false; message: string }> {
  const baseUrl = getStrapiURL()
  const token = process.env.STRAPI_API_TOKEN

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}/api/contributes`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data: payload }),
  })

  if (!response.ok) {
    let message = "Không thể lưu thông tin đóng góp. Vui lòng thử lại sau."
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
