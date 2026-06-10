export function ProblemSolutionStrip() {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-rose-600">
          The problem
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          Students have more information than clarity.
        </h2>
        <p className="mt-4 leading-7 text-slate-700">
          A student may be choosing a career, picking a CS specialization, preparing for placements,
          needing paid experience, or wondering whether clubs, internships, hackathons, or upskilling
          are the smartest move. Most platforms give lists. PathPilot gives a decision.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600">
          The solution
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          PathPilot turns the situation into a next-move plan.
        </h2>
        <p className="mt-4 leading-7 text-slate-700">
          It classifies the student’s real bottleneck, recommends the best-fit direction, explains
          why other paths are weaker right now, and generates a practical 7-day and 30-day roadmap.
        </p>
      </div>
    </section>
  );
}
