import { expect, Page } from "@playwright/test";

export async function addProductToCart(page: Page, productName: string) {
  const card = page.locator(".inventory_item").filter({ hasText: productName });
  await expect(card, `Product card for ${productName} should be visible`).toHaveCount(1);
  await card.getByRole("button", { name: "Add to cart" }).click();
  await expect(card.getByRole("button", { name: "Remove" })).toBeVisible();
}

export async function removeProductFromInventory(page: Page, productName: string) {
  const card = page.locator(".inventory_item").filter({ hasText: productName });
  await expect(card).toHaveCount(1);
  await card.getByRole("button", { name: "Remove" }).click();
  await expect(card.getByRole("button", { name: "Add to cart" })).toBeVisible();
}
