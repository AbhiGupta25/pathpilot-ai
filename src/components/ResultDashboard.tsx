import { PathPilotResult } from "@/lib/types";
import { RoadmapCard } from "./RoadmapCard";

type Props = {
  result: PathPilotResult | null;
};

export function ResultDashboard({ result }: Props) {
  if (!result) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-950">Your PathPilot dashboard will appear here.</h2>
        <p className="mt-2 text-slate-600">
          Select a demo persona or fill the form, then generate a next-move plan.
        </p>
      </section>
    );
  }

  const roadmapText = [
    `Student type: ${result.studentType}`,
    `Bottleneck: ${result.bottleneck}`,
    `Recommended path: ${result.recommendedPath}`,
    `Specialization: ${result.specialization || "Not applicable"}`,
    `Do this first: ${result.doThisFirst}`,
    "",
    "7-day plan:",
    ...result.sevenDayPlan.map((item) => `- ${item}`),
    "",
    "30-day roadmap:",
    ...result.thirtyDayRoadmap.map((item) => `- ${item}`),
  ].join("\n");

  async function copyRoadmap() {
    await navigator.clipboard.writeText(roadmapText);
    alert("Roadmap copied.");
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {result.studentType}
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Recommended next move</h2>
            <p className="mt-3 max-w-3xl text-slate-700">{result.recommendedPath}</p>
          </div>
          <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
            <div className="text-sm text-slate-300">Confidence</div>
            <div className="text-3xl font-bold">{result.confidenceScore}%</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-950">Main bottleneck</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{result.bottleneck}</p>
          </div>
          <div className="rounded-2xl bg-indigo-50 p-5">
            <h3 className="font-semibold text-indigo-950">Do this first</h3>
            <p className="mt-2 text-sm leading-6 text-indigo-900">{result.doThisFirst}</p>
          </div>
        </div>

        {result.specialization && (
          <div className="mt-4 rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-950">Best-fit specialization</h3>
            <p className="mt-2 text-slate-700">{result.specialization}</p>
          </div>
        )}

        <p className="mt-5 text-sm leading-6 text-slate-600">{result.reasoning}</p>

        <button
          onClick={copyRoadmap}
          className="mt-5 rounded-2xl border border-slate-300 px-5 py-3 font-medium text-slate-800 transition hover:bg-slate-50"
        >
          Copy roadmap
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <RoadmapCard title="Opportunity strategy" items={result.opportunityStrategy} />
        <RoadmapCard title="Resume strategy" items={result.resumeStrategy} />
        <RoadmapCard title="7-day action plan" items={result.sevenDayPlan} />
        <RoadmapCard title="30-day roadmap" items={result.thirtyDayRoadmap} />
      </div>
    </section>
  );
}
