import { CtaButton } from "@/components/cta-button"

const LOSS_CARDS = [
  { line1: "모아둔 재산이", line2: "치료비로 소진" },
  { line1: "돈 걱정에", line2: "가장 자리 흔들림" },
] as const

export function SectionLoss() {
  return (
    <section id="loss" className="landing-section landing-section-mint">
      <div className="landing-banner mb-10">
        <p className="text-base font-bold text-[#0F3460]">나중에 하셔도 됩니다</p>
        <p className="mt-3 break-keep text-sm leading-relaxed text-[#0F3460]/80">
          단, 몸에 이상이 생기면
          <br />
          그때는 늦습니다
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4">
        {LOSS_CARDS.map((card) => (
          <div key={card.line1} className="landing-card py-7 text-center">
            <p className="mb-2 break-keep text-xs leading-relaxed text-[#0F3460]/70">{card.line1}</p>
            <p className="break-keep text-sm font-bold leading-normal text-[#0F3460]">{card.line2}</p>
          </div>
        ))}
      </div>

      <CtaButton variant="hero" section="손실경고">
        놓치기 전에 확인하기
      </CtaButton>
    </section>
  )
}
