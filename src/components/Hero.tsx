export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-12 text-white shadow-2xl md:px-12 md:py-16">
      <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-[-8rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-5xl">
        <div className="mb-5 inline-flex rounded-full border border-indigo-300/30 bg-white/10 px-4 py-2 text-sm text-indigo-50">
          YCFxAI Hackathon Prototype · Student Decision Engine
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          Turn student confusion into one clear next move.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          PathPilot AI helps students choose a direction, specialization, opportunity strategy,
          and action plan based on their stage, skills, goals, financial pressure, and real constraints.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#pathpilot-demo"
            className="rounded-2xl bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-indigo-50"
          >
            Try the demo
          </a>
          <a
            href="#how-it-works"
            className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/15"
          >
            See how it works
          </a>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-slate-200 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="font-semibold text-white">Career clarity</div>
            <p className="mt-2 text-slate-300">For younger students unsure what path fits them.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="font-semibold text-white">Specialization strategy</div>
            <p className="mt-2 text-slate-300">For college students choosing between fields like AI, cyber, web, and data.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="font-semibold text-white">Opportunity planning</div>
            <p className="mt-2 text-slate-300">For students who need experience, proof, internships, hackathons, or income.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
