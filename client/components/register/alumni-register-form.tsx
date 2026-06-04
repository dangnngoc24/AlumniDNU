"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CareerSectionIcon,
  EducationSectionIcon,
  PersonalInfoSectionIcon,
} from "./register-icons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ALUMNI_ENUM_FALLBACK,
  formatCourseCodeLabel,
  type AlumniEnumOptions,
} from "@/lib/alumni"
import { cn } from "@/lib/utils"
import {
  RegisterFormField,
  registerFieldClassName,
} from "./register-form-field"
import { RegisterFormSection } from "./register-form-section"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Chấp nhận https://... hoặc facebook.com/... (tự thêm https:// khi kiểm tra) */
function isValidHttpUrl(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false

  try {
    const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const url = new URL(href)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

type FormValues = {
  fullName: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  currentAddress: string
  courseCode: string
  major: string
  faculty: string
  company: string
  jobTitle: string
  industry: string
  socialLink: string
}

type FormFieldKey = keyof FormValues

type FormErrors = Partial<Record<FormFieldKey, string>>

const INITIAL_VALUES: FormValues = {
  fullName: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  currentAddress: "",
  courseCode: "",
  major: "",
  faculty: "",
  company: "",
  jobTitle: "",
  industry: "",
  socialLink: "",
}

function validateForm(
  values: FormValues,
  enumOptions: AlumniEnumOptions
): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ và tên"
  }

  if (!values.dateOfBirth.trim()) {
    errors.dateOfBirth = "Vui lòng chọn ngày sinh"
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Vui lòng nhập số điện thoại"
  }

  if (!values.email.trim()) {
    errors.email = "Vui lòng nhập email"
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Email không hợp lệ"
  }

  if (!values.currentAddress.trim()) {
    errors.currentAddress = "Vui lòng nhập địa chỉ hiện nay"
  }

  if (!values.courseCode) {
    errors.courseCode = "Vui lòng chọn khóa học"
  } else if (!enumOptions.courseCode.includes(values.courseCode)) {
    errors.courseCode = "Khóa học không hợp lệ"
  }

  if (!values.major) {
    errors.major = "Vui lòng chọn ngành học"
  } else if (!enumOptions.major.includes(values.major)) {
    errors.major = "Ngành học không hợp lệ"
  }

  if (!values.faculty) {
    errors.faculty = "Vui lòng chọn khoa / đơn vị đào tạo"
  } else if (!enumOptions.faculty.includes(values.faculty)) {
    errors.faculty = "Khoa / đơn vị đào tạo không hợp lệ"
  }

  if (!values.company.trim()) {
    errors.company = "Vui lòng nhập đơn vị công tác"
  }

  if (!values.jobTitle.trim()) {
    errors.jobTitle = "Vui lòng nhập chức vụ hiện tại"
  }

  if (!values.industry.trim()) {
    errors.industry = "Vui lòng nhập lĩnh vực nghề nghiệp"
  }

  if (!values.socialLink.trim()) {
    errors.socialLink = "Vui lòng nhập link Facebook / LinkedIn"
  } else if (!isValidHttpUrl(values.socialLink)) {
    errors.socialLink =
      "Link không hợp lệ. Ví dụ: https://facebook.com/ten-ban hoặc https://linkedin.com/in/ten-ban"
  }

  return errors
}

