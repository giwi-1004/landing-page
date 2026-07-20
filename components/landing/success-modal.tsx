"use client"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      />

      <div className="relative w-full max-w-[calc(100vw-32px)] rounded-2xl border-2 border-[#e2e8f0] bg-surface px-5 py-7 text-center shadow-xl sm:max-w-[440px]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#dcfce7]">
          <span className="text-2xl font-bold text-[#16a34a]" aria-hidden>
            ✓
          </span>
        </div>

        <h3 className="mb-1 text-[17px] font-bold leading-snug text-slate-900">
          상담 신청이 완료됐습니다
        </h3>
        <p className="mb-4 text-[14px] leading-relaxed text-slate-400">
          소중한 신청 감사드립니다
        </p>

        <p className="mb-3 text-base font-medium leading-relaxed text-slate-900">
          입력하신 번호로 담당 설계사가 24시간 내 연락드립니다
        </p>

        <div className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f8f9fa] px-5 py-4">
          <span className="shrink-0 text-base leading-none text-slate-600" aria-hidden>
            🕐
          </span>
          <p className="text-sm font-medium leading-snug text-slate-700">
            평일 9시~18시 · 주말은 월요일 순서대로
          </p>
        </div>

        <p className="mb-5 text-xs font-medium leading-relaxed text-slate-400">
          빠른 확인은 카카오톡으로 먼저 문의하세요
        </p>

        <button
          type="button"
          onClick={onClose}
          className="landing-cta-primary w-full text-base font-bold"
        >
          확인
        </button>
      </div>
    </div>
  )
}
