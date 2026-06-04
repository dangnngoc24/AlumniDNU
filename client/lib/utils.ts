export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day} tháng ${month}, ${year}`
}

export function formatArticleMetaDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export function formatViewCount(count: number): string {
  return new Intl.NumberFormat("vi-VN").format(count)
}

import { twMerge } from "tailwind-merge"

export function cn(...classes: (string | boolean | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "))
}

export function getStrapiURL() {
  return process.env.STRAPI_BASE_URL ?? "http://localhost:1337";
}
