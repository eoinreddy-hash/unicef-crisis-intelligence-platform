import Link from "next/link";
import { CrisisMap } from "@/components/crisis-map";
import { GlobeIcon, PulseIcon, SparkIcon } from "@/components/icons";
import { UnicefLogo } from "@/components/unicef-logo";

const highlights = [
  {
    title: "AI triage at global scale",
    detail: "Prioritize the noisiest crisis signals across conflict, climate, disease, and displacement."
  },
  {
    title: "Leadership-ready summaries",
    detail: "Generate concise situation updates and needs assessments from live incident streams."
  },
  {
    title: "Operational insight in minutes",
    detail: "Spot rising risks earlier and align UNICEF response planning with the latest field context."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-6 lg:px-6">
      <div className="mx-auto max-w-[1520px]">
        <header className="panel-muted flex items-center justify-between px-6 py-5">
          <UnicefLogo />
          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-unicef-ink/65">
              Humanitarian AI demo
            </div>
            <Link
              href="/dashboard"
              className="rounded-full bg-unicef-blue px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:brightness-105"
            >
              Launch Crisis Dashboard
            </Link>
          </div>
        </header>

        <section className="grid gap-6 pt-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="panel relative overflow-hidden px-6 py-8 lg:px-10 lg:py-12">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-unicef-blue/10 blur-3xl" />
            <div className="eyebrow">AI-Powered Crisis Monitoring</div>
            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-unicef-ink lg:text-7xl">
              Real-time humanitarian intelligence for faster response
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-unicef-ink/70">
              A modern command interface for monitoring global crises, surfacing urgent needs, and generating
              trusted operational insight for UNICEF leadership teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-unicef-blue px-6 py-3 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                Launch Crisis Dashboard
              </Link>
              <div className="rounded-full border border-unicef-border/70 bg-white px-5 py-3 text-sm text-unicef-ink/65">
                Designed for CIO / CTO review
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="card-subtle p-5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-unicef-mist text-unicef-blue">
                    {index === 0 ? <SparkIcon className="h-5 w-5" /> : index === 1 ? <GlobeIcon className="h-5 w-5" /> : <PulseIcon className="h-5 w-5" />}
                  </div>
                  <div className="mt-4 text-lg font-semibold text-unicef-ink">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-unicef-ink/65">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                { label: "Active zones", value: "24", note: "severity-ranked contexts" },
                { label: "Live incidents", value: "382", note: "AI-triaged alerts today" },
                { label: "Executive briefs", value: "3", note: "generated for leadership" }
              ].map((item) => (
                <div key={item.label} className="metric-card px-5 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-unicef-ink/42">
                    {item.label}
                  </div>
                  <div className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-unicef-ink">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-unicef-ink/58">{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4 lg:p-5">
            <div className="mb-4 flex items-start justify-between px-2">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-unicef-ink/45">
                  Global crisis map
                </div>
                <div className="mt-2 text-2xl font-semibold text-unicef-ink">
                  Live humanitarian signal layer
                </div>
              </div>
              <div className="rounded-full border border-unicef-blue/15 bg-unicef-blue/10 px-3 py-1 text-xs font-semibold text-unicef-blue">
                24 active zones
              </div>
            </div>
            <CrisisMap hero />
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel p-6">
            <div className="section-kicker">Why This Matters</div>
            <h2 className="section-title">A leadership-grade view of humanitarian risk</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "Unify fragmented crisis signals into one operational picture.",
                "Surface the most urgent regional needs in minutes, not hours.",
                "Generate trusted summaries for leadership, operations, and partners."
              ].map((item) => (
                <div key={item} className="card-subtle p-4 text-sm leading-6 text-unicef-ink/70">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <div className="section-kicker">Prototype Scope</div>
            <h2 className="section-title">Designed for review and deployment readiness</h2>
            <div className="mt-5 space-y-3">
              {[
                "Production-style dashboard shell with multi-view navigation.",
                "Interactive crisis map, live incident feed, and AI assistant.",
                "Deployable Next.js package prepared for Vercel or similar hosting."
              ].map((item) => (
                <div key={item} className="soft-ring rounded-[20px] bg-white/92 px-4 py-3 text-sm text-unicef-ink/68">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
