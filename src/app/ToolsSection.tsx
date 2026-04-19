"use client";

import { useState, useMemo } from "react";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/lib/tools";

const filters = [
  { label: "All", tag: "all" },
  { label: "Organize PDF", tag: "organize" },
  { label: "Optimize PDF", tag: "optimize" },
  { label: "Convert PDF", tag: "convert" },
  { label: "Edit PDF", tag: "edit" },
] as const;

export default function ToolsSection() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesFilter = activeFilter === "all" || t.filterTag === activeFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[radial-gradient(circle_at_50%_0%,#f1f5f9_0%,#f8f9fb_100%)] px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-on-surface mb-5 leading-[1.08]">
            Powerful <span className="text-primary">PDF</span> Tools,
            <br />
            <span className="text-primary">Zero Complexity.</span>
          </h1>
          <p className="text-lg text-on-muted font-medium mb-12 max-w-2xl mx-auto">
            No limits. No sign-ups. Just fast processing in your browser with enterprise-grade precision.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-muted">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for any tool…"
              className="w-full pl-12 pr-6 py-4 bg-surface-white border border-outline-soft/60 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface placeholder:text-on-muted/50 font-medium transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── Filter pills + Grid ── */}
      <section id="tools" className="px-6 py-12 max-w-7xl mx-auto">
        {/* Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {filters.map((f) => (
            <button
              key={f.tag}
              onClick={() => setActiveFilter(f.tag)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === f.tag
                  ? "bg-on-surface text-surface-white"
                  : "bg-surface-white border border-outline-soft/60 text-on-muted hover:bg-surface-low"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-on-muted">
            <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
            <p className="font-medium">No tools found for &ldquo;{search}&rdquo;</p>
          </div>
        )}
      </section>

      {/* ── How it works ── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-1 w-12 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">How it works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              icon: "upload",
              title: "Upload Your File",
              desc: "Drag & drop or click to select your PDF. Client-side tools never leave your device.",
            },
            {
              n: "02",
              icon: "settings",
              title: "Process Instantly",
              desc: "Our engine runs in the browser or securely in the cloud — always encrypted.",
            },
            {
              n: "03",
              icon: "download",
              title: "Download Result",
              desc: "Get your file immediately. No email, no account, no waiting.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="bg-surface-low p-8 rounded-[1.5rem] relative group hover:bg-surface-white transition-all duration-300"
            >
              <div className="text-5xl font-black text-outline-soft/30 absolute top-8 right-8 group-hover:text-primary/20 transition-colors">
                {s.n}
              </div>
              <div className="w-12 h-12 bg-surface-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">{s.icon}</span>
              </div>
              <h4 className="text-lg font-bold text-on-surface mb-3">{s.title}</h4>
              <p className="text-on-muted leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section id="convert" className="bg-surface-low px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "verified_user", label: "Private & Secure" },
            { icon: "currency_exchange", label: "Always Free" },
            { icon: "bolt", label: "Lightning Fast" },
            { icon: "smartphone", label: "Mobile Friendly" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">{t.icon}</span>
              </div>
              <span className="font-bold text-sm text-on-surface">{t.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
