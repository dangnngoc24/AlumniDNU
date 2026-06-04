import { cn } from "@/lib/utils"
import { ContactForm } from "./contact-form"

type ContactFormCardProps = {
  className?: string
}

export function ContactFormCard({ className }: ContactFormCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl bg-[#EFF7FF] px-[60px] py-10",
        className
      )}
      aria-labelledby="contact-form-heading"
    >
      <div className="mb-10 space-y-2 text-center">
        <h2
          id="contact-form-heading"
          className="text-[22px] font-bold leading-snug"
        >
          Gửi Lời Nhắn Cho Chúng Tôi
        </h2>
        <p className="text-sm text-gray-600">
          Nếu bạn có bất kỳ thắc mắc nào, hãy điền vào mẫu bên dưới. Chúng tôi sẽ phản hồi sớm nhất có thể.
        </p>
      </div>

      <div className="rounded-xl bg-white p-8">
        <ContactForm />
      </div>
    </section>
  )
}
