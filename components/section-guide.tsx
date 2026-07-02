import Image from "next/image"

import { CredentialCardsGrid } from "@/components/landing/credential-cards-grid"
import { ReviewCarousel } from "@/components/landing/review-carousel"
import { CtaButton } from "@/components/cta-button"

export function SectionGuide() {
  return (
    <section id="guide" className="landing-section landing-section-white">
      <div className="mb-10 flex items-center gap-4">
        <Image
          src="/images/profile.png"
          alt="이영대 지점장"
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full border-2 border-sky object-cover"
        />
        <div>
          <p className="text-base font-bold text-navy">이영대 지점장</p>
          <p className="landing-caption mt-0.5">티금융서비스 고양1센터</p>
        </div>
      </div>

      <div className="mb-10 rounded-xl bg-navy p-6">
        <p className="text-base font-bold text-[#CECBF6]">
          설계사에게 연락하기 부담스러우셨죠?
        </p>
        <p className="text-sm font-normal leading-relaxed text-white">
          저도 압니다. 가입 권유만 하니까요.
        </p>
        <div className="h-4" aria-hidden />
        <p className="text-sm font-bold leading-relaxed text-white">
          7년간 분석 먼저, 결정은 고객님이 하십니다.
        </p>
        <p className="text-sm font-normal leading-relaxed text-white">
          빠진 보장, 함께 찾아드리겠습니다.
        </p>
      </div>

      <CredentialCardsGrid />

      <ReviewCarousel />

      <CtaButton variant="hero" section="가이드">
        무료로 확인하기
      </CtaButton>
    </section>
  )
}
