import { expect, test } from "@playwright/test";
import { addProductToCart } from "./helpers/catalog";
import { openCart } from "./helpers/cart";
import { beginCheckout, finishCheckout, submitCheckoutDetails } from "./helpers/checkout";
import { loginAs } from "./helpers/auth";

const CUSTOMER = {
  firstName: "Jamie",
  lastName: "Reviewer",
  postalCode: "10001"
};

test.describe("Checkout", () => {
  test("requires customer information before continuing", async ({ page }) => {
    await loginAs(page, "standard");
    await addProductToCart(page, "Sauce Labs Backpack");
    await openCart(page);
    await beginCheckout(page);

    const continueButton = page.getByRole("button", { name: "Continue" });
    await continueButton.click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

    await page.getByPlaceholder("First Name").fill(CUSTOMER.firstName);
    await continueButton.click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

    await page.getByPlaceholder("Last Name").fill(CUSTOMER.lastName);
    await continueButton.click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');

    await page.getByPlaceholder("Zip/Postal Code").fill(CUSTOMER.postalCode);
    await continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);
  });

  test("completes the happy path checkout", async ({ page }) => {
    await loginAs(page, "standard");
    await addProductToCart(page, "Sauce Labs Backpack");
    await openCart(page);
    await beginCheckout(page);
    await submitCheckoutDetails(page, CUSTOMER);
    await expect(page).toHaveURL(/checkout-step-two\.html$/);

    await finishCheckout(page);
    await expect(page.getByText("Your order has been dispatched"))
      .toContainText("Your order has been dispatched");
  });
});