export function AlumniRegisterForm() {
  const [enumOptions, setEnumOptions] = useState<AlumniEnumOptions>({
    courseCode: [...ALUMNI_ENUM_FALLBACK.courseCode],
    major: [...ALUMNI_ENUM_FALLBACK.major],
    faculty: [...ALUMNI_ENUM_FALLBACK.faculty],
  })
  const [enumsLoading, setEnumsLoading] = useState(true)

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [wantConnect, setWantConnect] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<FormFieldKey, boolean>>>(
    {}
  )

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadEnums() {
      try {
        const response = await fetch("/api/alumni/enums")
        if (!response.ok) return
        const json = (await response.json()) as { data?: AlumniEnumOptions }
        if (!cancelled && json.data) {
          setEnumOptions(json.data)
        }
      } catch {
        // Giữ fallback đã khởi tạo
      } finally {
        if (!cancelled) {
          setEnumsLoading(false)
        }
      }
    }

    loadEnums()
    return () => {
      cancelled = true
    }
  }, [])

  const validationErrors = useMemo(
    () => validateForm(values, enumOptions),
    [values, enumOptions]
  )

  const isFormValid = Object.keys(validationErrors).length === 0

  const visibleErrors = useMemo(() => {
    const next: FormErrors = {}
    for (const key of Object.keys(validationErrors) as FormFieldKey[]) {
      if (touched[key]) {
        next[key] = validationErrors[key]
      }
    }
    return next
  }, [validationErrors, touched])

  function setField<K extends FormFieldKey>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function markTouched(field: FormFieldKey) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function markAllTouched() {
    setTouched({
      fullName: true,
      dateOfBirth: true,
      phoneNumber: true,
      email: true,
      currentAddress: true,
      courseCode: true,
      major: true,
      faculty: true,
      company: true,
      jobTitle: true,
      industry: true,
      socialLink: true,
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)
    markAllTouched()

    if (!isFormValid) {
      return
    }

    const payload = {
      fullName: values.fullName.trim(),
      dateOfBirth: values.dateOfBirth.trim(),
      phoneNumber: values.phoneNumber.trim(),
      email: values.email.trim(),
      currentAddress: values.currentAddress.trim(),
      courseCode: values.courseCode,
      major: values.major,
      faculty: values.faculty,
      company: values.company.trim(),
      jobTitle: values.jobTitle.trim(),
      industry: values.industry.trim(),
      socialLink: values.socialLink.trim(),
      isFeatured: wantConnect,
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = (await response.json()) as { error?: string }

      if (!response.ok) {
        setSubmitError(json.error ?? "Gửi form thất bại. Vui lòng thử lại.")
        return
      }

      setSubmitted(true)
      setValues(INITIAL_VALUES)
      setTouched({})
      setWantConnect(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setSubmitError("Không kết nối được máy chủ. Vui lòng thử lại sau.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl bg-white px-6 py-12 text-center shadow-lg sm:px-10"
        role="status"
      >
        <p className="text-xl font-bold text-dnu-blue">
          Đã gửi thông tin đăng ký thành công!
        </p>
        <p className="mt-3 text-base text-gray-700">
          Cảm ơn bạn đã tham gia mạng lưới Alumni DNU. Ban quản trị sẽ liên hệ
          khi cần thiết.
        </p>
        <Button
          type="button"
          className="mt-8 bg-dnu-navy hover:bg-dnu-navy/90"
          onClick={() => setSubmitted(false)}
        >
          Đăng ký thêm
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="flex flex-col gap-8">
        <RegisterFormSection icon={PersonalInfoSectionIcon} title="Thông tin cá nhân">
          <div className="grid gap-6 sm:grid-cols-2">
            <RegisterFormField
              label="Họ và tên"
              required
              error={visibleErrors.fullName}
            >
              <Input
                value={values.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                onBlur={() => markTouched("fullName")}
                placeholder="Nhập họ và tên"
                aria-invalid={Boolean(visibleErrors.fullName)}
                className={registerFieldClassName(Boolean(visibleErrors.fullName))}
              />
            </RegisterFormField>
            <RegisterFormField
              label="Ngày sinh"
              required
              error={visibleErrors.dateOfBirth}
            >
              <Input
                type="date"
                value={values.dateOfBirth}
                onChange={(e) => setField("dateOfBirth", e.target.value)}
                onBlur={() => markTouched("dateOfBirth")}
                aria-invalid={Boolean(visibleErrors.dateOfBirth)}
                className={registerFieldClassName(
                  Boolean(visibleErrors.dateOfBirth)
                )}
              />
            </RegisterFormField>
            <RegisterFormField
              label="Số điện thoại"
              required
              error={visibleErrors.phoneNumber}
            >
              <Input
                type="tel"
                value={values.phoneNumber}
                onChange={(e) => setField("phoneNumber", e.target.value)}
                onBlur={() => markTouched("phoneNumber")}
                placeholder="Nhập số điện thoại"
                aria-invalid={Boolean(visibleErrors.phoneNumber)}
                className={registerFieldClassName(
                  Boolean(visibleErrors.phoneNumber)
                )}
              />
            </RegisterFormField>
            <RegisterFormField label="Email" required error={visibleErrors.email}>
              <Input
                type="email"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => markTouched("email")}
                placeholder="Nhập địa chỉ email"
                aria-invalid={Boolean(visibleErrors.email)}
                className={registerFieldClassName(Boolean(visibleErrors.email))}
              />
            </RegisterFormField>
          </div>
          <RegisterFormField
            label="Địa chỉ hiện nay"
            required
            error={visibleErrors.currentAddress}
          >
            <Input
              value={values.currentAddress}
              onChange={(e) => setField("currentAddress", e.target.value)}
              onBlur={() => markTouched("currentAddress")}
              placeholder="Số nhà, tên đường, phường/xã"
              aria-invalid={Boolean(visibleErrors.currentAddress)}
              className={registerFieldClassName(
                Boolean(visibleErrors.currentAddress)
              )}
            />
          </RegisterFormField>
        </RegisterFormSection>

        <RegisterFormSection icon={EducationSectionIcon} title="Thông tin đào tạo">
          <div className="grid gap-6 sm:grid-cols-2">
            <RegisterFormField
              label="Khóa học"
              required
              error={visibleErrors.courseCode}
            >
              <Select
                value={values.courseCode}
                onValueChange={(v) => setField("courseCode", v)}
                disabled={enumsLoading}
              >
                <SelectTrigger
                  className={registerFieldClassName(
                    Boolean(visibleErrors.courseCode)
                  )}
                  aria-invalid={Boolean(visibleErrors.courseCode)}
                  onBlur={() => markTouched("courseCode")}
                >
                  <SelectValue
                    placeholder={
                      enumsLoading ? "Đang tải..." : "Chọn khóa học"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {enumOptions.courseCode.map((item) => (
                    <SelectItem key={item} value={item}>
                      {formatCourseCodeLabel(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </RegisterFormField>
            <RegisterFormField
              label="Ngành học"
              required
              error={visibleErrors.major}
            >
              <Select
                value={values.major}
                onValueChange={(v) => setField("major", v)}
                disabled={enumsLoading}
              >
                <SelectTrigger
                  className={registerFieldClassName(Boolean(visibleErrors.major))}
                  aria-invalid={Boolean(visibleErrors.major)}
                  onBlur={() => markTouched("major")}
                >
                  <SelectValue
                    placeholder={
                      enumsLoading ? "Đang tải..." : "Chọn ngành học"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {enumOptions.major.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </RegisterFormField>
          </div>
          <RegisterFormField
            label="Khoa / đơn vị đào tạo"
            required
            error={visibleErrors.faculty}
          >
            <Select
              value={values.faculty}
              onValueChange={(v) => setField("faculty", v)}
              disabled={enumsLoading}
            >
              <SelectTrigger
                className={registerFieldClassName(Boolean(visibleErrors.faculty))}
                aria-invalid={Boolean(visibleErrors.faculty)}
                onBlur={() => markTouched("faculty")}
              >
                <SelectValue
                  placeholder={
                    enumsLoading ? "Đang tải..." : "Chọn khoa/đơn vị đào tạo"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {enumOptions.faculty.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </RegisterFormField>
        </RegisterFormSection>

        <RegisterFormSection icon={CareerSectionIcon} title="Thông tin nghề nghiệp">
          <div className="grid gap-6 sm:grid-cols-2">
            <RegisterFormField
              label="Đơn vị công tác"
              required
              error={visibleErrors.company}
            >
              <Input
                value={values.company}
                onChange={(e) => setField("company", e.target.value)}
                onBlur={() => markTouched("company")}
                placeholder="Nhập tên công ty đang làm việc"
                aria-invalid={Boolean(visibleErrors.company)}
                className={registerFieldClassName(Boolean(visibleErrors.company))}
              />
            </RegisterFormField>
            <RegisterFormField
              label="Chức vụ hiện tại"
              required
              error={visibleErrors.jobTitle}
            >
              <Input
                value={values.jobTitle}
                onChange={(e) => setField("jobTitle", e.target.value)}
                onBlur={() => markTouched("jobTitle")}
                placeholder="Vị trí đảm nhiệm"
                aria-invalid={Boolean(visibleErrors.jobTitle)}
                className={registerFieldClassName(Boolean(visibleErrors.jobTitle))}
              />
            </RegisterFormField>
            <RegisterFormField
              label="Lĩnh vực nghề nghiệp"
              required
              error={visibleErrors.industry}
            >
              <Input
                value={values.industry}
                onChange={(e) => setField("industry", e.target.value)}
                onBlur={() => markTouched("industry")}
                placeholder="Nhập ngành nghề đang hoạt động"
                aria-invalid={Boolean(visibleErrors.industry)}
                className={registerFieldClassName(Boolean(visibleErrors.industry))}
              />
            </RegisterFormField>
            <RegisterFormField
              label="Link Facebook / LinkedIn"
              required
              error={visibleErrors.socialLink}
            >
              <Input
                type="text"
                value={values.socialLink}
                onChange={(e) => setField("socialLink", e.target.value)}
                onBlur={() => markTouched("socialLink")}
                placeholder="Nhập link mạng xã hội"
                aria-invalid={Boolean(visibleErrors.socialLink)}
                className={registerFieldClassName(
                  Boolean(visibleErrors.socialLink)
                )}
              />
            </RegisterFormField>
          </div>
        </RegisterFormSection>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="wantConnect"
            checked={wantConnect}
            onCheckedChange={(v) => setWantConnect(v === true)}
            className="mt-0.5 size-5 rounded-full border-gray-400 data-[state=checked]:border-dnu-navy data-[state=checked]:bg-dnu-navy"
          />
          <Label
            htmlFor="wantConnect"
            className="cursor-pointer text-base font-normal leading-snug text-gray-800"
          >
            Mong muốn kết nối với Nhà trường
          </Label>
        </div>

        {submitError && (
          <p className="text-sm text-[#FC4C37]" role="alert">
            {submitError}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting || enumsLoading || !isFormValid}
          className={cn(
            "h-12 w-full rounded-md bg-dnu-navy text-base font-semibold hover:bg-dnu-navy/90 disabled:opacity-50"
          )}
        >
          {submitting ? "Đang gửi..." : "Gửi thông tin đăng ký"}
        </Button>
      </div>
    </form>
  )
}
