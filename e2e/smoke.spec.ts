import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { navItems } from "@/content/site";

/** Scrolls top to bottom so every Reveal enters the viewport once, then waits for finite animations to end. */
async function revealWholePage(page: Page) {
  await page.evaluate(async () => {
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y);
      await nextFrame();
    }
  });
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every((animation) => animation.effect?.getTiming().iterations === Infinity || animation.playState !== "running"),
  );
}

test("loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await revealWholePage(page);

  expect(errors).toEqual([]);
});

for (const theme of ["dark", "light"] as const) {
  test(`has no accessibility violations in the ${theme} theme`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await revealWholePage(page);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const summary = violations.map((v) => `${v.id}: ${v.nodes.map((node) => node.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("every nav link points to an element on the page", async ({ page }) => {
  await page.goto("/");
  for (const item of navItems) {
    await expect(page.locator(item.href), `${item.label} → ${item.href}`).toHaveCount(1);
  }
});

test("projects pin only on screens at least 960×660", async ({ page }) => {
  const { width, height } = page.viewportSize() ?? { width: 0, height: 0 };
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Projects" })).toHaveAttribute(
    "data-pinned",
    String(width >= 960 && height >= 660),
  );
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("projects stack instead of pinning", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Projects" })).toHaveAttribute("data-pinned", "false");
  });
});
