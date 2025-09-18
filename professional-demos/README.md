# Professional Demos

[![CI](https://github.com/cgranjaobando/professional-demos/actions/workflows/ci.yml/badge.svg)](https://github.com/cgranjaobando/professional-demos/actions/workflows/ci.yml)
[![Docs](https://github.com/cgranjaobando/professional-demos/actions/workflows/pages.yml/badge.svg)](https://github.com/cgranjaobando/professional-demos/actions/workflows/pages.yml)

Portfolio repository for QA automation, CRO experimentation, search analytics, and delivery playbook demos. Every slice is deterministic, runs locally with minimal dependencies, and publishes artifacts in CI. The initial release showcases Swag Labs (https://www.saucedemo.com) and the repo structure is ready to hold additional public properties or local replicas.

## Concept

- **Multi-track coverage:** QA, CRO, Search, and PM assets live side by side so stakeholders can see how each discipline approaches the same product surface.
- **Scalable layout:** Add new sites under `demos/<track>/<site-id>/` and reuse shared helpers, scripts, and docs templates.
- **Reproducible artifacts:** Playwright reports, axe findings, visual baselines, k6 smoke summaries, and ranking metrics output are all generated with a single-command workflow.

## Current Focus (Swag Labs)

| Track | Path | Highlights |
|-------|------|------------|
| QA Automation | `demos/qa/swaglabs-playwright/` | Playwright tests (login → checkout), axe scans, visual baselines, synthetic API, k6 smoke |
| CRO Experimentation | `demos/cro/swaglabs-hero-variants/` | Control vs Variant HTML, CRO hypothesis, metrics, and launch checklist |
| Search Evaluation | `demos/search/ranking-metrics-notebook/` | Synthetic judgments, NDCG/MAP notebook + CLI, exported metrics |
| Delivery Playbook | `demos/pm/delivery-playbook/` | RACI matrix, risk log, cadence blueprint |

## Quickstart (Windows PowerShell)

```powershell
cd C:\Users\<you>\Projects
git clone https://github.com/cgranjaobando/professional-demos.git 
cd professional-demos

pwsh -File scripts/setup.ps1 -InstallBrowsers  # Node deps + Playwright browsers + Python venv

npm test              # full Playwright suite
npm run a11y          # axe-only scan
npm run visual        # compare against stored baseline
npm run visual:demo   # apply override to see diff artifacts
```

## Synthetic API & k6 Smoke

```powershell
# Terminal 1
. .\.venv\Scripts\Activate.ps1
python demos/qa/swaglabs-playwright/api/server.py

# Terminal 2
npm run api:smoke
```

## Ranking Metrics CLI

```powershell
. .\.venv\Scripts\Activate.ps1
python demos/search/ranking-metrics-notebook/calc_metrics.py --output demos/search/ranking-metrics-notebook/outputs/metrics_summary.csv
```

## Docs & CI

- MkDocs Material docs: `mkdocs serve` for local preview, `mkdocs build` in CI
- GitHub Actions workflows: `.github/workflows/ci.yml` (tests + artifacts) and `.github/workflows/pages.yml` (docs deploy)
- HTML/JSON artifacts: `playwright-report/`, `test-results/`, `demos/search/ranking-metrics-notebook/outputs/`

## Adding Another Demo Site

1. Create a new folder beneath the relevant track: `demos/<track>/<site-id>/`.
2. Copy the Swag Labs scaffolding (helpers, tests, README) and adapt credentials/data for the new property.
3. Update docs (`docs/*.md`) with a quickstart and artifact links for the new site.
4. Commit; CI will pick up new tests, CLI scripts, and docs automatically if paths follow the existing conventions.

## Contributing Guidelines

- Favor accessible selectors (`getByRole`, `data-test` attrs) to keep flakes down.
- Refresh visual baselines intentionally via `npm run visual:update` before shipping UI changes.
- Store artifacts under the existing folders for easy diffing and CI uploads.
- Use only synthetic or public data—never commit client secrets.

Copy the patterns, add the next site, and the repo will surface automation, CRO, analytics, and delivery insights in one place.
