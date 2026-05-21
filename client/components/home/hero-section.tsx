import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/banner_alumni.jpg"
        alt="DNU Alumni Network - Kết nối hôm nay - Đồng hành tương lai"
        width={1920}
        height={520}
        priority
        className="h-auto w-full object-cover object-center"
        sizes="100vw"
      />
    </section>
  )
}
