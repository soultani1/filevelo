"use client";

import { useState } from "react";

interface ConvertOptions {
  /** Used for PDF→PDF compression: "low" | "medium" | "high" */
  compressionLevel?: "low" | "medium" | "high";
}

interface UseCloudConvertResult {
  loading: boolean;
  error: string | null;
  downloadUrl: string | null;
  downloadName: string | null;
  convert: (file: File, inputFormat: string, outputFormat: string, options?: ConvertOptions) => Promise<void>;
  reset: () => void;
}

export function useCloudConvert(): UseCloudConvertResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string | null>(null);

  const convert = async (
    file: File,
    inputFormat: string,
    outputFormat: string,
    options?: ConvertOptions,
  ) => {
    setLoading(true);
    setError(null);
    setDownloadUrl(null);
    setDownloadName(null);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("inputFormat", inputFormat);
      body.append("outputFormat", outputFormat);
      if (options?.compressionLevel) {
        body.append("compressionLevel", options.compressionLevel);
      }

      const res = await fetch("/api/convert", { method: "POST", body });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error === "CREDIT_LIMIT") {
          setError(data.message);
        } else {
          setError(data?.error ?? "Conversion failed. Please try again.");
        }
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="(.+?)"/);
      const name = match?.[1] ?? `converted.${outputFormat}`;

      setDownloadUrl(url);
      setDownloadName(name);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setDownloadUrl(null);
    setDownloadName(null);
  };

  return { loading, error, downloadUrl, downloadName, convert, reset };
}
