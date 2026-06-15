"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  CONTRIBUTION_CATEGORIES,
  CONTRIBUTION_CONTENT_MAX_LENGTH,
} from "@/lib/contribute"
import { cn } from "@/lib/utils"

const inputClassName =
  "h-11 rounded-md border-gray-300 bg-white text-base placeholder:text-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContributionFormProps = {
  className?: string
  onSubmit?: (data: ContributionFormData) => void
}

export type ContributionFormData = {
  fullName: string
  phone: string
  email: string
  category: string
  content: string
}

type ContributionFormErrors = Partial<Record<keyof ContributionFormData, string>>

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
    hasError &&
      "border-[#FC4C37] focus:border-[#FC4C37] focus-visible:border-[#FC4C37]"
  )
}

export function ContributionForm({ className, onSubmit }: ContributionFormProps) {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState<ContributionFormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function clearError(field: keyof ContributionFormData) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function validateForm(): ContributionFormErrors {
    const next: ContributionFormErrors = {}

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

    if (!category.trim()) {
      next.category = "Vui lòng chọn hạng mục đóng góp"
    }

    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const formData: ContributionFormData = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      category: category.trim(),
      content: content.trim(),
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phone,
          email: formData.email,
          contribute_category: formData.category,
          contribute_content: formData.content,
        }),
      })

      const json = (await response.json()) as { error?: string }

      if (!response.ok) {
        setSubmitError(json.error ?? "Gửi form thất bại. Vui lòng thử lại.")
        return
      }

      onSubmit?.(formData)
      setFullName("")
      setPhone("")
      setEmail("")
      setCategory("")
      setContent("")
      setErrors({})
      setSubmitted(true)
    } catch {
      setSubmitError("Không kết nối được máy chủ. Vui lòng thử lại sau.")
    } finally {
      setSubmitting(false)
    }
  }

  function handleContentChange(value: string) {
    if (value.length <= CONTRIBUTION_CONTENT_MAX_LENGTH) {
      setContent(value)
    }
  }

  if (submitted) {
    return (
      <div className={cn("py-10 text-center", className)}>
        <p className="text-xl font-bold text-dnu-blue">
          Cảm ơn bạn đã gửi đóng góp!
        </p>
        <p className="mt-3 text-base text-gray-600">
          Ban Alumni sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>
        <Button
          type="button"
          className="mt-8 rounded-md bg-[#1D4393] px-8 py-3 text-base font-normal text-white hover:bg-dnu-navy/90"
          onClick={() => {
            setFullName("")
            setPhone("")
            setEmail("")
            setCategory("")
            setContent("")
            setErrors({})
            setSubmitted(false)
          }}
        >
          Gửi đóng góp khác
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col", className)}
    >
      <div className="flex flex-col gap-6">
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

        <FormField label="Email" required error={errors.email}>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError("email")
            }}
            placeholder="Nhập địa chỉ email"
            aria-invalid={Boolean(errors.email)}
            className={fieldClassName(Boolean(errors.email))}
          />
        </FormField>

        <FormField
          label="Chọn hạng mục đóng góp"
          required
          error={errors.category}
        >
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value)
              clearError("category")
            }}
          >
            <SelectTrigger
              aria-invalid={Boolean(errors.category)}
              className={cn(
                fieldClassName(Boolean(errors.category)),
                "h-11 text-base data-[placeholder]:text-gray-300"
              )}
            >
              <SelectValue placeholder="Chọn hạng mục đóng góp" />
            </SelectTrigger>
            <SelectContent>
              {CONTRIBUTION_CATEGORIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Nội dung đóng góp">
          <div className="relative">
            <Textarea
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Hãy mô tả chi tiết yêu cầu hoặc lời nhắn của bạn tại đây..."
              rows={5}
              maxLength={CONTRIBUTION_CONTENT_MAX_LENGTH}
              className={cn(
                inputClassName,
                "min-h-[140px] resize-none py-3 pr-16"
              )}
            />
            <span
              className="pointer-events-none absolute bottom-3 right-3 text-sm text-gray-400"
              aria-live="polite"
            >
              {content.length}/{CONTRIBUTION_CONTENT_MAX_LENGTH}
            </span>
          </div>
        </FormField>
      </div>

      {submitError && (
        <p className="mt-6 text-sm text-[#FC4C37]" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-10">
        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-[#1D4393] py-4 text-base font-normal text-white hover:bg-dnu-navy/90 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
        >
          {submitting ? "Đang gửi..." : "Gửi đóng góp"}
        </Button>
      </div>
    </form>
  )
}
