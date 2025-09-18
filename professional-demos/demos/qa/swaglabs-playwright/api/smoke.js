import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 3,
  thresholds: {
    http_req_duration: ["p(95)<500"],
  },
};

const BASE_URL = __ENV.API_BASE_URL || "http://127.0.0.1:5001";

export default function () {
  const health = http.get(`${BASE_URL}/health`);
  check(health, {
    "health returns ok": (res) => res.status === 200 && res.body === "ok",
  });

  const inventory = http.get(`${BASE_URL}/inventory`);
  check(inventory, {
    "inventory returns list": (res) => res.status === 200 && res.json().length > 0,
  });

  const summary = http.post(`${BASE_URL}/checkout/summary`, JSON.stringify({ item_ids: [1, 2] }), {
    headers: { "Content-Type": "application/json" },
  });
  check(summary, {
    "summary returns totals": (res) => res.status === 200 && res.json().total > 0,
  });

  sleep(1);
}
