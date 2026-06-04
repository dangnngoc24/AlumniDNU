import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string | null;
  className?: string;
  [key: string]: string | number | boolean | undefined | null;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return <Image src={imageUrl} alt={alt || "No alt text provided."} className={className} {...rest} />;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL() + url;
}

/** URL same-origin để stream/embed file từ Strapi (PDF, video, audio) */
export function getStrapiMediaProxyUrl(url: string | null) {
  if (url == null) return null;

  const mediaUrl = getStrapiMedia(url);
  if (!mediaUrl) return null;

  try {
    const parsed = mediaUrl.startsWith("http")
      ? new URL(mediaUrl)
      : new URL(mediaUrl, getStrapiURL());

    if (parsed.pathname.startsWith("/uploads/")) {
      return `/api/strapi-media?path=${encodeURIComponent(parsed.pathname)}`;
    }
  } catch {
    return mediaUrl;
  }

  return mediaUrl;
}

export function getStrapiPdfPreviewUrl(url: string | null) {
  return getStrapiMediaProxyUrl(url);
}