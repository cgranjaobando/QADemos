import { expect, test } from "@playwright/test";
import { loginAs } from "./helpers/auth";

function currencyToNumber(value: string) {
  return Number.parseFloat(value.replace(/[^0-9.]/g, ""));
}

test.describe("Inventory", () => {
  test("sorts by price low to high", async ({ page }) => {
    await loginAs(page, "standard");

    const sortSelect = page.getByRole("combobox");
    await sortSelect.selectOption("lohi");
    await expect(sortSelect).toHaveValue("lohi");

    const priceTexts = await page.locator(".inventory_item_price").allTextContents();
    const prices = priceTexts.map(currencyToNumber);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});
