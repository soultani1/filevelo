import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";
import ToolPageShell from "@/components/ToolPageShell";
import CompressTool from "./CompressTool";

const tool = getToolBySlug("compress-pdf")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "Compress PDF Online Free – Reduce File Size Without Quality Loss | FileVelo",
  description:
    "Reduce PDF file size without losing quality using FileVelo's cloud compression engine. Choose Low, Medium, or High. Files are encrypted in transit and deleted immediately after download.",
};

export default function Page() {
  return (
    <ToolPageShell
      tool={tool}
      related={related}
      steps={[
        {
          icon: "upload",
          title: "Upload Your PDF",
          desc: "Select the PDF you want to compress or drag it into the workarea. A cover thumbnail renders immediately so you can confirm the right file.",
        },
        {
          icon: "tune",
          title: "Choose Compression Level",
          desc: "Select Low (best quality), Medium (balanced), or High (smallest file). Each preset maps to a different optimisation profile on our cloud engine.",
        },
        {
          icon: "download",
          title: "Download Compressed PDF",
          desc: "Our secure cloud engine processes your file and streams the result back to your browser. Both the original and compressed files are deleted immediately after download.",
        },
      ]}
      seoTitle="How to Compress a PDF with FileVelo"
      seoBody={
        <>
          <p>
            Large PDFs clog email inboxes, break upload limits on document portals, and consume
            unnecessary storage. FileVelo&apos;s Compress PDF tool slashes file sizes using a
            professional cloud compression engine — the same technology trusted by businesses to
            optimise documents at scale, now available free with a single click.
          </p>
          <p>
            FileVelo offers three compression presets tuned for different needs. <strong>Low</strong>{" "}
            preserves near-perfect visual quality while trimming redundant internal structures —
            ideal for archiving documents where quality cannot be compromised. <strong>Medium</strong>{" "}
            applies balanced compression across images and fonts, typically reducing file size by
            40–70% without perceptible quality loss — the right choice for most everyday documents.{" "}
            <strong>High</strong> applies maximum compression, delivering the smallest possible file
            size — best when you need to share by email or upload to a portal with strict size limits.
          </p>
          <p>
            Every byte of your document is protected in transit by TLS encryption. Once
            FileVelo&apos;s cloud engine completes compression and delivers the download, both the
            original and processed files are permanently deleted — not archived, not logged, not
            retained. Your data exists on our infrastructure for seconds, not hours. There is no
            human review, no data mining, and no retention of any kind.
          </p>
          <p>
            FileVelo&apos;s compression engine is powered by CloudConvert, a trusted document
            processing platform handling millions of conversions daily. The result is a
            standards-compliant PDF that opens cleanly in every viewer — smaller, sharper, and
            ready to share wherever you need it.
          </p>
        </>
      }
      faqs={[
        {
          q: "Is FileVelo's PDF compressor free to use?",
          a: "Yes. PDF compression is available completely free of charge on FileVelo. No account, no subscription, and no per-file fee is required.",
        },
        {
          q: "How much will compression reduce my file size?",
          a: "Results vary based on content. PDFs with many images can see 50–80% reductions. Text-heavy PDFs typically see 20–40% reduction. The High preset delivers the maximum possible reduction for any given file.",
        },
        {
          q: "Is my PDF secure during cloud processing?",
          a: "Yes. Your file is encrypted via TLS during upload and processing. FileVelo's cloud engine permanently deletes both the original and the compressed file immediately after you download the result. There is no retention or logging.",
        },
        {
          q: "What is the difference between the Low, Medium, and High compression levels?",
          a: "Low optimises internal file structure with minimal visual impact — best for archiving. Medium applies balanced compression to images and fonts — ideal for most use cases. High applies maximum compression for the absolute smallest file size.",
        },
      ]}
    >
      <CompressTool />
    </ToolPageShell>
  );
}
