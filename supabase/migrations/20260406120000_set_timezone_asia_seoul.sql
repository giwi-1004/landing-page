-- 데이터베이스 기본 시간대를 서울(Asia/Seoul, KST)로 설정합니다.
-- 새로 연결되는 세션부터 적용됩니다. (이미 열린 연결은 재접속 후 반영)
--
-- 참고: timestamptz 컬럼은 내부적으로 UTC로 저장되며,
-- Table Editor·쿼리 결과의 표시 시각이 이 설정을 따르는 경우가 많습니다.

alter database postgres set timezone to 'Asia/Seoul';
