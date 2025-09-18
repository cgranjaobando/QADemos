import { Page, test, type TestInfo } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs/promises";
import path from "path";
import { addProductToCart } from "./helpers/catalog";
import { beginCheckout, submitCheckoutDetails } from "./helpers/checkout";
import { loginAs } from "./helpers/auth";
import { openCart } from "./helpers/cart";

const REPORT_DIR = path.join("test-results", "a11y");

async function ensureReportDir() {
  await fs.mkdir(REPORT_DIR, { recursive: true });
}

async function runAxeScan(page: Page, testInfo: TestInfo, name: string) {
  const builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]);
  const results = await builder.analyze();

  await ensureReportDir();
  const filePath = path.join(REPORT_DIR, `${name}.json`);
  await fs.writeFile(filePath, JSON.stringify(results, null, 2), "utf-8");
  await testInfo.attach(`${name}-a11y.json`, {
    contentType: "application/json",
    path: filePath
  });

  const summaryLines = results.violations.slice(0, 5).map((violation) => {
    const nodes = violation.nodes
      .slice(0, 3)
      .map((node) => node.target.join(" > "))
      .join(", ");
    return `${violation.impact ?? "unknown"} | ${violation.id} | ${violation.help} | ${nodes}`;
  });

  const summary = summaryLines.length
    ? summaryLines.join("\n")
    : "No accessibility violations detected by axe.";

  await testInfo.attach(`${name}-a11y-top-issues.txt`, {
    contentType: "text/plain",
    body: Buffer.from(summary, "utf-8")
  });

  return results;
}

const CUSTOMER = {
  firstName: "Alex",
  lastName: "Analyst",
  postalCode: "30301"
};

test.describe("Accessibility scans", () => {
  test("inventory page", async ({ page }, testInfo) => {
    await loginAs(page, "standard");
    await runAxeScan(page, testInfo, "inventory");
  });

  test("checkout step two", async ({ page }, testInfo) => {
    await loginAs(page, "standard");
    await addProductToCart(page, "Sauce Labs Backpack");
    await openCart(page);
    await beginCheckout(page);
    await submitCheckoutDetails(page, CUSTOMER);
    await runAxeScan(page, testInfo, "checkout-step-two");
  });
});
