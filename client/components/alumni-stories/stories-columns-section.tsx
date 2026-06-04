import {
  learningExperienceArticles,
  overcomingStoriesArticles,
} from "@/lib/stories-columns-data"
import { StoriesColumnsGrid } from "./stories-columns-grid"

export function StoriesColumnsSection() {
  return (
    <section className="bg-[#EFF7FF] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1420px]">
        <StoriesColumnsGrid
          columns={[
            {
              title: "Kinh Nghiệm",
              titleHighlight: "Học Tập & Lập Nghiệp",
              viewAllHref: "/tin-tuc",
              articles: learningExperienceArticles,
            },
            {
              title: "Câu Chuyện",
              titleHighlight: "Vượt Khó",
              viewAllHref: "/tin-tuc",
              articles: overcomingStoriesArticles,
            },
          ]}
        />
      </div>
    </section>
  )
}
