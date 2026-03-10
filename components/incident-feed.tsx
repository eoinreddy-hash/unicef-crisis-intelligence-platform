import { incidentFeed } from "@/lib/mock-data";

function badgeClass(severity: string) {
  if (severity === "Critical") {
    return "bg-crisis-critical/10 text-crisis-critical border-crisis-critical/20";
  }
  if (severity === "High") {
    return "bg-crisis-high/10 text-crisis-high border-crisis-high/20";
  }
  return "bg-crisis-medium/10 text-[#9A6A00] border-crisis-medium/20";
}

export function IncidentFeed() {
  return (
    <div className="panel relative p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="section-kicker">Live Incident Feed</p>
          <h3 className="section-title">Recent crisis activity</h3>
        </div>
        <div className="soft-ring flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-unicef-ink/70">
          <span className="h-2 w-2 rounded-full bg-crisis-stable animate-pulse" />
          Streaming updates
        </div>
      </div>

      <div className="feed-fade relative mt-6 space-y-3.5">
        {incidentFeed.map((item) => (
          <div
            key={`${item.location}-${item.timestamp}`}
            className="card-subtle p-4 transition duration-300 hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-unicef-mist px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-unicef-ink/76">
                {item.type}
              </span>
              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badgeClass(item.severity)}`}>
                {item.severity}
              </span>
              <span className="ml-auto text-xs text-unicef-ink/50">{item.timestamp}</span>
            </div>
            <div className="mt-3.5 flex items-center justify-between gap-4">
              <div>
                <div className="text-base font-semibold text-unicef-ink">{item.location}</div>
                <p className="mt-1.5 max-w-[62ch] text-sm leading-6 text-unicef-ink/66">{item.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
