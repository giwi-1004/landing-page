import {
  formatKoreanPhoneForStorage,
  normalizeKoreanPhoneToDigits,
} from "@/lib/normalize-kr-phone"

export type SubmitLeadResult = { ok: true } | { ok: false; message: string }

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

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        phone: phoneStored,
        agreed: true,
        ...(metaEventId ? { metaEventId } : {}),
      }),
    })

    const data = (await res.json().catch(() => null)) as {
      ok?: unknown
      message?: string
    } | null

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
