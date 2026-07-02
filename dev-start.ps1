# Next.js 개발 서버 실행 (한글 경로: 탐색기에서 이 파일을 우클릭 > PowerShell에서 실행)
$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

Write-Host "폴더: $PSScriptRoot" -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js가 없습니다. https://nodejs.org 에서 LTS 설치 후 다시 실행하세요." -ForegroundColor Red
    Read-Host "종료하려면 Enter"
    exit 1
}

if (-not (Test-Path (Join-Path $PSScriptRoot "node_modules"))) {
    Write-Host "npm install 실행 중..." -ForegroundColor Yellow
    npm install
}

Write-Host "브라우저에서 http://127.0.0.1:3000 을 여세요. (localhost 대신 127.0.0.1 권장)" -ForegroundColor Green
npm run dev:127
