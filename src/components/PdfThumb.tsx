"use client";

import { useEffect, useRef, useState } from "react";
import { getPdfDoc } from "@/lib/pdfjs";

interface PdfThumbProps {
  file: File;
  /** 1-indexed page number, defaults to 1 (cover) */
  page?: number;
  /** Target rendered width in px, defaults to 127 */
  width?: number;
  /** Optional extra className on the <canvas> element */
  className?: string;
}

/**
 * Renders a single page of a PDF file as a canvas thumbnail.
 * Width is fixed; height is determined by the page's natural aspect ratio.
 * Shows a spinner while the canvas is being painted.
 *
 * The parent is responsible for sizing, clipping, and any visual transforms
 * (e.g. rotation) applied on top of this element.
 */
export default function PdfThumb({
  file,
  page = 1,
  width = 127,
  className,
}: PdfThumbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);

    (async () => {
      try {
        const doc = await getPdfDoc(file);
        if (cancelled) return;

        const pdfPage = await doc.getPage(page);
        if (cancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const viewport = pdfPage.getViewport({ scale: 1 });
        const scale = width / viewport.width;
        const scaled = pdfPage.getViewport({ scale });

        canvas.width = Math.round(scaled.width);
        canvas.height = Math.round(scaled.height);

        await pdfPage.render({ canvasContext: ctx, viewport: scaled, canvas }).promise;
        if (!cancelled) setReady(true);
      } catch (err) {
        console.error("[PdfThumb] render error:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [file, page, width]);

  return (
    <>
      {!ready && (
        <div
          className="flex items-center justify-center bg-surface-low"
          style={{ width, height: Math.round(width * (842 / 595)) }}
        >
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={className}
        style={{ display: ready ? "block" : "none" }}
      />
    </>
  );
}
