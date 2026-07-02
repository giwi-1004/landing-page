"use client"

import { CtaButton } from "@/components/cta-button"

const PLAN_STEPS = [
  { step: "01", title: "카카오/전화 연락" },
  { step: "02", title: "보험 분석" },
  { step: "03", title: "원하시면 상품 검토" },
] as const

const PROMISES = ["가입 권유 없음", "비대면 상담 가능", "결정은 고객님이"] as const

export function SectionPlan() {
  return (
    <section id="plan" className="landing-section landing-section-mint">
      <h2 className="mb-4 break-keep text-[22px] font-extrabold leading-[1.8] text-[#0F3460]">3단계면 충분합니다</h2>

      <ol className="relative mb-4 flex items-start justify-between gap-2">
        <div className="absolute left-[20px] right-[20px] top-5 border-t-2 border-dashed border-[#e2e8f0]" />
        {PLAN_STEPS.map((item) => (
          <li key={item.step} className="relative z-10 flex min-w-0 flex-1 flex-col items-center text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F3460] text-sm font-bold text-white">
              {item.step}
            </span>
            <p className="mt-3 whitespace-nowrap px-0.5 text-[11px] leading-normal text-[#0F3460]">{item.title}</p>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap justify-center gap-[6px]">
        {PROMISES.map((promise) => (
          <span
            key={promise}
            className="rounded-[99px] border border-[#0F3460] bg-white px-[14px] py-[6px] text-[11px] font-semibold text-[#0F3460]"
          >
            {promise}
          </span>
        ))}
      </div>

      <div className="my-7 border-t-[1.5px] border-[#e2e8f0]" />

      <div className="text-center">
        <p className="break-keep text-[15px] font-bold leading-normal text-[#0F3460]">나중에 하셔도 됩니다.</p>
        <p className="mt-[6px] break-keep text-[13px] leading-relaxed text-[#0F3460]/80">
          단, 몸에 이상이 생기면 그때는 늦습니다.
        </p>
        <p className="mt-[10px] break-keep text-[13px] font-bold leading-relaxed text-[#0F3460]">
          지금 확인하지 않으면 재발 후에 알게 됩니다.
        </p>
        <p className="mt-4 break-keep text-[12px] leading-relaxed text-[#888888]">모아둔 재산이 치료비로 사라지고</p>
        <p className="mt-1 break-keep text-[15px] font-extrabold leading-normal text-[#0F3460]">
          가장의 자리를 잃게 됩니다.
        </p>

        <div className="mt-5">
          <CtaButton variant="hero" section="플랜손실">
            지금 확인하기
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
