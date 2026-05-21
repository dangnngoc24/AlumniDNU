import { PageContainer } from "@/components/home/page-container"

export function AboutQuoteSection() {
  return (
    <section className="bg-[#EFF7FF]">
      <PageContainer>
        <div className="mx-auto max-w-[1120px] py-[100px] text-center">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="bg-[#378DFA] h-[1.75px] flex-1"></div>
            <div className="mx-6">
              <svg
                className="mx-auto block h-[39px] w-[43px]"
                viewBox="0 0 43 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M28.8711 38.4C37.9733 29.5823 42.24 20.1956 42.24 11.8045C42.24 4.97781 37.12 2.28882e-05 32 2.28882e-05C27.4489 2.28882e-05 23.7511 3.6978 23.7511 8.24891C23.7511 14.08 28.0178 17.0667 34.2755 17.0667C34.2755 24.0356 32.1422 28.16 25.4578 34.9867L28.8711 38.4ZM5.11999 38.4C14.2222 29.5823 18.4889 20.1956 18.4889 11.8045C18.4889 4.97781 13.3689 2.28882e-05 8.24887 2.28882e-05C3.69777 2.28882e-05 -1.52588e-05 3.6978 -1.52588e-05 8.24891C-1.52588e-05 14.08 4.26665 17.0667 10.5244 17.0667C10.5244 24.0356 8.3911 28.16 1.70665 34.9867L5.11999 38.4Z"
                  fill="#378DFA"
                />
              </svg>
            </div>
            <div className="bg-[#378DFA] h-[1.75px] flex-1"></div>
          </div>
          <blockquote className="text-[28px] font-bold text-gray-900 my-6 italic">
            "Sự thành công của cựu sinh viên chính là thước đo chính xác nhất cho chất lượng đào tạo 
            và uy tín của Đại học Đồng Nai trên bản đồ giáo dục Việt Nam."
          </blockquote>
          <p className=" text-lg font-semibold text-[#378DFA]">
            Ban Giám hiệu Nhà trường
          </p>
        </div>
      </PageContainer>
    </section>
  )
}
