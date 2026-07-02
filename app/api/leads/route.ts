import { NextResponse } from "next/server"

import {
  formatKoreanPhoneForStorage,
  normalizeKoreanPhoneToDigits,
} from "@/lib/normalize-kr-phone"
import { notifyConsultationToSlack } from "@/lib/slack/notify-consultation"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin"

const CONFIG_HINT_DEV =
  "Supabase 환경 변수가 없습니다. 프로젝트 루트에 .env.local 을 만들고 SUPABASE_SERVICE_ROLE_KEY 와 SUPABASE_URL(또는 NEXT_PUBLIC_SUPABASE_URL)을 넣은 뒤 개발 서버를 다시 시작하세요."

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 })
  }

  const name = typeof (body as { name?: unknown }).name === "string"
    ? (body as { name: string }).name.trim()
    : ""
  const phone = typeof (body as { phone?: unknown }).phone === "string"
    ? (body as { phone: string }).phone.trim()
    : ""
  const agreed = (body as { agreed?: unknown }).agreed === true
  const message =
    typeof (body as { message?: unknown }).message === "string"
      ? (body as { message: string }).message.trim()
      : ""

  if (!name || !phone) {
    return NextResponse.json({ message: "이름과 전화번호를 입력해주세요." }, { status: 400 })
  }

  if (!agreed) {
    return NextResponse.json(
      { message: "개인정보 수집 및 이용에 동의해주세요." },
      { status: 400 },
    )
  }

  const phoneDigits = normalizeKoreanPhoneToDigits(phone)
  if (phoneDigits.length !== 11 || !phoneDigits.startsWith("010")) {
    return NextResponse.json(
      { message: "전화번호를 010-0000-0000 형식으로 입력해주세요." },
      { status: 400 },
    )
  }

  const phoneStored = formatKoreanPhoneForStorage(phoneDigits)

  if (!isSupabaseConfigured()) {
    const isDev = process.env.NODE_ENV === "development"
    return NextResponse.json(
      {
        message: isDev
          ? CONFIG_HINT_DEV
          : "서버 설정 오류입니다. 관리자에게 문의해주세요.",
      },
      { status: 503 },
    )
  }

  let supabase
  try {
    supabase = getSupabaseAdmin()
  } catch {
    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? CONFIG_HINT_DEV
            : "서버 설정 오류입니다. 관리자에게 문의해주세요.",
      },
      { status: 503 },
    )
  }

  const { error } = await supabase.from("consultations").insert({
    name,
    phone: phoneStored,
    agreed: true,
  })

  if (error) {
    console.error("[api/leads] Supabase insert error:", error.message, error.details)
    const isDev = process.env.NODE_ENV === "development"
    return NextResponse.json(
      {
        message: isDev
          ? `저장 실패: ${error.message}`
          : "저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 },
    )
  }

  await notifyConsultationToSlack({
    name,
    phone: phoneStored,
    message: message || undefined,
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
