"use client"

import { Clock, Eye, Printer } from "lucide-react"
import { formatArticleMetaDate, formatViewCount } from "@/lib/utils"

type NewsArticleMetaBarProps = {
  publishedAt: string
  viewCount?: number
  printTargetId?: string
}

export function NewsArticleMetaBar({
  publishedAt,
  viewCount = 0,
  printTargetId = "news-article-print-root",
}: NewsArticleMetaBarProps) {
  function handlePrint() {
    const printRoot = document.getElementById(printTargetId)
    if (!printRoot) return

    const printWindow = window.open("", "_blank", "noopener,noreferrer")
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="vi">
        <head>
          <meta charset="utf-8" />
          <title>In bài viết</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 32px;
              font-family: "Segoe UI", Arial, sans-serif;
              font-size: 16px;
              line-height: 1.75;
              color: #1f2937;
            }
            h1, h2, h3 { line-height: 1.35; margin: 1em 0 0.5em; }
            p { margin: 0 0 1em; }
            img { max-width: 100%; height: auto; }
            blockquote {
              margin: 1em 0;
              padding-left: 1em;
              border-left: 4px solid #1d4393;
              font-style: italic;
            }
            ul, ol { margin: 0 0 1em; padding-left: 1.5em; }
          </style>
        </head>
        <body>${printRoot.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-2 text-base font-semibold text-[#1D4393] transition-colors hover:text-[#173673]"
      >
        <Printer className="size-5 shrink-0 stroke-[1.75]" aria-hidden />
        In bài viết
      </button>

      <div className="flex flex-wrap items-center gap-3 text-base text-gray-500">
        <span className="inline-flex items-center gap-2">
          <Clock className="size-5 shrink-0 stroke-[1.75]" aria-hidden />
          <time dateTime={publishedAt}>{formatArticleMetaDate(publishedAt)}</time>
        </span>
        <span className="hidden h-4 w-px bg-gray-300 sm:inline-block" aria-hidden />
        <span className="inline-flex items-center gap-2">
          <Eye className="size-5 shrink-0 stroke-[1.75]" aria-hidden />
          <span>{formatViewCount(viewCount)}</span>
        </span>
      </div>
    </div>
  )
}
