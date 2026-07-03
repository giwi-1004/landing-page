export const META_PIXEL_ID = "3320336271481355"

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

/**
 * Meta Pixel Lead 이벤트. 폼 제출 성공 시 userData(fn, ph)로 init 재호출 후
 * fbq('track', 'Lead', {}, { eventID }) 전송. Meta가 PII 해싱을 처리한다.
 */
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

  // 완료 후 제거 예정 — 개발자도구 확인용
  console.log("[Meta Pixel] Lead", {
    eventID,
    userData: userData ?? null,
    source: options?.source ?? null,
  })
}
