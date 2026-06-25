"use client";

import { DiscoveryResult } from "@/lib/types";
import { RoadmapCard } from "./RoadmapCard";

type Props = {
  result: DiscoveryResult | null;
};

function archetypeEmoji(name: string) {
  const map: Record<string, string> = {
    "The Builder": "🧩",
    "The Investigator": "🔎",
    "The Explainer": "🗣️",
    "The Helper": "🤝",
    "The Strategist": "♟️",
    "The Creator": "🎨",
    "The Organizer": "🗂️",
    "The Tinkerer": "🧪",
    "The Explorer": "🧭",
  };

  return map[name] || "✨";
}

function archetypeHook(name: string) {
  const map: Record<string, string> = {
    "The Builder": "You want ideas to become real.",
    "The Investigator": "You chase the why.",
    "The Explainer": "You make confusing things click.",
    "The Helper": "You notice what people need.",
    "The Strategist": "You think in moves and outcomes.",
    "The Creator": "You care about how things feel.",
    "The Organizer": "You turn chaos into structure.",
    "The Tinkerer": "You learn by trying the thing.",
    "The Explorer": "You are still collecting signals.",
  };

  return map[name] || "There is a useful signal here.";
}

export function DiscoveryDashboard({ result }: Props) {
  if (!result) {
    return (
      <section className="rounded-3xl border border-dashed border-[#BFD0FF] bg-white/70 p-8 text-center shadow-xl shadow-blue-950/5">
        <h2 className="font-display text-3xl font-bold text-slate-950">Your reveal will appear here.</h2>
        <p className="mt-2 text-slate-600">
          Answer the story questions, then PathPilot will look for signals in what you wrote.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
          ✨ Pattern reveal
        </div>

        <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950">
          {result.headline}
        </h2>
        <p className="mt-4 leading-7 text-slate-700">{result.pattern}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-display text-xl font-bold text-emerald-950">Hidden strength</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-900">{result.hiddenStrength}</p>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
            <div className="text-sm font-semibold text-violet-700">Pattern Strength</div>
            <div className="font-display mt-1 text-4xl font-bold text-violet-950">{result.confidenceScore}%</div>
            <p className="mt-2 text-xs leading-5 text-violet-800">
              How strongly your story signals point toward this archetype mix.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-violet-700">
          Your archetype mix
        </div>
        <h3 className="font-display text-3xl font-bold text-slate-950">
          Not a personality box — a clue map.
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {result.archetypeMix.map((item) => (
            <div key={item.name} className="rounded-2xl border border-[#DDE7FF] bg-[#F8FBFF] p-5 shadow-sm">
              <div className="text-4xl">{archetypeEmoji(item.name)}</div>
              <div className="font-display mt-3 text-2xl font-bold text-slate-950">{item.name}</div>
              <div className="mt-1 text-sm font-semibold text-violet-700">{archetypeHook(item.name)}</div>
              <div className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                Signal strength: {item.score}
              </div>
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
