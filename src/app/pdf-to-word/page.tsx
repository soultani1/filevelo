import type { Metadata } from "next";
import { getToolBySlug, getRelatedTools } from "@/lib/tools";
import ToolPageShell from "@/components/ToolPageShell";
import PdfToWordTool from "./PdfToWordTool";

const tool = getToolBySlug("pdf-to-word")!;
const related = getRelatedTools(tool);

export const metadata: Metadata = {
  title: "PDF to Word Converter Online Free – Editable .docx | FileVelo",
  description:
    "Convert PDF to editable Word (.docx) documents online free. High-accuracy cloud conversion with full formatting preservation. Files are encrypted and deleted immediately after download.",
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
          desc: "Select the PDF you want to convert or drag it into the workarea. A cover thumbnail confirms the correct file is loaded.",
        },
        {
          icon: "cloud",
          title: "Cloud Conversion",
          desc: "FileVelo's cloud engine extracts text, tables, columns, and formatting from your PDF with high-fidelity accuracy.",
        },
        {
          icon: "description",
          title: "Download Word File",
          desc: "Download your fully editable .docx file. Open it immediately in Microsoft Word, Google Docs, or LibreOffice — no additional steps required.",
        },
      ]}
      seoTitle="How to Convert PDF to Word with FileVelo"
      seoBody={
        <>
          <p>
            Getting text out of a PDF shouldn&apos;t require expensive desktop software or manual
            copy-paste. FileVelo&apos;s PDF to Word converter transforms your PDF into a fully
            editable .docx file in under a minute — preserving tables, headings, columns, lists, and
            inline images with high-fidelity accuracy that rivals dedicated desktop tools.
          </p>
          <p>
            Upload your PDF, click Convert, and FileVelo&apos;s cloud engine goes to work analysing
            the document structure. Multi-column layouts, footnotes, bullet lists, and embedded
            graphics are faithfully reconstructed in the output Word document. The resulting .docx
            opens natively in Microsoft Word, Google Docs, LibreOffice, and every other major editor
            — ready to modify immediately without any intermediate steps.
          </p>
          <p>
            Conversion runs on a secure cloud infrastructure with end-to-end TLS encryption. The
            moment your .docx is downloaded, both the uploaded PDF and the converted document are
            permanently erased from FileVelo&apos;s servers. There is no retention, no indexing, and
            no human review — your documents remain entirely confidential throughout the process.
            FileVelo&apos;s infrastructure handles the conversion in an isolated environment and
            discards all traces immediately.
          </p>
          <p>
            FileVelo is powered by CloudConvert, an industry-leading document conversion platform
            with exceptional accuracy rates across complex layouts. Whether you&apos;re editing a
            contract, updating a report, or repurposing content from an existing PDF, FileVelo
            delivers the cleanest possible Word output — at zero cost, in seconds, from any browser.
          </p>
        </>
      }
      faqs={[
        {
          q: "Is FileVelo's PDF to Word converter free?",
          a: "Yes, converting PDF to Word is completely free on FileVelo. No account, no subscription, and no per-file fee is required.",
        },
        {
          q: "Does FileVelo preserve tables and formatting during conversion?",
          a: "FileVelo uses a high-accuracy cloud engine that reconstructs tables, columns, lists, headings, and inline images in the Word output. Complex layouts are preserved with high fidelity.",
        },
        {
          q: "Are my files safe during PDF to Word conversion?",
          a: "Yes. Files are encrypted in transit via TLS, and both the original PDF and converted .docx are permanently deleted from FileVelo's servers immediately after you download the result.",
        },
        {
          q: "Can FileVelo convert scanned PDFs to Word?",
          a: "Scanned PDFs require OCR (Optical Character Recognition) to extract text. FileVelo's conversion engine handles text-based PDFs with high accuracy. For scanned documents, results may vary depending on scan quality and resolution.",
        },
      ]}
    >
      <PdfToWordTool />
    </ToolPageShell>
  );
}
