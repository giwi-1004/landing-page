-- 정적 호스팅(GitHub Pages 등)에서는 Next API가 없음 → 브라우저에서 anon으로 insert.
-- Vercel 등에서 서버 API를 쓰는 경우에도 병행 가능(service_role은 RLS 우회).
grant insert on public.lead_requests to anon;

create policy "lead_requests_anon_insert"
  on public.lead_requests
  for insert
  to anon
  with check (true);
