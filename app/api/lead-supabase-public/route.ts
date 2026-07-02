import { NextResponse } from "next/server"

/**
 * 브라우저 번들에 NEXT_PUBLIC_* 가 없을 때(Vercel에 서버 변수만 넣은 경우)
 * 런타임에 publishable 키·URL만 내려줌. Secret 은 절대 포함하지 않음.
 */
export async function GET() {
  const url = (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    ""
  ).trim()
  const anonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  ).trim()

  if (!url || !anonKey) {
    return NextResponse.json({ ok: false as const })
  }

  return NextResponse.json({ ok: true as const, url, anonKey })
}
