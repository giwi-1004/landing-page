"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

const SWIPE_THRESHOLD = 50

interface CarouselDotsProps {
  count: number
  current: number
  onSelect: (index: number) => void
  ariaLabel: string
}

export function CarouselDots({ count, current, onSelect, ariaLabel }: CarouselDotsProps) {
  if (count <= 1) return null

  return (
    <div
      className="mt-4 flex items-center justify-center gap-1.5"
      role="tablist"
      aria-label={ariaLabel}
    >
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === current}
          aria-label={`${ariaLabel} ${index + 1}`}
          className="size-2 rounded-full p-0 transition-colors duration-300"
            style={{
              backgroundColor: index === current ? "#0F3460" : "#e2e8f0",
            }}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  )
}

interface LandingSwipeCarouselProps {
  slideCount: number
  ariaLabel: string
  autoAdvanceMs?: number
  className?: string
  paused?: boolean
  children: (current: number) => ReactNode
}

export function LandingSwipeCarousel({
  slideCount,
  ariaLabel,
  autoAdvanceMs = 3000,
  className,
  paused = false,
  children,
}: LandingSwipeCarouselProps) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slideCount)
  }, [slideCount])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount)
  }, [slideCount])

  useEffect(() => {
    setCurrent((prev) => (prev >= slideCount ? 0 : prev))
  }, [slideCount])

  useEffect(() => {
    if (!autoAdvanceMs || slideCount <= 1 || paused) return

    const timer = setInterval(goNext, autoAdvanceMs)
    return () => clearInterval(timer)
  }, [autoAdvanceMs, goNext, paused, slideCount])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < SWIPE_THRESHOLD) return
    if (diff > 0) goNext()
    else goPrev()
  }

  return (
    <div className={className}>
      <div
        className="touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div key={current} className="animate-in fade-in duration-500">
          {children(current)}
        </div>
      </div>

      <CarouselDots
        count={slideCount}
        current={current}
        onSelect={setCurrent}
        ariaLabel={ariaLabel}
      />
    </div>
  )
}
