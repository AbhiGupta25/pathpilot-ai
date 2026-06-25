"use client";

import { useState } from "react";
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

export default function Home() {
  const [mode, setMode] = useState<Mode>("discovery");

  const [profile, setProfile] = useState<StudentProfile>(demoPersonas[1]);
  const [result, setResult] = useState<PathPilotResult | null>(null);

  const [discoveryProfile, setDiscoveryProfile] = useState<DiscoveryProfile>(sampleDiscoveryProfile);
  const [discoveryResult, setDiscoveryResult] = useState<DiscoveryResult | null>(null);

  function selectPersona(persona: StudentProfile) {
    setProfile(persona);
    setResult(generateRecommendation(persona));
  }

  function generateStrategy() {
    setResult(generateRecommendation(profile));
  }

  function generateDiscovery() {
    setDiscoveryResult(analyzeDiscoveryProfile(discoveryProfile));
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
            <DiscoveryDashboard result={discoveryResult} />
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
              <ResultDashboard result={result} />
            </div>
          </>
        )}

        <Footer />
      </div>
    </main>
  );
}
