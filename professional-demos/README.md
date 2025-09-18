# Professional Demos

[![CI](https://github.com/cgranjaobando/professional-demos/actions/workflows/ci.yml/badge.svg)](https://github.com/cgranjaobando/professional-demos/actions/workflows/ci.yml)
[![Docs](https://github.com/cgranjaobando/professional-demos/actions/workflows/pages.yml/badge.svg)](https://github.com/cgranjaobando/professional-demos/actions/workflows/pages.yml)

Hands-on portfolio of QA automation, CRO experimentation, search analytics, and delivery playbook assets. Every demo is deterministic, runs locally with minimal dependencies, and publishes artifacts in CI.

## Quickstart (Windows PowerShell)

```powershell
# 1. Clone
git clone https://github.com/cgranjaobando/professional-demos.git
cd professional-demos

# 2. Install toolchain (Node, Python packages, optional browsers)
pwsh -File scripts/setup.ps1 -InstallBrowsers

# 3. Run the Swag Labs Playwright slice
npm test

# 4. Accessibility-only scan
npm run a11y

# 5. Visual regression baseline + diff demo
npm run visual:update   # record baseline
npm run visual          # compare
npm run visual:demo     # apply override + view diff artifacts
```

## Demo Index

| Track | Path | Highlights |
|-------|------|------------|
| QA Automation | `demos/qa/swaglabs-playwright/` | Playwright tests (login, inventory, cart math, checkout, axe scans, visual baselines) + synthetic API + k6 smoke |
| CRO Experimentation | `demos/cro/swaglabs-hero-variants/` | Control vs Variant A hero HTML, CRO hypothesis + MDE plan |
| Search Evaluation | `demos/search/ranking-metrics-notebook/` | Synthetic judgments, NDCG/MAP script, notebook, exported metrics |
| Delivery Playbook | `demos/pm/delivery-playbook/` | RACI, risk log, cadence blueprint for multi-track delivery |

Docs live at **docs/** and publish via MkDocs Material to GitHub Pages (see `docs/index.md`).

## Synthetic API & k6 Smoke

```powershell
# Terminal 1: start the API
. .\.venv\Scripts\Activate.ps1
python demos/qa/swaglabs-playwright/api/server.py

# Terminal 2: run the smoke
npm run api:smoke
```

Endpoints mirror Swag Labs cart totals so k6 can run deterministic checks without touching external services.

## Ranking Metrics CLI

```powershell
. .\.venv\Scripts\Activate.ps1
python demos/search/ranking-metrics-notebook/calc_metrics.py --output demos/search/ranking-metrics-notebook/outputs/metrics_summary.csv
```

Outputs NDCG@3/5 and MAP@3/5 with a CSV saved for CI archival.

## Contributing

- Keep Playwright selectors accessibility-first (`getByRole`, `data-test` attributes).
- Use `npm run visual:update` before committing intentional UI changes.
- Rebuild docs locally via `mkdocs serve` after modifying Markdown.
- Never add secrets; all datasets stay synthetic.

See `docs/` for detailed walkthroughs and reproducibility notes.
