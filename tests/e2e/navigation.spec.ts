import { test, expect } from "@playwright/test";

test("hero, about, music, shows, gallery, contact all render on /es", async ({ page }) => {
  await page.goto("/es");

  await expect(page.locator("#hero h1")).toContainText("DANKO");
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#music")).toBeVisible();
  await expect(page.locator("#shows")).toBeVisible();
  await expect(page.locator("#gallery")).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
});

test("/ redirects to /es", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
});
