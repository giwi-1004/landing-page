"use client"

import { META_PIXEL_ID } from "@/lib/meta-pixel-id"

export { META_PIXEL_ID }

export type MetaPixelUserData = {
  fn?: string
  ph?: string
  em?: string
}

declare global {
  interface Window {
    fbq?: (
      command: "track" | "init",
      eventOrPixelId: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void
  }
}

function createLeadEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `lead_${crypto.randomUUID()}`
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

// 폼 제출 성공 시 userData(fn, ph)로 init 재호출 후 Lead 전송. Meta가 PII 해싱 처리.
export function trackMetaLead(options?: {
  userData?: MetaPixelUserData
  source?: string
}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return
  }

  const eventID = createLeadEventId()
  const userData = options?.userData

  if (userData) {
    const matching: Record<string, string> = {}
    if (userData.fn?.trim()) matching.fn = userData.fn.trim()
    if (userData.ph?.trim()) matching.ph = userData.ph.trim()
    if (userData.em?.trim()) matching.em = userData.em.trim()

    if (Object.keys(matching).length > 0) {
      window.fbq("init", META_PIXEL_ID, matching)
    }
  }

  window.fbq("track", "Lead", {}, { eventID })

  // TODO: remove after verification - devtools debug log
  console.log("[meta-pixel] lead tracked", {
    eventID,
    userData: userData ?? null,
    source: options?.source ?? null,
  })
}
