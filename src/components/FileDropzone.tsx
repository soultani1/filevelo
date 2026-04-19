"use client";

import { useState } from "react";

interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
  /** MIME type(s) passed to the <input accept> attribute, e.g. "application/pdf" */
  accept: string;
  multiple?: boolean;
  /** Material Symbol icon name, defaults to "upload_file" */
  icon?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

/**
 * Standard drop zone used across all PDF tools.
 * Triggers onFiles when the user drops or selects valid files.
 */
export default function FileDropzone({
  onFiles,
  accept,
  multiple = false,
  icon = "upload_file",
  title = "Drop your PDF here",
  subtitle = "or browse to select a PDF",
  buttonLabel = "Select File",
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length) onFiles(multiple ? dropped : [dropped[0]]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length) onFiles(multiple ? picked : [picked[0]]);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl py-12 px-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
        dragging
          ? "border-primary bg-primary/5"
          : "border-outline-soft hover:border-primary"
      }`}
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
      </div>
      <h3 className="text-lg font-bold text-on-surface mb-1">{title}</h3>
      <p className="text-on-muted text-sm mb-6 max-w-xs">{subtitle}</p>
      <label className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-surface-low text-on-surface font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm">
        <span className="material-symbols-outlined text-lg">add</span>
        {buttonLabel}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
