export function Footer() {
  return (
    <footer className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <h2 className="text-2xl font-bold">PathPilot AI</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            Built for the YCFxAI Challenge as a student-first tool for career clarity,
            specialization decisions, opportunity planning, and practical next-step guidance.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <div className="font-semibold text-white">Safety note</div>
          <p className="mt-2 leading-6">
            PathPilot does not guarantee jobs, replace counselors, or make medical claims. It helps
            students organize decisions and take practical next steps.
          </p>
        </div>
      </div>
    </footer>
  );
}
