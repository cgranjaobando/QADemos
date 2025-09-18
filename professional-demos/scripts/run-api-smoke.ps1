param(
    [string]$BaseUrl = "http://127.0.0.1:5001"
)

$k6Candidates = @(
    "k6",
    "C:\\Program Files\\k6\\k6.exe",
    "C:\\Program Files (x86)\\k6\\k6.exe"
)

$k6Exe = $null
foreach ($candidate in $k6Candidates) {
    try {
        $command = Get-Command $candidate -ErrorAction Stop
        $k6Exe = $command.Source
        break
    } catch {
        if (Test-Path $candidate) {
            $k6Exe = $candidate
            break
        }
    }
}

if (-not $k6Exe) {
    Write-Error "k6 executable not found. Install via winget install k6 (Windows) or download from https://k6.io/docs/get-started/installation/"
    exit 1
}

Write-Host "Using k6 executable at $k6Exe" -ForegroundColor Cyan

& $k6Exe run --env API_BASE_URL=$BaseUrl "demos/qa/swaglabs-playwright/api/smoke.js"
exit $LASTEXITCODE
