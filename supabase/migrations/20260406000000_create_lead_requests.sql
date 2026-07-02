-- 랜딩 페이지 무료 확인 요청 (이름, 전화번호)
-- Supabase 대시보드 → SQL Editor에서 실행하거나, Supabase CLI로 마이그레이션 적용
-- 한 번에 실행: setup_lead_requests_full.sql 참고

create table if not exists public.lead_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  phone text not null check (char_length(trim(phone)) > 0),
  created_at timestamptz not null default now()
);

comment on table public.lead_requests is '랜딩 무료 확인 요청';

create index if not exists lead_requests_created_at_idx
  on public.lead_requests (created_at desc);

alter table public.lead_requests enable row level security;
