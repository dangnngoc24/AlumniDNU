export type StoryArticle = {
  id: string
  slug: string
  title: string
  description: string
  publishedAt: string
  coverUrl: string
  coverAlt: string
  categoryLabel: string
}

export const learningExperienceArticles: StoryArticle[] = [
  {
    id: "le-1",
    slug: "kinh-nghiem-thuc-tap-nganh-cong-nghe",
    title: "Kinh nghiệm thực tập và định hướng nghề nghiệp ngành Công nghệ thông tin",
    description:
      "Cựu sinh viên chia sẻ hành trình từ thực tập đến trở thành kỹ sư phần mềm tại doanh nghiệp công nghệ trong nước.",
    publishedAt: "2025-09-08T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Sinh viên thực tập công nghệ",
    categoryLabel: "Kinh nghiệm học tập & lập nghiệp",
  },
  {
    id: "le-2",
    slug: "bi-quyet-can-bang-hoc-va-viec-lam",
    title: "Bí quyết cân bằng học tập và làm việc khi mới ra trường",
    description:
      "Những gợi ý thực tế giúp cựu sinh viên duy trì hiệu suất và phát triển kỹ năng mềm trong môi trường doanh nghiệp.",
    publishedAt: "2025-08-25T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Cân bằng học và làm",
    categoryLabel: "Kinh nghiệm học tập & lập nghiệp",
  },
  {
    id: "le-3",
    slug: "tu-sinh-vien-den-startup",
    title: "Từ sinh viên DNU đến đồng sáng lập startup giáo dục",
    description:
      "Câu chuyện khởi nghiệp từ ý tưởng môn học, vượt qua thử thách tài chính và xây dựng đội ngũ cốt lõi.",
    publishedAt: "2025-08-12T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Khởi nghiệp từ sinh viên",
    categoryLabel: "Kinh nghiệm học tập & lập nghiệp",
  },
]

export const overcomingStoriesArticles: StoryArticle[] = [
  {
    id: "os-1",
    slug: "vuot-kho-hoan-thanh-dai-hoc",
    title: "Vượt khó hoàn thành đại học khi phải vừa học vừa trang trải chi phí",
    description:
      "Hành trình làm thêm, tự học và nhận hỗ trợ từ thầy cô để đạt học bổng và tốt nghiệp đúng hạn.",
    publishedAt: "2025-09-08T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Vượt khó hoàn thành đại học",
    categoryLabel: "Câu chuyện vượt khó",
  },
  {
    id: "os-2",
    slug: "tu-mat-niem-tin-den-thanh-cong",
    title: "Từ mất niềm tin đến tìm lại đam mê và thành công trong ngành marketing",
    description:
      "Cựu sinh viên kể về giai đoạn trì hoãn, thay đổi ngành và quyết tâm theo đuổi con đường phù hợp.",
    publishedAt: "2025-08-20T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Tìm lại đam mê marketing",
    categoryLabel: "Câu chuyện vượt khó",
  },
  {
    id: "os-3",
    slug: "chien-thang-ban-than-moi-ngay",
    title: "Chiến thắng bản thân mỗi ngày: Học cách đối diện áp lực thi cử",
    description:
      "Chia sẻ phương pháp quản lý thời gian, tìm mentor và xây dựng thói quen học tập bền vững.",
    publishedAt: "2025-08-05T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Vượt qua áp lực thi cử",
    categoryLabel: "Câu chuyện vượt khó",
  },
]

export const alumniCommunityArticles: StoryArticle[] = [
  {
    id: "ac-1",
    slug: "hop-mat-cuu-sinh-vien-mien-nam",
    title: "Họp mặt cựu sinh viên miền Nam 2025: Kết nối – Chia sẻ – Phát triển",
    description:
      "Hơn 200 cựu sinh viên tham dự, chia sẻ cơ hội hợp tác và tri ân những đóng góp cho sự phát triển của trường.",
    publishedAt: "2025-09-08T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Họp mặt cựu sinh viên",
    categoryLabel: "Hoạt động cộng đồng alumni",
  },
  {
    id: "ac-2",
    slug: "chuong-trinh-mentor-cho-sinh-vien",
    title: "Chương trình mentor 1-1: Alumni đồng hành cùng sinh viên năm cuối",
    description:
      "Mạng lưới mentor từ nhiều ngành nghề hỗ trợ định hướng nghề nghiệp và kỹ năng phỏng vấn cho sinh viên.",
    publishedAt: "2025-08-22T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Chương trình mentor",
    categoryLabel: "Hoạt động cộng đồng alumni",
  },
  {
    id: "ac-3",
    slug: "quy-hoc-bong-alumni",
    title: "Quỹ học bổng Alumni trao tặng cho sinh viên có hoàn cảnh khó khăn",
    description:
      "Nguồn quỹ từ đóng góp cựu sinh viên giúp sinh viên yên tâm học tập và phát triển tài năng.",
    publishedAt: "2025-08-10T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Quỹ học bổng alumni",
    categoryLabel: "Hoạt động cộng đồng alumni",
  },
]

export const alumniHighlightsArticles: StoryArticle[] = [
  {
    id: "ah-1",
    slug: "workshop-ky-nang-lanh-dao",
    title: "Workshop kỹ năng lãnh đạo dành cho cựu sinh viên trẻ",
    description:
      "Diễn giả là các nhà quản lý DNU Alumni chia sẻ kinh nghiệm xây dựng đội ngũ và quản trị dự án.",
    publishedAt: "2025-09-08T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Workshop kỹ năng lãnh đạo",
    categoryLabel: "Kết nối & sự kiện",
  },
  {
    id: "ah-2",
    slug: "ngay-hoi-ket-noi-doanh-nghiep",
    title: "Ngày hội kết nối doanh nghiệp – Cơ hội việc làm cho cựu sinh viên",
    description:
      "Sự kiện quy tụ hàng chục doanh nghiệp đối tác tuyển dụng và tư vấn phát triển nghề nghiệp.",
    publishedAt: "2025-08-18T08:00:00.000Z",
    coverUrl: "/banner_alumni.jpg",
    coverAlt: "Ngày hội kết nối doanh nghiệp",
    categoryLabel: "Kết nối & sự kiện",
  },
  {
    id: "ah-3",
    slug: "gala-tri-an-alumni",
    title: "Gala tri ân Alumni: Vinh danh những đóng góp nổi bật cho DNU",
    description:
      "Chương trình vinh danh cựu sinh viên tiêu biểu trong lĩnh vực kinh doanh, giáo dục và cộng đồng.",
    publishedAt: "2025-08-01T08:00:00.000Z",
    coverUrl: "/about_banner.jpg",
    coverAlt: "Gala tri ân alumni",
    categoryLabel: "Kết nối & sự kiện",
  },
]
