"use client";

import { useState } from "react";
import { useCloudConvert } from "@/hooks/useCloudConvert";
import EditorLayout from "@/components/EditorLayout";
import PdfThumb from "@/components/PdfThumb";
import FileDropzone from "@/components/FileDropzone";

type CompressionLevel = "low" | "medium" | "high";

const COMPRESSION_LABELS: Record<CompressionLevel, { label: string; hint: string; icon: string }> = {
  low:    { label: "Low",    hint: "Smaller reduction, best quality", icon: "draft"        },
  medium: { label: "Medium", hint: "Balanced size and quality",       icon: "tune"         },
  high:   { label: "High",   hint: "Maximum reduction, good quality", icon: "compress"     },
};

export default function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const { loading, error, downloadUrl, downloadName, convert, reset } = useCloudConvert();

  const handleFile = ([f]: File[]) => {
    if (!f || f.type !== "application/pdf") return;
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
              accept="application/pdf"
              title="Drop your PDF here"
              subtitle="or browse to select a PDF to compress"
            />
          ) : (
            <>
              {/* Single file cover thumbnail */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className="relative rounded-xl border border-outline-soft/20 bg-white shadow-md overflow-hidden"
                  style={{ width: 160, height: Math.round(160 * (842 / 595)) }}
                >
                  <PdfThumb file={file} page={1} width={160} />
                </div>

                <div className="text-center">
                  <p className="text-sm font-bold text-on-surface">{file.name}</p>
                  <p className="text-xs text-on-muted mt-0.5">{(file.size / 1024).toFixed(0)} KB original</p>
                </div>

                <button
                  onClick={clearFile}
                  className="text-xs text-on-muted hover:text-primary transition-colors flex items-center gap-1 underline underline-offset-2"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  Replace file
                </button>
              </div>

              {/* Cloud processing indicator */}
              {loading && (
                <div className="flex items-center gap-3 bg-primary/5 rounded-xl px-4 py-3.5 text-primary text-sm font-medium">
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin flex-shrink-0" />
                  Compressing in the cloud… this may take a moment.
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
            <>
              {/* Compression level */}
              <div>
                <p className="text-xs font-bold text-on-muted uppercase tracking-widest mb-3">
                  Compression level
                </p>
                <div className="flex flex-col gap-2">
                  {(Object.entries(COMPRESSION_LABELS) as [CompressionLevel, typeof COMPRESSION_LABELS[CompressionLevel]][]).map(
                    ([key, { label, hint, icon }]) => (
                      <button
                        key={key}
                        onClick={() => setLevel(key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-medium text-sm transition-all text-left ${
                          level === key
                            ? "bg-on-surface text-surface-white border-on-surface"
                            : "bg-surface-low border-outline-soft/40 text-on-muted hover:bg-surface-high"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base flex-shrink-0">{icon}</span>
                        <span className="flex flex-col">
                          <span className="font-bold">{label}</span>
                          <span className={`text-[11px] leading-tight ${level === key ? "text-white/70" : "text-on-muted/70"}`}>
                            {hint}
                          </span>
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Cloud processing</p>
                <p className="text-xs text-on-muted leading-relaxed">
                  Compression runs in a secure cloud engine. Your file is deleted immediately after download.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <span className="material-symbols-outlined text-5xl text-outline-soft/50">compress</span>
              <p className="text-sm text-on-muted mt-3 leading-relaxed">
                Upload a PDF to reduce its file size without losing quality.
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
              Download Compressed PDF
            </a>
          ) : (
            <button
              onClick={() => file && convert(file, "pdf", "pdf", { compressionLevel: level })}
              disabled={!file || loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-base text-white transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Compressing…
                </>
              ) : (
                <>
                  Compress PDF
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
