import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length <= 4) return digits
  if (digits.length <= 7) return digits.slice(0, 4) + "-" + digits.slice(4)
  return digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7)
}
