"use client"

import { useState } from "react"
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
import { RegisterFormField, registerInputClassName } from "./register-form-field"
import { RegisterFormSection } from "./register-form-section"

const COHORT_OPTIONS = [
  "K65",
  "K64",
  "K63",
  "K62",
  "K61",
  "K60",
  "K55–K59",
  "Trước K55",
] as const

const MAJOR_OPTIONS = [
  "Công nghệ thông tin",
  "Quản trị kinh doanh",
  "Kế toán",
  "Marketing",
  "Tài chính – Ngân hàng",
  "Luật",
  "Ngôn ngữ Anh",
  "Khác",
] as const

const FACULTY_OPTIONS = [
  "Khoa Công nghệ thông tin",
  "Khoa Kinh tế",
  "Khoa Ngoại ngữ",
  "Khoa Luật",
  "Viện Đào tạo quốc tế",
  "Khác",
] as const

export function AlumniRegisterForm() {
  const [cohort, setCohort] = useState("")
  const [major, setMajor] = useState("")
  const [faculty, setFaculty] = useState("")
  const [wantConnect, setWantConnect] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!cohort || !major || !faculty) return
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="flex flex-col gap-8">
      <RegisterFormSection icon={PersonalInfoSectionIcon} title="Thông tin cá nhân">
        <div className="grid gap-6 sm:grid-cols-2">
          <RegisterFormField label="Họ và tên" required>
            <Input
              name="fullName"
              required
              placeholder="Nhập họ và tên"
              className={registerInputClassName}
            />
          </RegisterFormField>
          <RegisterFormField label="Ngày sinh" required>
            <Input
              name="dateOfBirth"
              required
              placeholder="DD/MM/YYYY"
              className={registerInputClassName}
            />
          </RegisterFormField>
          <RegisterFormField label="Số điện thoại" required>
            <Input
              name="phone"
              type="tel"
              required
              placeholder="Nhập số điện thoại"
              className={registerInputClassName}
            />
          </RegisterFormField>
          <RegisterFormField label="Email" required>
            <Input
              name="email"
              type="email"
              required
              placeholder="Nhập địa chỉ email"
              className={registerInputClassName}
            />
          </RegisterFormField>
        </div>
        <RegisterFormField label="Địa chỉ hiện nay" required>
          <Input
            name="address"
            required
            placeholder="Số nhà, tên đường, phường/xã"
            className={registerInputClassName}
          />
        </RegisterFormField>
      </RegisterFormSection>

      <RegisterFormSection icon={EducationSectionIcon} title="Thông tin đào tạo">
        <div className="grid gap-6 sm:grid-cols-2">
          <RegisterFormField label="Khóa học" required>
            <Select value={cohort} onValueChange={setCohort} required>
              <SelectTrigger className={registerInputClassName}>
                <SelectValue placeholder="Chọn khóa học" />
              </SelectTrigger>
              <SelectContent>
                {COHORT_OPTIONS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </RegisterFormField>
          <RegisterFormField label="Ngành học" required>
            <Select value={major} onValueChange={setMajor} required>
              <SelectTrigger className={registerInputClassName}>
                <SelectValue placeholder="Nhập ngành học" />
              </SelectTrigger>
              <SelectContent>
                {MAJOR_OPTIONS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </RegisterFormField>
        </div>
        <RegisterFormField label="Khoa / đơn vị đào tạo" required>
          <Select value={faculty} onValueChange={setFaculty} required>
            <SelectTrigger className={registerInputClassName}>
              <SelectValue placeholder="Nhập khoa/đơn vị đào tạo" />
            </SelectTrigger>
            <SelectContent>
              {FACULTY_OPTIONS.map((item) => (
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
          <RegisterFormField label="Đơn vị công tác" required>
            <Input
              name="workplace"
              required
              placeholder="Nhập tên công ty đang làm việc"
              className={registerInputClassName}
            />
          </RegisterFormField>
          <RegisterFormField label="Chức vụ hiện tại" required>
            <Input
              name="position"
              required
              placeholder="Vị trí đảm nhiệm"
              className={registerInputClassName}
            />
          </RegisterFormField>
          <RegisterFormField label="Lĩnh vực nghề nghiệp" required>
            <Input
              name="careerField"
              required
              placeholder="Nhập ngành nghề đang hoạt động"
              className={registerInputClassName}
            />
          </RegisterFormField>
          <RegisterFormField label="Link Facebook / LinkedIn" required>
            <Input
              name="socialLink"
              type="url"
              required
              placeholder="Nhập địa chỉ Facebook"
              className={registerInputClassName}
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

      <Button
        type="submit"
        disabled={!cohort || !major || !faculty}
        className="h-12 w-full rounded-md bg-dnu-navy text-base font-semibold hover:bg-dnu-navy/90 disabled:opacity-50"
      >
        Gửi thông tin đăng ký
      </Button>
      </div>
    </form>
  )
}
