const steps = [
  {
    title: "1. Understand the student",
    body: "The student enters their stage, interests, skills, projects, goals, financial pressure, and current confusion.",
  },
  {
    title: "2. Diagnose the bottleneck",
    body: "PathPilot classifies whether the student needs exploration, specialization, resume proof, placement prep, paid experience, research, or startup direction.",
  },
  {
    title: "3. Generate the next move",
    body: "The dashboard recommends a path, opportunity strategy, resume strategy, tradeoff advice, and concrete action plans.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
      <div className="mb-6">
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
          How PathPilot works
        </div>
        <h2 className="text-2xl font-bold text-slate-950">
          Not a chatbot. A structured decision engine.
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Instead of giving generic advice, PathPilot uses a rules-first recommendation layer to make
          stable decisions, then can later add AI personalization on top.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border border-[#DDE7FF] bg-[#F8FBFF] p-5 shadow-sm"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white shadow-md shadow-violet-200">
              {index + 1}
            </div>
            <h3 className="font-semibold text-slate-950">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
