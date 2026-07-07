-- consultations 테이블에 유입 경로 구분 컬럼 추가 (form | kakao)
alter table public.consultations
  add column if not exists source text not null default 'form';

comment on column public.consultations.source is '신청 경로: form(전화 상담 폼), kakao(오픈채팅)';
