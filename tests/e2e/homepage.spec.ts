import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows all 7 tools", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/QwenTools/);
    await expect(page.getByRole("heading", { name: /Free Online PDF Tools/i })).toBeVisible();

    const tools = ["Merge PDF", "Split PDF", "Compress PDF", "PDF to Word", "Word to PDF", "Rotate PDF", "Add Page Numbers"];
    for (const tool of tools) {
      await expect(page.getByText(tool).first()).toBeVisible();
    }
  });

  test("navigates to Merge PDF tool", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Merge PDF").first().click();
    await expect(page).toHaveURL("/merge-pdf");
    await expect(page.getByRole("heading", { name: "Merge PDF" })).toBeVisible();
  });

  test("header logo links to homepage", async ({ page }) => {
    await page.goto("/merge-pdf");
    await page.getByText("QwenTools").click();
    await expect(page).toHaveURL("/");
  });
});
