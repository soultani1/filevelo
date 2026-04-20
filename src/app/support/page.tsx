import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | FileVelo",
  description:
    "Get help with FileVelo's PDF tools. Contact our support team, browse common questions, or learn how each tool works.",
};

const faqs = [
  {
    q: "Why is my file not uploading?",
    a: "Ensure your file is a valid PDF (or .docx for Word tools) and is under 50 MB. Try a different browser if the issue persists — Chrome and Firefox work best.",
  },
  {
    q: "My converted file looks different from the original. Why?",
    a: "Cloud conversions (Compress, PDF to Word, Word to PDF) preserve formatting with high accuracy, but complex layouts with unusual fonts or advanced graphics may vary slightly. For best results, ensure your source document uses standard fonts.",
  },
  {
    q: "Are my files really deleted after conversion?",
    a: "Yes. For browser-based tools (Merge, Split, Rotate, Add Page Numbers), your file never leaves your device. For cloud tools, both the input and output are permanently deleted from our servers the moment you download the result.",
  },
  {
    q: "Why does the cloud conversion say 'daily limit reached'?",
    a: "FileVelo uses CloudConvert for cloud processing, which has usage limits on our free tier. If you hit the daily limit, please try again tomorrow. Browser-based tools (Merge, Split, Rotate, Add Page Numbers) have no limits.",
  },
  {
    q: "Can I use FileVelo on mobile?",
    a: "Yes. FileVelo works in any modern mobile browser. For the best experience on mobile, use Chrome for Android or Safari for iOS.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. FileVelo requires no account, no email, and no sign-up. All tools are available immediately, completely free.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-surface pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-on-muted hover:text-primary transition-colors mb-10"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-on-surface tracking-tight mb-3">
            Support
          </h1>
          <p className="text-lg text-on-muted leading-relaxed">
            Need help? Browse the common questions below or reach out directly — we reply fast.
          </p>
        </div>

        {/* Contact card */}
        <div
          className="rounded-2xl p-8 mb-14 text-white"
          style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-2xl">mail</span>
            </div>
            <div>
              <h2 className="text-xl font-black mb-1">Email Support</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Send us an email and we&apos;ll get back to you within 24-48 hours on business days.
                Please include the tool you were using and a brief description of the issue.
              </p>
              <a
                href="mailto:support@lawete.com"
                className="inline-flex items-center gap-2 bg-white text-primary font-black text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
              >
                <span className="material-symbols-outlined text-base">send</span>
                support@lawete.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mb-14">
          <h2 className="text-xl font-black text-on-surface mb-5">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/merge-pdf", icon: "merge", label: "Merge PDF" },
              { href: "/split-pdf", icon: "content_cut", label: "Split PDF" },
              { href: "/compress-pdf", icon: "compress", label: "Compress PDF" },
              { href: "/rotate-pdf", icon: "rotate_right", label: "Rotate PDF" },
              { href: "/pdf-to-word", icon: "description", label: "PDF to Word" },
              { href: "/word-to-pdf", icon: "picture_as_pdf", label: "Word to PDF" },
            ].map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 bg-surface-white border border-outline-soft/30 rounded-xl px-4 py-3.5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <span className="material-symbols-outlined text-primary text-lg">{icon}</span>
                <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  {label}
                </span>
                <span className="material-symbols-outlined text-on-muted text-base ml-auto">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-black text-on-surface mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-surface-white border border-outline-soft/30 rounded-2xl px-6 py-5"
              >
                <p className="font-bold text-on-surface mb-2">{q}</p>
                <p className="text-sm text-on-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-outline-soft/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-on-muted">
            Still need help?{" "}
            <a href="mailto:support@lawete.com" className="text-primary font-bold hover:underline">
              Email us directly
            </a>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #3525CD 0%, #4F46E5 100%)" }}
          >
            <span className="material-symbols-outlined text-base">home</span>
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
