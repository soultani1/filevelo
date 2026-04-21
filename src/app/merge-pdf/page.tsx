import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import MergeTool from "./MergeTool";

const tool = getToolBySlug("merge-pdf")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "Merge PDF Online Free - Combine PDF Files Instantly | FileVelo",
  description:
    "Merge multiple PDF files into one document online for free. 100% browser-based - files never leave your device. No sign-up required. Fast, lossless, and private.",
  alternates: { canonical: "https://filevelo.com/merge-pdf" },
};

export default function MergePdfPage() {
  return (
    <ToolPageTemplate
      tool={tool}
      related={related}
      headline="Merge PDF Files"
      subheadline="Combine multiple PDFs into one document instantly - entirely in your browser. No uploads, no waiting, no account required."
      steps={[
        {
          icon: "upload_file",
          title: "Upload Your PDFs",
          desc: "Drag & drop multiple PDF files into the workarea, or click to browse. Each file renders as a cover thumbnail immediately.",
        },
        {
          icon: "format_list_numbered",
          title: "Arrange the Order",
          desc: "Hover any card to reveal the up/down arrows. Reorder files into the exact sequence you need - numbered badges update live.",
        },
        {
          icon: "auto_fix_high",
          title: "Merge & Download",
          desc: "Click 'Merge PDF' and your combined document is generated in-browser in seconds. Download instantly - no email, no waiting.",
        },
      ]}
      seoH2="How to Merge PDF Files with FileVelo"
      seoBody={
        <>
          <p>
            Combining PDFs doesn&apos;t have to mean installing software, creating accounts, or
            waiting for cloud uploads. FileVelo&apos;s Merge PDF tool runs entirely in your browser —
            processing happens on your device, giving you instant results at zero cost to your
            privacy. Upload your files, arrange them, click merge, and download — the entire
            workflow completes in under thirty seconds for typical documents.
          </p>
          <p>
            Speed meets simplicity in the workarea. Drag files in or click to browse, arrange them
            in the exact sequence you need using the hover reorder controls, then click Merge. Within
            seconds, your PDFs are unified into a single document ready to download. There are no
            server-imposed file limits — only your browser&apos;s available memory sets the ceiling,
            making FileVelo practical for documents from a handful of pages to several hundred.
          </p>
          <p>
            Security is not an afterthought. Because everything runs locally using pdf-lib — a
            high-performance JavaScript PDF library — your files are never transmitted to any server.
            Sensitive contracts, financial statements, or personal records stay on your machine
            throughout the entire process. FileVelo never sees, stores, or logs your data. The
            moment you close the tab, all file references are gone.
          </p>
          <p>
            The result is a lossless, standards-compliant PDF. Pages retain their original
            resolution, embedded fonts, annotations, and metadata. Whether you&apos;re compiling a
            multi-chapter report, consolidating invoices, or assembling a digital portfolio,
            FileVelo produces a clean merged document that behaves identically to the originals —
            just unified into one file.
          </p>
        </>
      }
      faqs={[
        {
          q: "Is FileVelo's PDF merger completely free?",
          a: "Yes. Merging PDFs with FileVelo is 100% free with no hidden limits, no subscription required, and no account needed. Just upload, arrange, merge, and download.",
        },
        {
          q: "Are my files safe when I merge PDFs on FileVelo?",
          a: "Completely. FileVelo processes all merging locally in your browser using JavaScript. Your files are never uploaded to any server — they stay on your device throughout the entire operation.",
        },
        {
          q: "How many PDFs can I merge at once?",
          a: "You can merge as many files as your browser can handle in memory. There is no server-imposed limit. For best performance, we recommend keeping total combined file sizes under 200 MB.",
        },
        {
          q: "Will merging reduce the quality of my PDF pages?",
          a: "No. FileVelo performs a lossless merge. All pages, embedded fonts, images, vector graphics, and metadata are preserved exactly as they appear in the original files.",
        },
      ]}
    >
      <MergeTool />
    </ToolPageTemplate>
  );
}
