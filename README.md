# Professional Demos

[![CI](https://github.com/cgranjaobando/professional-demos/actions/workflows/ci.yml/badge.svg)](https://github.com/cgranjaobando/professional-demos/actions/workflows/ci.yml)
[![Docs](https://github.com/cgranjaobando/professional-demos/actions/workflows/pages.yml/badge.svg)](https://github.com/cgranjaobando/professional-demos/actions/workflows/pages.yml)

Portfolio repository for QA automation, CRO experimentation, search analytics, and delivery playbook demos. Every slice is designed to be deterministic, runnable on Windows, and ready for CI publishing. The initial release showcases Swag Labs (https://www.saucedemo.com), and the layout is ready to host additional public sites or local replicas as new demos are added.

## Concept

- **Multi-track coverage:** Each demo highlights a discipline--automation, CRO, search evaluation, or project delivery--with shared conventions and helper tooling.
- **Scalable structure:** New sites slot into `demos/<track>/<site-id>/`, reusing shared scripts, docs templates, and CI jobs.
- **Reproducible artifacts:** Playwright reports, axe findings, visual baselines, k6 smoke outputs, and metric summaries are stored under versioned folders for traceability.

## Current Focus (Swag Labs)

| Track | Path | Highlights |
|-------|------|------------|
| QA Automation | `demos/qa/swaglabs-playwright/` | Playwright tests for login -> checkout, axe scans, visual baselines, synthetic checkout API + k6 smoke |
| CRO Experimentation | `demos/cro/swaglabs-hero-variants/` | Control vs Variant HTML, hypothesis & MDE plan |
| Search Evaluation | `demos/search/ranking-metrics-notebook/` | Synthetic judgments, NDCG/MAP CLI + notebook |
| Delivery Playbook | `demos/pm/delivery-playbook/` | RACI matrix, risk log, cadence blueprint |

## Adding Another Demo Site

1. Create a folder under the relevant track (e.g., `demos/qa/newsite-playwright/`).
2. Follow the existing Swag Labs scaffolding (helpers, tests, data, README) to ensure commands and reports mirror current patterns.
3. Update MkDocs navigation (`docs/*.md`) and add track-specific instructions or links to new artifacts.
4. Extend CI or scripts only as needed--most workflows detect new content automatically as long as file paths follow the established naming.

## Quickstart (Windows PowerShell)

```powershell
# Clone
cd C:\Users\<you>\Projects
git clone https://github.com/cgranjaobando/professional-demos.git
cd professional-demos

# Install toolchain (Node, browsers, Python deps)
pwsh -File scripts/setup.ps1 -InstallBrowsers

# Run the Swag Labs Playwright slice
npm test

# Accessibility-only scan
npm run a11y

# Visual regression baseline + diff demo
npm run visual:update   # record baseline
npm run visual          # compare
npm run visual:demo     # apply override + view diff artifacts
```

## Synthetic API & k6 Smoke

```powershell
# Terminal 1: start the API
. .\.venv\Scripts\Activate.ps1
python demos/qa/swaglabs-playwright/api/server.py

# Terminal 2: run the smoke
npm run api:smoke
```

## Ranking Metrics CLI

```powershell
. .\.venv\Scripts\Activate.ps1
python demos/search/ranking-metrics-notebook/calc_metrics.py --output demos/search/ranking-metrics-notebook/outputs/metrics_summary.csv
```

## Docs & CI

- MkDocs Material site: `docs/` -> `mkdocs serve`
- GitHub Actions workflows: `.github/workflows/ci.yml`, `.github/workflows/pages.yml`
- Static site published via GitHub Pages (Actions deploy job).

## Contributing Guidelines

- Keep selectors accessibility-first (`getByRole`, `data-test` attributes).
- Update visual baselines intentionally (`npm run visual:update`).
- Capture new artifacts under the relevant `test-results/` or `outputs/` directories.
- Never commit secrets; only synthetic or public data is allowed.

The repo stays ready for additional demos--copy the Swag Labs patterns, adjust data to the new site, and you’ll have end-to-end coverage, reports, and documentation with minimal extra wiring.





