-- =============================================================================
-- 랜딩 신청: 이름(name) + 전화번호(phone) 저장
-- 새 Supabase 프로젝트 만든 뒤 → SQL Editor에 붙여넣고 한 번 실행
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 시간대: DB 세션 기본값 서울 (migrations/20260406120000 참고)
-- Table Editor는 timestamptz(created_at)를 UTC(+00)로 보여주는 경우가 많아,
-- 아래 created_at_kst 생성 컬럼으로 한국 벽시계 시각을 확인하세요.
-- ---------------------------------------------------------------------------
alter database postgres set timezone to 'Asia/Seoul';

create table if not exists public.lead_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  phone text not null check (char_length(trim(phone)) > 0),
  created_at timestamptz not null default now()
);

-- 이미 예전 스크립트로 만든 테이블에도 컬럼만 추가
alter table public.lead_requests
  add column if not exists created_at_kst timestamp
  generated always as (created_at at time zone 'Asia/Seoul') stored;

comment on column public.lead_requests.created_at_kst is
  '한국 표준시(KST) 벽시계 시각. created_at 과 동일 시점이며 표시용입니다.';

comment on table public.lead_requests is '랜딩 무료 확인 요청 (이름, 전화번호)';

create index if not exists lead_requests_created_at_idx
  on public.lead_requests (created_at desc);

alter table public.lead_requests enable row level security;

-- ---------------------------------------------------------------------------
-- 접근 분리
-- · Secret 키(서버만): Next /api/leads → RLS 우회하여 insert (권장 경로)
-- · Publishable 키(브라우저): PC·모바일에서 API가 없을 때 insert만 허용
--   anon 은 SELECT/UPDATE/DELETE 정책 없음 → 다른 사람 행 조회 불가
-- ---------------------------------------------------------------------------
grant insert on public.lead_requests to anon;

drop policy if exists "lead_requests_anon_insert" on public.lead_requests;

create policy "lead_requests_anon_insert"
  on public.lead_requests
  for insert
  to anon
  with check (true);
