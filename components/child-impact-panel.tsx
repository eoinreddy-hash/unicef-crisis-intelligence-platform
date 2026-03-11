import { ChildIcon } from "@/components/icons";
import { childImpactProfiles, provenanceModel } from "@/lib/mock-data";

export function ChildImpactPanel() {
  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Child Impact Intelligence</p>
          <h2 className="section-title">Where children may need help most</h2>
        </div>
        <div className="rounded-full border border-unicef-blue/15 bg-unicef-blue/10 px-3 py-1 text-xs font-semibold text-unicef-blue">
          Explainable scoring
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-3">
          {childImpactProfiles.map((profile) => (
            <div key={profile.region} className="card-subtle p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-base font-semibold text-unicef-ink">
                    <ChildIcon className="h-4 w-4 text-unicef-blue" />
                    {profile.region}
                  </div>
                  <div className="mt-1 text-sm text-unicef-ink/58">{profile.affectedChildren} children likely affected</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold tracking-[-0.04em] text-unicef-ink">{profile.score}</div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-unicef-ink/42">impact score</div>
                </div>
              </div>

              <div className="mt-4 h-2.5 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(15,39,65,0.08)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-crisis-high via-crisis-critical to-[#B42318]"
                  style={{ width: `${profile.score}%` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {profile.drivers.map((driver) => (
                  <span key={driver} className="rounded-full bg-unicef-mist px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-unicef-ink/72">
                    {driver}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-sm text-unicef-ink/64">
                Immediate needs: <span className="font-medium text-unicef-ink">{profile.immediateNeeds.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card-subtle bg-unicef-mist/45 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-unicef-ink/42">Source provenance</div>
          <div className="mt-1 text-lg font-semibold tracking-[-0.03em] text-unicef-ink">How the score is built</div>

          <div className="mt-5 space-y-4">
            {provenanceModel.map((item) => (
              <div key={item.source}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="text-unicef-ink/68">{item.source}</span>
                  <span className="font-medium text-unicef-ink">{Math.round(item.weight * 100)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white shadow-[inset_0_1px_2px_rgba(15,39,65,0.08)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-unicef-blue to-[#7ad5f7]"
                    style={{ width: `${item.weight * 100}%` }}
                  />
                </div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-unicef-ink/42">{item.status}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[18px] bg-white/88 p-4 text-sm leading-6 text-unicef-ink/66">
            The child-impact score is a composite signal that combines source reliability, severity, access constraints,
            displacement indicators, health disruption, and child-specific risk cues. Social signals should be treated as
            corroborative, not primary, evidence.
          </div>
        </div>
      </div>
    </div>
  );
}
