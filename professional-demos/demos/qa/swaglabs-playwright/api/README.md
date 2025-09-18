# Synthetic Checkout API

Local Flask API that mirrors key Swag Labs cart math so k6 can run deterministic smoke tests without hitting third-party services.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Liveness probe |
| GET | `/inventory` | Returns synthetic inventory catalogue |
| POST | `/checkout/summary` | Calculates subtotal, tax (8%), and total for provided item IDs |

## Usage

```powershell
# Activate Python environment
. .\.venv\Scripts\Activate.ps1

# Install dependencies
python -m pip install -r demos/qa/swaglabs-playwright/api/requirements.txt

# Start the API
python demos/qa/swaglabs-playwright/api/server.py

# In another shell, run k6 smoke
k6 run --env API_BASE_URL=http://127.0.0.1:5001 demos/qa/swaglabs-playwright/api/smoke.js
```

The k6 script verifies health, inventory payload shape, and checkout totals.
