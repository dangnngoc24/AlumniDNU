"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const inputClassName =
  "h-11 rounded-md border-gray-300 bg-white text-base placeholder:text-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactFormProps = {
  className?: string
  onSubmit?: (data: ContactFormData) => void
}

export type ContactFormData = {
  fullName: string
  phone: string
  address: string
  email: string
  subject: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

function FormField({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) {
  const errorId = error ? `${label.replace(/\s+/g, "-")}-error` : undefined

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-base font-normal text-gray-900">
        {label}
        {required && (
          <span className="ml-0.5 text-[#FC4C37]" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {error && (
        <p id={errorId} className="text-sm text-[#FC4C37]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function fieldClassName(hasError: boolean) {
  return cn(
    inputClassName,
    hasError && "border-[#FC4C37] focus:border-[#FC4C37] focus-visible:border-[#FC4C37]"
  )
}

export function ContactForm({ className, onSubmit }: ContactFormProps) {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<ContactFormErrors>({})

  function clearError(field: keyof ContactFormData) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validateForm(): ContactFormErrors {
    const next: ContactFormErrors = {}

    if (!fullName.trim()) {
      next.fullName = "Vui lòng nhập họ và tên"
    }

    if (!phone.trim()) {
      next.phone = "Vui lòng nhập số điện thoại"
    }

    if (!email.trim()) {
      next.email = "Vui lòng nhập email"
    } else if (!emailPattern.test(email.trim())) {
      next.email = "Email không hợp lệ"
    }

    if (!subject.trim()) {
      next.subject = "Vui lòng nhập chủ đề cần hỗ trợ"
    }

    if (!message.trim()) {
      next.message = "Vui lòng nhập nội dung"
    }

    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onSubmit?.({
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    })
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col", className)}
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
          <FormField label="Họ và tên" required error={errors.fullName}>
            <Input
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                clearError("fullName")
              }}
              placeholder="Nhập họ và tên"
              aria-invalid={Boolean(errors.fullName)}
              className={fieldClassName(Boolean(errors.fullName))}
            />
          </FormField>

          <FormField label="Số điện thoại" required error={errors.phone}>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                clearError("phone")
              }}
              placeholder="Nhập số điện thoại"
              aria-invalid={Boolean(errors.phone)}
              className={fieldClassName(Boolean(errors.phone))}
            />
          </FormField>

          <FormField label="Địa chỉ">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
              className={inputClassName}
            />
          </FormField>

          <FormField label="Email" required error={errors.email}>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clearError("email")
              }}
              placeholder="Nhập email"
              aria-invalid={Boolean(errors.email)}
              className={fieldClassName(Boolean(errors.email))}
            />
          </FormField>
        </div>

        <FormField label="Chủ đề cần hỗ trợ" required error={errors.subject}>
          <Input
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value)
              clearError("subject")
            }}
            placeholder="Ví dụ: Xin cấp lại bảng điểm, Đóng góp quỹ Alumni..."
            aria-invalid={Boolean(errors.subject)}
            className={fieldClassName(Boolean(errors.subject))}
          />
        </FormField>

        <FormField label="Nội dung" required error={errors.message}>
          <Textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              clearError("message")
            }}
            placeholder="Hãy mô tả chi tiết yêu cầu hoặc lời nhắn của bạn tại đây..."
            rows={5}
            aria-invalid={Boolean(errors.message)}
            className={cn(
              fieldClassName(Boolean(errors.message)),
              "min-h-[140px] resize-y py-3"
            )}
          />
        </FormField>
      </div>

      <div className="mt-14">
        <Button
          type="submit"
          className="w-full rounded-md bg-[#1D4393] py-4 text-base font-normal text-white hover:bg-dnu-navy/90 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          Gửi
        </Button>
      </div>
    </form>
  )
}
