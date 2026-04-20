import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-soft/30 bg-surface-white">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 py-12 w-full max-w-7xl mx-auto gap-10">
        {/* Brand */}
        <div className="min-w-[160px]">
          <div className="text-xl font-black tracking-tight text-on-surface mb-2">
            File<span className="text-primary">Velo</span>
          </div>
          <p className="text-sm text-on-muted">© {new Date().getFullYear()} FileVelo. All rights reserved.</p>
        </div>

        {/* Tools list */}
        <div>
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-4">PDF Tools</h3>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.slug}`}
                  className="text-sm text-on-muted hover:text-primary font-medium transition-colors"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-sm text-on-muted hover:text-primary font-medium transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-on-muted hover:text-primary font-medium transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-sm text-on-muted hover:text-primary font-medium transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
