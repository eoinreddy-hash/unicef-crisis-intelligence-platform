import { ForecastBandChart, PriorityPulseChart } from "@/components/analytics-charts";
import { needsMetrics, needsTrend, sectorCoverage } from "@/lib/mock-data";

export function NeedsChart() {
  const trendPoints = needsTrend
    .map((value, index) => `${index * 28},${120 - value}`)
    .join(" ");

  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="section-kicker">Humanitarian Needs</p>
          <h3 className="section-title">Signals across priority categories</h3>
        </div>
        <div className="soft-ring rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-unicef-ink/65">
          Refreshed every 15 minutes
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {needsMetrics.map((metric) => (
          <div key={metric.label} className="rounded-[22px] border border-white/75 bg-white/55 px-4 py-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
              <div className="font-medium text-unicef-ink">{metric.label}</div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-unicef-ink">{metric.value}%</span>
                <span className="rounded-full bg-unicef-mist px-2 py-1 text-xs text-unicef-ink/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 shadow-[inset_0_1px_2px_rgba(15,39,65,0.08)]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${metric.value}%`,
                  background: `linear-gradient(90deg, ${metric.color}, ${metric.color}CC)`,
                  boxShadow: `0 8px 18px ${metric.color}33`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="metric-grid card-subtle p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.22em] text-unicef-ink/45">AI risk trend</div>
            <div className="text-xs text-unicef-ink/55">12-hour rolling signal</div>
          </div>
          <div className="mt-4">
            <svg viewBox="0 0 320 120" className="h-32 w-full">
              <defs>
                <linearGradient id="trendArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1CABE2" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#1CABE2" stopOpacity="0" />
                </linearGradient>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polygon points={`0,120 ${trendPoints} 308,120`} fill="url(#trendArea)" />
              <polyline
                points={trendPoints}
                fill="none"
                stroke="#1CABE2"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#softGlow)"
              />
              {needsTrend.map((value, index) => (
                <circle
                  key={index}
                  cx={index * 28}
                  cy={120 - value}
                  r="4.5"
                  fill="#ffffff"
                  stroke="#1CABE2"
                  strokeWidth="3"
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="card-subtle bg-unicef-mist/52 p-4">
          <div className="text-xs uppercase tracking-[0.22em] text-unicef-ink/45">Coverage vs target</div>
          <div className="mt-4 space-y-4">
            {sectorCoverage.map((sector) => (
              <div key={sector.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-unicef-ink/68">{sector.name}</span>
                  <span className="font-medium text-unicef-ink">
                    {sector.coverage}% / {sector.target}%
                  </span>
                </div>
                <div className="relative h-2.5 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(15,39,65,0.08)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-unicef-blue to-[#7ad5f7]"
                    style={{ width: `${sector.coverage}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-unicef-ink/40"
                    style={{ left: `${sector.target}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <PriorityPulseChart />
        <ForecastBandChart />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "High-confidence alerts", value: "92%", tone: "text-unicef-blue" },
          { label: "Partner data freshness", value: "11m", tone: "text-crisis-stable" },
          { label: "Forecast volatility", value: "Moderate", tone: "text-crisis-high" }
        ].map((item) => (
          <div key={item.label} className="card-subtle px-4 py-3">
            <div className="text-xs uppercase tracking-[0.18em] text-unicef-ink/42">{item.label}</div>
            <div className={`mt-2 text-xl font-semibold ${item.tone}`}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
