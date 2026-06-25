"use client";

import { useRef, useState } from "react";
import { DemoPersonaSelector } from "@/components/DemoPersonaSelector";
import { DiscoveryDashboard } from "@/components/DiscoveryDashboard";
import { DiscoveryForm } from "@/components/DiscoveryForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ModeSelector } from "@/components/ModeSelector";
import { ProblemSolutionStrip } from "@/components/ProblemSolutionStrip";
import { ResultDashboard } from "@/components/ResultDashboard";
import { StudentProfileForm } from "@/components/StudentProfileForm";
import { analyzeDiscoveryProfile } from "@/lib/discoveryEngine";
import { demoPersonas } from "@/lib/demoPersonas";
import { generateRecommendation } from "@/lib/recommendationEngine";
import { DiscoveryProfile, DiscoveryResult, PathPilotResult, StudentProfile } from "@/lib/types";

type Mode = "discovery" | "strategy";
type PersonalizationStatus = "idle" | "loading" | "applied" | "fallback";

const sampleDiscoveryProfile: DiscoveryProfile = {
  name: "Sam",
  educationStage: "High School",
  funMoment:
    "I had fun when I helped my friends understand a confusing science chapter by making a simple drawing and explaining it like a story.",
  whatWereYouDoing:
    "I was breaking the topic into smaller parts, making examples, and checking if everyone understood.",
  peopleAskHelpWith:
    "People ask me to explain homework, organize group projects, and make presentations look better.",
  loseTrackOfTime:
    "I lose track of time when I am designing slides, researching weird facts, or explaining something in a better way.",
  dislikeEvenIfGood:
    "I dislike memorizing things without understanding why they matter.",
  proudMoment:
    "I organized a group presentation and made the topic easier for everyone to present.",
  freeWeekendChoice:
    "I would make a study guide website or a short video that helps students understand difficult topics.",
};

function StatusBanner({ status }: { status: PersonalizationStatus }) {
  if (status === "idle") {
    return null;
  }

  const label =
    status === "loading"
      ? "Personalizing with AI..."
      : status === "applied"
        ? "AI personalization applied."
        : "Using stable rules-based result.";

  const styles =
    status === "loading"
      ? "border-violet-200 bg-violet-50 text-violet-800"
      : status === "applied"
        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
        : "border-slate-200 bg-slate-50 text-slate-700";

  return <div className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm ${styles}`}>{label}</div>;
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("discovery");

  const [profile, setProfile] = useState<StudentProfile>(demoPersonas[1]);
  const [result, setResult] = useState<PathPilotResult | null>(null);
  const [strategyStatus, setStrategyStatus] = useState<PersonalizationStatus>("idle");

  const [discoveryProfile, setDiscoveryProfile] = useState<DiscoveryProfile>(sampleDiscoveryProfile);
  const [discoveryResult, setDiscoveryResult] = useState<DiscoveryResult | null>(null);
  const [discoveryStatus, setDiscoveryStatus] = useState<PersonalizationStatus>("idle");

  const strategyRequestIdRef = useRef(0);
  const discoveryRequestIdRef = useRef(0);

  async function personalizeResult<T extends DiscoveryResult | PathPilotResult>(
    nextMode: Mode,
    profileData: DiscoveryProfile | StudentProfile,
    baseResult: T
  ): Promise<{ result: T; usedAI: boolean }> {
    const response = await fetch("/api/personalize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode: nextMode,
        profile: profileData,
        result: baseResult,
      }),
    });

    if (!response.ok) {
      throw new Error("Personalization request failed.");
    }

    return (await response.json()) as { result: T; usedAI: boolean };
  }

  function selectPersona(persona: StudentProfile) {
    setProfile(persona);
    void generateStrategy(persona);
  }

  async function generateStrategy(profileOverride?: StudentProfile) {
    const nextProfile = profileOverride ?? profile;
    const baseResult = generateRecommendation(nextProfile);
    const requestId = strategyRequestIdRef.current + 1;

    strategyRequestIdRef.current = requestId;
    setResult(baseResult);
    setStrategyStatus("loading");

    try {
      const personalized = await personalizeResult("strategy", nextProfile, baseResult);

      if (strategyRequestIdRef.current !== requestId) {
        return;
      }

      setResult(personalized.result);
      setStrategyStatus(personalized.usedAI ? "applied" : "fallback");
    } catch {
      if (strategyRequestIdRef.current !== requestId) {
        return;
      }

      setStrategyStatus("fallback");
    }
  }

  async function generateDiscovery() {
    const baseResult = analyzeDiscoveryProfile(discoveryProfile);
    const requestId = discoveryRequestIdRef.current + 1;

    discoveryRequestIdRef.current = requestId;
    setDiscoveryResult(baseResult);
    setDiscoveryStatus("loading");

    try {
      const personalized = await personalizeResult("discovery", discoveryProfile, baseResult);

      if (discoveryRequestIdRef.current !== requestId) {
        return;
      }

      setDiscoveryResult(personalized.result);
      setDiscoveryStatus(personalized.usedAI ? "applied" : "fallback");
    } catch {
      if (discoveryRequestIdRef.current !== requestId) {
        return;
      }

      setDiscoveryStatus("fallback");
    }
  }

  return (
    <main className="app-bg min-h-screen px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <Hero />
        <ProblemSolutionStrip />
        <HowItWorks />
        <ModeSelector mode={mode} setMode={setMode} />

        {mode === "discovery" ? (
          <div id="pathpilot-demo" className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="lg:sticky lg:top-6 lg:self-start">
              <DiscoveryForm profile={discoveryProfile} setProfile={setDiscoveryProfile} onSubmit={generateDiscovery} />
            </div>
            <div className="space-y-4">
              {discoveryResult ? <StatusBanner status={discoveryStatus} /> : null}
              <DiscoveryDashboard result={discoveryResult} />
            </div>
          </div>
        ) : (
          <>
            <div id="pathpilot-demo" className="scroll-mt-8">
              <DemoPersonaSelector onSelect={selectPersona} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="lg:sticky lg:top-6 lg:self-start">
                <StudentProfileForm profile={profile} setProfile={setProfile} onSubmit={generateStrategy} />
              </div>
              <div className="space-y-4">
                {result ? <StatusBanner status={strategyStatus} /> : null}
                <ResultDashboard result={result} />
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </main>
  );
}
