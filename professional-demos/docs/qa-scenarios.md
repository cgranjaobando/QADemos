# Swag Labs QA Scenario Matrix

This test plan enumerates the end-to-end coverage for the Swag Labs demo. It aligns with ISTQB-style best practices: clear objectives, traceability between requirements and tests, and explicit ownership of automated vs manual checks.

## Test Charter

- **Scope:** Public Swag Labs site (authentication, inventory list, PDP/cart, checkout).
- **Out-of-scope:** Back-office admin flows, payment processor integrations, performance/load (tracked separately via k6).
- **Primary risks:** Credential lockouts, incorrect cart math, visual regressions that obscure CTAs, accessibility violations that block keyboard users.
- **Environments:** Production `https://www.saucedemo.com`, default users (`standard_user`, `locked_out_user`). Synthetic API and k6 smoke run locally only.

## Entry & Exit Criteria

| Stage | Entry Criteria | Exit Criteria |
|-------|----------------|---------------|
| Test Planning | Requirements captured in README/docs | Scenario matrix baselined & approved |
| Test Execution | Playwright project bootstrapped, creds available | All high/critical scenarios automated or executed manually |
| Regression | CI workflow green, artifacts archived | No open critical defects, visual/a11y diffs triaged |

## Scenario Traceability Matrix

| ID | Title | Type | Priority | Coverage | Data | Expected Result |
|----|-------|------|----------|----------|------|-----------------|
| QA-01 | Login with standard user | Functional (Positive) | High | `tests/login.spec.ts` › allows standard user | `standard_user/secret_sauce` | Inventory page loads; title shows **Products** |
| QA-02 | Login blocked for locked user | Functional (Negative) | High | `tests/login.spec.ts` › blocks locked user | `locked_out_user/secret_sauce` | Error banner renders: *Sorry, this user has been locked out.* |
| QA-03 | Inventory sort low→high | Functional | Medium | `tests/inventory.spec.ts` | Any authenticated session | Prices display ascending numerically |
| QA-04 | Add/remove items and verify badge | Functional | High | `tests/cart.spec.ts` | Backpack + Bike Light | Cart badge increments to 2, decrements after removal |
| QA-05 | Cart summary math | Functional | High | `tests/cart.spec.ts` | Backpack + Bike Light | Subtotal equals item sum, tax ≈ 8%, total = subtotal + tax |
| QA-06 | Checkout validation | Functional (Negative) | High | `tests/checkout.spec.ts` › validation | Empty form fields | STEP ONE errors show for missing fields |
| QA-07 | Checkout happy path | Functional (Positive) | High | `tests/checkout.spec.ts` › happy path | Customer data fixture | Order completes with *Thank you for your order!* |
| QA-08 | Inventory accessibility scan | Accessibility | Critical | `tests/a11y.spec.ts` › inventory page | N/A | Axe violations logged and attached; none at critical level |
| QA-09 | Checkout Step Two accessibility scan | Accessibility | Critical | `tests/a11y.spec.ts` › checkout step two | Cart with item | Axe violations logged and attached |
| QA-10 | Visual baseline - inventory | Visual Regression | High | `tests/visual.spec.ts` | N/A | Screenshot matches baseline within tolerances |
| QA-11 | Synthetic API smoke | API Smoke | Medium | `scripts/run-api-smoke.ps1` / `api/smoke.js` | Local Flask service | `/health`, `/inventory`, `/checkout/summary` respond with 200 & expected payloads |
| QA-12 | k6 smoke execution | Performance Smoke | Medium | `npm run api:smoke` (k6) | Local API | 95th percentile request < 500 ms |

## Manual / Exploratory Backlog

| ID | Title | Purpose | Frequency | Notes |
|----|-------|---------|-----------|-------|
| EXP-01 | Cross-browser sanity (Firefox/Safari) | Validate layout & login | Release candidate | Can reuse Playwright via additional projects when prioritized |
| EXP-02 | Responsive viewport sweep | Assess mobile breakpoints | Monthly | Use Playwright device emulation or manual BrowserStack session |
| EXP-03 | Accessibility manual audit | Screen reader + keyboard | Quarterly | Pair with axe reports; document findings in risk log |

## Reporting & Artifacts

- Playwright HTML: `playwright-report/index.html`
- Traces & attachments: `test-results/`
- Axe JSON summaries: `test-results/a11y/*.json`
- Visual baselines & diffs: `demos/qa/swaglabs-playwright/tests/visual.spec.ts-snapshots/` and `test-results/visual-*`
- k6 output: console log (CI artifact when run) and synthetic API README

## Maintenance Checklist

1. Update this matrix when new features/tests are added.
2. Re-run `npm run visual:update` on intentional UI changes and document diff approval.
3. Review axe reports; ticket any recurrent WCAG AA violations.
4. Monitor CI for flaky retries (2 retries configured in `playwright.config.ts`). Deflake before accepting releases.
5. Leverage MkDocs (`docs/qa.md`) for linking new reports or dashboards.
