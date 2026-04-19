"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import EditorLayout from "@/components/EditorLayout";
import PdfWorkarea from "@/components/PdfWorkarea";

export default function RotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
  const [scope, setScope] = useState<"all" | "range">("all");
  const [range, setRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Called by PdfWorkarea when a PDF is successfully loaded
  const handleFileLoad = (f: File, pages: number) => {
    setFile(f);
    setPageCount(pages);
    setError(null);
    setDownloadUrl(null);
  };

  // Called by PdfWorkarea when the last page is removed
  const handleEmpty = () => {
    setFile(null);
    setPageCount(0);
    setDownloadUrl(null);
  };

  /**
   * Called when the user clicks a page's rotate button in the workarea.
   * Syncs the sidebar rotation selector to match the visual rotation
   * (0° wraps back to the default 90° option).
   */
  const handlePageRotated = (newVisualRotation: number) => {
    if (
      newVisualRotation === 90 ||
      newVisualRotation === 180 ||
      newVisualRotation === 270
    ) {
      setRotation(newVisualRotation as 90 | 180 | 270);
    }
    // 0° (full circle) → leave sidebar at its current value
  };

  const parsePages = (input: string, total: number): number[] => {
    const indices: number[] = [];
    input.split(",").forEach((part) => {
      part = part.trim();
      if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        for (let i = a; i <= b; i++) if (i >= 1 && i <= total) indices.push(i - 1);
      } else {
        const n = Number(part);
        if (n >= 1 && n <= total) indices.push(n - 1);
      }
    });
    return [...new Set(indices)];
  };

  const handleRotate = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const bytes = await file.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const total = doc.getPageCount();
      const indices =
        scope === "all"
          ? Array.from({ length: total }, (_, i) => i)
          : parsePages(range, total);
      if (!indices.length) throw new Error("No valid pages in the specified range.");
      indices.forEach((i) => {
        const page = doc.getPage(i);
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + rotation) % 360));
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
          {/* Interactive PDF workarea — drop zone → thumbnail grid */}
          <PdfWorkarea
            onFileLoad={handleFileLoad}
            onEmpty={handleEmpty}
            onPageRotated={handlePageRotated}
          />

          {/* Error banner */}
          {error && (
            <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5 text-red-700 text-sm">
              <span className="material-symbols-outlined text-lg flex-shrink-0">
                error
              </span>
              {error}
            </div>
          )}
        </>
      }
      sidebar={
        <>
          {file ? (
            <>
              {/* File summary chip */}
              <div className="flex items-center gap-3 bg-surface-low rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-primary text-lg">
                  picture_as_pdf
                </span>
                <span className="flex-1 text-sm font-medium text-on-surface truncate">
                  {file.name}
                </span>
                <span className="text-xs text-on-muted font-medium bg-white rounded-full px-2.5 py-1 shadow-sm">
                  {pageCount}p
                </span>
              </div>

              {/* Rotation angle — stays in sync with workarea hover button */}
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-3">
                  Rotation angle
                </p>
                <div className="flex gap-2">
                  {([90, 180, 270] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRotation(r)}
                      className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all flex flex-col items-center gap-1 ${
                        rotation === r
                          ? "bg-on-surface text-surface-white border-on-surface"
                          : "bg-surface-low border-outline-soft/40 text-on-muted hover:bg-surface-high"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {r === 90
                          ? "rotate_right"
                          : r === 270
                            ? "rotate_left"
                            : "sync"}
                      </span>
                      {r}°
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope */}
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-3">
                  Apply to
                </p>
                <div className="flex flex-col gap-2">
                  {(["all", "range"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScope(s)}
                      className={`w-full py-3 rounded-xl border font-bold text-sm transition-all ${
                        scope === s
                          ? "bg-on-surface text-surface-white border-on-surface"
                          : "bg-surface-low border-outline-soft/40 text-on-muted hover:bg-surface-high"
                      }`}
                    >
                      {s === "all" ? "All Pages" : "Specific Pages"}
                    </button>
                  ))}
                </div>
              </div>

              {scope === "range" && (
                <div>
                  <label className="block text-xs font-bold text-on-muted uppercase tracking-widest mb-2">
                    Pages (e.g. 1, 3-5, 7)
                  </label>
                  <input
                    type="text"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    placeholder="e.g. 1, 3-5, 7"
                    className="w-full bg-surface-low border border-outline-soft/40 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-sm outline-none text-on-surface font-medium transition-all"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <span className="material-symbols-outlined text-5xl text-outline-soft/50">
                rotate_right
              </span>
              <p className="text-sm text-on-muted mt-3 leading-relaxed">
                Upload a PDF to configure rotation options.
              </p>
            </div>
          )}
        </>
      }
      action={
        <>
          <div className="flex items-center gap-2 text-on-muted text-xs font-medium mb-3">
            <span className="material-symbols-outlined text-primary text-base">
              verified_user
            </span>
            Files never leave your device
          </div>
          {downloadUrl ? (
            <a
              href={downloadUrl}
              download="rotated.pdf"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)",
              }}
            >
              <span className="material-symbols-outlined">download</span>
              Download Rotated PDF
            </a>
          ) : (
            <button
              onClick={handleRotate}
              disabled={!file || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{
                background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)",
              }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Rotating…
                </>
              ) : (
                <>
                  Rotate PDF
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
