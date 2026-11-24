import { expect, test } from "@playwright/test";
import { experienceCopy, roles } from "@/content/site";

test("shows every role from site content", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#experience");

  for (const role of roles) {
    await expect(section.getByRole("heading", { level: 3, name: role.company })).toBeVisible();
  }
  await expect(section.getByRole("heading", { level: 2, name: experienceCopy.heading })).toBeVisible();
  await expect(section.getByText(experienceCopy.note)).toBeVisible();
});
