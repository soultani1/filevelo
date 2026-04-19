import Link from "next/link";
import { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group bg-surface-white p-8 rounded-[1.25rem] border border-outline-soft/40 hover:border-primary/20 hover:shadow-[0_40px_60px_-15px_rgba(79,70,229,0.07)] transition-all duration-300 flex flex-col items-start text-left"
    >
      {/* Icon box */}
      <div
        className={`w-12 h-12 ${tool.iconBg} rounded-xl flex items-center justify-center ${tool.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <span className="material-symbols-outlined text-[1.75rem]">{tool.materialIcon}</span>
      </div>

      {/* Text */}
      <h3 className="text-lg font-extrabold text-on-surface mb-2">{tool.name}</h3>
      <p className="text-sm text-on-muted leading-relaxed font-medium">{tool.description}</p>

    </Link>
  );
}
