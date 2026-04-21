import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import SplitTool from "./SplitTool";

const tool = getToolBySlug("split-pdf")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "Split PDF Online Free - Extract Pages Instantly | FileVelo",
  description:
    "Split a PDF into individual pages or extract a custom range online for free. 100% browser-based - files never leave your device. No registration needed.",
  alternates: { canonical: "https://filevelo.com/split-pdf" },
};

export default function SplitPdfPage() {
  return (
    <ToolPageTemplate
      tool={tool}
      related={related}
      headline="Split PDF Files"
      subheadline="Extract pages or split any PDF into multiple files instantly - 100% in your browser. Your file never leaves your device."
      steps={[
        {
          icon: "upload_file",
          title: "Upload Your PDF",
          desc: "Select the PDF you want to split or drag it into the workarea. Every page renders as a thumbnail so you see exactly what you're working with.",
        },
        {
          icon: "content_cut",
          title: "Choose Split Mode",
          desc: "Split every page into individual files, or use Extract Range to specify groups like '1-3, 5, 7-9'. Each range becomes its own PDF.",
        },
        {
          icon: "download",
          title: "Download Your Files",
          desc: "Split files are generated instantly in-browser. Download each one with a single click - no zip, no queue, no waiting.",
        },
      ]}
      seoH2="How to Split a PDF with FileVelo"
      seoBody={
        <>
          <p>
            Whether you need to extract a single page from a 50-page report or divide a large PDF
            into several targeted documents, FileVelo&apos;s Split PDF tool handles it in seconds —
            entirely in your browser, without a server ever touching your file. Upload, choose your
            mode, and download. That&apos;s the complete workflow.
          </p>
          <p>
            FileVelo offers two split modes built for different use cases. &quot;Split Every
            Page&quot; creates one individual PDF per page — perfect for separating scanned
            documents, isolating invoices, or generating slide handouts. &quot;Extract Range&quot;
            lets you define precise groups like &quot;1-3, 5, 7-9,&quot; giving you a targeted set
            of output files from a single operation — no need to download and re-upload multiple
            times.
          </p>
          <p>
            All processing runs locally via pdf-lib, a production-grade JavaScript PDF library. The
            tool never uploads your file — meaning financial statements, legal documents, or medical
            records are handled with complete privacy. Download your split files instantly; there is
            no waiting for a cloud queue, no email delivery, and no account required. FileVelo
            generates each output file directly in your browser.
          </p>
          <p>
            FileVelo&apos;s split engine preserves the full fidelity of your document. Fonts,
            images, annotations, and page dimensions remain unchanged in each output file. The
            result is a set of clean, standards-compliant PDFs that open flawlessly in any viewer —
            from Adobe Acrobat to mobile browsers — exactly as they appeared in the original.
          </p>
        </>
      }
      faqs={[
        {
          q: "Does splitting a PDF affect its quality?",
          a: "Not at all. FileVelo performs a lossless split — each output file is an exact extraction of the original pages with no re-encoding, resampling, or quality reduction whatsoever.",
        },
        {
          q: "Can I extract specific pages instead of splitting the whole PDF?",
          a: "Yes. Use 'Extract Range' mode and enter a pattern like '2-5, 8, 11-13'. Each group you define becomes its own separately downloadable PDF file.",
        },
        {
          q: "Is my PDF uploaded to a server when I use FileVelo?",
          a: "No. FileVelo's split tool runs entirely in your browser using JavaScript. Your file is never transmitted anywhere — it stays on your device throughout the entire operation.",
        },
        {
          q: "Is FileVelo's PDF splitter free?",
          a: "Yes, completely free. No account, no subscription, and no daily limits. Upload and split as many PDFs as you need without any restrictions.",
        },
      ]}
    >
      <SplitTool />
    </ToolPageTemplate>
  );
}
