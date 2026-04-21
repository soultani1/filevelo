import type { Metadata } from "next";
import AddPageNumbersTool from "./AddPageNumbersTool";
import ToolPageTemplate from "@/components/ToolPageTemplate";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";

const tool = getToolBySlug("add-page-numbers")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Free Online | FileVelo",
  description:
    "Add page numbers to any PDF online for free. Choose position (bottom center, right, left, or top) and starting number. 100% browser-based - files never leave your device.",
  alternates: { canonical: "https://filevelo.com/add-page-numbers" },
};

export default function AddPageNumbersPage() {
  return (
    <ToolPageTemplate
      tool={tool}
      related={related}
      headline="Add Page Numbers to PDF"
      subheadline="Number any PDF in seconds - choose position, starting number, and see a live preview. Runs entirely in your browser, completely free."
      steps={[
        {
          icon: "upload_file",
          title: "Upload Your PDF",
          desc: "Select the PDF you want to number or drag it into the workarea. Every page renders as a thumbnail with a live preview of where numbers will appear.",
        },
        {
          icon: "tune",
          title: "Configure Position & Start",
          desc: "Choose where to place the numbers - Bottom Center, Bottom Right, Bottom Left, or Top Center - and set the starting number for the first page.",
        },
        {
          icon: "auto_stories",
          title: "Apply & Download",
          desc: "Page numbers are added instantly in your browser. Download your numbered PDF immediately - no upload, no queue, no waiting.",
        },
      ]}
      seoH2="How to Add Page Numbers to a PDF with FileVelo"
      seoBody={
        <>
          <p>
            A professional document without page numbers is hard to navigate, hard to reference, and easy
            to misorder after printing. Whether you&apos;re finalising a report, preparing a legal brief,
            submitting a thesis, or assembling a proposal, clean page numbers signal that your document is
            production-ready. FileVelo adds them to any PDF in seconds — entirely in your browser, at
            zero cost.
          </p>
          <p>
            FileVelo gives you precise control over the numbering output. Choose from four positions:
            Bottom Center (the most common choice for formal documents), Bottom Right, Bottom Left, or
            Top Center. Set any starting number — useful when your PDF is one chapter of a larger
            multi-part document where page numbering should continue from a previous section rather than
            restart at one. A live thumbnail preview updates instantly as you adjust the settings, so
            you can see exactly how the output will look before generating it.
          </p>
          <p>
            All processing runs locally in your browser using pdf-lib, a production-grade JavaScript PDF
            library. Your file is never transmitted to any external server. Sensitive documents —
            contracts, financial statements, academic submissions, medical records — are handled with
            complete privacy. There is no upload, no cloud queue, and no data logged. The moment you
            close the tab, all file references are gone from memory.
          </p>
          <p>
            FileVelo&apos;s page-number engine places numbers directly onto the PDF page using embedded
            font rendering, producing a clean, standards-compliant result that prints and displays
            correctly in every PDF viewer. The original page content — text, images, annotations, and
            vector graphics — is preserved without any resampling or re-encoding. The numbered output is
            ready to share, print, or archive the moment it downloads.
          </p>
        </>
      }
      faqs={[
        {
          q: "Are my files uploaded to a server when I add page numbers?",
          a: "No. FileVelo's add page numbers tool runs entirely in your browser using JavaScript. Your file is never transmitted anywhere — it stays on your device throughout the entire operation.",
        },
        {
          q: "Can I start the numbering from a number other than 1?",
          a: "Yes. Set any starting number in the 'Start numbering at' field — useful for multi-part documents where page numbering needs to continue from a previous section.",
        },
        {
          q: "Where can I position the page numbers?",
          a: "FileVelo offers four positions: Bottom Center, Bottom Right, Bottom Left, and Top Center. A live thumbnail preview shows exactly where numbers will appear before you apply them.",
        },
        {
          q: "Is FileVelo's add page numbers tool free?",
          a: "Yes, completely free. No account, no subscription, and no daily limits. Add page numbers to as many PDFs as you need without any restrictions.",
        },
      ]}
    >
      <AddPageNumbersTool />
    </ToolPageTemplate>
  );
}
