import { META_PIXEL_ID } from "@/lib/fbPixelId"
import {
  hashEmailForMeta,
  hashFirstNameForMeta,
  hashPhoneForMeta,
} from "@/lib/meta/hash-user-data"

const META_GRAPH_API_VERSION = "v21.0"

export type MetaCapiLeadPayload = {
  eventId: string
  eventSourceUrl?: string
  clientIpAddress?: string
  clientUserAgent?: string
  userData?: {
    email?: string
    phone?: string
    firstName?: string
  }
}

function getMetaCapiToken(): string {
  return process.env.META_CAPI_TOKEN?.trim() || ""
}

export async function sendMetaCapiLead(payload: MetaCapiLeadPayload): Promise<boolean> {
  const accessToken = getMetaCapiToken()
  if (!accessToken) {
    console.warn("[meta-capi] META_CAPI_TOKEN is not configured — skipping Lead event")
    return false
  }

  const userData: Record<string, string | string[]> = {}

  const email = payload.userData?.email?.trim()
  if (email) {
    userData.em = [hashEmailForMeta(email)]
  }

  const phone = payload.userData?.phone?.trim()
  if (phone) {
    const hashedPhone = hashPhoneForMeta(phone)
    if (hashedPhone) userData.ph = [hashedPhone]
  }

  const firstName = payload.userData?.firstName?.trim()
  if (firstName) {
    const hashedName = hashFirstNameForMeta(firstName)
    if (hashedName) userData.fn = [hashedName]
  }

  if (payload.clientIpAddress) {
    userData.client_ip_address = payload.clientIpAddress
  }
  if (payload.clientUserAgent) {
    userData.client_user_agent = payload.clientUserAgent
  }

  const eventData: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.eventId,
    action_source: "website",
    user_data: userData,
  }

  if (payload.eventSourceUrl) {
    eventData.event_source_url = payload.eventSourceUrl
  }

  const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [eventData] }),
    })

    const body = (await res.json().catch(() => null)) as {
      events_received?: number
      messages?: string[]
      error?: { message?: string; code?: number }
    } | null

    if (!res.ok) {
      console.error("[meta-capi] Lead failed:", {
        eventId: payload.eventId,
        status: res.status,
        error: body?.error?.message ?? body?.messages?.join(", ") ?? "unknown error",
      })
      return false
    }

    console.log("[meta-capi] Lead sent:", {
      eventId: payload.eventId,
      eventsReceived: body?.events_received ?? 0,
    })
    return true
  } catch (error) {
    console.error("[meta-capi] Lead request error:", {
      eventId: payload.eventId,
      error,
    })
    return false
  }
}
