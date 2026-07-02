import Image from "next/image"

import { CtaButton } from "@/components/cta-button"

export function SectionHero() {
  return (
    <section id="hero" className="landing-section landing-section-white">
      <p className="mb-5 inline-block rounded-full border-2 border-sky bg-mint px-4 py-1.5 text-xs font-medium tracking-wide text-navy">
        뇌·심장 순환계 주요치료비
      </p>

      <h1 className="landing-hero-title break-keep">
        첫 진단에도, 재발을 해도
        <br />
        <span className="text-royal">돈 걱정 없이</span>
        <br />
        치료에만 집중하세요
      </h1>

      <p className="mt-5 mb-5 text-[15px] font-semibold text-[#1F4E79] leading-[1.8]">
        가지고 있는 보험으로 가능한지 확인해 드리겠습니다
      </p>

      <div className="relative h-[260px] w-full overflow-hidden rounded-xl">
        <Image
          src="/images/hero-family.png"
          alt="치료 후 평온한 가족"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          priority
        />
      </div>

      <CtaButton variant="hero" section="히어로" className="mt-10">
        지금 확인하기
      </CtaButton>
    </section>
  )
}
