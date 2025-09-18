# Search Evaluation — Ranking Metrics Notebook

This demo focuses on ranking quality metrics using synthetic judgments so you can validate scoring pipelines without any private data.

## Assets

- Synthetic judgments: `demos/search/ranking-metrics-notebook/data/judgments.csv`
- Jupyter notebook: `demos/search/ranking-metrics-notebook/ndcg-map.ipynb`
- Companion script (optional): `demos/search/ranking-metrics-notebook/calc_metrics.py`

## Workflow

1. Activate the project virtual environment (see [Start Here](index.md#quickstart)).
2. Install analytics dependencies:

```powershell
python -m pip install -r demos/search/ranking-metrics-notebook/requirements.txt
```

3. Open the notebook in VS Code or Jupyter Lab and run all cells. Outputs include:
   - NDCG@5 and NDCG@10 for sample query sets
   - Mean average precision (MAP)
   - Precision/recall table for quick regression checks

4. Export run artifacts (CSV/HTML) to `demos/search/ranking-metrics-notebook/outputs/` for sharing.

## Extending

- Replace `judgments.csv` with new query-document grades to model different domains.
- Wire the `calc_metrics.py` script into CI for automated smoke validation once the notebook logic is finalized.
