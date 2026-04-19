import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import os from "os";

// Create a minimal valid PDF buffer for testing
function createMinimalPdf(text: string): Buffer {
  const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
190
%%EOF`;
  return Buffer.from(content);
}

test.describe("Merge PDF Tool", () => {
  let tmpDir: string;

  test.beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "qwen-test-"));
    // Write two minimal test PDFs
    fs.writeFileSync(path.join(tmpDir, "test1.pdf"), createMinimalPdf("Page 1"));
    fs.writeFileSync(path.join(tmpDir, "test2.pdf"), createMinimalPdf("Page 2"));
  });

  test.afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test("page renders correctly", async ({ page }) => {
    await page.goto("/merge-pdf");
    await expect(page.getByRole("heading", { name: "Merge PDF" })).toBeVisible();
    await expect(page.getByText("Files never leave your device")).toBeVisible();
    await expect(page.getByText("Merge PDF").last()).toBeVisible();
  });

  test("shows FAQ section", async ({ page }) => {
    await page.goto("/merge-pdf");
    await expect(page.getByText("Frequently Asked Questions")).toBeVisible();
    await expect(page.getByText("Is it safe to merge PDFs")).toBeVisible();
  });

  test("shows related tools", async ({ page }) => {
    await page.goto("/merge-pdf");
    await expect(page.getByText("Related Tools")).toBeVisible();
    await expect(page.getByText("Split PDF")).toBeVisible();
  });

  test("merge button disabled without files", async ({ page }) => {
    await page.goto("/merge-pdf");
    const btn = page.getByRole("button", { name: /Merge PDF/i });
    await expect(btn).toBeDisabled();
  });

  test("shows error with only one file", async ({ page }) => {
    await page.goto("/merge-pdf");
    const input = page.locator('input[type="file"]');
    await input.setInputFiles(path.join(tmpDir, "test1.pdf"));
    await page.getByRole("button", { name: /Merge PDF/i }).click();
    await expect(page.getByText(/at least 2/i)).toBeVisible();
  });
});
