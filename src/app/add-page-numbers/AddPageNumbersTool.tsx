"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getPdfDoc } from "@/lib/pdfjs";
import EditorLayout from "@/components/EditorLayout";
import PdfThumb from "@/components/PdfThumb";
import FileDropzone from "@/components/FileDropzone";

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center";

const positionLabels: Record<Position, string> = {
  "bottom-center": "Bottom Center",
  "bottom-right":  "Bottom Right",
  "bottom-left":   "Bottom Left",
  "top-center":    "Top Center",
};

// ── Page card with floating page-number preview badge ───────────────────────
function PageCard({
  file,
  pageNum,
  displayNumber,
  position,
}: {
  file: File;
  pageNum: number;
  displayNumber: number;
  position: Position;
}) {
  // Map position to Tailwind absolute-position classes for the badge
  const badgePos: Record<Position, string> = {
    "bottom-center": "bottom-2 left-0 right-0 flex justify-center",
    "bottom-right":  "bottom-2 right-2 flex justify-end",
    "bottom-left":   "bottom-2 left-2 flex justify-start",
    "top-center":    "top-2 left-0 right-0 flex justify-center",
  };

  return (
    <div className="relative flex flex-col" style={{ width: 127 }}>
      {/* Thumbnail */}
      <div
        className="relative rounded-lg border border-outline-soft/20 bg-white shadow-sm overflow-hidden"
        style={{ width: 127, height: 180 }}
      >
        <PdfThumb file={file} page={pageNum} width={127} />

        {/* Page number preview badge */}
        <div className={`absolute z-10 pointer-events-none ${badgePos[position]}`}>
          <span className="bg-primary text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm shadow-sm min-w-[18px] text-center">
            {displayNumber}
          </span>
        </div>
      </div>

      <p className="mt-1.5 text-[11px] text-on-muted text-center">Page {pageNum}</p>
    </div>
  );
}

// ── AddPageNumbersTool ───────────────────────────────────────────────────────
export default function AddPageNumbersTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startAt, setStartAt] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFile = useCallback(async ([f]: File[]) => {
    if (!f || f.type !== "application/pdf") return;
    setError(null);
    setDownloadUrl(null);
    try {
      const doc = await getPdfDoc(f);
      setFile(f);
      setPageCount(doc.numPages);
    } catch {
      setError("Could not read the PDF. Please try another file.");
    }
  }, []);

  const clearFile = () => {
    setFile(null);
    setPageCount(0);
    setDownloadUrl(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontSize = 11;
      const margin = 20;
      doc.getPages().forEach((page, i) => {
        const { width, height } = page.getSize();
        const label = String(startAt + i);
        const textWidth = font.widthOfTextAtSize(label, fontSize);
        let x: number, y: number;
        switch (position) {
          case "bottom-center": x = (width - textWidth) / 2; y = margin; break;
          case "bottom-right":  x = width - textWidth - margin; y = margin; break;
          case "bottom-left":   x = margin; y = margin; break;
          case "top-center":    x = (width - textWidth) / 2; y = height - margin - fontSize; break;
        }
        page.drawText(label, { x, y, size: fontSize, font, color: rgb(0.3, 0.3, 0.3) });
      });
      const out = await doc.save();
      const blob = new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditorLayout
      workspace={
        <>
          {!file ? (
            <FileDropzone
              onFiles={handleFile}
              accept="application/pdf"
              title="Drop your PDF here"
              subtitle="or browse to select the PDF to number"
              icon="format_list_numbered"
            />
          ) : (
            <>
              {/* Page thumbnail grid with number badge preview */}
              <div className="flex flex-wrap gap-4 p-1 content-start">
                {Array.from({ length: pageCount }, (_, i) => (
                  <PageCard
                    key={i + 1}
                    file={file}
                    pageNum={i + 1}
                    displayNumber={startAt + i}
                    position={position}
                  />
                ))}
              </div>

              <button
                onClick={clearFile}
                className="text-xs text-on-muted hover:text-primary transition-colors flex items-center gap-1 underline underline-offset-2 self-start"
              >
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
                Replace file
              </button>
            </>
          )}

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5 text-red-700 text-sm">
              <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
              {error}
            </div>
          )}
        </>
      }
      sidebar={
        <>
          {file ? (
            <>
              {/* File summary */}
              <div className="flex items-center gap-3 bg-surface-low rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-primary text-lg">picture_as_pdf</span>
                <span className="flex-1 text-sm font-medium text-on-surface truncate">{file.name}</span>
                <span className="text-xs text-on-muted font-medium bg-white rounded-full px-2.5 py-1 shadow-sm">
                  {pageCount}p
                </span>
              </div>

              {/* Position */}
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-3">Number position</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(positionLabels) as Position[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPosition(p)}
                      className={`py-3 rounded-xl border font-bold text-xs transition-all ${
                        position === p
                          ? "bg-on-surface text-surface-white border-on-surface"
                          : "bg-surface-low border-outline-soft/40 text-on-muted hover:bg-surface-high"
                      }`}
                    >
                      {positionLabels[p]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start at */}
              <div>
                <label className="block text-xs font-bold text-on-muted uppercase tracking-widest mb-2">
                  Start numbering at
                </label>
                <input
                  type="number"
                  min={1}
                  value={startAt}
                  onChange={(e) => setStartAt(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-surface-low border border-outline-soft/40 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm outline-none text-on-surface font-medium transition-all"
                />
                <p className="text-xs text-on-muted mt-2">
                  Thumbnails show a live preview of each page&apos;s number.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <span className="material-symbols-outlined text-5xl text-outline-soft/50">auto_stories</span>
              <p className="text-sm text-on-muted mt-3 leading-relaxed">
                Upload a PDF to choose the position and starting number.
              </p>
            </div>
          )}
        </>
      }
      action={
        <>
          <div className="flex items-center gap-2 text-on-muted text-xs font-medium mb-3">
            <span className="material-symbols-outlined text-primary text-base">verified_user</span>
            Files never leave your device
          </div>
          {downloadUrl ? (
            <a
              href={downloadUrl}
              download="numbered.pdf"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </a>
          ) : (
            <button
              onClick={handleProcess}
              disabled={!file || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Adding Numbers…
                </>
              ) : (
                <>
                  Add Page Numbers
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          )}
        </>
      }
    />
  );
}
