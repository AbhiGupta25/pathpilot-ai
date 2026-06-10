export function Hero() {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-12 text-white shadow-2xl md:px-12">
      <div className="max-w-4xl">
        <div className="mb-4 inline-flex rounded-full border border-indigo-300/30 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-100">
          YCFxAI Hackathon Prototype
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Turn career confusion into your next move.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          PathPilot AI helps students choose a direction, specialization, opportunity strategy,
          and 7-day action plan based on their real constraints.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Career clarity for younger students</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Specialization strategy for college students</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Opportunity plans for students who need experience</div>
        </div>
      </div>
    </section>
  );
}
