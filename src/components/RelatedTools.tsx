import Link from "next/link";
import { Tool } from "@/lib/tools";

export default function RelatedTools({ tools }: { tools: Tool[] }) {
  if (!tools.length) return null;
  return (
    <section className="mt-16 pt-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-8 bg-primary rounded-full" />
        <h2 className="text-xl font-bold text-on-surface">Related Tools</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="group flex items-center gap-4 p-5 bg-surface-low rounded-xl hover:bg-surface-white hover:shadow-[0_10px_30px_rgba(79,70,229,0.06)] border border-outline-soft/20 hover:border-primary/20 transition-all duration-200"
          >
            <div className={`w-10 h-10 ${t.iconBg} rounded-lg flex items-center justify-center ${t.iconColor} flex-shrink-0`}>
              <span className="material-symbols-outlined text-[1.25rem]">{t.materialIcon}</span>
            </div>
            <div>
              <div className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{t.name}</div>
              <div className="text-on-muted text-xs mt-0.5 line-clamp-1">{t.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
