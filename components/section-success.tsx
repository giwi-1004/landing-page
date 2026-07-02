import Image from "next/image"

import { CtaButton } from "@/components/cta-button"
import { cn } from "@/lib/utils"

const COMPARE_ITEMS = [
  {
    label: "보험 없을 때",
    imageSrc: "/images/without-insurance.png",
    imageAlt: "보험 없을 때 치료비 걱정으로 힘든 가족",
    accent: false,
    labelClassName: "text-[#0F3460]",
    cardClassName: "border-[#e2e8f0]",
  },
  {
    label: "보험 있을 때",
    imageSrc: "/images/with-insurance.png",
    imageAlt: "보험 있을 때 따뜻하게 대하는 가족",
    accent: true,
    labelClassName: "text-[#1D9E75]",
    cardClassName: "border-[#1D9E75] shadow-[0_4px_16px_rgba(29,158,117,0.18)]",
  },
] as const

export function SectionSuccess() {
  return (
    <section id="success" className="landing-section landing-section-white">
      <h2 className="mb-10 text-center">
        <span className="block text-[17px] font-normal text-[#888888]">
          보험은 치료비 그 이상입니다.
        </span>
        <span className="mt-2 block text-[20px] font-extrabold leading-[1.8] text-[#0F3460]">
          가족이 서로 따뜻하게 대할 수 있는 여유를 드립니다.
        </span>
      </h2>

      <div className="landing-compare-wrap mb-10">
        <div className="landing-compare-grid">
          {COMPARE_ITEMS.map((item) => (
            <div
              key={item.label}
              className={cn(
                "landing-compare-card flex !h-auto min-h-[210px] flex-col overflow-hidden !p-0 text-center",
                item.cardClassName,
              )}
            >
              <div className="relative h-[160px] w-full shrink-0">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="rounded-t-[12px] object-cover"
                  sizes="(max-width: 480px) 45vw, 220px"
                />
              </div>
              <p
                className={cn(
                  "flex flex-1 items-center justify-center break-keep px-3 py-3 text-[13px] font-bold leading-normal",
                  item.labelClassName,
                )}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 text-center">
        <p className="text-xs text-[#888888]">보험이 만들어주는 변화</p>
        <p className="mt-1.5 break-keep text-base font-extrabold leading-normal text-[#0F3460]">
          짐이 되는 환자에서
          <br />
          끝까지 가족을 지키는 가장으로
        </p>
      </div>

      <CtaButton variant="hero" section="성공">
        지금 확인하기
      </CtaButton>
    </section>
  )
}
