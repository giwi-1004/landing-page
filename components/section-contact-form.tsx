"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { trackCtaClick, trackFormSubmit } from "@/lib/gtag"
import { createLeadEventId } from "@/lib/meta/lead-event-id"
import { trackMetaLead } from "@/lib/trackFbLead"
import { normalizeKoreanPhoneToDigits } from "@/lib/normalize-kr-phone"
import { submitKakaoLead, submitLandingLead } from "@/lib/submit-landing-lead"
import { cn } from "@/lib/utils"

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/scS4vMoi"
const FORM_SUBMIT_CTA_LABEL = "내 보험 확인 신청하기"
const FORM_NAME = "순환계_상담신청"
const PREFERRED_TIME_PLACEHOLDER = "희망 상담시간 선택하기"

const PREFERRED_TIME_OPTIONS = [
  "아무 때나 괜찮아요",
  "오전 9시",
  "오전 10시",
  "오전 11시",
  "오후 12시",
  "오후 1시",
  "오후 2시",
  "오후 3시",
  "오후 4시",
  "오후 5시",
  "오후 6시",
  "오후 7시",
  "오후 8시",
  "오후 9시",
] as const

type PreferredTime = (typeof PREFERRED_TIME_OPTIONS)[number] | ""

const PRIVACY_CONSENT_FULL_TEXT = `개인정보 수집 및 이용 동의

1. 수집 목적
순환계 보험 보장 구조 확인 상담 연결

2. 수집 항목
성명, 전화번호

3. 보유 및 이용 기간
상담 완료 후 즉시 파기
(단, 관계 법령에 따라 보존이 필요한 경우
해당 기간까지 보관)

4. 동의 거부 권리
개인정보 수집·이용에 동의하지 않을
권리가 있습니다.
단, 동의 거부 시 상담 신청 서비스
이용이 제한됩니다.

5. 제3자 제공
상담 연결을 위해 제휴 보험설계사에게
성명·전화번호가 제공될 수 있습니다.

※ 수집된 정보는 보장 확인 상담 목적 외에
사용되지 않습니다.`

interface SectionContactFormProps {
  onSubmit: (preferredTime?: string) => void
}

