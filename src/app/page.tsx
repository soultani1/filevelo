import type { Metadata } from "next";
import ToolsSection from "./ToolsSection";

export const metadata: Metadata = {
  title: "Free Online PDF Tools – Merge, Split, Compress & Convert | FileVelo",
  description:
    "Merge, split, compress, convert and edit PDF files for free. No sign-up required. Browser-based for privacy or secure cloud processing. FileVelo — velocity meets security.",
};

export default function HomePage() {
  return <ToolsSection />;
}
