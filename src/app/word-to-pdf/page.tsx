import type { Metadata } from "next";
import WordToPdfTool from "./WordToPdfTool";
import ToolPageShell from "@/components/ToolPageShell";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";

const tool = getToolBySlug("word-to-pdf")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "Word to PDF Converter Online Free – Perfect Formatting | FileVelo",
  description:
    "Convert Word (.docx) files to perfectly formatted PDF documents online free. Secure cloud conversion with font, table, and layout preservation. File deleted immediately after download.",
};

export default function WordToPdfPage() {
  return (
    <ToolPageShell
      tool={tool}
      related={related}
      steps={[
        {
          icon: "upload",
          title: "Upload Your Word File",
          desc: "Select your .docx file or drag it into the workarea. A file-icon card confirms the document is queued and ready to convert.",
        },
        {
          icon: "cloud",
          title: "Cloud Conversion",
          desc: "FileVelo's cloud engine renders your document with precise formatting — fonts, tables, images, headers, footers, and page breaks all preserved.",
        },
        {
          icon: "picture_as_pdf",
          title: "Download PDF",
          desc: "Download a perfectly formatted, universally compatible PDF. Both your original .docx and the output PDF are permanently deleted immediately after download.",
        },
      ]}
      seoTitle="How to Convert Word to PDF with FileVelo"
      seoBody={
        <>
          <p>
            A Word document shared as a .docx is a liability — fonts render differently across operating
            systems, layouts shift on mobile, and anyone can accidentally edit the content. Converting to
            PDF locks in your formatting, guarantees pixel-perfect rendering on every device, and gives
            you a universally readable file that requires no special software to open. FileVelo makes this
            conversion instant, free, and effortless.
          </p>
          <p>
            FileVelo&apos;s cloud engine processes your .docx with exceptional layout fidelity. Tables,
            multi-column layouts, embedded images, custom fonts, headers and footers, footnotes, and
            numbered lists are all faithfully reproduced in the output PDF. The result looks identical to
            what you see in Microsoft Word — with no manual cleanup, no reflowing text, and no missing
            graphics. Every element lands exactly where it should.
          </p>
          <p>
            Security is central to FileVelo&apos;s design. Your .docx is transmitted over an end-to-end
            TLS-encrypted connection to an isolated conversion environment. The moment your PDF is
            delivered and you click download, both the source document and the output are permanently and
            irreversibly deleted from FileVelo&apos;s servers. There is no retention window, no human
            review, no indexing, and no analytics on your document content. Confidential contracts,
            financial reports, and personal documents are handled with complete discretion.
          </p>
          <p>
            FileVelo&apos;s Word to PDF engine is powered by CloudConvert, a trusted document processing
            platform handling millions of conversions daily. Whether you&apos;re preparing a CV, a legal
            brief, a business proposal, or a research paper, FileVelo delivers a clean, print-ready PDF
            in seconds — at no cost, from any browser, with no account required.
          </p>
        </>
      }
      faqs={[
        {
          q: "Is FileVelo's Word to PDF converter free?",
          a: "Yes. Converting Word documents to PDF is completely free on FileVelo. No account, no subscription, and no per-file fee is required.",
        },
        {
          q: "Does FileVelo preserve fonts and formatting during conversion?",
          a: "Yes. FileVelo's cloud engine renders your .docx with high-fidelity accuracy — fonts, tables, images, headings, headers, footers, and page breaks are all preserved in the output PDF.",
        },
        {
          q: "Is my Word document safe during conversion?",
          a: "Yes. Your file is encrypted in transit via TLS. Both the original .docx and the converted PDF are permanently deleted from FileVelo's servers immediately after you download the result.",
        },
        {
          q: "What Word file formats does FileVelo support?",
          a: "FileVelo supports .docx files (Word 2007 and later). For best results, ensure your document uses standard fonts and does not contain macros or password protection.",
        },
      ]}
    >
      <WordToPdfTool />
    </ToolPageShell>
  );
}
