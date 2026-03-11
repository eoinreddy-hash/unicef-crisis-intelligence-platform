import { AlertIcon } from "@/components/icons";
import { liveSignals } from "@/lib/mock-data";

function impactTone(impact: string) {
  return impact === "Very high"
    ? "bg-crisis-critical/10 text-crisis-critical"
    : "bg-crisis-high/10 text-crisis-high";
}

export function LiveSignalsPanel() {
  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Live Crisis Signals</p>
          <h2 className="section-title">Multi-source intelligence stream</h2>
        </div>
        <div className="soft-ring flex items-center gap-2 rounded-full bg-white/94 px-3 py-1 text-xs font-medium text-unicef-ink/66">
          <span className="h-2 w-2 rounded-full bg-crisis-stable animate-pulse" />
          Backend-ready feed
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-4">
        {liveSignals.map((signal) => (
          <div key={`${signal.region}-${signal.time}`} className="card-subtle p-4 transition duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-unicef-ink">
                <AlertIcon className="h-4 w-4 text-unicef-blue" />
                {signal.region}
              </div>
              <div className="text-xs text-unicef-ink/46">{signal.time}</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-unicef-mist px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-unicef-ink/72">
                {signal.source}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${impactTone(signal.childImpact)}`}>
                {signal.childImpact} child impact
              </span>
            </div>

            <div className="mt-3 text-base font-semibold text-unicef-ink">{signal.type}</div>
            <p className="mt-2 text-sm leading-6 text-unicef-ink/66">{signal.note}</p>

            <div className="mt-4 flex items-center justify-between text-xs text-unicef-ink/52">
              <span>Confidence</span>
              <span className="font-semibold text-unicef-ink">{signal.confidence}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(15,39,65,0.08)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-unicef-blue to-[#7ad5f7]"
                style={{ width: `${signal.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
