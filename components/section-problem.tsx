import { CtaButton } from "@/components/cta-button"

const STAT_CARDS = [
  {
    label: "뇌졸중 재발",
    rate: "20.4%",
    caption: "5명 중 1명",
  },
  {
    label: "심근경색 재발",
    rate: "9.6%",
    caption: "10명 중 1명",
  },
] as const

const STAT_SOURCE = "출처: 질병관리청 2022년 발생통계"

export function SectionProblem() {
  return (
    <section id="problem" className="landing-section landing-section-mint">
      <h2 className="landing-heading">
        첫 진단엔 나옵니다
        <br />
        재발하면 또 나올까요?
      </h2>

      <div className="landing-stat-grid mb-10 grid grid-cols-2 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label}>
            <div className="landing-card flex flex-col items-center py-8 text-center">
              <p className="landing-caption mb-3">{card.label}</p>
              <p className="landing-stat-value">{card.rate}</p>
              <p className="landing-caption mt-2">{card.caption}</p>
            </div>
            <p className="mt-2 text-center text-[10px] text-navy/60">{STAT_SOURCE}</p>
          </div>
        ))}
      </div>

      <div className="landing-compare-wrap mb-10">
        <div className="landing-compare-grid items-center">
          <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fa] p-5 text-center text-[#888888] shadow-none">
            <p className="mb-4 text-xs font-semibold tracking-wide">기존 보험</p>
            <p className="break-keep text-base font-bold leading-normal">1회만 지급</p>
            <p className="mt-2 break-keep text-xs leading-[1.8]">재발 시 보장 없음</p>
          </div>

          <div className="relative scale-[1.03] rounded-2xl border-2 border-[#1D9E75] bg-white p-5 pt-6 text-center text-[#0F3460] shadow-[0_4px_16px_rgba(29,158,117,0.2)]">
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[99px] bg-[#1D9E75] px-2 py-0.5 text-[10px] font-semibold text-white">
              추천
            </span>
            <p className="mb-4 text-xs font-semibold tracking-wide text-[#1D9E75]">
              순환계 통합치료비
            </p>
            <p className="break-keep text-base font-bold leading-normal">매년 반복 지급</p>
            <p className="mt-2 break-keep text-xs leading-[1.8] text-[#888888]">100세까지 치료받을 때마다</p>
          </div>
        </div>
      </div>

      <p className="mb-2 text-center text-xs italic text-[#666666]">
        열심히 준비한 보험이 재발 앞에서 무너져서는 안 됩니다
      </p>

      <div className="mb-10 rounded-xl bg-[#0F3460] p-5 text-center">
        <p className="text-[13px] text-[#AAAAAA]">재발 후 가족 눈치를 봐야 한다면</p>
        <p className="mt-2 text-lg font-extrabold leading-normal text-[#1D9E75]">이 보험은 필요없습니다</p>
      </div>

      <CtaButton variant="hero" section="문제인식">
        지금 확인하기
      </CtaButton>
    </section>
  )
}
