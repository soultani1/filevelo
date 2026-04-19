"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { getPdfDoc } from "@/lib/pdfjs";
import EditorLayout from "@/components/EditorLayout";
import PdfThumb from "@/components/PdfThumb";
import FileDropzone from "@/components/FileDropzone";

interface FileItem {
  id: string;
  file: File;
  pageCount: number;
}

// ── File card (cover thumbnail + reorder/remove actions) ────────────────────
function FileCard({
  item,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  item: FileItem;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  const name = item.file.name.replace(/\.pdf$/i, "");

  return (
    <div className="group relative flex flex-col" style={{ width: 127 }}>
      {/* Hover actions */}
      <div className="absolute top-1.5 right-1.5 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-low disabled:opacity-30 cursor-pointer transition-colors"
          title="Move up"
        >
          <span className="material-symbols-outlined text-[#47474F]" style={{ fontSize: 14 }}>
            keyboard_arrow_up
          </span>
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-low disabled:opacity-30 cursor-pointer transition-colors"
          title="Move down"
        >
          <span className="material-symbols-outlined text-[#47474F]" style={{ fontSize: 14 }}>
            keyboard_arrow_down
          </span>
        </button>
        <button
          onClick={onRemove}
          className="w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors"
          title="Remove file"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
            <polygon fill="#47474F" fillRule="evenodd" points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6" />
          </svg>
        </button>
      </div>

      {/* Order badge */}
      <div className="absolute top-1.5 left-1.5 z-10 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center shadow">
        {index + 1}
      </div>

      {/* Thumbnail */}
      <div
        className="rounded-lg border border-outline-soft/20 bg-white shadow-sm overflow-hidden"
        style={{ width: 127, height: 180 }}
      >
        <PdfThumb file={item.file} page={1} width={127} />
      </div>

      {/* Label */}
      <div className="mt-1.5 px-0.5">
        <p className="text-[11px] text-on-muted text-center truncate leading-tight" title={item.file.name}>
          {name}
        </p>
        <p className="text-[10px] text-on-muted/50 text-center">
          {item.pageCount}p · {(item.file.size / 1024).toFixed(0)} KB
        </p>
      </div>
    </div>
  );
}

// ── MergeTool ───────────────────────────────────────────────────────────────
export default function MergeTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const addFiles = useCallback(async (incoming: File[]) => {
    const pdfs = incoming.filter((f) => f.type === "application/pdf");
    setDownloadUrl(null);
    setError(null);

    const newItems = await Promise.all(
      pdfs.map(async (f) => {
        try {
          const doc = await getPdfDoc(f);
          return { id: `${f.name}-${Date.now()}-${Math.random()}`, file: f, pageCount: doc.numPages };
        } catch {
          return { id: `${f.name}-${Date.now()}-${Math.random()}`, file: f, pageCount: 0 };
        }
      }),
    );

    setFiles((prev) => [...prev, ...newItems]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setDownloadUrl(null);
  };

  const moveUp = (index: number) => {
    setFiles((prev) => {
      if (index === 0) return prev;
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    setFiles((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    try {
      const merged = await PDFDocument.create();
      for (const { file } of files) {
        if (file.size > 50 * 1024 * 1024) throw new Error(`"${file.name}" exceeds the 50 MB limit.`);
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const mergedBytes = await merged.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hasFiles = files.length > 0;

  return (
    <EditorLayout
      workspace={
        <>
          {!hasFiles ? (
            <FileDropzone
              onFiles={addFiles}
              accept="application/pdf"
              multiple
              title="Drop your PDFs here"
              subtitle="or browse to select multiple PDFs to merge"
              buttonLabel="Add Files"
              icon="upload_file"
            />
          ) : (
            <div className="flex flex-wrap gap-4 p-1 content-start">
              {files.map((item, i) => (
                <FileCard
                  key={item.id}
                  item={item}
                  index={i}
                  total={files.length}
                  onMoveUp={() => moveUp(i)}
                  onMoveDown={() => moveDown(i)}
                  onRemove={() => removeFile(item.id)}
                />
              ))}

              {/* Add more files button */}
              <label
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-soft hover:border-primary cursor-pointer transition-colors"
                style={{ width: 127, height: 180 }}
                title="Add more PDFs"
              >
                <span className="material-symbols-outlined text-3xl text-outline-soft mb-1">add</span>
                <span className="text-[11px] text-on-muted font-medium">Add file</span>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
                />
              </label>
            </div>
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
          {hasFiles ? (
            <>
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-3">Files to merge</p>
                <div className="bg-surface-low rounded-xl p-4 text-center">
                  <p className="text-4xl font-black text-on-surface">{files.length}</p>
                  <p className="text-xs text-on-muted font-medium mt-1">
                    {files.length === 1 ? "file — add at least one more" : "files ready"}
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Order matters</p>
                <p className="text-xs text-on-muted leading-relaxed">
                  Files merge top-to-bottom. Use the arrows on each card to reorder, or drag in more files to append.
                </p>
              </div>

              {/* File list summary */}
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-2">Merge order</p>
                <div className="space-y-1.5">
                  {files.map((f, i) => (
                    <div key={f.id} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-xs text-on-surface truncate flex-1">{f.file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <span className="material-symbols-outlined text-5xl text-outline-soft/50">merge_type</span>
              <p className="text-sm text-on-muted mt-3 leading-relaxed">
                Add 2 or more PDFs to combine them into a single file.
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
              download="merged.pdf"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              <span className="material-symbols-outlined">download</span>
              Download Merged PDF
            </a>
          ) : (
            <button
              onClick={handleMerge}
              disabled={files.length < 2 || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Merging…
                </>
              ) : (
                <>
                  Merge PDF
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
