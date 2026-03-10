"use client";

import { useState } from "react";
import { AIAssistantPanel } from "@/components/ai-assistant-panel";
import { ForecastBandChart } from "@/components/analytics-charts";
import { CrisisMap } from "@/components/crisis-map";
import { IncidentFeed } from "@/components/incident-feed";
import { NeedsChart } from "@/components/needs-chart";
import { DashboardView, Sidebar } from "@/components/sidebar";
import { crisisStats, regionalSnapshots, reportCards, reportTimeline } from "@/lib/mock-data";

function toneClass(tone: string) {
  if (tone === "critical") {
    return "text-crisis-critical";
  }
  if (tone === "high") {
    return "text-crisis-high";
  }
  if (tone === "stable") {
    return "text-crisis-stable";
  }
  return "text-unicef-blue";
}

function SectionHeading({
  kicker,
  title,
  badge
}: {
  kicker: string;
  title: string;
  badge?: string;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {badge ? <div className="soft-ring rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-unicef-ink/65">{badge}</div> : null}
    </div>
  );
}

function DashboardHeader({
  title,
  description,
  badge
}: {
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <section className="panel overflow-hidden px-6 py-7 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="eyebrow">UNICEF Command View</div>
          <h1 className="mt-5 max-w-4xl text-[2.65rem] font-semibold tracking-[-0.05em] text-unicef-ink lg:text-[3.6rem] lg:leading-[1.02]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-unicef-ink/64 lg:text-[17px]">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="soft-ring rounded-full bg-white/92 px-4 py-2 text-sm text-unicef-ink/70">
            Last sync 12:04 UTC
          </div>
          <div className="rounded-full border border-crisis-stable/20 bg-crisis-stable/10 px-4 py-2 text-sm font-medium text-crisis-stable shadow-[0_10px_30px_rgba(48,183,132,0.14)]">
            {badge}
          </div>
        </div>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {crisisStats.map((stat) => (
          <div key={stat.label} className="metric-card">
            <div className="text-sm text-unicef-ink/52">{stat.label}</div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="text-[2rem] font-semibold tracking-[-0.045em] text-unicef-ink">{stat.value}</div>
              <div className={`text-sm font-semibold ${toneClass(stat.tone)}`}>{stat.delta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OverviewView() {
  return (
    <>
      <DashboardHeader
        title="Real-time humanitarian intelligence for faster, more confident response decisions."
        description="AI-assisted monitoring surfaces the most urgent crises, summarizes incoming field signals, and highlights operational needs across conflict, climate, health, and displacement events."
        badge="Systems nominal"
      />

      <section className="grid gap-5 xl:grid-cols-[1.42fr_0.92fr] xl:gap-6">
        <div className="panel p-6">
          <SectionHeading kicker="Global Crisis Map" title="AI-prioritized crisis geography" badge="Severity-weighted markers" />
          <CrisisMap condensed />
        </div>

        <div className="panel p-6">
          <SectionHeading kicker="Situation Summary" title="Latest developments in the region" />

          <div className="card-subtle p-6">
            <p className="text-sm leading-7 text-unicef-ink/75">
              Highest-severity alerts remain concentrated in Sudan and Gaza, where access constraints and population
              movement are accelerating humanitarian needs. Eastern DRC shows rising outbreak risk near large
              displacement sites, while Bangladesh flood exposure is increasing pressure on WASH and shelter systems.
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {regionalSnapshots.map((snapshot) => (
              <div key={snapshot.region} className="card-subtle p-4 transition duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-unicef-ink">{snapshot.region}</div>
                    <div className="mt-1 text-sm text-unicef-ink/56">{snapshot.trend}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold text-unicef-ink">{snapshot.risk}/100</div>
                    <div className="mt-1 text-sm text-unicef-ink/56">{snapshot.people} people affected</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
        <IncidentFeed />
        <NeedsChart />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <div className="panel p-6">
          <SectionHeading kicker="Forward Outlook" title="Projected humanitarian pressure" badge="AI forecast" />
          <ForecastBandChart />
        </div>

        <div className="panel p-6">
          <SectionHeading kicker="Command Notes" title="What leadership should watch next" />
          <div className="space-y-3">
            {[
              "Sudan and Gaza remain the dominant drivers of leadership attention over the next 24 hours.",
              "Projected pressure is rising faster than access in the highest-severity contexts.",
              "WASH and child protection remain the most likely categories to need rapid escalation."
            ].map((note) => (
              <div key={note} className="card-subtle p-4 text-sm leading-6 text-unicef-ink/72">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ActiveCrisesView() {
  return (
    <>
      <DashboardHeader
        title="Priority crisis zones with regional drilldown and cross-border signal flow."
        description="Select hotspots on the map to inspect affected populations, immediate needs, and risk momentum for the highest-severity regions."
        badge="24 active zones monitored"
      />

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr] xl:gap-6">
        <div className="panel p-6">
          <SectionHeading kicker="Crisis Drilldown Map" title="Hover or click for regional details" badge="Cross-border signal routes" />
          <CrisisMap />
        </div>

        <div className="space-y-5 xl:space-y-6">
          <div className="panel p-6">
            <div className="section-kicker">Priority ranking</div>
            <div className="mt-4 space-y-3">
              {regionalSnapshots.map((snapshot, index) => (
                <div key={snapshot.region} className="card-subtle p-4 transition duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-unicef-mist text-sm font-semibold text-unicef-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        0{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-unicef-ink">{snapshot.region}</div>
                        <div className="mt-1 text-sm text-unicef-ink/56">{snapshot.trend}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold tracking-[-0.03em] text-unicef-ink">{snapshot.risk}</div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-unicef-ink/42">risk</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="section-kicker">Escalation notes</div>
            <div className="mt-4 space-y-3">
              {[
                "Sudan and Gaza are driving the steepest near-term rise in child protection and trauma care demand.",
                "Bangladesh and Horn of Africa show climate-linked acceleration with WASH and nutrition implications.",
                "Ukraine remains operationally sensitive due to infrastructure exposure and seasonal vulnerability."
              ].map((note) => (
                <div key={note} className="card-subtle p-4 text-sm leading-6 text-unicef-ink/72">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function IncidentFeedView() {
  return (
    <>
      <DashboardHeader
        title="Streaming incident intelligence with severity, timing, and operational context."
        description="Live alert cards consolidate the most recent conflict, flood, outbreak, and displacement signals into a triage-ready feed."
        badge="382 alerts triaged today"
      />

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:gap-6">
        <IncidentFeed />
        <div className="space-y-5 xl:space-y-6">
          <div className="panel p-6">
            <div className="section-kicker">Feed filters</div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {["Critical only", "Conflict", "Flood", "Disease", "Displacement"].map((filter) => (
                <button
                  key={filter}
                  className="soft-ring rounded-full bg-white/92 px-4 py-2 text-sm text-unicef-ink/70 transition duration-300 hover:-translate-y-0.5 hover:bg-[#F3FBFE]"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="section-kicker">Detection sources</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {[
                { label: "Field reports", value: "41%", tone: "from-unicef-blue to-[#7ad5f7]" },
                { label: "Partner bulletins", value: "27%", tone: "from-crisis-high to-[#FFC58D]" },
                { label: "Media signals", value: "19%", tone: "from-[#6857FF] to-[#B5AEFF]" },
                { label: "Satellite + remote", value: "13%", tone: "from-crisis-stable to-[#8DE7C0]" }
              ].map((source) => (
                <div key={source.label} className="card-subtle p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-unicef-ink/68">{source.label}</span>
                    <span className="text-sm font-semibold text-unicef-ink">{source.value}</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-unicef-mist">
                    <div className={`h-full rounded-full bg-gradient-to-r ${source.tone}`} style={{ width: source.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NeedsView() {
  return (
    <>
      <DashboardHeader
        title="Needs analytics that connect severity signals to response coverage and operational readiness."
        description="Track food insecurity, health stress, displacement, and child protection risk alongside sector delivery targets."
        badge="Need severity trending upward"
      />

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <NeedsChart />
        <div className="space-y-5 xl:space-y-6">
          <div className="panel p-6">
            <div className="section-kicker">Operational Readiness</div>
            <h3 className="section-title">Response posture by capability</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {[
                { label: "Health", value: "71%", color: "from-crisis-high to-[#FFC58D]" },
                { label: "WASH", value: "84%", color: "from-unicef-blue to-[#7ad5f7]" },
                { label: "Child Protection", value: "63%", color: "from-[#6857FF] to-[#B5AEFF]" }
              ].map((item) => (
                <div key={item.label} className="card-subtle p-4">
                  <div className="text-sm text-unicef-ink/58">{item.label}</div>
                  <div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-unicef-ink">{item.value}</div>
                  <div className="mt-4 h-2.5 rounded-full bg-white">
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="section-kicker">Critical observations</div>
            <div className="mt-4 space-y-3">
              {[
                "Food insecurity is the sharpest unmet need across Sudan and Horn of Africa.",
                "Health delivery is under stress where displacement sites lack cold-chain or trauma capacity.",
                "Child protection signals are outpacing program throughput in the most volatile contexts."
              ].map((item) => (
                <div key={item} className="card-subtle p-4 text-sm leading-6 text-unicef-ink/72">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AssistantView() {
  return (
    <>
      <DashboardHeader
        title="An embedded AI copilot for concise, authoritative humanitarian briefings."
        description="Use the assistant to summarize crisis conditions, identify highest-risk regions, and extract the most urgent reported needs."
        badge="Verified UNICEF context"
      />

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <AIAssistantPanel />
        <div className="space-y-5 xl:space-y-6">
          <div className="panel p-6">
            <div className="section-kicker">Suggested workflows</div>
            <div className="mt-4 space-y-3">
              {[
                "Generate a 90-second executive readout for the current top 3 crisis zones.",
                "Compare immediate needs across Sudan, Gaza, and eastern DRC.",
                "Draft a partner coordination note from the latest critical incidents."
              ].map((item) => (
                <button
                  key={item}
                  className="card-subtle w-full p-4 text-left text-sm leading-6 text-unicef-ink/72 transition duration-300 hover:-translate-y-0.5 hover:bg-[#F3FBFE]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="section-kicker">Output style</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {["Executive concise", "Operational detail", "Partner coordination"].map((style) => (
                <div key={style} className="card-subtle px-4 py-3 text-sm font-medium text-unicef-ink">
                  {style}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReportsView() {
  return (
    <>
      <DashboardHeader
        title="Leadership-ready outputs generated from live signals and AI-assisted synthesis."
        description="Review briefings, export-ready digests, and report production milestones from the crisis intelligence workflow."
        badge="3 reports ready"
      />

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
        <div className="panel p-6">
          <SectionHeading kicker="Reports" title="Leadership-ready outputs" badge="Export center" />

          <div className="space-y-3">
            {reportCards.map((report) => (
              <div key={report.title} className="card-subtle p-4 transition duration-300 hover:-translate-y-0.5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-unicef-ink">{report.title}</div>
                    <div className="mt-1 text-sm text-unicef-ink/58">{report.detail}</div>
                  </div>
                  <div className="rounded-full border border-unicef-blue/15 bg-unicef-blue/10 px-3 py-1 text-xs font-semibold text-unicef-blue">
                    {report.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 xl:space-y-6">
          <div className="panel p-6">
            <div className="section-kicker">Report timeline</div>
            <div className="mt-4 space-y-4">
              {reportTimeline.map((item, index) => (
                <div key={item.time} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-unicef-blue px-3 py-1 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(28,171,226,0.22)]">
                      {item.time}
                    </div>
                    {index < reportTimeline.length - 1 ? <div className="mt-2 h-full w-px bg-unicef-border" /> : null}
                  </div>
                  <div className="card-subtle p-4">
                    <div className="font-semibold text-unicef-ink">{item.title}</div>
                    <div className="mt-1 text-sm leading-6 text-unicef-ink/62">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="section-kicker">Distribution formats</div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {["PDF brief", "Board slides", "Partner note", "Daily digest", "CSV export"].map((format) => (
                <span key={format} className="soft-ring rounded-full bg-white/92 px-4 py-2 text-sm text-unicef-ink/72">
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function DashboardShell() {
  const [activeView, setActiveView] = useState<DashboardView>("Overview");

  return (
    <div className="dashboard-shell relative min-h-screen px-4 py-5 lg:px-6 lg:py-6">
      <div className="mx-auto grid max-w-[1580px] gap-5 lg:grid-cols-[272px_minmax(0,1fr)] xl:gap-6">
        <Sidebar activeView={activeView} onSelect={setActiveView} />

        <main className="space-y-5 xl:space-y-6">
          {activeView === "Overview" ? <OverviewView /> : null}
          {activeView === "Active Crises" ? <ActiveCrisesView /> : null}
          {activeView === "Incident Feed" ? <IncidentFeedView /> : null}
          {activeView === "Humanitarian Needs" ? <NeedsView /> : null}
          {activeView === "AI Assistant" ? <AssistantView /> : null}
          {activeView === "Reports" ? <ReportsView /> : null}
        </main>
      </div>
    </div>
  );
}
