import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | FileVelo",
  description:
    "FileVelo Terms of Service. Free online PDF tools provided as-is. Read our usage terms, liability disclaimers, and acceptable use policy.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-on-muted font-medium">Last updated: April 19, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-on-surface">

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">1. Acceptance of Terms</h2>
            <p className="text-on-muted leading-relaxed">
              By accessing or using FileVelo (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use the Service. FileVelo reserves
              the right to update these terms at any time. Continued use of the Service after changes
              constitutes acceptance of the revised terms.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">2. Description of Service</h2>
            <p className="text-on-muted leading-relaxed">
              FileVelo provides free, online PDF processing tools including merging, splitting, compressing,
              rotating, adding page numbers, and converting documents between formats. Some tools process
              files locally in your browser; others use a secure cloud engine. The Service is provided free
              of charge and does not require account registration.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">3. Acceptable Use</h2>
            <p className="text-on-muted leading-relaxed mb-4">You agree not to use FileVelo to:</p>
            <ul className="space-y-2">
              {[
                "Upload, process, or distribute illegal, harmful, or infringing content.",
                "Attempt to reverse-engineer, disrupt, or overload the Service.",
                "Use the Service for any commercial purpose that violates applicable law.",
                "Circumvent any technical limitations or access controls of the Service.",
                "Upload files containing malware, viruses, or other malicious code.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">remove</span>
                  <span className="text-on-muted leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">4. Disclaimer of Warranties</h2>
            <div className="bg-surface-low border border-outline-soft/40 rounded-2xl p-6">
              <p className="text-on-muted leading-relaxed">
                THE SERVICE IS PROVIDED <strong className="text-on-surface">&ldquo;AS IS&rdquo;</strong> AND{" "}
                <strong className="text-on-surface">&ldquo;AS AVAILABLE&rdquo;</strong> WITHOUT WARRANTIES OF ANY KIND,
                WHETHER EXPRESS OR IMPLIED. FILEVELO EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT
                LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT. FILEVELO DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
                ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </div>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">5. Limitation of Liability</h2>
            <div className="bg-surface-low border border-outline-soft/40 rounded-2xl p-6">
              <p className="text-on-muted leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FILEVELO AND ITS OPERATORS SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING OUT OF
                OR IN CONNECTION WITH YOUR USE OF THE SERVICE, EVEN IF FILEVELO HAS BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL FILEVELO&apos;S TOTAL LIABILITY EXCEED THE
                AMOUNT PAID BY YOU FOR THE SERVICE IN THE TWELVE MONTHS PRECEDING THE CLAIM (WHICH, FOR A
                FREE SERVICE, IS ZERO).
              </p>
            </div>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">6. Intellectual Property</h2>
            <p className="text-on-muted leading-relaxed">
              You retain all ownership rights to the files you upload. FileVelo does not claim any rights
              over your content. The FileVelo name, logo, design system, and application code are the
              intellectual property of FileVelo and may not be reproduced or used without written permission.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">7. Third-Party Services</h2>
            <p className="text-on-muted leading-relaxed">
              Cloud conversion features are powered by CloudConvert. Use of those features is subject to
              CloudConvert&apos;s own terms of service. FileVelo is not responsible for the availability,
              accuracy, or conduct of third-party services.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">8. Termination</h2>
            <p className="text-on-muted leading-relaxed">
              FileVelo reserves the right to restrict or terminate access to the Service at any time, for
              any reason, without notice. Upon termination, all rights granted to you under these terms
              cease immediately.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">9. Governing Law</h2>
            <p className="text-on-muted leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable law. Any disputes
              arising from use of the Service shall be resolved through good-faith negotiation or, where
              required, in a competent court of appropriate jurisdiction.
            </p>
          </section>

          <div className="border-t border-outline-soft/30" />

          <section>
            <h2 className="text-xl font-black text-on-surface mb-4">10. Contact</h2>
            <p className="text-on-muted leading-relaxed">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:support@lawete.com" className="text-primary font-bold hover:underline">
                support@lawete.com
              </a>
              .
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
