-- Table Editor는 timestamptz를 UTC(+00)로 자주 표시합니다.
-- 한국 시각(벽시계)을 숫자로 바로 보려면 이 생성 컬럼을 사용하세요. (created_at 과 동일 순간)

alter table public.lead_requests
  add column if not exists created_at_kst timestamp
  generated always as (created_at at time zone 'Asia/Seoul') stored;

comment on column public.lead_requests.created_at_kst is
  '한국 표준시(KST) 벽시계 시각. created_at 과 동일 시점이며 표시용입니다.';