export function SectionContactForm({ onSubmit }: SectionContactFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [preferredTime, setPreferredTime] = useState<PreferredTime>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [privacyDetailOpen, setPrivacyDetailOpen] = useState(false)

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11)
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
  }

  const phoneDigits = normalizeKoreanPhoneToDigits(phone)
  const isPhoneValid = phoneDigits.length === 11 && phoneDigits.startsWith("010")
  const canSubmit =
    privacyAgreed && name.trim().length > 0 && isPhoneValid && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!privacyAgreed) {
      setFormError("개인정보 수집 및 이용에 동의해주세요.")
      return
    }

    if (!name.trim() || !phone.trim()) {
      setFormError("이름과 전화번호를 모두 입력해주세요.")
      return
    }

    const phoneDigits = normalizeKoreanPhoneToDigits(phone)
    if (phoneDigits.length !== 11 || !phoneDigits.startsWith("010")) {
      setFormError("전화번호를 010-0000-0000 형식으로 입력해주세요.")
      return
    }

    trackCtaClick(FORM_SUBMIT_CTA_LABEL, "신청폼")

    setIsSubmitting(true)
    const leadEventId = createLeadEventId()
    try {
      const result = await submitLandingLead(
        name,
        phone,
        privacyAgreed,
        leadEventId,
        preferredTime || undefined,
      )

      if (!result.ok) {
        setFormError(result.message)
        return
      }

      trackFormSubmit(FORM_NAME)
      trackMetaLead({
        eventID: leadEventId,
        userData: { fn: name.trim(), ph: phoneDigits },
        source: "form",
      })

      onSubmit(preferredTime || undefined)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKakaoClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const link = e.currentTarget
    if (link.dataset.kakaoSubmitting === "true") return
    link.dataset.kakaoSubmitting = "true"

    try {
      trackCtaClick("눌러서 카카오톡으로 상담받기", "신청폼")

      const leadEventId = createLeadEventId()
      await submitKakaoLead(leadEventId).catch(() => null)
      trackMetaLead({ eventID: leadEventId, source: "kakao" })

      window.open(KAKAO_OPEN_CHAT_URL, "_blank", "noopener,noreferrer")
    } finally {
      link.dataset.kakaoSubmitting = "false"
    }
  }

  const inputClassName =
    "landing-form-input h-auto min-h-[52px] w-full rounded-2xl bg-surface py-3 text-base md:text-base leading-normal text-slate-900 placeholder:text-base placeholder:leading-normal placeholder:text-gray-500 focus-visible:border-[#0f3460] focus-visible:ring-0"

  return (
    <section id="contact-form" className="landing-section landing-section-white">
      <h2 className="mb-1 break-keep text-[20px] font-bold leading-[1.8] text-[#0F3460]">무료 보험 분석 신청</h2>
      <p className="mb-4 text-xs text-[#888888]">부담 없이 신청하세요. 가입 권유 없습니다.</p>

      <a
        href={KAKAO_OPEN_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#FEE500] px-4 py-[14px] text-base font-bold text-[#3C1E1E] transition-opacity hover:opacity-90"
        onClick={handleKakaoClick}
      >
        <span aria-hidden>💬</span>
        눌러서 카카오톡으로 상담받기
      </a>

      <p className="my-3 text-center text-[#AAAAAA]">또는</p>

      <div className="mb-4 text-center">
        <div className="mx-auto w-fit rounded-lg bg-[#FFF1E0] px-4 py-2.5 text-center leading-[1.5] text-[#E8651A]">
          <p className="text-[15px] font-bold">가입 권유 전화 아니에요</p>
          <p className="text-[13px] font-normal text-[#D97A3D]">
            신청 확인차 편하신 시간에 연락드립니다
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4 rounded-xl border-0 bg-[#EEF1F4] px-3 py-4">
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label htmlFor="name" className="mb-2.5 block text-sm font-semibold text-navy">
                이름
              </label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                required
                onChange={(e) => {
                  setFormError("")
                  setName(e.target.value)
                }}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2.5 block text-sm font-semibold text-navy">
                전화번호
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                required
                onChange={(e) => {
                  setFormError("")
                  setPhone(formatPhoneNumber(e.target.value))
                }}
                className={inputClassName}
                maxLength={13}
                inputMode="tel"
                autoComplete="tel"
                pattern="010-\d{4}-\d{4}"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="preferred-time"
              className="mb-2.5 block text-sm font-semibold text-navy"
            >
              희망 상담시간 (선택)
            </label>
            <div className="relative">
              <select
                id="preferred-time"
                value={preferredTime}
                onChange={(e) => {
                  setPreferredTime(e.target.value as PreferredTime)
                }}
                className={cn(
                  inputClassName,
                  "cursor-pointer appearance-none bg-white pr-11",
                  !preferredTime && "text-gray-500",
                )}
                aria-label="희망 상담시간"
              >
                <option value="">{PREFERRED_TIME_PLACEHOLDER}</option>
                {PREFERRED_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option} className="min-h-10 text-slate-900">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-xl border-2 border-[#e2e8f0] bg-surface px-3 py-4">
          <div className="flex items-start gap-2">
            <Checkbox
              id="privacy-consent"
              checked={privacyAgreed}
              onCheckedChange={(v) => {
                setFormError("")
                setPrivacyAgreed(v === true)
              }}
              className="mt-0.5 size-6 shrink-0 rounded-md border-2 border-[#e2e8f0] data-[state=checked]:border-[#0f3460] data-[state=checked]:bg-[#0f3460] [&_svg]:size-4"
            />
            <div className="flex min-w-0 flex-col">
              <label
                htmlFor="privacy-consent"
                className="cursor-pointer text-[13px] font-semibold leading-none text-slate-900"
              >
                [필수] 개인정보 수집 및 이용 동의
              </label>
              <button
                type="button"
                className="mt-1 block w-fit border-0 bg-transparent p-0 text-left text-[12px] font-medium text-slate-700 underline"
                onClick={() => setPrivacyDetailOpen((open) => !open)}
              >
                {privacyDetailOpen ? "내용 닫기" : "내용 보기"}
              </button>
            </div>
          </div>

          <div
            className={cn(
              "mt-3 whitespace-pre-line rounded-lg border-2 border-[#e2e8f0] bg-[#f8f9fa] p-3 text-xs leading-relaxed text-[#0F3460]/80",
              !privacyDetailOpen && "hidden",
            )}
          >
            {PRIVACY_CONSENT_FULL_TEXT}
          </div>
        </div>

        {formError ? (
          <p className="mb-3 text-sm font-medium text-[#0F3460]" role="alert">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit}
          className="landing-cta-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "요청 중..." : FORM_SUBMIT_CTA_LABEL}
        </button>
        <p className="mt-3 text-center text-xs text-[#888888]">
          개인정보 수집 및 이용에 동의해야 신청할 수 있습니다.
        </p>
      </form>
    </section>
  )
}
