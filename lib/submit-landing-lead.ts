import {
  formatKoreanPhoneForStorage,
  normalizeKoreanPhoneToDigits,
} from "@/lib/normalize-kr-phone"

export type SubmitLeadResult = { ok: true } | { ok: false; message: string }

type LeadApiResponse = { ok?: unknown; message?: string } | null

async function postLeadApi(body: Record<string, unknown>): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = (await res.json().catch(() => null)) as LeadApiResponse

    if (res.status === 201 && data?.ok === true) {
      return { ok: true }
    }

    return {
      ok: false,
      message: data?.message ?? "저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
    }
  } catch {
    return {
      ok: false,
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}

/**
 * 카카오 오픈채팅 클릭 시 서버에 리드 기록 (source: kakao) + CAPI
 */
export async function submitKakaoLead(metaEventId: string): Promise<SubmitLeadResult> {
  return postLeadApi({
    source: "kakao",
    metaEventId,
  })
}

/**
 * 서버 API(/api/leads)를 통해 Supabase consultations 테이블에 저장합니다.
 */
export async function submitLandingLead(
  name: string,
  phoneInput: string,
  agreed: boolean,
  metaEventId?: string,
): Promise<SubmitLeadResult> {
  const trimmedName = name.trim()
  const trimmedPhone = phoneInput.trim()

  if (!trimmedName || !trimmedPhone) {
    return { ok: false, message: "이름과 전화번호를 입력해주세요." }
  }

  if (!agreed) {
    return { ok: false, message: "개인정보 수집 및 이용에 동의해주세요." }
  }

  const phoneDigits = normalizeKoreanPhoneToDigits(trimmedPhone)
  if (phoneDigits.length !== 11 || !phoneDigits.startsWith("010")) {
    return { ok: false, message: "전화번호를 010-0000-0000 형식으로 입력해주세요." }
  }

  const phoneStored = formatKoreanPhoneForStorage(phoneDigits)

  return postLeadApi({
    name: trimmedName,
    phone: phoneStored,
    agreed: true,
    source: "form",
    ...(metaEventId ? { metaEventId } : {}),
  })
}
