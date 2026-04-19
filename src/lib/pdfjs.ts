/**
 * Shared PDF.js loader and per-file document cache.
 * Import getPdfDoc() from any client component — the library is lazy-loaded
 * once and the parsed PDFDocumentProxy is cached per File reference.
 */
import type { PDFDocumentProxy } from "pdfjs-dist";

type PdfjsLib = typeof import("pdfjs-dist");
let _lib: PdfjsLib | null = null;

export async function getPdfjsLib(): Promise<PdfjsLib> {
  if (_lib) return _lib;
  const lib = await import("pdfjs-dist");
  lib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  _lib = lib;
  return lib;
}

// WeakMap: key is the File object so entries are GC'd when the file is gone
const _cache = new WeakMap<File, PDFDocumentProxy>();

export async function getPdfDoc(file: File): Promise<PDFDocumentProxy> {
  if (_cache.has(file)) return _cache.get(file)!;
  const lib = await getPdfjsLib();
  const bytes = await file.arrayBuffer();
  const doc = await lib.getDocument({ data: new Uint8Array(bytes) }).promise;
  _cache.set(file, doc);
  return doc;
}
