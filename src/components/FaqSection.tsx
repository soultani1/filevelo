"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mt-20 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight text-on-surface text-center mb-10">
        Common Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-surface-low rounded-xl overflow-hidden">
            <button
              className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-surface-high transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-bold text-on-surface">{faq.q}</span>
              <span className="material-symbols-outlined text-on-muted ml-4 transition-transform duration-200 flex-shrink-0" style={{ transform: open === i ? "rotate(180deg)" : "none" }}>
                expand_more
              </span>
            </button>
            {open === i && (
              <div className="px-8 pb-6 text-on-muted text-sm leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
