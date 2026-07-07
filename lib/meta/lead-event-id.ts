/** 브라우저 픽셀·CAPI Lead 이벤트 dedup용 공통 event_id */
export function createLeadEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `lead_${crypto.randomUUID()}`
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`
}
