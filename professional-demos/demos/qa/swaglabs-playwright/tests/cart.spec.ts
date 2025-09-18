import { expect, test } from "@playwright/test";
import { addProductToCart } from "./helpers/catalog";
import { getCartBadgeCount, getSummaryTotals, openCart } from "./helpers/cart";
import { beginCheckout, submitCheckoutDetails } from "./helpers/checkout";
import { loginAs } from "./helpers/auth";

const CUSTOMER = {
  firstName: "Case",
  lastName: "Tester",
  postalCode: "94105"
};

test.describe("Cart", () => {
  test("tracks add/remove actions and calculates totals", async ({ page }) => {
    await loginAs(page, "standard");

    await addProductToCart(page, "Sauce Labs Backpack");
    await addProductToCart(page, "Sauce Labs Bike Light");

    const badgeCount = await getCartBadgeCount(page);
    expect(badgeCount).toBe(2);

    await openCart(page);
    const backpackRow = page.locator(".cart_item").filter({ hasText: "Sauce Labs Backpack" });
    const bikeLightRow = page.locator(".cart_item").filter({ hasText: "Sauce Labs Bike Light" });

    await expect(backpackRow).toHaveCount(1);
    await expect(bikeLightRow).toHaveCount(1);

    await bikeLightRow.getByRole("button", { name: "Remove" }).click();
    await expect(bikeLightRow).toHaveCount(0);

    await beginCheckout(page);
    await submitCheckoutDetails(page, CUSTOMER);
    await expect(page).toHaveURL(/checkout-step-two\.html$/);

    const totals = await getSummaryTotals(page);
    expect(totals.subtotal).toBeGreaterThan(0);
    expect(totals.total).toBeCloseTo(totals.subtotal + totals.tax, 2);

    const expectedTaxRate = 0.08;
    const expectedTax = Number((totals.subtotal * expectedTaxRate).toFixed(2));
    expect(totals.tax).toBeCloseTo(expectedTax, 2);
  });
});
