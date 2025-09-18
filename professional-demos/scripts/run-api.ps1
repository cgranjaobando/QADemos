param(
    [int]$Port = 5001
)

$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    Write-Error 'python executable not found on PATH.'
    exit 1
}

$env:FLASK_RUN_PORT = $Port
$scriptPath = Join-Path $PSScriptRoot '..\demos\qa\swaglabs-playwright\api\server.py'
$scriptPath = (Resolve-Path $scriptPath).ProviderPath

Write-Host "Starting synthetic checkout API on port $Port"
& python $scriptPath
