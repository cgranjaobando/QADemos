param(
    [string]$OverrideCss = "demos/qa/swaglabs-playwright/visual/inventory-override.css"
)

$env:PLAYWRIGHT_VISUAL_OVERRIDE_CSS = (Resolve-Path $OverrideCss)
Write-Host "Applying visual override CSS from $($env:PLAYWRIGHT_VISUAL_OVERRIDE_CSS)"

$exitCode = 0
try {
    npx --yes playwright test demos/qa/swaglabs-playwright/tests/visual.spec.ts
    $exitCode = $LASTEXITCODE
} finally {
    Remove-Item Env:PLAYWRIGHT_VISUAL_OVERRIDE_CSS -ErrorAction SilentlyContinue | Out-Null
}

exit $exitCode
