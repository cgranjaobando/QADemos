<#
    Bootstrap script for local development.
    Usage: pwsh -NoLogo -NoProfile -File scripts\setup.ps1 [-InstallBrowsers]
#>
param(
    [switch]$InstallBrowsers
)

Write-Host "Installing Node dependencies" -ForegroundColor Cyan
npm install

if ($InstallBrowsers) {
    Write-Host "Installing Playwright browsers" -ForegroundColor Cyan
    npx --yes playwright install --with-deps
}

$venvPath = Join-Path (Get-Location) '.venv'
if (-not (Test-Path $venvPath)) {
    Write-Host "Creating Python virtual environment" -ForegroundColor Cyan
    python -m venv .venv
}

Write-Host "Installing Python requirements" -ForegroundColor Cyan
. .venv\Scripts\Activate.ps1
pip install -r docs/requirements.txt
pip install -r demos/search/ranking-metrics-notebook/requirements.txt
pip install -r demos/qa/swaglabs-playwright/api/requirements.txt
Deactivate

Write-Host "Setup complete" -ForegroundColor Green
