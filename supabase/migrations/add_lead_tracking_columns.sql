-- =============================================================================
-- 실행 방법
-- Supabase 대시보드 → SQL Editor → New query → 전체 복사 → Run
--
-- 참고: 기존 프로젝트는 public.lead_requests 를 쓰고 있을 수 있음.
--       public.leads 는 별도 테이블로 생성된다.
-- =============================================================================

-- 테이블이 없으면 기본 컬럼 + 추적 컬럼까지 한 번에 생성
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  phone text not null check (char_length(trim(phone)) > 0),
  created_at timestamptz not null default now(),
  utm_campaign text,
  utm_ad text,
  utm_source text,
  status text default 'new',
  grade text,
  memo text,
  first_contact_at timestamptz
);

-- 이미 예전에 leads 가 있었지만 위 컬럼이 없을 때만 추가
alter table public.leads
  add column if not exists utm_campaign text,
  add column if not exists utm_ad text,
  add column if not exists utm_source text,
  add column if not exists status text default 'new',
  add column if not exists grade text,
  add column if not exists memo text,
  add column if not exists first_contact_at timestamptz;

comment on table public.leads is '랜딩 리드(UTM·상태 추적)';
comment on column public.leads.utm_campaign is 'UTM 캠페인 식별자(광고 캠페인명 등)';
comment on column public.leads.utm_ad is '광고 소재/크리에이티브 구분';
comment on column public.leads.utm_source is '유입 매체(예: google, kakao)';
comment on column public.leads.status is '리드 처리 상태(기본값 new)';
comment on column public.leads.grade is '리드 등급/점수 구분';
comment on column public.leads.memo is '내부 메모';
comment on column public.leads.first_contact_at is '최초 연락(첫 터치) 시각';

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

grant insert on public.leads to anon;

drop policy if exists "leads_anon_insert" on public.leads;

create policy "leads_anon_insert"
  on public.leads
  for insert
  to anon
  with check (true);
