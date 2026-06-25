import { StudentProfile } from "@/lib/types";
import { demoPersonas } from "@/lib/demoPersonas";

type Props = {
  onSelect: (profile: StudentProfile) => void;
};

export function DemoPersonaSelector({ onSelect }: Props) {
  return (
    <section className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Try a demo student</h2>
          <p className="mt-2 text-slate-600">
            Use these personas during the hackathon demo to show how PathPilot adapts to different student situations.
          </p>
        </div>
        <div className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
          3 demo flows
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {demoPersonas.map((persona) => (
          <button
            key={persona.name}
            onClick={() => onSelect(persona)}
            className="group rounded-2xl border border-[#DDE7FF] bg-[#F8FBFF] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:bg-white hover:shadow-lg hover:shadow-violet-950/10"
          >
            <div className="text-lg font-semibold text-slate-950 group-hover:text-violet-700">{persona.name}</div>
            <div className="mt-1 text-sm font-medium text-violet-700">
              {persona.educationStage} · {persona.primaryGoal}
            </div>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{persona.confusion}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
