export const CONTACT_INFO = {
  organizationNameLines: [
    "Ban Liên lạc Cựu sinh viên",
    "Trường Đại học Đồng Nai",
  ],
  email: "lienlacuusinhviendhn@gmail.com",
  phone: "0921 116 060",
  address: "Số 9, Lê Quý Đôn, P. Tam Hiệp, Tỉnh Đồng Nai",
} as const

export const CONTACT_SOCIAL = {
  zalo: {
    label: "Zalo",
    url: "https://zalo.me/dnualumni",
    qrAlt: "Mã QR Zalo Ban Alumni DNU",
  },
  facebook: {
    label: "Facebook",
    url: "https://facebook.com/dnualumni",
    qrAlt: "Mã QR Facebook Ban Alumni DNU",
  },
} as const

/** URL nhúng Google Maps — thay bằng embed chính thức từ Google Maps nếu cần */
export const CONTACT_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Trường+Đại+học+Đồng+Nai&output=embed"
