import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "https://www.saucedemo.com";

export default defineConfig({
  testDir: "./demos/qa/swaglabs-playwright/tests",
  outputDir: "./test-results",
  fullyParallel: true,
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [["blob"], ["html", { outputFolder: "playwright-report", open: "never" }]]
    : [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL,
    actionTimeout: 15000,
    navigationTimeout: 30000,
    screenshot: "only-on-failure",
    video: "off",
    trace: process.env.CI ? "on-first-retry" : "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  metadata: {
    application: "saucedemo",
    demo: "swaglabs-playwright"
  },
  snapshotPathTemplate: "{testDir}/{testFileName}-snapshots/{arg}{ext}"
});
