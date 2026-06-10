"use client";

import { useState } from "react";
import { DemoPersonaSelector } from "@/components/DemoPersonaSelector";
import { Hero } from "@/components/Hero";
import { ResultDashboard } from "@/components/ResultDashboard";
import { StudentProfileForm } from "@/components/StudentProfileForm";
import { demoPersonas } from "@/lib/demoPersonas";
import { generateRecommendation } from "@/lib/recommendationEngine";
import { PathPilotResult, StudentProfile } from "@/lib/types";

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>(demoPersonas[1]);
  const [result, setResult] = useState<PathPilotResult | null>(null);

  function selectPersona(persona: StudentProfile) {
    setProfile(persona);
    setResult(generateRecommendation(persona));
  }

  function generate() {
    setResult(generateRecommendation(profile));
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <Hero />
        <DemoPersonaSelector onSelect={selectPersona} />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <StudentProfileForm profile={profile} setProfile={setProfile} onSubmit={generate} />
          <ResultDashboard result={result} />
        </div>
      </div>
    </main>
  );
}
