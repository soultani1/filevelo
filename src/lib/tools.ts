export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: string;           // emoji fallback
  materialIcon: string;   // Material Symbols name
  iconBg: string;         // Tailwind bg class for icon box
  iconColor: string;      // Tailwind text class for icon
  category: "client" | "server";
  filterTag: "organize" | "optimize" | "convert" | "edit";
  related: string[];
  color: string;
}

export const tools: Tool[] = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document instantly in your browser.",
    icon: "🔗",
    materialIcon: "merge_type",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    category: "client",
    filterTag: "organize",
    related: ["split-pdf", "compress-pdf", "rotate-pdf"],
    color: "blue",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    description: "Extract pages or split a PDF into multiple files — free and private.",
    icon: "✂️",
    materialIcon: "content_cut",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    category: "client",
    filterTag: "organize",
    related: ["merge-pdf", "compress-pdf", "add-page-numbers"],
    color: "purple",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size while preserving quality using smart compression.",
    icon: "🗜️",
    materialIcon: "compress",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    category: "server",
    filterTag: "optimize",
    related: ["merge-pdf", "pdf-to-word", "split-pdf"],
    color: "green",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF files to editable Word (.docx) documents accurately.",
    icon: "📄",
    materialIcon: "description",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    category: "server",
    filterTag: "convert",
    related: ["word-to-pdf", "compress-pdf", "merge-pdf"],
    color: "indigo",
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word (.docx) files to perfectly formatted PDF documents.",
    icon: "📝",
    materialIcon: "picture_as_pdf",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    category: "server",
    filterTag: "convert",
    related: ["pdf-to-word", "compress-pdf", "merge-pdf"],
    color: "red",
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    description: "Rotate PDF pages 90°, 180°, or 270° — processed locally in your browser.",
    icon: "🔄",
    materialIcon: "rotate_right",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    category: "client",
    filterTag: "organize",
    related: ["merge-pdf", "split-pdf", "add-page-numbers"],
    color: "orange",
  },
  {
    slug: "add-page-numbers",
    name: "Add Page Numbers",
    description: "Add page numbers to any PDF — choose position, font size, and starting number.",
    icon: "🔢",
    materialIcon: "auto_stories",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    category: "client",
    filterTag: "edit",
    related: ["merge-pdf", "split-pdf", "rotate-pdf"],
    color: "teal",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.related
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as Tool[];
}
