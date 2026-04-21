import type { Metadata } from "next";
import RotateTool from "./RotateTool";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";

const tool = getToolBySlug("rotate-pdf")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "Rotate PDF Online Free - 90, 180, 270 Degrees | FileVelo",
  description:
    "Rotate PDF pages 90, 180, or 270 degrees online for free. Apply to all pages or a custom range. 100% browser-based - files never leave your device. No sign-up required.",
  alternates: { canonical: "https://filevelo.com/rotate-pdf" },
};

export default function RotatePdfPage() {
  return (
    <ToolPageTemplate
      tool={tool}
      related={related}
      headline="Rotate PDF Pages"
      subheadline="Fix sideways or upside-down pages instantly. Choose 90, 180, or 270 degrees and apply to all pages or a custom range - 100% in your browser."
      steps={[
        {
          icon: "upload_file",
          title: "Upload Your PDF",
          desc: "Select the PDF you want to rotate or drag it into the workarea. Every page renders as a thumbnail so you see exactly what you're working with.",
        },
        {
          icon: "tune",
          title: "Set Rotation & Scope",
          desc: "Choose the rotation angle - 90, 180, or 270 degrees - and whether to apply it to all pages or a specific range like '1, 3-5, 7'.",
        },
        {
          icon: "rotate_right",
          title: "Rotate & Download",
          desc: "Pages are rotated instantly in your browser using lossless processing. Download the corrected PDF immediately - no upload, no queue.",
        },
      ]}
      seoH2="How to Rotate PDF Pages with FileVelo"
      seoBody={
        <>
          <p>
            A sideways scan, an upside-down invoice, a landscape chart in a portrait report — orientation
            problems are frustrating and surprisingly common. FileVelo&apos;s Rotate PDF tool corrects
            them in seconds, entirely inside your browser. There is no upload, no server processing, and
            no waiting. Upload your PDF, choose your angle, and download the corrected file instantly.
          </p>
          <p>
            FileVelo gives you full precision over the rotation operation. Choose from 90° clockwise,
            180° (full flip), or 270° clockwise — and decide whether to apply the rotation to every page
            in the document or only a specific subset. The range syntax accepts patterns like
            &quot;1, 3-5, 7&quot; so you can target exactly the pages that need correcting without
            affecting the rest of the document. The interactive thumbnail grid updates live, giving you
            a visual preview before you commit.
          </p>
          <p>
            All processing runs locally in your browser via pdf-lib, a production-grade JavaScript PDF
            library. Your file is never transmitted to any server — meaning sensitive contracts, medical
            records, financial statements, or personal documents are handled with complete privacy.
            Rotation is a lossless operation: the actual page content is not re-encoded, resampled, or
            compressed. Every pixel, every font, every annotation in the original document is preserved
            exactly in the output.
          </p>
          <p>
            Because everything runs client-side, FileVelo&apos;s Rotate PDF tool works at native browser
            speed — no cloud queue to join, no email delivery, no account required. The moment you click
            Rotate, your corrected PDF is ready to download. Whether you&apos;re fixing a single scanned
            page or reorienting an entire multi-chapter document, FileVelo handles it cleanly and
            instantly — completely free.
          </p>
        </>
      }
      faqs={[
        {
          q: "Are my files uploaded to a server when I rotate a PDF?",
          a: "No. FileVelo's rotate tool runs entirely in your browser using JavaScript. Your file is never transmitted anywhere — it stays on your device throughout the entire operation.",
        },
        {
          q: "Can I rotate only specific pages instead of the whole PDF?",
          a: "Yes. Select 'Specific Pages' in the sidebar and enter a range like '1, 3-5, 7'. Each group you specify will be rotated while all other pages remain unchanged.",
        },
        {
          q: "Does rotating a PDF reduce its quality?",
          a: "No. Rotation is a lossless operation in FileVelo. The page content is not re-rendered or resampled — fonts, images, and annotations are preserved exactly as they appear in the original.",
        },
        {
          q: "Is FileVelo's PDF rotation tool free?",
          a: "Yes, completely free. No account, no subscription, and no daily limits. Rotate as many PDFs as you need without any restrictions.",
        },
      ]}
    >
      <RotateTool />
    </ToolPageTemplate>
  );
}
