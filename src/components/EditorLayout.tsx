import type { ReactNode } from "react";

interface Props {
  /** Left panel — workarea: drop zone, thumbnail grid, previews */
  workspace: ReactNode;
  /** Right panel — tool-specific settings */
  sidebar: ReactNode;
  /** Pinned at the bottom of the sidebar — CTA button + privacy note */
  action: ReactNode;
}

/**
 * Two-column editor shell shared by every PDF tool page.
 *
 * Desktop : workspace (flex-1, bg slate-gray) | sidebar (320 px, white) with sticky action strip.
 * Mobile  : workspace stacked above sidebar.
 */
export default function EditorLayout({ workspace, sidebar, action }: Props) {
  return (
    <div className="bg-surface-white rounded-[2rem] shadow-[0_40px_60px_-15px_rgba(79,70,229,0.06)] overflow-hidden flex flex-col lg:flex-row min-h-[560px]">
      {/* ── Left: workspace ─────────────────────────────────────────── */}
      <div className="flex-1 bg-[#f0f2f5] p-5 lg:p-8 flex flex-col gap-4">
        {workspace}
      </div>

      {/* ── Right: sidebar ──────────────────────────────────────────── */}
      <div className="w-full lg:w-[320px] bg-white border-t border-outline-soft/20 lg:border-t-0 lg:border-l border-outline-soft/20 flex flex-col">
        {/* Scrollable settings */}
        <div className="flex-1 p-6 space-y-5 overflow-y-auto">
          {sidebar}
        </div>

        {/* Sticky action strip */}
        <div className="p-5 border-t border-outline-soft/20 bg-white">
          {action}
        </div>
      </div>
    </div>
  );
}
