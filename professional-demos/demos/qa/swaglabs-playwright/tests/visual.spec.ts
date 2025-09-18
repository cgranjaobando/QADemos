import { expect, test, type Page } from "@playwright/test";
import fs from "fs/promises";
import path from "path";
import { loginAs } from "./helpers/auth";

const OVERRIDE_ENV = "PLAYWRIGHT_VISUAL_OVERRIDE_CSS";

async function maybeApplyOverride(page: Page) {
  const overridePath = process.env[OVERRIDE_ENV];
  if (!overridePath) {
    return false;
  }

  const resolvedPath = path.resolve(overridePath);
  const css = await fs.readFile(resolvedPath, "utf-8");
  await page.addStyleTag({ content: css });
  return true;
}

test.describe("Visual regression", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("inventory baseline", async ({ page }, testInfo) => {
    await loginAs(page, "standard");
    await page.waitForLoadState("networkidle");
    await page.getByRole("combobox").selectOption("lohi");
    await page.waitForTimeout(250);

    const overrideApplied = await maybeApplyOverride(page);
    if (overrideApplied) {
      testInfo.annotations.push({
        type: "visual-override",
        description: `Applied CSS override from ${process.env[OVERRIDE_ENV]}`
      });
    }

    await expect(page).toHaveScreenshot("inventory-baseline.png", {
      fullPage: true,
      animations: "disabled",
      mask: [page.locator('[data-test="shopping-cart-link"]')]
    });
  });
});
