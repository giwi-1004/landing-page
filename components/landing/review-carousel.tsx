"use client"

import { useCallback, useEffect, useRef, useState } from "react"

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

const SWIPE_THRESHOLD = 50

export function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % REVIEWS.length)
  }, [])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < SWIPE_THRESHOLD) return
    if (diff > 0) goNext()
    else goPrev()
  }

  const review = REVIEWS[current]

  return (
    <div className="mb-10">
      <div
        className="touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={current}
          className="animate-in fade-in rounded-xl border border-[#CECBF6] bg-white p-4 duration-500"
        >
          <p className="text-sm font-semibold text-royal">{review.author}</p>
          <p className="mt-3 text-sm leading-relaxed text-navy/70">{review.text}</p>
        </div>
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-1.5"
        role="tablist"
        aria-label="후기 슬라이드"
      >
        {REVIEWS.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`후기 ${index + 1}`}
            className="size-2 rounded-full p-0 transition-colors duration-300"
            style={{
              backgroundColor: index === current ? "#534AB7" : "#CECBF6",
            }}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}
