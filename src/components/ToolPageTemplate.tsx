/**
 * ToolPageTemplate — server component SEO shell for every FileVelo tool.
 *
 * Keeping this as a server component (no "use client") lets Next.js
 * prefetch every tool page link, enabling smooth client-side transitions
 * on logo and nav clicks with zero hard refreshes.
 *
 * Heading hierarchy:
 *   H1  — headline (target keyword)
 *   H2  — section headings (How It Works, Why FileVelo, article, FAQ)
 *   H3  — step titles, feature titles, FAQ questions
 *
 * Structured data injected automatically:
 *   - HowTo schema  (from steps[])
 *   - FAQPage schema (from faqs[])
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { Tool } from "@/lib/tools";
import FaqAccordion from "./FaqAccordion";

/* ─────────────────────────── Types ─────────────────────────── */

export interface TemplateStep {
  icon: string;
  title: string;
  desc: string;
}

export interface TemplateFeature {
  icon: string;
  title: string;
  desc: string;
  iconBg?: string;
  iconColor?: string;
}

export interface TemplateFaq {
  q: string;
  a: string;
}

interface Props {
  tool: Tool;
  related: Tool[];
  headline: string;
  subheadline: string;
  steps: TemplateStep[];
  features?: TemplateFeature[];
  faqs: TemplateFaq[];
  seoH2: string;
  seoBody: ReactNode;
  children: ReactNode;
}

/* ─────────────────── Default feature cards ─────────────────── */

const DEFAULT_FEATURES: TemplateFeature[] = [
  {
    icon: "bolt",
    title: "Lightning Fast",
    desc: "Most conversions complete in under 10 seconds - no queues, no waiting.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: "verified_user",
    title: "Files Deleted Instantly",
    desc: "Your document is permanently erased from our servers the moment you download.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: "high_quality",
    title: "High-Fidelity Output",
    desc: "Fonts, tables, images, and layout are preserved with industry-leading accuracy.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    icon: "lock_open",
    title: "No Account Needed",
    desc: "100% free with no sign-up, no subscription, and no hidden per-file fees.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
];

/* ──────────────────── Main template ────────────────────── */

export default function ToolPageTemplate({
  tool,
  related,
  headline,
  subheadline,
  steps,
  features,
  faqs,
  seoH2,
  seoBody,
  children,
}: Props) {
  const featureCards = features ?? DEFAULT_FEATURES;
  const isClient = tool.category === "client";

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: headline,
    description: subheadline,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div>
        {/* ── HERO ── */}
        <div className="relative pt-14 pb-12 px-6 text-center overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-64 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,70,229,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-3xl mx-auto">
            {isClient ? (
              <span className="inline-flex items-center gap-1.5 mb-5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                100% browser-based - files never leave your device
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 mb-5 text-xs font-bold text-on-muted bg-surface-low border border-outline-soft/40 rounded-full px-3 py-1.5">
                <span className="material-symbols-outlined text-xs">lock</span>
                Secure cloud - files deleted immediately after conversion
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-on-surface mb-5 leading-tight">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-on-muted max-w-2xl mx-auto leading-relaxed">
              {subheadline}
            </p>
          </div>
        </div>

        {/* ── TOOL WORKSPACE ── */}
        <div className="px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
          {children}
        </div>

        {/* ── BELOW-THE-FOLD SEO CONTENT ── */}
        <div className="pt-20 pb-28 px-6 max-w-7xl mx-auto space-y-24">

          {/* HOW IT WORKS */}
          <section aria-labelledby="how-it-works-heading">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-primary/40 rounded-full" />
                <span className="text-xs font-black text-primary uppercase tracking-[0.15em]">
                  Simple process
                </span>
                <div className="h-px w-8 bg-primary/40 rounded-full" />
              </div>
              <h2 id="how-it-works-heading" className="text-3xl font-black text-on-surface tracking-tight">
                How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="relative bg-surface-white border border-outline-soft/20 rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-outline-soft/40 z-10" />
                  )}
                  <div className="text-5xl font-black text-outline-soft/20 absolute top-6 right-6 group-hover:text-primary/15 transition-colors select-none leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-xl">{s.icon}</span>
                  </div>
                  <h3 className="text-base font-black text-on-surface mb-2">{s.title}</h3>
                  <p className="text-sm text-on-muted leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section aria-labelledby="features-heading">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-primary/40 rounded-full" />
                <span className="text-xs font-black text-primary uppercase tracking-[0.15em]">
                  Why FileVelo
                </span>
                <div className="h-px w-8 bg-primary/40 rounded-full" />
              </div>
              <h2 id="features-heading" className="text-3xl font-black text-on-surface tracking-tight">
                Built for Speed, Privacy, and Quality
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featureCards.map((f) => (
                <div
                  key={f.title}
                  className="bg-surface-white border border-outline-soft/20 rounded-2xl p-6 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
                >
                  <div className={`w-11 h-11 ${f.iconBg ?? "bg-primary/10"} rounded-xl flex items-center justify-center mb-5`}>
                    <span className={`material-symbols-outlined ${f.iconColor ?? "text-primary"} text-xl`}>
                      {f.icon}
                    </span>
                  </div>
                  <h3 className="font-black text-on-surface text-sm mb-2">{f.title}</h3>
                  <p className="text-xs text-on-muted leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEO ARTICLE */}
          <section aria-labelledby="seo-article-heading">
            <div className="max-w-3xl mx-auto">
              <h2 id="seo-article-heading" className="text-2xl font-black text-on-surface mb-6 tracking-tight">
                {seoH2}
              </h2>
              <div className="prose-sm text-on-muted leading-relaxed space-y-4">
                {seoBody}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 id="faq-heading" className="text-3xl font-black text-on-surface tracking-tight mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-on-muted">
                  Everything you need to know about {tool.name.toLowerCase()}.
                </p>
              </div>
              <FaqAccordion faqs={faqs} />
            </div>
          </section>

          {/* RELATED TOOLS */}
          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-8 bg-primary rounded-full" />
                <h2 id="related-heading" className="text-xl font-black text-on-surface">
                  Related Tools
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${t.slug}`}
                    className="group flex items-center gap-4 p-5 bg-surface-white border border-outline-soft/20 rounded-xl hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
                  >
                    <div className={`w-10 h-10 ${t.iconBg} rounded-lg flex items-center justify-center ${t.iconColor} flex-shrink-0`}>
                      <span className="material-symbols-outlined text-[1.25rem]">{t.materialIcon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">
                        {t.name}
                      </div>
                      <div className="text-on-muted text-xs mt-0.5 truncate">{t.description}</div>
                    </div>
                    <span className="material-symbols-outlined text-on-muted text-base ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      arrow_forward
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
