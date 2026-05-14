import { test, expect } from "@playwright/test";

test("switching from ES to EN updates the locale and keeps the user on the home page", async ({
  page,
}) => {
  await page.goto("/es");
  await page.getByRole("button", { name: "EN" }).click();
  await expect(page).toHaveURL(/\/en/);
  // English-only string should now appear (nav label)
  await expect(page.getByRole("link", { name: "Shows" })).toBeVisible();
});
