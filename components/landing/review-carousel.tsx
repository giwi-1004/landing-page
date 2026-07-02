"use client"

import { LandingSwipeCarousel } from "@/components/landing/landing-swipe-carousel"

const REVIEWS = [
  {
    author: "50대 남성 김○○",
    text: "재발 후에도 치료받을 때마다 보험금이 나와 재활에 집중할 수 있었습니다.",
  },
  {
    author: "40대 여성 박○○",
    text: "분석만 해주시고 결정은 제가 했어요. 전혀 부담 없었습니다.",
  },
  {
    author: "50대 남성 정○○",
    text: "순환계 보장이 빠져있다는 걸 분석 후 알았어요. 솔직한 설명에 신뢰가 갔습니다.",
  },
] as const

export function ReviewCarousel() {
  return (
    <LandingSwipeCarousel
      slideCount={REVIEWS.length}
      ariaLabel="후기 슬라이드"
      className="mb-6"
    >
      {(current) => {
        const review = REVIEWS[current]

        return (
          <div className="rounded-xl border-2 border-[#e2e8f0] bg-[#f8f9fa] p-5">
            <p className="text-sm font-semibold text-[#0F3460]">{review.author}</p>
            <p className="mt-3 break-keep text-sm leading-relaxed text-[#0F3460]/80">
              {review.text}
            </p>
          </div>
        )
      }}
    </LandingSwipeCarousel>
  )
}
