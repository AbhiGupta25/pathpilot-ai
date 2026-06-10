import { StudentProfile } from "@/lib/types";
import { demoPersonas } from "@/lib/demoPersonas";

type Props = {
  onSelect: (profile: StudentProfile) => void;
};

export function DemoPersonaSelector({ onSelect }: Props) {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-slate-950">Try a demo student</h2>
        <p className="mt-2 text-slate-600">
          Use these personas during the hackathon demo to show how PathPilot adapts to different student situations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {demoPersonas.map((persona) => (
          <button
            key={persona.name}
            onClick={() => onSelect(persona)}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:border-indigo-300 hover:bg-white hover:shadow-md"
          >
            <div className="text-lg font-semibold text-slate-950">{persona.name}</div>
            <div className="mt-1 text-sm font-medium text-indigo-700">
              {persona.educationStage} · {persona.primaryGoal}
            </div>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{persona.confusion}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
