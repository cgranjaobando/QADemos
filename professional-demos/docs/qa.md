# QA Automation — Swag Labs Playwright

The QA slice covers the essential e-commerce flow on Swag Labs (https://www.saucedemo.com): login, inventory sorting, cart math, checkout validation, accessibility scans, and visual regression.

## Commands

```powershell
npm test                  # full Playwright suite
npm run a11y              # axe-only checks
npm run visual            # compare against stored baseline
npm run visual:update     # update baseline snapshot
npm run visual:demo       # apply CSS override to show diff artifacts
```

## Synthetic API + k6 Smoke

```powershell
# Start local API (Flask)
. .\.venv\Scripts\Activate.ps1
python demos/qa/swaglabs-playwright/api/server.py

# Run smoke from another shell
npm run api:smoke
```

The API returns health, inventory, and checkout totals so the `k6` smoke can verify math outside of third-party domains.

## Test Layout

- Specs live under `demos/qa/swaglabs-playwright/tests/`.
- Helpers encapsulate login, catalog, cart, and checkout flows (`tests/helpers/`).
- Playwright config (`playwright.config.ts`) stores reports in `playwright-report/` and `test-results/`.

## Artifacts

- Playwright HTML report: `playwright-report/index.html`
- Accessibility JSON reports: `test-results/a11y/*.json`
- Visual baselines: `demos/qa/swaglabs-playwright/tests/visual.spec.ts-snapshots/`
- Visual diff demo output: `test-results/visual-Visual-regression-inventory-baseline-chromium/`

## Traceability

- Standard and locked-out user credentials remain public test accounts from Swag Labs.
- Traces attach automatically on CI retries and on local failures.
- All selectors prefer accessible roles/names or `data-test` attributes to reduce flake.
