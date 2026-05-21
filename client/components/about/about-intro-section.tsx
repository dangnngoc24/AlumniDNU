import Image from "next/image"
import { PageContainer } from "@/components/home/page-container"

export function AboutIntroSection() {
  return (
    <section className="py-12 sm:pt-10 sm:pb-[60px]">
      <PageContainer>
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col py-8 gap-5 border-[#378DFA] border-l-4 rounded-2xl px-8 shadow-lg">
            <h1 className="flex w-full items-center justify-center text-center text-2xl font-bold text-gray-900 sm:text-[28px]">
              Giới Thiệu
            </h1>
            <p className="text-base font-normal text-justify text-gray-900">
              Cựu sinh viên Trường Đại học Đồng Nai là một phần quan trọng trong lịch sử, 
              uy tín và sự phát triển của Nhà trường. Chuyên mục Alumni DNU được xây dựng 
              nhằm kết nối các thế hệ sinh viên, chia sẻ thông tin nghề nghiệp, lan tỏa 
              những câu chuyện thành công và tạo cầu nối giữa cựu sinh viên – sinh viên – 
              Nhà trường – doanh nghiệp.
            </p>
          </div>
          <div className="flex items-center justify-center ">
            <Image
              src="/about_banner.jpg"
              alt="Cựu sinh viên Đại học Đồng Nai"
              width={580}
              height={326}
              className="aspect-[580/326] h-auto w-full max-w-[580px] object-cover"
              sizes="(max-width: 1024px) 100vw, 580px"
              priority
            />
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
