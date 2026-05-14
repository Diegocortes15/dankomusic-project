import { test, expect } from "@playwright/test";

test("switching from ES to EN updates the locale and re-renders nav copy", async ({ page }) => {
  await page.goto("/es");

  // ES nav has "Música"; EN nav has "Music".
  await expect(page.getByRole("link", { name: "Música" })).toBeVisible();

  await page.getByRole("button", { name: "EN" }).click();

  await expect(page).toHaveURL(/\/en/);
  await expect(page.getByRole("link", { name: "Music" })).toBeVisible();
});
