"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import { LandingSwipeCarousel } from "@/components/landing/landing-swipe-carousel"

const CERT_CARDS = [
  {
    label: "이영대 지점장",
    src: "/images/profile.png",
    alt: "이영대 지점장",
    variant: "profile" as const,
  },
  {
    label: "손해보험 자격증",
    src: "/images/certificates/손해보험자격증.png",
    alt: "손해보험 자격증",
    variant: "certificate" as const,
  },
  {
    label: "생명보험 자격증",
    src: "/images/certificates/생명보험자격증.png",
    alt: "생명보험 자격증",
    variant: "certificate" as const,
  },
  {
    label: "변액보험 자격증",
    src: "/images/certificates/변액보험자격증.png",
    alt: "변액보험 자격증",
    variant: "certificate" as const,
  },
] as const

type CertCard = (typeof CERT_CARDS)[number]

function chunkCards<T>(items: readonly T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size) as T[])
  }
  return chunks
}

function useItemsPerSlide() {
  const [itemsPerSlide, setItemsPerSlide] = useState(2)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 359px)")
    const update = () => setItemsPerSlide(mediaQuery.matches ? 1 : 2)
    update()
    mediaQuery.addEventListener("change", update)
    return () => mediaQuery.removeEventListener("change", update)
  }, [])

  return itemsPerSlide
}

interface CredentialCardProps {
  card: CertCard
  onZoom?: (src: string) => void
}

function CredentialCard({ card, onZoom }: CredentialCardProps) {
  const isCertificate = card.variant === "certificate"

  return (
    <div
      className={
        isCertificate
          ? "relative flex h-[212px] w-full cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-[#e2e8f0] bg-white p-1.5 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0_4px_16px_rgba(15,52,96,0.1)]"
          : "flex h-[212px] w-full flex-col items-center justify-between rounded-xl border-2 border-[#e2e8f0] bg-white p-1.5"
      }
      onClick={isCertificate ? () => onZoom?.(card.src) : undefined}
      onKeyDown={
        isCertificate
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onZoom?.(card.src)
              }
            }
          : undefined
      }
      role={isCertificate ? "button" : undefined}
      tabIndex={isCertificate ? 0 : undefined}
      aria-label={isCertificate ? `${card.label} 확대 보기` : undefined}
    >
      <div className="h-[152px] w-full shrink-0 overflow-hidden rounded-lg bg-white">
        <Image
          src={card.src}
          alt={card.alt}
          width={200}
          height={152}
          className="block h-[152px] w-full max-h-[152px] min-h-[152px]"
          style={{
            objectFit: isCertificate ? "contain" : "cover",
            objectPosition: isCertificate ? "center" : "center top",
            borderRadius: "8px",
          }}
        />
      </div>

      {isCertificate ? (
        <span
          className="pointer-events-none absolute bottom-10 right-2 flex size-6 items-center justify-center rounded-full bg-white p-1 text-sm text-[#0F3460]"
          aria-hidden
        >
          🔍
        </span>
      ) : null}

      <p className="shrink-0 break-keep px-1 pt-1.5 text-center text-[11px] font-bold leading-normal text-[#0F3460]">
        {card.label}
      </p>
    </div>
  )
}

export function CredentialCardsGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const itemsPerSlide = useItemsPerSlide()

  const slides = useMemo(
    () => chunkCards(CERT_CARDS, itemsPerSlide),
    [itemsPerSlide],
  )

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [selectedImage])

  return (
    <>
      <LandingSwipeCarousel
        key={itemsPerSlide}
        slideCount={slides.length}
        ariaLabel="자격증 슬라이드"
        className="mb-10"
        paused={Boolean(selectedImage)}
      >
        {(current) => (
          <div
            className={
              itemsPerSlide === 2
                ? "grid grid-cols-2 gap-4"
                : "grid grid-cols-1 gap-4"
            }
          >
            {slides[current]?.map((card) => (
              <CredentialCard
                key={card.label}
                card={card}
                onZoom={setSelectedImage}
              />
            ))}
          </div>
        )}
      </LandingSwipeCarousel>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelectedImage(null)}
          role="presentation"
        >
          <div
            className="relative max-h-[85vh] max-w-[90vw] rounded-xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-8 right-0 cursor-pointer border-0 bg-transparent text-2xl font-bold text-white"
              onClick={() => setSelectedImage(null)}
              aria-label="닫기"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="자격증 확대"
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
