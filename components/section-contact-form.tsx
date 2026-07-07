"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { trackCtaClick, trackFormSubmit } from "@/lib/gtag"
import { createLeadEventId } from "@/lib/meta/lead-event-id"
import { trackMetaLead } from "@/lib/trackFbLead"
import { normalizeKoreanPhoneToDigits } from "@/lib/normalize-kr-phone"
import { submitKakaoLead, submitLandingLead } from "@/lib/submit-landing-lead"
import { cn } from "@/lib/utils"

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/scS4vMoi"
const FORM_SUBMIT_CTA_LABEL = "전화 상담 신청"
const FORM_NAME = "순환계_상담신청"

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
  onSubmit: () => void
}

export function SectionContactForm({ onSubmit }: SectionContactFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [privacyDetailOpen, setPrivacyDetailOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

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
    setDebugInfo(["API 호출 시작"])
    const leadEventId = createLeadEventId()
    try {
      const result = await submitLandingLead(name, phone, privacyAgreed, leadEventId)
      const fbqExists = typeof window.fbq === "function"

      if (!result.ok) {
        setDebugInfo([
          "API 호출 시작",
          `API 실패: ${result.message}`,
          `fbq 존재: ${fbqExists}`,
          "Lead 전송 안 함",
        ])
        setFormError(result.message)
        return
      }

      setDebugInfo([
        "API 호출 시작",
        "API 성공",
        `fbq 존재: ${fbqExists}`,
      ])

      trackFormSubmit(FORM_NAME)
      trackMetaLead({
        eventID: leadEventId,
        userData: { fn: name.trim(), ph: phoneDigits },
        source: "form",
      })

      setDebugInfo([
        "API 호출 시작",
        "API 성공",
        `fbq 존재: ${fbqExists}`,
        "Lead 전송 시도함",
      ])
      onSubmit()
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
      trackCtaClick("카카오 오픈채팅 상담", "신청폼")

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
      {/* TODO: remove after mobile debug */}
      {debugInfo.length > 0 ? (
        <div className="fixed bottom-4 right-4 z-[9999] max-w-[280px] rounded bg-black p-2 text-[12px] leading-relaxed break-keep text-white">
          {debugInfo.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      ) : null}

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
        카카오 오픈채팅 상담
      </a>

      <p className="my-3 text-center text-[#AAAAAA]">또는</p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="mb-4 rounded-xl border-2 border-[#e2e8f0] bg-surface px-3 py-4">
          <div className="flex flex-col gap-2">
            <label className="flex min-w-0 cursor-pointer items-center gap-2">
              <Checkbox
                id="privacy-consent"
                checked={privacyAgreed}
                onCheckedChange={(v) => {
                  setFormError("")
                  setPrivacyAgreed(v === true)
                }}
                className="size-6 shrink-0 rounded-md border-2 border-[#e2e8f0] data-[state=checked]:border-[#0f3460] data-[state=checked]:bg-[#0f3460] [&_svg]:size-4"
              />
              <span className="text-[13px] font-semibold leading-none text-slate-900">
                [필수] 개인정보 수집 및 이용 동의
              </span>
            </label>
            <button
              type="button"
              className="ml-8 w-fit border-0 bg-transparent p-0 text-[12px] font-medium text-slate-700 underline"
              onClick={() => setPrivacyDetailOpen((open) => !open)}
            >
              내용 보기
            </button>
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
        {!privacyAgreed ? (
          <p className="mt-2 text-center text-xs text-[#0F3460]/50">
            개인정보 수집 및 이용에 동의해야 신청할 수 있습니다.
          </p>
        ) : null}
      </form>
    </section>
  )
}
