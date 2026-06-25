"use client";

import { DiscoveryProfile } from "@/lib/types";

type Props = {
  profile: DiscoveryProfile;
  setProfile: (profile: DiscoveryProfile) => void;
  onSubmit: () => void;
};

const inputClass =
  "w-full rounded-xl border border-[#DDE7FF] bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

export function DiscoveryForm({ profile, setProfile, onSubmit }: Props) {
  function update<K extends keyof DiscoveryProfile>(key: K, value: DiscoveryProfile[K]) {
    setProfile({ ...profile, [key]: value });
  }

  return (
    <section className="rounded-3xl border border-[#DDE7FF] bg-white p-6 shadow-xl shadow-blue-950/5">
      <div className="mb-5">
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">
          Discovery mode
        </div>
        <h2 className="text-2xl font-bold text-slate-950">Start with real moments, not perfect answers.</h2>
        <p className="mt-2 text-slate-600">
          The student does not need to know their skills yet. PathPilot looks for patterns in what they describe.
        </p>
      </div>

      <div className="grid gap-4">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input className={inputClass} value={profile.name} onChange={(e) => update("name", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Education stage</span>
          <select className={inputClass} value={profile.educationStage} onChange={(e) => update("educationStage", e.target.value as DiscoveryProfile["educationStage"])}>
            <option>High School</option>
            <option>College</option>
            <option>Recent Graduate</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Tell us about one time you actually had fun in school, a hobby, online, or while helping someone.</span>
          <textarea className={inputClass} rows={4} value={profile.funMoment} onChange={(e) => update("funMoment", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">What were you doing in that moment?</span>
          <textarea className={inputClass} rows={3} value={profile.whatWereYouDoing} onChange={(e) => update("whatWereYouDoing", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">What do people usually ask you for help with?</span>
          <textarea className={inputClass} rows={3} value={profile.peopleAskHelpWith} onChange={(e) => update("peopleAskHelpWith", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">What makes you lose track of time?</span>
          <textarea className={inputClass} rows={3} value={profile.loseTrackOfTime} onChange={(e) => update("loseTrackOfTime", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">What do you dislike doing, even if you are good at it?</span>
          <textarea className={inputClass} rows={3} value={profile.dislikeEvenIfGood} onChange={(e) => update("dislikeEvenIfGood", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">What is one thing you made, fixed, explained, organized, won, or improved?</span>
          <textarea className={inputClass} rows={3} value={profile.proudMoment} onChange={(e) => update("proudMoment", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">If you had one free weekend to build or learn something, what would you choose?</span>
          <textarea className={inputClass} rows={3} value={profile.freeWeekendChoice} onChange={(e) => update("freeWeekendChoice", e.target.value)} />
        </label>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 w-full rounded-2xl bg-violet-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
      >
        Reveal my pattern
      </button>
    </section>
  );
}
