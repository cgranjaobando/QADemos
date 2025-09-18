import { expect, test } from "@playwright/test";
import { gotoLogin, loginAs, readLoginError, submitCredentials, users } from "./helpers/auth";

test.describe("Swag Labs login", () => {
  test("allows the standard user to access inventory", async ({ page }) => {
    await loginAs(page, "standard");
    await expect(page.locator(".inventory_item").first()).toBeVisible();
  });

  test("blocks the locked out user and shows an error", async ({ page }) => {
    await gotoLogin(page);
    await submitCredentials(page, users.locked.username, users.locked.password);
    await expect(page).toHaveURL(/\/$/);
    const error = await readLoginError(page);
    expect(error).toContain("Sorry, this user has been locked out.");
  });
});
