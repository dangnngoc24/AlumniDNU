export type CareerJourneyArticle = {
  id: string
  slug: string
  title: string
  description: string
  publishedAt: string
  coverUrl: string
  coverAlt: string
  categoryLabel: string
}

export const careerJourneyFeatured: CareerJourneyArticle = {
  id: "featured",
  slug: "phuong-an-tuyen-sinh-2026",
  title:
    "Đại học Đồng Nai công bố phương án tuyển sinh 2026: Đổi mới – Linh hoạt – Hội nhập",
  description:
    "Trường Đại học Đồng Nai chính thức công bố phương án tuyển sinh năm 2026 với nhiều điểm mới, hướng tới đào tạo linh hoạt và hội nhập quốc tế, tạo cơ hội cho thí sinh đa dạng hơn.",
  publishedAt: "2025-09-08T08:00:00.000Z",
  coverUrl: "/banner_alumni.jpg",
  coverAlt: "Sinh viên Đại học Đồng Nai",
  categoryLabel: "Tuyển sinh",
}

export const careerJourneySidebar: CareerJourneyArticle[] = [
  {
    id: "1",
    slug: "mo-dang-ky-xet-tuyen-som",
    title: "Mở đăng ký xét tuyển sớm chương trình đại học chính quy 2026",
    description:
      "Nhà trường mở cổng đăng ký xét tuyển sớm, hỗ trợ thí sinh tra cứu chỉ tiêu và hướng dẫn hồ sơ trực tuyến.",
    publishedAt: "2025-09-05T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Đăng ký xét tuyển",
    categoryLabel: "Tuyển sinh",
  },
  {
    id: "2",
    slug: "huong-dan-ho-so-truc-tuyen",
    title: "Hướng dẫn nộp hồ sơ trực tuyến và tra cứu kết quả xét tuyển",
    description:
      "Ban tuyển sinh hướng dẫn chi tiết quy trình nộp hồ sơ, thanh toán lệ phí và tra cứu kết quả trên cổng thông tin.",
    publishedAt: "2025-08-28T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Hướng dẫn hồ sơ trực tuyến",
    categoryLabel: "Tuyển sinh",
  },
  {
    id: "3",
    slug: "ngay-hoi-tu-van-tuyen-sinh",
    title: "Ngày hội tư vấn tuyển sinh 2026 tại Đại học Đồng Nai",
    description:
      "Sự kiện kết nối thí sinh, phụ huynh với các khoa – ngành, cơ hội học bổng và chương trình đào tạo mới.",
    publishedAt: "2025-08-20T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Ngày hội tư vấn tuyển sinh",
    categoryLabel: "Tuyển sinh",
  },
]
