# Ranking Metrics Notebook

Synthetic evaluation harness for Swag Labs search relevance. The assets let you calculate NDCG and MAP against staged judgments without exposing production data.

## Contents

| File | Purpose |
|------|---------|
| `data/judgments.csv` | Graded relevance labels (0–3) per query/document pair |
| `data/runs.csv` | Example model rankings with ranks and scores |
| `calc_metrics.py` | Script to compute NDCG@k and MAP@k summaries |
| `ndcg-map.ipynb` | Walkthrough notebook with visual explanations |
| `outputs/` | Folder for stored metric exports |

## Usage

```powershell
# Install dependencies
python -m pip install -r requirements.txt

# Run the CLI to generate a metrics summary
python calc_metrics.py --output outputs/metrics_summary.csv

# (Optional) open the notebook
code ndcg-map.ipynb
```

The CLI prints a Markdown table and saves the CSV for CI archival. Swap in your own synthetic data to model alternate ranking scenarios, or wire the script into GitHub Actions as a smoke check.
