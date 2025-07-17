"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  value?: string | number
  onChange?: (value: string) => void
  options?: { value: string; label: string }[]
  className?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  options,
  className
}: FormFieldProps) {
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={className}
          />
        )
      case 'select':
        return (
          <Select
            value={value as string}
            onValueChange={onChange}
          >
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={className}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  )
}
