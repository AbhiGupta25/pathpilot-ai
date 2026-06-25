export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#DDE7FF] bg-gradient-to-br from-white via-[#F7F3FF] to-[#EAF7FF] px-6 py-12 text-[#07111F] shadow-2xl shadow-blue-950/10 md:px-12 md:py-16">
      <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-[-8rem] h-96 w-96 rounded-full bg-violet-300/25 blur-3xl" />

      <div className="relative max-w-5xl">
        <div className="mb-5 inline-flex rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur">
          Youth Code x AI · YCFxAI Challenge Submission
        </div>

        <h1 className="font-display max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
          No idea what you’re good at yet? Let’s find the pattern.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
          PathPilot helps students turn real stories — the moments they enjoyed, helped, built,
          explained, organized, or obsessed over — into career directions, archetypes, and a next-step plan.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#mode-selector"
            className="rounded-2xl bg-violet-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
          >
            I’m confused — start here
          </a>
          <a
            href="#mode-selector"
            className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            I know my goal
          </a>
        </div>

        <div className="mt-10 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-2xl border border-[#DDE7FF] bg-white/85 p-4 shadow-sm backdrop-blur">
            <div className="font-display text-lg font-bold text-slate-950">🧭 Discovery first</div>
            <p className="mt-2 text-slate-600">For students who cannot name their interests or skills yet.</p>
          </div>
          <div className="rounded-2xl border border-[#DDE7FF] bg-white/85 p-4 shadow-sm backdrop-blur">
            <div className="font-display text-lg font-bold text-slate-950">✨ Archetype reveal</div>
            <p className="mt-2 text-slate-600">Builder, Investigator, Helper, Creator, Strategist, and more.</p>
          </div>
          <div className="rounded-2xl border border-[#DDE7FF] bg-white/85 p-4 shadow-sm backdrop-blur">
            <div className="font-display text-lg font-bold text-slate-950">🎯 Your next move</div>
            <p className="mt-2 text-slate-600">Small experiments, career directions, and action plans.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
