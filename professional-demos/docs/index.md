# Start Here

Professional Demos is a public portfolio of hands-on QA, CRO, search, and project management workflows. Every example favors deterministic inputs, minimal dependencies, and reproducible artifacts.

## Quickstart

```powershell
# 1. Clone the repository
git clone https://github.com/REPLACE_ME/professional-demos.git
cd professional-demos

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers (one time)
npm run playwright:install

# 4. Run the Swag Labs slice locally
npm test

# 5. Generate accessibility-only results
npm run test:a11y

# 6. Capture or verify visual baselines
npm run test:visual:update   # record
npm run test:visual          # compare
```

> Tip: The visual regression demo intentionally ships with `npm run visual:demo`, which applies a CSS override and shows the diff artifacts under `test-results/`.

## Docs Tooling

```powershell
python -m venv .venv
. .\.venv\Scripts\Activate.ps1
python -m pip install -r docs/requirements.txt
mkdocs serve
```

## Explore the Demos

- [QA Automation](qa.md) — Playwright coverage of Swag Labs, including login, cart, checkout, axe scans, and visual baselines.
- [CRO Experimentation](cro.md) — Local hero variants, hypothesis framing, and sample instrumentation plans.
- [Search Evaluation](search.md) — Synthetic relevance judgments with working NDCG and MAP calculations.
- [Delivery Playbook](pm.md) — Cadence templates, RACI mapping, and risk register examples.

Each section links back to runnable commands and artifact locations for fast reproducibility.
