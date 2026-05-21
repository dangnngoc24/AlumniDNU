import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Globe, Mail, MapPin, Phone } from "lucide-react"
import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon,
} from "./footer-social-icons"

const FOOTER_LINKS = {
  tuyenSinh: [
    { label: "VLVH - Văn bằng 2", href: "#" },
    { label: "Đại học - Cao đẳng", href: "#" },
    { label: "Sau đại học", href: "#" },
  ],
  viecLam: [
    { label: "Giới thiệu việc làm", href: "#" },
    { label: "Hợp tác doanh nghiệp", href: "#" },
  ],
  congDong: [
    { label: "Tiếp sức mùa thi", href: "#" },
    { label: "Hiến máu nhân đạo", href: "#" },
    { label: "Mùa hè xanh", href: "#" },
  ],
} as const

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/dnpu.edu/",
    label: "Facebook",
    icon: FacebookIcon,
  },
  {
    href: "https://zalo.me/0989773579",
    label: "Zalo",
    icon: ZaloIcon,
  },
  { href: "#", label: "YouTube", icon: YoutubeIcon },
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "TikTok", icon: TiktokIcon },
] as const

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div className="flex flex-col items-start gap-3 text-left">
      <h3 className="font-bold uppercase text-dnu-blue">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-base font-normal text-dnu-blue hover:text-[#EB3C27] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: typeof Phone
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-3 text-base font-normal text-dnu-blue">
      <Icon className="size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer>
      <div className="bg-gray-100 py-[52px]">
        <div className="mx-auto max-w-[1420px]">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Logo & mạng xã hội */}
            <div className="lg:flex-[2]">
              <div className="flex flex-col items-start gap-4">
                <Image
                  src="/logo_alumni.png"
                  alt="DNU University"
                  width={200}
                  height={60}
                  className="h-[60px] w-auto object-contain"
                />
                <p className="text-base font-bold text-dnu-blue">
                  TRƯỜNG ĐẠI HỌC ĐỒNG NAI
                </p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-5 pt-8 text-[27px] text-dnu-blue">
                  {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="transition-opacity hover:opacity-80"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
                <p className="text-base font-normal text-dnu-blue">
                  Chịu trách nhiệm nội dung: TS. Đặng Anh Tuấn
                </p>
              </div>
            </div>

            {/* Liên hệ & menu */}
            <div className="flex flex-col gap-10 lg:flex-[5] lg:pl-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
                <div className="flex flex-col gap-3">
                  <ContactRow icon={Phone}>0989.773.579</ContactRow>
                  <ContactRow icon={Mail}>
                    lienhetuyensinhdhdn@gmail.com
                  </ContactRow>
                </div>
                <div className="flex flex-col gap-3">
                  <ContactRow icon={MapPin}>
                    Số 9, Lê Quý Đôn, P. Tam Hiệp, Thành phố Đồng Nai.
                  </ContactRow>
                  <ContactRow icon={Globe}>
                    <a
                      href="https://dongnaiuni.edu.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#EB3C27] transition-colors"
                    >
                      https://dongnaiuni.edu.vn
                    </a>
                  </ContactRow>
                </div>
              </div>

              <div className="grid grid-cols-1 justify-between gap-6 md:grid-cols-3 lg:gap-10">
                <FooterLinkColumn
                  title="TUYỂN SINH"
                  links={FOOTER_LINKS.tuyenSinh}
                />
                <FooterLinkColumn
                  title="THỰC TẬP - VIỆC LÀM"
                  links={FOOTER_LINKS.viecLam}
                />
                <FooterLinkColumn
                  title="CỘNG ĐỒNG"
                  links={FOOTER_LINKS.congDong}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E9E9E9] py-4">
        <div className="mx-auto max-w-[1400px] px-4">
          <p className="text-center text-base font-semibold text-[#1E4294]">
            © 2025 TRƯỜNG ĐẠI HỌC ĐỒNG NAI. All rights reserved. Design by
            Cyberuni
          </p>
        </div>
      </div>
    </footer>
  )
}
