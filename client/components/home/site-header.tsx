"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react"
import type { BreadcrumbItem } from "@/components/layout/breadcrumb-bar"
import { BreadcrumbBar } from "@/components/layout/breadcrumb-bar"
import { cn } from "@/lib/utils"
import { DnuLogo } from "./dnu-logo"
import { PageContainer } from "./page-container"

type SiteHeaderProps = {
  breadcrumbItems?: BreadcrumbItem[]
  sticky?: boolean
}

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Đăng ký thông tin Alumni", href: "/dang-ky" },
  { label: "Alumni Stories", href: "#stories" },
  { label: "Tin tức & Sự kiện", href: "#tin-tuc" },
  { label: "Việc làm & Kết nối nghề nghiệp", href: "#viec-lam" },
  { label: "Đồng hành cùng DNU", href: "#dong-hanh" },
  { label: "Thư viện ảnh", href: "#thu-vien" },
  { label: "Liên hệ", href: "#lien-he" },
] as const

export function SiteHeader({
  breadcrumbItems,
  sticky = true,
}: SiteHeaderProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        "z-50 bg-[#F4F4F4] shadow-sm",
        sticky && "sticky top-0"
      )}
    >
      <div className="border-b border-gray-200">
        <PageContainer>
          <div className="flex min-h-[52px] items-center justify-between gap-4 py-4">
            <Link href="/" aria-label="DNU Alumni - Trang chủ" className="shrink-0">
              <DnuLogo priority />
            </Link>

            <div className="hidden items-center gap-4 text-base text-dnu-blue font-normal lg:flex">
              <a
                href="tel:0921116060"
                className="flex items-center gap-2 transition-colors hover:text-[#EB3C27]"
              >
                <Phone className="size-6 shrink-0" />
                0921 116 060
              </a>
              <span className="text-dnu-blue/40">|</span>
              <a
                href="mailto:lienlacuusinhviendhn@gmail.com"
                className="flex items-center gap-2 transition-colors hover:text-[#EB3C27]"
              >
                <Mail className="size-6 shrink-0" />
                lienlacuusinhviendhn@gmail.com
              </a>
              {/* <span className="text-gray-300">|</span>
              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-dnu-blue"
              >
                <span className="text-base leading-none">🇻🇳</span>
                Tiếng Việt
                <ChevronDown className="h-3.5 w-3.5" />
              </button> */}
            </div>

            <button
              type="button"
              className="rounded p-2 text-dnu-navy lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label="Mở menu"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pb-2 text-xs text-dnu-blue lg:hidden">
            <a
              href="tel:0921116060"
              className="flex items-center gap-1 transition-colors hover:text-[#EB3C27]"
            >
              <Phone className="h-3 w-3" />
              0921 116 060
            </a>
            <span className="text-dnu-blue/40">|</span>
            <a
              href="mailto:lienlacuusinhviendhn@gmail.com"
              className="truncate transition-colors hover:text-[#EB3C27]"
            >
              lienlacuusinhviendhn@gmail.com
            </a>
          </div>
        </PageContainer>
      </div>

      <nav className="bg-dnu-navy text-white">
        <PageContainer>
          <ul className="hidden flex-wrap items-center py-7 text-base font-semibold xl:flex justify-between">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap transition-colors hover:text-[#FC4C37]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {mobileOpen && (
            <ul className="flex flex-col gap-1 border-t border-white/10 py-3 text-sm xl:hidden">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-2 py-2 hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </PageContainer>
      </nav>

      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <BreadcrumbBar items={breadcrumbItems} />
      )}
    </header>
  )
}
