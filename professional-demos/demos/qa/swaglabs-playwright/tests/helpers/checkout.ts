import { expect, Page } from "@playwright/test";

export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export async function beginCheckout(page: Page) {
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
}

export async function submitCheckoutDetails(page: Page, details: CheckoutDetails) {
  await page.getByPlaceholder("First Name").fill(details.firstName);
  await page.getByPlaceholder("Last Name").fill(details.lastName);
  await page.getByPlaceholder("Zip\/Postal Code").fill(details.postalCode);
  await page.getByRole("button", { name: "Continue" }).click();
}

export async function finishCheckout(page: Page) {
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page).toHaveURL(/checkout-complete\.html$/);
  await expect(page.getByRole("heading", { name: "Thank you for your order!" })).toBeVisible();
}
