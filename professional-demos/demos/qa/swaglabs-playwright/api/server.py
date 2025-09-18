from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List

from flask import Flask, jsonify, request

app = Flask(__name__)


@dataclass
class InventoryItem:
    id: int
    name: str
    price: float


INVENTORY: Dict[int, InventoryItem] = {
    1: InventoryItem(id=1, name="Sauce Labs Backpack", price=29.99),
    2: InventoryItem(id=2, name="Sauce Labs Bike Light", price=9.99),
    3: InventoryItem(id=3, name="Sauce Labs Bolt T-Shirt", price=15.99),
}


@app.get("/health")
def health() -> tuple[str, int]:
    return "ok", 200


@app.get("/inventory")
def inventory() -> tuple[list[dict], int]:
    items: List[dict] = [item.__dict__ for item in INVENTORY.values()]
    return jsonify(items), 200


@app.post("/checkout/summary")
def checkout_summary() -> tuple[dict, int]:
    payload = request.json or {}
    ids = payload.get("item_ids", [])
    subtotal = sum(INVENTORY[item_id].price for item_id in ids if item_id in INVENTORY)
    tax_rate = 0.08
    tax = round(subtotal * tax_rate, 2)
    total = round(subtotal + tax, 2)
    return jsonify({"subtotal": subtotal, "tax": tax, "total": total}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
