import { test, expect } from "@playwright/test";

const toolPages = [
  { url: "/merge-pdf",       heading: "Merge PDF" },
  { url: "/split-pdf",       heading: "Split PDF" },
  { url: "/rotate-pdf",      heading: "Rotate PDF" },
  { url: "/add-page-numbers",heading: "Add Page Numbers" },
  { url: "/compress-pdf",    heading: "Compress PDF" },
  { url: "/pdf-to-word",     heading: "PDF to Word" },
  { url: "/word-to-pdf",     heading: "Word to PDF" },
];

test.describe("All tool pages", () => {
  for (const { url, heading } of toolPages) {
    test(`${heading} page loads correctly`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
      await expect(page.getByText("Related Tools")).toBeVisible();
      await expect(page.getByText("Frequently Asked Questions")).toBeVisible();
    });
  }

  test("every tool page has a working upload zone", async ({ page }) => {
    for (const { url } of toolPages) {
      await page.goto(url);
      await expect(page.locator('input[type="file"]')).toBeAttached();
    }
  });

  test("footer shows all tool links", async ({ page }) => {
    await page.goto("/");
    for (const { heading } of toolPages) {
      const footerLink = page.locator("footer").getByText(heading);
      await expect(footerLink).toBeVisible();
    }
  });
});
