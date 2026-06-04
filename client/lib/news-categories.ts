export const NEWS_FILTER_TABS = [
  { id: "all", label: "Tất cả" },
  { id: "hop-mat", label: "Họp mặt" },
  { id: "ky-niem", label: "Kỷ niệm" },
  { id: "ngay-hoi-viec-lam", label: "Ngày hội việc làm" },
  { id: "talkshow", label: "Talkshow" },
  { id: "mentoring", label: "Mentoring" },
  { id: "tri-an", label: "Tri ân" },
  { id: "ket-noi-doanh-nghiep", label: "Kết nối doanh nghiệp" },
] as const

export type NewsFilterTabId = (typeof NEWS_FILTER_TABS)[number]["id"]
