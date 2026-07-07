import { createHash } from "crypto"

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex")
}

/** Meta CAPI: lowercase, trim */
export function hashEmailForMeta(email: string): string {
  return sha256(email.trim().toLowerCase())
}

/** Meta CAPI: 국가코드 포함 숫자만 (예: 01012345678 → 821012345678) */
export function normalizePhoneForMeta(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return ""
  if (digits.startsWith("82")) return digits
  if (digits.startsWith("0")) return `82${digits.slice(1)}`
  return digits
}

export function hashPhoneForMeta(phone: string): string {
  const normalized = normalizePhoneForMeta(phone)
  if (!normalized) return ""
  return sha256(normalized)
}

/** Meta CAPI: trim 후 UTF-8 그대로 해시 (한글 이름 포함) */
export function hashFirstNameForMeta(firstName: string): string {
  const trimmed = firstName.trim().toLowerCase()
  if (!trimmed) return ""
  return sha256(trimmed)
}
