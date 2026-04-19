"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { getPdfDoc } from "@/lib/pdfjs";
import EditorLayout from "@/components/EditorLayout";
import PdfThumb from "@/components/PdfThumb";
import FileDropzone from "@/components/FileDropzone";

type Mode = "all" | "range";

interface PageItem {
  pageNum: number; // 1-indexed
}

// ── Page card (read-only, shows the page thumbnail + page number) ────────────
function PageCard({ file, pageNum }: { file: File; pageNum: number }) {
  return (
    <div className="relative flex flex-col" style={{ width: 127 }}>
      {/* Page number badge */}
      <div className="absolute bottom-[30px] left-0 right-0 flex justify-center z-10 pointer-events-none">
        <span className="bg-on-surface/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {pageNum}
        </span>
      </div>

      {/* Thumbnail */}
      <div
        className="rounded-lg border border-outline-soft/20 bg-white shadow-sm overflow-hidden"
        style={{ width: 127, height: 180 }}
      >
        <PdfThumb file={file} page={pageNum} width={127} />
      </div>

      {/* Label */}
      <p className="mt-1.5 text-[11px] text-on-muted text-center">Page {pageNum}</p>
    </div>
  );
}

// ── SplitTool ───────────────────────────────────────────────────────────────
export default function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [mode, setMode] = useState<Mode>("all");
  const [range, setRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloads, setDownloads] = useState<{ url: string; name: string }[]>([]);

  const handleFile = useCallback(async ([f]: File[]) => {
    if (!f || f.type !== "application/pdf") return;
    setError(null);
    setDownloads([]);
    try {
      const doc = await getPdfDoc(f);
      const total = doc.numPages;
      setFile(f);
      setPages(Array.from({ length: total }, (_, i) => ({ pageNum: i + 1 })));
    } catch {
      setError("Could not read the PDF. Please try another file.");
    }
  }, []);

  const clearFile = () => {
    setFile(null);
    setPages([]);
    setDownloads([]);
    setError(null);
  };

  const parseRange = (input: string, total: number): number[][] => {
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    return parts.map((part) => {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        const start = Math.max(1, Math.min(a, total));
        const end = Math.max(start, Math.min(b, total));
        return Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
      }
      const n = Math.max(1, Math.min(Number(part), total));
      return [n - 1];
    });
  };

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setDownloads([]);
    try {
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);
      const total = srcDoc.getPageCount();
      const groups: number[][] =
        mode === "all"
          ? Array.from({ length: total }, (_, i) => [i])
          : parseRange(range, total);
      if (!groups.length) throw new Error("Invalid page range.");

      const results: { url: string; name: string }[] = [];
      for (let i = 0; i < groups.length; i++) {
        const newDoc = await PDFDocument.create();
        const copied = await newDoc.copyPages(srcDoc, groups[i]);
        copied.forEach((p) => newDoc.addPage(p));
        const out = await newDoc.save();
        const blob = new Blob([out.buffer as ArrayBuffer], { type: "application/pdf" });
        results.push({
          url: URL.createObjectURL(blob),
          name: mode === "all" ? `page-${groups[i][0] + 1}.pdf` : `split-${i + 1}.pdf`,
        });
      }
      setDownloads(results);
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
              subtitle="or browse to select a PDF to split"
            />
          ) : (
            <>
              {/* Page thumbnail grid */}
              <div className="flex flex-wrap gap-4 p-1 content-start">
                {pages.map(({ pageNum }) => (
                  <PageCard key={pageNum} file={file} pageNum={pageNum} />
                ))}
              </div>

              {/* Replace file link */}
              <div className="flex items-center gap-2">
                <button
                  onClick={clearFile}
                  className="text-xs text-on-muted hover:text-primary transition-colors flex items-center gap-1 underline underline-offset-2"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  Replace file
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5 text-red-700 text-sm">
              <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
              {error}
            </div>
          )}

          {downloads.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-on-muted uppercase tracking-widest px-1">
                {downloads.length} file{downloads.length > 1 ? "s" : ""} ready
              </p>
              {downloads.map((d) => (
                <a
                  key={d.url}
                  href={d.url}
                  download={d.name}
                  className="flex items-center gap-3 bg-white border border-mint/20 text-mint hover:bg-mint-bg/10 rounded-xl px-4 py-3 text-sm font-bold transition-all"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  {d.name}
                </a>
              ))}
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
                  {pages.length}p
                </span>
              </div>

              {/* Split mode */}
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-3">Split mode</p>
                <div className="flex flex-col gap-2">
                  {(["all", "range"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`w-full py-3 rounded-xl border font-bold text-sm transition-all ${
                        mode === m
                          ? "bg-on-surface text-surface-white border-on-surface"
                          : "bg-surface-low border-outline-soft/40 text-on-muted hover:bg-surface-high"
                      }`}
                    >
                      {m === "all" ? "Split Every Page" : "Extract Range"}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "range" && (
                <div>
                  <label className="block text-xs font-bold text-on-muted uppercase tracking-widest mb-2">
                    Pages (e.g. 1-3, 5, 7-9)
                  </label>
                  <input
                    type="text"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    placeholder="1-3, 5, 7-9"
                    className="w-full bg-surface-low border border-outline-soft/40 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm outline-none text-on-surface font-medium transition-all"
                  />
                  <p className="text-xs text-on-muted mt-2">Each range becomes a separate PDF file.</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <span className="material-symbols-outlined text-5xl text-outline-soft/50">call_split</span>
              <p className="text-sm text-on-muted mt-3 leading-relaxed">
                Upload a PDF to configure split options.
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
          <button
            onClick={handleSplit}
            disabled={!file || loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Splitting…
              </>
            ) : (
              <>
                Split PDF
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </>
      }
    />
  );
}
