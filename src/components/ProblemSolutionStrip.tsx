export function ProblemSolutionStrip() {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="mb-4 inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-700">
          The problem
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          Many students are too confused to answer normal career questions.
        </h2>
        <p className="mt-4 leading-7 text-slate-700">
          Asking “what are your skills?” or “what do you want to do?” assumes the student already
          knows themselves. Many do not. They need help finding patterns in real moments, not another
          long list of career options.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-700">
          The solution
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          PathPilot starts with stories, then turns them into direction.
        </h2>
        <p className="mt-4 leading-7 text-slate-700">
          Students can describe moments where they had fun, helped someone, built something, or lost
          track of time. PathPilot turns those signals into archetypes, possible paths, and a small
          next-step plan.
        </p>
      </div>
    </section>
  );
}
