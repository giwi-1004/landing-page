-- consultations 테이블에 희망 상담시간 컬럼 추가 (선택 사항, null 허용)
alter table public.consultations
  add column if not exists preferred_time text;

comment on column public.consultations.preferred_time is '희망 상담시간 (선택): 오전/오후/저녁/아무 때나 등';
