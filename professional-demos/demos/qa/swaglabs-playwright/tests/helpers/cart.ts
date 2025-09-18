import { expect, Page } from "@playwright/test";

export async function openCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html$/);
}

export async function getCartBadgeCount(page: Page) {
  const badge = page.locator('[data-test="shopping-cart-badge"]');
  if ((await badge.count()) === 0) {
    return 0;
  }
  const text = (await badge.textContent())?.trim() ?? "0";
  const value = Number.parseInt(text, 10);
  return Number.isNaN(value) ? 0 : value;
}

export async function removeProductFromCart(page: Page, productName: string) {
  const row = page.locator(".cart_item").filter({ hasText: productName });
  await expect(row).toHaveCount(1);
  await row.getByRole("button", { name: "Remove" }).click();
  await expect(row).toHaveCount(0);
}

export async function getSummaryTotals(page: Page) {
  const subtotalText = await page.locator('[data-test="subtotal-label"]').textContent();
  const taxText = await page.locator('[data-test="tax-label"]').textContent();
  const totalText = await page.locator('[data-test="total-label"]').textContent();

  return {
    subtotal: parseCurrency(subtotalText ?? ""),
    tax: parseCurrency(taxText ?? ""),
    total: parseCurrency(totalText ?? "")
  };
}

function parseCurrency(value: string) {
  const match = value.match(/\$([0-9]+\.[0-9]{2})/);
  return match ? Number.parseFloat(match[1]) : 0;
}
