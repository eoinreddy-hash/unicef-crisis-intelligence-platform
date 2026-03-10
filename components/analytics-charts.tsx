import { forecastBands, priorityPulse } from "@/lib/mock-data";

export function PriorityPulseChart() {
  return (
    <div className="card-subtle p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-unicef-ink/42">Priority pulse</div>
          <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-unicef-ink">Regional risk matrix</div>
        </div>
        <div className="text-xs text-unicef-ink/52">Urgency vs access</div>
      </div>

      <div className="mt-4">
        <svg viewBox="0 0 320 220" className="h-56 w-full">
          <defs>
            <radialGradient id="matrixGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1CABE2" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1CABE2" stopOpacity="0" />
            </radialGradient>
          </defs>

          {[40, 90, 140, 190].map((line) => (
            <line key={`h-${line}`} x1="28" y1={line} x2="296" y2={line} stroke="rgba(124,141,166,0.14)" />
          ))}
          {[80, 140, 200, 260].map((line) => (
            <line key={`v-${line}`} x1={line} y1="26" x2={line} y2="194" stroke="rgba(124,141,166,0.14)" />
          ))}

          <rect x="204" y="26" width="92" height="56" rx="16" fill="url(#matrixGlow)" />

          {priorityPulse.map((point) => {
            const x = 28 + point.urgency * 2.1;
            const y = 194 - point.access * 1.5;
            const radius = point.severity > 90 ? 13 : point.severity > 75 ? 11 : 9;
            const fill =
              point.severity > 90 ? "#F25F5C" : point.severity > 75 ? "#FF8A3D" : "#1CABE2";

            return (
              <g key={point.region}>
                <circle cx={x} cy={y} r={radius + 10} fill={fill} opacity="0.12" />
                <circle cx={x} cy={y} r={radius} fill={fill} stroke="#fff" strokeWidth="3" />
                <text x={x} y={y + radius + 16} textAnchor="middle" fontSize="11" fill="#5F738B" fontWeight="600">
                  {point.region}
                </text>
              </g>
            );
          })}

          <text x="18" y="22" fontSize="10" fill="#7C8DA6" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Access
          </text>
          <text x="250" y="214" fontSize="10" fill="#7C8DA6" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Urgency
          </text>
        </svg>
      </div>
    </div>
  );
}

export function ForecastBandChart() {
  const max = Math.max(...forecastBands.map((item) => item.value));

  return (
    <div className="card-subtle bg-unicef-mist/45 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-unicef-ink/42">Forecast band</div>
          <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-unicef-ink">Needs acceleration</div>
        </div>
        <div className="text-xs text-unicef-ink/52">Next 24 hours</div>
      </div>

      <div className="mt-5 flex items-end gap-3">
        {forecastBands.map((item, index) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-36 w-full items-end justify-center rounded-[18px] bg-white/80 px-2 pb-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div
                className="w-full rounded-[14px] bg-gradient-to-t from-unicef-blue via-[#49C2EE] to-[#9BE6FA] shadow-[0_10px_24px_rgba(28,171,226,0.22)] transition-all duration-700"
                style={{ height: `${(item.value / max) * 100}%` }}
              />
              {index === forecastBands.length - 1 ? (
                <div className="absolute inset-x-2 bottom-[calc(100%-8px)] h-px border-t border-dashed border-crisis-high/60" />
              ) : null}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-unicef-ink/46">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
