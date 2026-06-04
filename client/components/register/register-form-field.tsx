import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type RegisterFormFieldProps = {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export function RegisterFormField({
  label,
  required,
  error,
  children,
  className,
}: RegisterFormFieldProps) {
  const errorId = error ? `${label.replace(/\s+/g, "-")}-error` : undefined

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-base font-semibold text-gray-900">
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

export const registerInputClassName =
  "h-11 rounded-md border-gray-300 bg-white text-base placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-0 focus-visible:border-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"

export function registerFieldClassName(hasError: boolean) {
  return cn(
    registerInputClassName,
    hasError &&
      "border-[#FC4C37] focus:border-[#FC4C37] focus-visible:border-[#FC4C37]"
  )
}
