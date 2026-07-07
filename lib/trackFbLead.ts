"use client"

import { META_PIXEL_ID } from "@/lib/fbPixelId"
import { createLeadEventId } from "@/lib/meta/lead-event-id"

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

export function trackMetaLead(options?: {
  eventID?: string
  userData?: MetaPixelUserData
  source?: string
}) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return
  }

  const eventID = options?.eventID ?? createLeadEventId()
  const userData = options?.userData

  const matchedParams: Record<string, string> = {}
  if (userData?.fn?.trim()) matchedParams.fn = userData.fn.trim()
  if (userData?.ph?.trim()) matchedParams.ph = userData.ph.trim()
  if (userData?.em?.trim()) matchedParams.em = userData.em.trim()

  window.fbq("track", "Lead", matchedParams, { eventID })

  console.log("[fb-lead] tracked", {
    eventID,
    userData: userData ?? null,
    source: options?.source ?? null,
  })
}
