# 뇌·심장 순환계 주요치료비 랜딩페이지

> **작업 폴더:** `C:\Users\user\Desktop\랜딩페이지 최최종 26.06.27`  
> **스냅샷 날짜:** 2026-06-27  
> **스택:** Next.js 16 · React 19 · Tailwind CSS 4 · Supabase · Vercel

---

## 빠른 시작 (로컬)

```powershell
cd "C:\Users\user\Desktop\랜딩페이지 최최종 26.06.27"
npm install
copy .env.example .env.local
# .env.local 에 Supabase 키 입력 후
npm run dev
```

브라우저: http://localhost:3000

---

## 배포 순서 (요약)

1. **Supabase** — 프로젝트 생성 + `supabase/setup_lead_requests_full.sql` 실행
2. **환경 변수** — `.env.local` (로컬) / Vercel Dashboard (배포)
3. **GitHub** — 이 폴더를 새 저장소에 push
4. **Vercel** — GitHub 저장소 Import → Deploy

자세한 단계는 **`배포_가이드.md`** 를 참고하세요.

---

## 주요 경로

| 역할 | 경로 |
|------|------|
| 메인 페이지 | `app/page.tsx` |
| 섹션 컴포넌트 | `components/section-*.tsx` |
| 신청 폼 | `components/landing/application-form-section.tsx` |
| 리드 API | `app/api/leads/route.ts` |
| Supabase 설정 SQL | `supabase/setup_lead_requests_full.sql` |
| 환경 변수 예시 | `.env.example` |
| Vercel 설정 | `vercel.json` |
| 랜딩 문서 | `docs/랜딩페이지.md` |

**정리됨 (2026-06-27):** 구버전 섹션, AI/ChatGPT용 파일, 미사용 shadcn UI, 중복 이미지·빌드 산출물 제거

---

## 분석

- **Meta Pixel:** `2050356035883532`
- **GA4:** `G-ZH7ZX0FWGV`
- **Vercel Analytics:** `app/layout.tsx`

---

## 주의

- `.env.local` 은 Git에 올리지 마세요 (`.gitignore` 적용됨)
- `node_modules`, `.next` 는 복사본에 포함되지 않음 → `npm install` 필요
