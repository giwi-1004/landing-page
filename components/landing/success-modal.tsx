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

      <div className="relative w-full max-w-[calc(100vw-32px)] rounded-2xl border-2 border-sky bg-surface px-5 py-7 text-center shadow-xl sm:max-w-[440px]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mint">
          <span className="text-2xl font-bold text-royal" aria-hidden>
            ✓
          </span>
        </div>

        <h3 className="mb-3 text-2xl font-bold leading-snug text-slate-900">
          상담 신청이 완료됐습니다
        </h3>

        <p className="mb-6 text-base font-medium leading-relaxed text-slate-900">
          <span className="font-bold">입력하신 번호로 담당 설계사가 직접 연락</span>드립니다.
          <br />
          <span className="font-bold">영업일 기준 24시간 내</span> 연락드립니다.
        </p>

        <div className="mb-6 w-full rounded-xl border-2 border-sky bg-mint px-5 py-4 text-left">
          <p className="text-sm font-bold text-slate-900">상담 가능 시간</p>
          <p className="mt-2 text-base font-bold text-slate-900">평일 오전 9시 ~ 오후 6시</p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-900">
            신청 시간에 따라 다음 영업일에 연락드릴 수 있습니다
          </p>
        </div>

        <p className="mb-5 text-sm font-medium leading-relaxed text-slate-900">
          빠른 확인은 <span className="font-bold">카카오톡</span>으로 먼저 문의하실 수 있습니다
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
