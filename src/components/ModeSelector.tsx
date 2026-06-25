"use client";

type Mode = "discovery" | "strategy";

type Props = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export function ModeSelector({ mode, setMode }: Props) {
  return (
    <section id="mode-selector" className="scroll-mt-8 rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
      <div className="mb-5">
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
          Choose your starting point
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          PathPilot works even if the student has no idea what to say yet.
        </h2>
        <p className="mt-2 text-slate-600">
          Start with story-based discovery, or use strategy mode if the student already knows their goal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setMode("discovery")}
          className={`rounded-2xl border p-5 text-left transition ${
            mode === "discovery"
              ? "border-violet-300 bg-violet-50 shadow-md shadow-violet-100"
              : "border-[#DDE7FF] bg-[#F8FBFF] hover:border-violet-200 hover:bg-white"
          }`}
        >
          <div className="text-lg font-bold text-slate-950">I’m confused</div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Use story-based questions to discover patterns, archetypes, and possible directions.
          </p>
        </button>

        <button
          onClick={() => setMode("strategy")}
          className={`rounded-2xl border p-5 text-left transition ${
            mode === "strategy"
              ? "border-violet-300 bg-violet-50 shadow-md shadow-violet-100"
              : "border-[#DDE7FF] bg-[#F8FBFF] hover:border-violet-200 hover:bg-white"
          }`}
        >
          <div className="text-lg font-bold text-slate-950">I know my goal</div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Use a structured profile to get specialization, placement, resume, or opportunity strategy.
          </p>
        </button>
      </div>
    </section>
  );
}
