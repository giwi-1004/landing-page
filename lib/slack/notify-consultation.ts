export type ConsultationSlackPayload = {
  name: string
  phone: string
  message?: string
}

const DEFAULT_INQUIRY_MESSAGE = "무료 보험 분석 · 전화 상담 신청"

function getSlackWebhookUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL?.trim() ||
    process.env.SLACK_WEBHOOK_URL?.trim() ||
    ""
  )
}

function buildSlackText({ name, phone, message }: ConsultationSlackPayload): string {
  const inquiry = message?.trim() || DEFAULT_INQUIRY_MESSAGE

  return [
    "🚨 [신규 상담 신청 접수]",
    `• 고객명: ${name}`,
    `• 연락처: ${phone}`,
    `• 문의내용: ${inquiry}`,
  ].join("\n")
}

/** Supabase 저장 성공 후 서버에서만 호출하세요. */
export async function notifyConsultationToSlack(
  payload: ConsultationSlackPayload,
): Promise<boolean> {
  const webhookUrl = getSlackWebhookUrl()
  if (!webhookUrl) {
    console.warn("[slack] NEXT_PUBLIC_SLACK_WEBHOOK_URL 이 설정되지 않았습니다.")
    return false
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: buildSlackText(payload) }),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      console.error("[slack] Webhook failed:", res.status, body)
      return false
    }

    return true
  } catch (error) {
    console.error("[slack] Webhook error:", error)
    return false
  }
}
