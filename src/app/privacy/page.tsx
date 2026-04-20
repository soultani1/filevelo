import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | FileVelo",
  description:
    "FileVelo's privacy policy. We process your files securely and delete them immediately after conversion. No data retention, no tracking, no accounts required.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-on-muted font-medium">Last updated: April 19, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-on-surface">

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-base">verified_user</span>
              </div>
              <h2 className="text-xl font-black text-on-surface">Our Core Promise</h2>
            </div>
            <p className="text-on-muted leading-relaxed">
              FileVelo is built on a single privacy principle: <strong className="text-on-surface">your files belong to you and only you.</strong> We
              do not read, store, sell, or analyse your documents. Every file you upload is processed in an
              isolated environment and permanently deleted the moment your download is complete. There is no
              retention window, no backup copy, and no human review at any stage.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">Information We Collect</h2>
            <p className="text-on-muted leading-relaxed mb-4">
              FileVelo does not require an account. We collect no personal information by default. When you
              use our tools, the only data processed is:
            </p>
            <ul className="space-y-3">
              {[
                { icon: "description", text: "The file you upload — held in memory only for the duration of conversion, then immediately and permanently deleted." },
                { icon: "analytics", text: "Anonymous, aggregated usage statistics (page views, tool usage counts) — no personal identifiers attached." },
                { icon: "cookie", text: "Session data required to serve the web application — no tracking cookies, no advertising pixels." },
              ].map(({ icon, text }) => (
                <li key={icon} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">{icon}</span>
                  <span className="text-on-muted leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">File Processing & Deletion</h2>
            <div className="bg-surface-low rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-mint text-lg mt-0.5 flex-shrink-0">check_circle</span>
                <div>
                  <p className="font-bold text-on-surface text-sm mb-1">Browser-based tools (Merge, Split, Rotate, Add Page Numbers)</p>
                  <p className="text-sm text-on-muted leading-relaxed">Processing runs entirely in your browser using JavaScript. Your file is never transmitted to any server. It exists only in your device memory and is discarded the moment you close the tab.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-mint text-lg mt-0.5 flex-shrink-0">check_circle</span>
                <div>
                  <p className="font-bold text-on-surface text-sm mb-1">Cloud tools (Compress PDF, PDF to Word, Word to PDF)</p>
                  <p className="text-sm text-on-muted leading-relaxed">Your file is transmitted over TLS encryption to our secure cloud engine (powered by CloudConvert). Both the input and output files are permanently and irreversibly deleted immediately after your download completes. No copies are retained.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">Third-Party Services</h2>
            <p className="text-on-muted leading-relaxed">
              Cloud conversion is powered by <strong className="text-on-surface">CloudConvert</strong>, an industry-standard document processing
              platform. Files processed through cloud tools are subject to CloudConvert&apos;s privacy policy in
              addition to this policy. FileVelo does not share your files with any other third parties, does
              not use advertising networks, and does not embed any social media tracking scripts.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">Your Rights</h2>
            <p className="text-on-muted leading-relaxed">
              Because FileVelo collects no personal data by default, there is nothing to request, correct, or
              delete on our end. If you have questions about a specific conversion session or a data concern,
              contact us at{" "}
              <a href="mailto:support@lawete.com" className="text-primary font-bold hover:underline">
                support@lawete.com
              </a>{" "}
              and we will respond within 48 hours.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">Changes to This Policy</h2>
            <p className="text-on-muted leading-relaxed">
              We may update this Privacy Policy to reflect changes in our practices or applicable law. Material
              changes will be indicated by updating the &ldquo;Last updated&rdquo; date at the top of this page.
              Continued use of FileVelo after any update constitutes acceptance of the revised policy.
            </p>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-outline-soft/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-on-muted">
            Questions? Email us at{" "}
            <a href="mailto:support@lawete.com" className="text-primary font-bold hover:underline">
              support@lawete.com
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
