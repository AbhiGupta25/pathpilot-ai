"use client";

import { DiscoveryResult } from "@/lib/types";
import { RoadmapCard } from "./RoadmapCard";

type Props = {
  result: DiscoveryResult | null;
};

export function DiscoveryDashboard({ result }: Props) {
  if (!result) {
    return (
      <section className="rounded-3xl border border-dashed border-[#BFD0FF] bg-white/70 p-8 text-center shadow-xl shadow-blue-950/5">
        <h2 className="text-2xl font-bold text-slate-950">Your discovery reveal will appear here.</h2>
        <p className="mt-2 text-slate-600">
          Answer the story questions, then PathPilot will look for patterns.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
          Pattern reveal
        </div>

        <h2 className="mt-4 text-3xl font-bold text-slate-950">{result.headline}</h2>
        <p className="mt-4 leading-7 text-slate-700">{result.pattern}</p>

        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="font-semibold text-emerald-950">Hidden strength</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-900">{result.hiddenStrength}</p>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-950 px-5 py-4 text-white">
          <div className="text-sm text-slate-300">Pattern confidence</div>
          <div className="text-3xl font-bold">{result.confidenceScore}%</div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
        <h3 className="text-xl font-bold text-slate-950">Your archetype mix</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {result.archetypeMix.map((item) => (
            <div key={item.name} className="rounded-2xl border border-[#DDE7FF] bg-[#F8FBFF] p-5">
              <div className="text-lg font-bold text-violet-700">{item.name}</div>
              <div className="mt-1 text-sm font-medium text-slate-500">Signal strength: {item.score}</div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.signal}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <RoadmapCard title="What this says about you" items={result.whatThisSays} />
        <RoadmapCard title="Best-fit directions to explore" items={result.possibleDirections} />
        <RoadmapCard title="Tiny experiments to try" items={result.experiments} />
        <RoadmapCard title="Avoid for now" items={result.avoidForNow} />
        <RoadmapCard title="7-day clarity plan" items={result.sevenDayClarityPlan} />
      </div>
    </section>
  );
}
