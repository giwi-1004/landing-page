import Image from "next/image"

import { CtaButton } from "@/components/cta-button"

// 색감 보정 필수 - 삭제 금지
export function SectionHero() {
  return (
    <section id="hero" className="landing-section landing-section-white px-5 py-8 md:py-10">
      <p className="mb-3 inline-block rounded-full border-2 border-[#e2e8f0] bg-[#f8f9fa] px-4 py-1.5 text-xs font-medium tracking-wide text-[#0F3460]">
        뇌·심장 순환계 주요치료비
      </p>

      <h1 className="landing-hero-title mb-1.5 break-keep">
        첫 진단에도, 재발을 해도
        <br />
        <span className="text-[#0F3460]">돈 걱정 없이</span>
        <br />
        치료에만 집중하세요
      </h1>

      <p className="mb-2 break-keep text-[15px] font-semibold leading-[1.8] text-[#0F3460]">
        가지고 있는 보험으로 가능한지 확인해 드리겠습니다
      </p>

      <div className="relative h-[210px] w-full overflow-hidden rounded-xl sm:h-[230px] md:h-[260px]">
        <Image
          src="/images/hero-family.png"
          alt="치료 후 평온한 가족"
          fill
          className="hero-family-photo object-cover"
          style={{
            objectPosition: "center 30%",
          }}
          priority
        />
      </div>

      <CtaButton variant="hero" section="히어로" className="mt-4">
        내 보험 확인해보기
      </CtaButton>
    </section>
  )
}
