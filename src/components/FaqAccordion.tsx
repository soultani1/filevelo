"use client";

import { useState } from "react";
import type { TemplateFaq } from "./ToolPageTemplate";

export default function FaqAccordion({ faqs }: { faqs: TemplateFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-surface-white border border-outline-soft/30 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
        >
          <button
            className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <h3 className="font-bold text-on-surface text-sm md:text-base leading-snug">
              {faq.q}
            </h3>
            <span
              className="material-symbols-outlined text-on-muted flex-shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? "rotate(180deg)" : "none" }}
            >
              expand_more
            </span>
          </button>

          {open === i && (
            <div className="px-6 pb-5 text-sm text-on-muted leading-relaxed border-t border-outline-soft/20 pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
