"use client";

import { useState } from "react";
import { useCloudConvert } from "@/hooks/useCloudConvert";
import EditorLayout from "@/components/EditorLayout";
import FileDropzone from "@/components/FileDropzone";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function WordToPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const { loading, error, downloadUrl, downloadName, convert, reset } = useCloudConvert();

  const isValid = (f: File) =>
    f.type === DOCX_MIME || f.name.toLowerCase().endsWith(".docx");

  const handleFile = ([f]: File[]) => {
    if (!f || !isValid(f)) return;
    setFile(f);
    reset();
  };

  const clearFile = () => {
    setFile(null);
    reset();
  };

  return (
    <EditorLayout
      workspace={
        <>
          {!file ? (
            <FileDropzone
              onFiles={handleFile}
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              title="Drop your Word file here"
              subtitle="or browse to select a .docx file to convert"
              icon="description"
              buttonLabel="Select .docx File"
            />
          ) : (
            <>
              {/* File card (no PDF preview for .docx) */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="rounded-xl border border-outline-soft/20 bg-white shadow-md flex items-center justify-center"
                  style={{ width: 160, height: Math.round(160 * (842 / 595)) }}
                >
                  <div className="flex flex-col items-center gap-2 text-center px-4">
                    <span className="material-symbols-outlined text-5xl text-primary">description</span>
                    <span className="text-xs font-bold text-on-muted">.docx</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm font-bold text-on-surface">{file.name}</p>
                  <p className="text-xs text-on-muted mt-0.5">{(file.size / 1024).toFixed(0)} KB</p>
                </div>

                <button
                  onClick={clearFile}
                  className="text-xs text-on-muted hover:text-primary transition-colors flex items-center gap-1 underline underline-offset-2"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  Replace file
                </button>
              </div>

              {loading && (
                <div className="flex items-center gap-3 bg-primary/5 rounded-xl px-4 py-3.5 text-primary text-sm font-medium">
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin flex-shrink-0" />
                  Converting via secure cloud engine…
                </div>
              )}
            </>
          )}

          {error && (
            <div className={`flex items-start gap-3 rounded-xl px-4 py-3.5 text-sm ${
              error.includes("Daily limit")
                ? "bg-amber-50 border border-amber-200 text-amber-800"
                : "bg-red-50 border border-red-100 text-red-700"
            }`}>
              <span className="material-symbols-outlined text-lg flex-shrink-0">
                {error.includes("Daily limit") ? "warning" : "error"}
              </span>
              {error}
            </div>
          )}
        </>
      }
      sidebar={
        <>
          {file ? (
            <div className="space-y-4">
              <div className="bg-surface-low rounded-xl p-4">
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-2">Output format</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-primary text-lg">picture_as_pdf</span>
                  <span className="text-sm font-bold text-on-surface">.pdf (PDF Document)</span>
                </div>
              </div>
              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Cloud processing</p>
                <p className="text-xs text-on-muted leading-relaxed">
                  Conversion runs in a secure cloud engine. Your file is deleted immediately after download.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <span className="material-symbols-outlined text-5xl text-outline-soft/50">picture_as_pdf</span>
              <p className="text-sm text-on-muted mt-3 leading-relaxed">
                Upload a .docx file to convert it into a professional PDF.
              </p>
            </div>
          )}
        </>
      }
      action={
        <>
          <div className="flex items-center gap-2 text-on-muted text-xs font-medium mb-3">
            <span className="material-symbols-outlined text-primary text-base">cloud</span>
            Secure cloud — deleted after conversion
          </div>
          {downloadUrl && downloadName ? (
            <a
              href={downloadUrl}
              download={downloadName}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </a>
          ) : (
            <button
              onClick={() => file && convert(file, "docx", "pdf")}
              disabled={!file || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Converting…
                </>
              ) : (
                <>
                  Convert to PDF
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
