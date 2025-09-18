import { expect, Page } from "@playwright/test";

export const users = {
  standard: { username: "standard_user", password: "secret_sauce" },
  locked: { username: "locked_out_user", password: "secret_sauce" }
} as const;

export type UserKey = keyof typeof users;

export async function gotoLogin(page: Page) {
  await page.goto("/");
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
}

export async function submitCredentials(page: Page, username: string, password: string) {
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
}

export async function loginAs(page: Page, userKey: UserKey) {
  await gotoLogin(page);
  const creds = users[userKey];
  await submitCredentials(page, creds.username, creds.password);
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
}

export async function readLoginError(page: Page) {
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  return (await error.textContent())?.trim() ?? "";
}
