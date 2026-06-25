"use client";

import { PathPilotResult } from "@/lib/types";
import { RoadmapCard } from "./RoadmapCard";

type Props = {
  result: PathPilotResult | null;
};

export function ResultDashboard({ result }: Props) {
  if (!result) {
    return (
      <section className="rounded-3xl border border-dashed border-[#BFD0FF] bg-white/70 p-8 text-center shadow-xl shadow-blue-950/5">
        <h2 className="font-display text-3xl font-bold text-slate-950">
          Your PathPilot dashboard will appear here.
        </h2>
        <p className="mt-2 text-slate-600">
          Select a demo persona or fill the form, then generate a next-move plan.
        </p>
      </section>
    );
  }

  const roadmapText = [
    `Student type: ${result.studentType}`,
    `Decision diagnosis: ${result.decisionDiagnosis}`,
    `Bottleneck: ${result.bottleneck}`,
    `Recommended path: ${result.recommendedPath}`,
    `Specialization: ${result.specialization || "Not applicable"}`,
    `Do this first: ${result.doThisFirst}`,
    `Recommendation fit: ${result.confidenceScore}%`,
    `Tradeoff advice: ${result.tradeoffAdvice}`,
    "",
    "Why this path fits:",
    ...result.whyThisPath.map((item) => `- ${item}`),
    "",
    "Why not other paths:",
    ...result.whyNotOtherPaths.map((item) => `- ${item.path}: ${item.reason}`),
    "",
    "Opportunity match:",
    `Best fit: ${result.opportunityMatch.bestFit}`,
    `Avoid: ${result.opportunityMatch.avoid}`,
    `Rationale: ${result.opportunityMatch.rationale}`,
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
      <div className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
              🎯 {result.studentType}
            </div>

            <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Your next-move strategy
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              {result.recommendedPath}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4">
            <div className="text-sm font-semibold text-violet-700">
              Recommendation Fit
            </div>
            <div className="font-display text-4xl font-bold text-violet-950">
              {result.confidenceScore}%
            </div>
            <p className="mt-2 max-w-[11rem] text-xs leading-5 text-violet-800">
              How well this path fits the student’s profile, constraints, and goal.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5">
          <h3 className="font-display text-xl font-bold text-violet-950">
            Next Move Diagnosis
          </h3>
          <p className="mt-2 text-sm leading-6 text-violet-900">
            {result.decisionDiagnosis}
          </p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#DDE7FF] bg-[#F8FBFF] p-5">
            <h3 className="font-display text-lg font-bold text-slate-950">
              Main bottleneck
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {result.bottleneck}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-display text-lg font-bold text-emerald-950">
              Do this first
            </h3>
            <p className="mt-2 text-sm leading-6 text-emerald-900">
              {result.doThisFirst}
            </p>
          </div>
        </div>

        {result.specialization && (
          <div className="mt-4 rounded-2xl border border-[#DDE7FF] bg-white p-5">
            <h3 className="font-display text-lg font-bold text-slate-950">
              Best-fit specialization
            </h3>
            <p className="mt-2 text-slate-700">{result.specialization}</p>
          </div>
        )}

        <p className="mt-5 text-sm leading-6 text-slate-600">
          {result.reasoning}
        </p>

        <button
          onClick={copyRoadmap}
          className="mt-5 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          Copy full roadmap
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[#DDE7FF] bg-white p-5 shadow-xl shadow-blue-950/5">
          <h3 className="font-display text-2xl font-bold text-slate-950">
            Why this path fits
          </h3>
          <ul className="mt-4 space-y-3">
            {result.whyThisPath.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[#DDE7FF] bg-[#F8FBFF] p-3 text-sm leading-6 text-slate-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#DDE7FF] bg-white p-5 shadow-xl shadow-blue-950/5">
          <h3 className="font-display text-2xl font-bold text-slate-950">
            Why not the other paths
          </h3>
          <div className="mt-4 space-y-3">
            {result.whyNotOtherPaths.map((item) => (
              <div
                key={item.path}
                className="rounded-xl border border-[#DDE7FF] bg-[#F8FBFF] p-3"
              >
                <div className="text-sm font-bold text-slate-950">
                  {item.path}
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#DDE7FF] bg-white p-5 shadow-xl shadow-blue-950/5 md:col-span-2">
          <h3 className="font-display text-2xl font-bold text-slate-950">
            Opportunity match
          </h3>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm font-bold text-emerald-950">Best fit</div>
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                {result.opportunityMatch.bestFit}
              </p>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="text-sm font-bold text-red-950">Avoid</div>
              <p className="mt-2 text-sm leading-6 text-red-900">
                {result.opportunityMatch.avoid}
              </p>
            </div>

            <div className="rounded-xl border border-[#DDE7FF] bg-[#F8FBFF] p-4">
              <div className="text-sm font-bold text-slate-950">Rationale</div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {result.opportunityMatch.rationale}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DDE7FF] bg-white p-5 shadow-xl shadow-blue-950/5">
          <h3 className="font-display text-2xl font-bold text-slate-950">
            Tradeoff recommendation
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {result.tradeoffAdvice}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DDE7FF] bg-white p-5 shadow-xl shadow-blue-950/5">
          <h3 className="font-display text-2xl font-bold text-slate-950">
            Student chapter vs upskilling
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {result.studentChapterAdvice}
          </p>
        </div>

        <RoadmapCard title="Opportunity strategy" items={result.opportunityStrategy} />
        <RoadmapCard title="Resume strategy" items={result.resumeStrategy} />
        <RoadmapCard title="7-day action plan" items={result.sevenDayPlan} />
        <RoadmapCard title="30-day roadmap" items={result.thirtyDayRoadmap} />
      </div>
    </section>
  );
}
