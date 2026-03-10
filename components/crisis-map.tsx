"use client";

import { useState } from "react";
import { hotspotDetails, mapHotspots, mapRoutes, watchlistSignals } from "@/lib/mock-data";

function severityStyle(severity: string) {
  if (severity === "Critical") {
    return "bg-crisis-critical";
  }
  if (severity === "High") {
    return "bg-crisis-high";
  }
  if (severity === "Elevated") {
    return "bg-crisis-medium";
  }
  return "bg-crisis-stable";
}

export function CrisisMap({
  condensed = false,
  hero = false
}: {
  condensed?: boolean;
  hero?: boolean;
}) {
  const [selectedName, setSelectedName] = useState<(typeof mapHotspots)[number]["name"]>(mapHotspots[0].name);
  const selected = hotspotDetails[selectedName];

  return (
    <div
      className={`glass-highlight relative overflow-hidden rounded-[2rem] border border-white/60 bg-[radial-gradient(circle_at_top,_rgba(28,171,226,0.18),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(241,247,251,0.94))] ${
        hero ? "h-[460px]" : condensed ? "h-[320px]" : "h-[420px]"
      }`}
    >
      <div className="absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-60" />
      <div className="dotted-world absolute inset-0 opacity-40" />
      <div className="scanlines absolute inset-0 opacity-50" />
      <div className="absolute inset-x-[5%] top-[14%] h-[58%] rounded-full bg-unicef-blue/10 blur-3xl" />
      <div className="absolute inset-x-[8%] top-[18%] h-[1px] bg-gradient-to-r from-transparent via-unicef-blue/50 to-transparent opacity-80 animate-scan" />
      <svg
        viewBox="0 0 1000 520"
        className="map-glow absolute inset-[7%] h-[86%] w-[86%] text-unicef-blue/80"
        fill="currentColor"
      >
        <path d="M165 171 204 145l61-8 58 16 40 33-3 43-58 20-32 52-26 5-38-26-68 1-22-34 14-56 38-46 36 0Z" opacity=".82" />
        <path d="m402 113 79-33 78-9 94 36 46 6 32 27 64 6 89 61-12 41-54 8-42 42-31 6-35-22-39 17-14 49-53 9-51-24-46 19-34-30-3-34-46-16-56-76 34-86Z" opacity=".92" />
        <path d="m704 352 44-16 43 9 24 27 32 9 25 31-21 31-68 19-54 0-25-17 0-31-24-20 24-42Z" opacity=".82" />
        <path d="m801 154 48-27 70 11 38 23 3 34-23 23-57 3-16 25-41-8-21-33-1-51Z" opacity=".72" />
        {mapRoutes.map((route, index) => (
          <path
            key={index}
            d={`M ${route.from.x * 10} ${route.from.y * 5.2} Q ${(route.from.x + route.to.x) * 5} ${
              ((route.from.y + route.to.y) / 2 - 12) * 5.2
            } ${route.to.x * 10} ${route.to.y * 5.2}`}
            fill="none"
            stroke={route.intensity === "high" ? "rgba(242,95,92,0.65)" : "rgba(28,171,226,0.55)"}
            strokeDasharray="8 10"
            strokeLinecap="round"
            strokeWidth="3"
          />
        ))}
      </svg>

      {mapHotspots.map((spot) => (
        <button
          key={spot.name}
          type="button"
          aria-label={`View crisis details for ${spot.name}`}
          onMouseEnter={() => setSelectedName(spot.name)}
          onFocus={() => setSelectedName(spot.name)}
          onClick={() => setSelectedName(spot.name)}
          className="group absolute"
          style={{ left: spot.x, top: spot.y }}
        >
          <div
            className={`absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${severityStyle(
              spot.severity
            )} opacity-20 blur-md`}
            style={{ animationDuration: `${2.2 * spot.pulse}s` }}
          />
          <div
            className={`absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${severityStyle(
              spot.severity
            )} opacity-20 animate-pulseSoft`}
            style={{ animationDuration: `${2.8 * spot.pulse}s` }}
          />
          <div
            className={`relative h-3.5 w-3.5 rounded-full border-2 border-white shadow-lg ${severityStyle(
              spot.severity
            )}`}
          />
          <div className="pointer-events-none absolute left-5 top-1/2 min-w-max -translate-y-1/2 rounded-2xl border border-white/70 bg-white/95 px-3 py-2 text-xs text-unicef-ink opacity-0 shadow-soft transition duration-300 group-hover:opacity-100">
            <div className="font-semibold">{spot.name}</div>
            <div className="text-unicef-ink/60">{spot.severity} severity alert</div>
          </div>
        </button>
      ))}

      <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-soft backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-crisis-critical" />
          <span className="text-xs text-unicef-ink/70">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-crisis-high" />
          <span className="text-xs text-unicef-ink/70">High</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-crisis-medium" />
          <span className="text-xs text-unicef-ink/70">Elevated</span>
        </div>
      </div>

      {!condensed ? (
        <div className="absolute bottom-5 right-5 hidden w-[22rem] rounded-[1.4rem] border border-white/70 bg-white/88 p-4 shadow-soft backdrop-blur-md md:block">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-unicef-ink/45">
                Regional Drilldown
              </div>
              <div className="mt-2 text-xl font-semibold text-unicef-ink">{selectedName}</div>
              <div className="mt-1 text-sm text-unicef-ink/58">{selected.affected}</div>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                selected.severity === "Critical"
                  ? "bg-crisis-critical/10 text-crisis-critical"
                  : selected.severity === "High"
                    ? "bg-crisis-high/10 text-crisis-high"
                    : "bg-crisis-medium/10 text-[#9A6A00]"
              }`}
            >
              {selected.severity}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-unicef-ink/70">{selected.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {selected.needs.map((need) => (
              <span key={need} className="rounded-full border border-white bg-white px-3 py-1.5 text-xs text-unicef-ink/72">
                {need}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-unicef-mist/70 px-3 py-2 text-sm font-medium text-unicef-ink">
            {selected.trend}
          </div>

          <div className="mt-4 space-y-3 border-t border-unicef-border/60 pt-4">
            {watchlistSignals.map((signal) => (
              <div key={signal.label} className="flex items-center justify-between gap-3">
                <span className="text-sm text-unicef-ink/68">{signal.label}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    signal.tone === "critical"
                      ? "bg-crisis-critical/10 text-crisis-critical"
                      : signal.tone === "high"
                        ? "bg-crisis-high/10 text-crisis-high"
                        : "bg-crisis-stable/10 text-crisis-stable"
                  }`}
                >
                  {signal.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {hero ? (
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-medium text-unicef-ink/70 shadow-soft">
          <span className="h-2.5 w-2.5 rounded-full bg-crisis-stable animate-pulse" />
          Live global monitoring
        </div>
      ) : null}
    </div>
  );
}
