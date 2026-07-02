import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * 서버 전용. Secret / service_role 키는 브라우저에 넣지 마세요 (NEXT_PUBLIC_ 금지).
 *
 * URL: SUPABASE_URL(권장) 또는 NEXT_PUBLIC_SUPABASE_URL
 * 키: SUPABASE_SERVICE_ROLE_KEY — 대시보드의 Secret(sb_secret_…) 또는 JWT service_role
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    ""
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ""

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 가 설정되지 않았습니다.")
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function isSupabaseConfigured(): boolean {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    ""
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || ""
  return Boolean(url && key)
}
