"use client";

import { useState, useCallback } from "react";
import { getPdfDoc } from "@/lib/pdfjs";
import PdfThumb from "@/components/PdfThumb";
import FileDropzone from "@/components/FileDropzone";

// ── Types ───────────────────────────────────────────────────────────────────
export interface PageItem {
  id: string;
  file: File;
  pageNum: number;
  totalPages: number;
  /** Cumulative visual rotation: 0 | 90 | 180 | 270 */
  visualRotation: number;
}

export interface PdfWorkareaProps {
  onFileLoad: (file: File, pageCount: number) => void;
  onEmpty: () => void;
  /**
   * Called when the user clicks a page's rotate button.
   * Receives the new cumulative rotation so the parent can sync the sidebar.
   */
  onPageRotated: (newVisualRotation: number) => void;
}

// ── Constants ───────────────────────────────────────────────────────────────
const THUMB_W = 127;
const THUMB_H = 180;

// ── PageCard ────────────────────────────────────────────────────────────────
function PageCard({
  page,
  onRotate,
  onRemove,
}: {
  page: PageItem;
  onRotate: () => void;
  onRemove: () => void;
}) {
  const isRotated = page.visualRotation === 90 || page.visualRotation === 270;
  const scale = isRotated ? THUMB_W / THUMB_H : 1;

  const canvasStyle: React.CSSProperties = {
    transform: `rotate(${page.visualRotation}deg) scale(${scale})`,
    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  const displayName = page.file.name.replace(/\.pdf$/i, "");

  return (
    <div
      className="file file--rotate group relative flex flex-col"
      style={{ width: THUMB_W }}
      data-size={page.file.size}
      data-extension="PDF"
    >
      {/* Hover action buttons */}
      <div className="file__actions absolute top-1.5 right-1.5 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Rotate */}
        <button
          className="file__btn rotate w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-low cursor-pointer transition-colors"
          data-rotate={page.visualRotation}
          title="Rotate 90°"
          onClick={onRotate}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16">
            <path
              d="M11.328 6.364l1.24-1.2c.79.98 1.283 2.113 1.433 3.288h-1.775c-.123-.735-.43-1.454-.896-2.088zm.896 3.778H14c-.15 1.175-.633 2.308-1.424 3.288l-1.24-1.2c.457-.634.765-1.344.888-2.088zm-.888 4.497C10.318 15.4 9.13 15.856 7.9 16v-1.716a5.31 5.31 0 0 0 2.162-.871l1.266 1.226zM6.152 2.595V0l4 3.846-4 3.76V4.302c-2.496.406-4.394 2.485-4.394 4.995s1.898 4.59 4.394 4.995V16C2.68 15.586 0 12.746 0 9.297s2.68-6.29 6.152-6.703z"
              fill="#47474F"
              fillRule="evenodd"
            />
          </svg>
        </button>

        {/* Remove */}
        <button
          className="file__btn remove w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 cursor-pointer transition-colors"
          title="Remove page"
          onClick={onRemove}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
            <polygon
              fill="#47474F"
              fillRule="evenodd"
              points="12 1.208 10.79 0 6 4.792 1.21 0 0 1.208 4.79 6 0 10.792 1.21 12 6 7.208 10.79 12 12 10.792 7.21 6"
            />
          </svg>
        </button>
      </div>

      {/* Canvas wrapper — fixed portrait box, canvas rotates inside */}
      <div
        className="file__canvas relative rounded-lg border border-outline-soft/20 bg-white shadow-sm overflow-hidden flex items-center justify-center"
        style={{ width: THUMB_W, height: THUMB_H }}
      >
        <div style={canvasStyle}>
          <PdfThumb file={page.file} page={page.pageNum} width={THUMB_W} />
        </div>
      </div>

      {/* File info */}
      <div className="file__info mt-1.5 px-0.5">
        <span
          className="file__info__name text-[11px] text-on-muted truncate block text-center leading-tight"
          title={page.file.name}
        >
          {displayName}
        </span>
        {page.totalPages > 1 && (
          <span className="text-[10px] text-on-muted/50 block text-center">
            p.{page.pageNum}
          </span>
        )}
      </div>
    </div>
  );
}

// ── PdfWorkarea ─────────────────────────────────────────────────────────────
export default function PdfWorkarea({
  onFileLoad,
  onEmpty,
  onPageRotated,
}: PdfWorkareaProps) {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);

  const hasPages = pages.length > 0;

  const processFile = useCallback(
    async (file: File) => {
      if (file.type !== "application/pdf") return;
      setLoading(true);
      try {
        const doc = await getPdfDoc(file);
        const total = doc.numPages;
        setPages((prev) => [
          ...prev,
          ...Array.from({ length: total }, (_, i) => ({
            id: `${file.name}__p${i + 1}__${Date.now()}`,
            file,
            pageNum: i + 1,
            totalPages: total,
            visualRotation: 0,
          })),
        ]);
        onFileLoad(file, total);
      } catch (err) {
        console.error("[PdfWorkarea] failed to load file:", err);
      } finally {
        setLoading(false);
      }
    },
    [onFileLoad],
  );

  const handleRotatePage = useCallback(
    (id: string) => {
      setPages((prev) => {
        let newRot = 0;
        const next = prev.map((p) => {
          if (p.id !== id) return p;
          newRot = (p.visualRotation + 90) % 360;
          return { ...p, visualRotation: newRot };
        });
        onPageRotated(newRot);
        return next;
      });
    },
    [onPageRotated],
  );

  const handleRemovePage = useCallback(
    (id: string) => {
      setPages((prev) => {
        const next = prev.filter((p) => p.id !== id);
        if (next.length === 0) onEmpty();
        return next;
      });
    },
    [onEmpty],
  );

  if (!hasPages) {
    return (
      <FileDropzone
        onFiles={([f]) => f && processFile(f)}
        accept="application/pdf"
        title={loading ? "Loading PDF…" : "Drop your PDF here"}
        subtitle="or browse to select a PDF to rotate"
        icon={loading ? "hourglass_empty" : "upload_file"}
      />
    );
  }

  return (
    <div
      id="fileGroups"
      className="tool__workarea__rendered flex flex-wrap gap-4 p-1 content-start"
    >
      {pages.map((page) => (
        <PageCard
          key={page.id}
          page={page}
          onRotate={() => handleRotatePage(page.id)}
          onRemove={() => handleRemovePage(page.id)}
        />
      ))}
    </div>
  );
}
