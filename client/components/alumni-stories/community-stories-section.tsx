import {
  alumniCommunityArticles,
  alumniHighlightsArticles,
} from "@/lib/stories-columns-data"
import { StoriesColumnsGrid } from "./stories-columns-grid"

export function CommunityStoriesSection() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1420px]">
        <StoriesColumnsGrid
          columns={[
            {
              title: "Hoạt Động",
              titleHighlight: "Cộng Đồng Alumni",
              viewAllHref: "/tin-tuc",
              articles: alumniCommunityArticles,
            },
            {
              title: "Kết Nối",
              titleHighlight: "& Sự Kiện",
              viewAllHref: "/tin-tuc",
              articles: alumniHighlightsArticles,
            },
          ]}
        />
      </div>
    </section>
  )
}
