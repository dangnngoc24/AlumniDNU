import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { SiteFooter } from "@/components/layout/site-footer"

const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "DNU Alumni Network",
  description: "Kết nối hôm nay - Đồng hành tương lai",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={openSans.variable}>
      <body className={`${openSans.className} flex min-h-screen flex-col font-sans antialiased`}>
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
