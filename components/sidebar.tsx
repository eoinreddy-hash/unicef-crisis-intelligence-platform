"use client";

import { DocumentIcon, FeedIcon, GlobeIcon, MessageIcon, PulseIcon, ShieldIcon, SparkIcon } from "@/components/icons";
import { UnicefLogo } from "@/components/unicef-logo";

export type DashboardView =
  | "Overview"
  | "Active Crises"
  | "Incident Feed"
  | "Humanitarian Needs"
  | "AI Assistant"
  | "Reports";

const navItems: Array<{ label: DashboardView; icon: typeof GlobeIcon }> = [
  { label: "Overview", icon: GlobeIcon },
  { label: "Active Crises", icon: PulseIcon },
  { label: "Incident Feed", icon: FeedIcon },
  { label: "Humanitarian Needs", icon: ShieldIcon },
  { label: "AI Assistant", icon: MessageIcon },
  { label: "Reports", icon: DocumentIcon }
];

export function Sidebar({
  activeView,
  onSelect
}: {
  activeView: DashboardView;
  onSelect: (view: DashboardView) => void;
}) {
  return (
    <aside className="panel-muted sticky top-5 flex h-[calc(100vh-2.5rem)] flex-col p-5">
      <UnicefLogo compact />
      <div className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-unicef-ink/42">Navigation</div>
        <nav className="mt-4 space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onSelect(item.label)}
                className={`flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-sm font-medium transition duration-300 ${
                  activeView === item.label
                    ? "bg-[linear-gradient(135deg,#1CABE2,#1496D0)] text-white shadow-[0_18px_36px_rgba(28,171,226,0.22)]"
                    : "bg-transparent text-unicef-ink/66 hover:bg-white/85 hover:text-unicef-ink hover:shadow-[0_10px_24px_rgba(15,39,65,0.06)]"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,_rgba(28,171,226,0.16),_rgba(255,255,255,0.95))] p-4 shadow-[0_18px_40px_rgba(15,39,65,0.08)]">
        <div className="flex items-center gap-2 text-sm font-semibold text-unicef-ink">
          <SparkIcon className="h-5 w-5 text-unicef-blue" />
          AI Briefing Pulse
        </div>
        <p className="mt-2 text-sm leading-6 text-unicef-ink/68">
          3 new executive summaries are ready for review, prioritized by severity and partner impact.
        </p>
      </div>
    </aside>
  );
}
