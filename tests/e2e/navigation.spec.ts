import { test, expect } from "@playwright/test";

test("hero + all named sections render on /es", async ({ page }) => {
  await page.goto("/es");

  await expect(page.locator("#top")).toBeVisible();
  await expect(page.locator('#top h1[aria-label="Dankø"]')).toBeVisible();

  await expect(page.locator("#bio")).toBeVisible();
  await expect(page.locator("#shows")).toBeVisible();
  await expect(page.locator("#gallery")).toBeVisible();
  await expect(page.locator("#music")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("/ redirects to /es when Accept-Language is es", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
});
