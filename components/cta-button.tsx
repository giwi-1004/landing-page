"use client"

import { trackCtaClick } from "@/lib/gtag"
import { cn } from "@/lib/utils"

export const CONTACT_FORM_ID = "contact-form"

type CtaVariant = "solid" | "outline" | "hero" | "loss"

interface CtaButtonProps {
  children: React.ReactNode
  variant?: CtaVariant
  section?: string
  className?: string
}

function withArrow(children: React.ReactNode) {
  if (typeof children === "string") {
    const trimmed = children.trim()
    if (trimmed.endsWith("→")) return children
    return `${trimmed} →`
  }
  return (
    <>
      {children} →
    </>
  )
}

const VARIANT_STYLES: Record<CtaVariant, string> = {
  solid: "landing-cta-primary",
  outline: "landing-cta-primary",
  hero: "landing-cta-primary",
  loss: "landing-cta-primary",
}

export function CtaButton({
  children,
  variant = "solid",
  section,
  className,
}: CtaButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        trackCtaClick(
          typeof children === "string" ? children.trim() : (section ?? "CTA"),
          section ?? "CTA",
        )
        document.getElementById(CONTACT_FORM_ID)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }}
      className={cn(VARIANT_STYLES[variant], className)}
    >
      {withArrow(children)}
    </button>
  )
}
