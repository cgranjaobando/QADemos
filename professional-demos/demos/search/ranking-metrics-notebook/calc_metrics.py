from __future__ import annotations

import argparse
import math
from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve().parent


def load_frames(judgments_path: Path, runs_path: Path) -> tuple[pd.DataFrame, pd.DataFrame]:
    judgments = pd.read_csv(judgments_path)
    runs = pd.read_csv(runs_path)
    return judgments, runs


def dcg(relevances: list[int]) -> float:
    return sum(rel / math.log2(idx + 2) for idx, rel in enumerate(relevances))


def ndcg_at_k(judgments: pd.DataFrame, runs: pd.DataFrame, k: int) -> float:
    grouped_rel = judgments.groupby("query_id")
    grouped_run = runs.groupby("query_id")
    ndcgs: list[float] = []

    for query_id, rel_group in grouped_rel:
        gains = rel_group.set_index("doc_id")["grade"]
        run = grouped_run.get_group(query_id).sort_values("rank").head(k)
        retrieved = [int(gains.get(doc_id, 0)) for doc_id in run["doc_id"]]
        ideal = sorted(gains.tolist(), reverse=True)[:k]
        denom = dcg(ideal)
        ndcg_val = dcg(retrieved) / denom if denom > 0 else 0.0
        ndcgs.append(ndcg_val)

    return sum(ndcgs) / len(ndcgs)


def average_precision(relevances: list[int]) -> float:
    hits = 0
    precision_sum = 0.0
    for idx, rel in enumerate(relevances, start=1):
        if rel > 0:
            hits += 1
            precision_sum += hits / idx
    return precision_sum / hits if hits else 0.0


def mean_average_precision(judgments: pd.DataFrame, runs: pd.DataFrame, k: int | None = None) -> float:
    grouped_rel = judgments.groupby("query_id")
    grouped_run = runs.groupby("query_id")
    ap_scores: list[float] = []

    for query_id, rel_group in grouped_rel:
        gains = rel_group.set_index("doc_id")["grade"]
        run = grouped_run.get_group(query_id).sort_values("rank")
        if k is not None:
            run = run.head(k)
        relevances = [int(gains.get(doc_id, 0)) for doc_id in run["doc_id"]]
        ap_scores.append(average_precision(relevances))

    return sum(ap_scores) / len(ap_scores)


def summarize(judgments: pd.DataFrame, runs: pd.DataFrame) -> pd.DataFrame:
    metrics = {
        "ndcg@3": ndcg_at_k(judgments, runs, 3),
        "ndcg@5": ndcg_at_k(judgments, runs, 5),
        "map@3": mean_average_precision(judgments, runs, 3),
        "map@5": mean_average_precision(judgments, runs, 5),
    }
    return pd.DataFrame([metrics])


def main() -> None:
    parser = argparse.ArgumentParser(description="Calculate ranking metrics for synthetic judgments.")
    parser.add_argument("--judgments", type=Path, default=BASE_DIR / "data" / "judgments.csv")
    parser.add_argument("--runs", type=Path, default=BASE_DIR / "data" / "runs.csv")
    parser.add_argument("--output", type=Path, default=BASE_DIR / "outputs" / "metrics_summary.csv")
    args = parser.parse_args()

    judgments, runs = load_frames(args.judgments, args.runs)
    summary = summarize(judgments, runs)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    summary.to_csv(args.output, index=False)
    print(summary.to_string(index=False))


if __name__ == "__main__":
    main()

