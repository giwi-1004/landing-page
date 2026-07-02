/**
 * 모바일에서 붙여넣기·연락처에서 가져온 +82 / 82 국번, 전각 숫자 등을
 * 국내 휴대폰 자릿수(10~11)로 맞춥니다.
 */
export function normalizeKoreanPhoneToDigits(input: string): string {
  const ascii = input.replace(/[\uFF10-\uFF19]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xff10 + 0x30),
  )
  let d = ascii.replace(/\D/g, "")

  if (d.startsWith("82") && d.length >= 10 && d.length <= 12) {
    d = `0${d.slice(2)}`
  }

  return d
}

/** 표시·저장용 (국내 휴대폰 형태) */
export function formatKoreanPhoneForStorage(digits: string): string {
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return digits
}
