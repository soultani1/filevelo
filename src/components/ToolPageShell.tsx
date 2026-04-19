import type { ReactNode } from "react";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { FaqItem } from "@/components/FaqSection";
import { Tool } from "@/lib/tools";

interface Step {
  icon: string;
  title: string;
  desc: string;
}

interface Props {
  tool: Tool;
  related: Tool[];
  faqs: FaqItem[];
  steps: Step[];
  seoTitle: string;
  seoBody: ReactNode;
  children: ReactNode; // the *Tool.tsx workspace
}

export default function ToolPageShell({
  tool,
  related,
  faqs,
  steps,
  seoTitle,
  seoBody,
  children,
}: Props) {
  return (
    <div>
      {/* ── Tool header — constrained ── */}
      <div className="pt-14 pb-10 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">
          {tool.name}
        </h1>
        <p className="text-lg text-on-muted max-w-2xl mx-auto">{tool.description}</p>
        {tool.category === "client" ? (
          <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-mint bg-mint-bg/30 rounded-full px-3 py-1.5">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            Files never leave your device
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-on-muted bg-surface-high rounded-full px-3 py-1.5">
            <span className="material-symbols-outlined text-sm">cloud</span>
            Secure cloud processing — files deleted immediately after
          </span>
        )}
      </div>

      {/* ── Editor workspace — full-width ── */}
      <div className="px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
        {children}
      </div>

      {/* ── Below-the-fold SEO sections — constrained ── */}
      <div className="pt-16 pb-24 px-6 max-w-7xl mx-auto">
        {/* How it works */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h2 className="text-xl font-bold text-on-surface">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-surface-low p-8 rounded-[1.5rem] relative group hover:bg-surface-white transition-all duration-300"
              >
                <div className="text-5xl font-black text-outline-soft/30 absolute top-8 right-8 group-hover:text-primary/20 transition-colors select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 bg-surface-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary">{s.icon}</span>
                </div>
                <h4 className="text-lg font-bold text-on-surface mb-3">{s.title}</h4>
                <p className="text-on-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO article */}
        <article className="mt-16 max-w-3xl mx-auto text-sm leading-relaxed text-on-muted space-y-4">
          <h2 className="text-xl font-bold text-on-surface">{seoTitle}</h2>
          {seoBody}
        </article>

        <FaqSection faqs={faqs} />
        <RelatedTools tools={related} />
      </div>
    </div>
  );
}
