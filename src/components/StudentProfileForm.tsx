import { StudentProfile } from "@/lib/types";

type Props = {
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
  onSubmit: () => void;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

export function StudentProfileForm({ profile, setProfile, onSubmit }: Props) {
  function update<K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) {
    setProfile({ ...profile, [key]: value });
  }

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-slate-950">Student profile</h2>
        <p className="mt-2 text-slate-600">
          PathPilot uses this profile to classify the student situation and generate a strategic next-move plan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input className={inputClass} value={profile.name} onChange={(e) => update("name", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Education stage</span>
          <select className={inputClass} value={profile.educationStage} onChange={(e) => update("educationStage", e.target.value as StudentProfile["educationStage"])}>
            <option>High School</option>
            <option>College</option>
            <option>Recent Graduate</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Degree / major</span>
          <input className={inputClass} value={profile.degree} onChange={(e) => update("degree", e.target.value)} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Primary goal</span>
          <select className={inputClass} value={profile.primaryGoal} onChange={(e) => update("primaryGoal", e.target.value as StudentProfile["primaryGoal"])}>
            <option>Career clarity</option>
            <option>CS specialization</option>
            <option>Placements</option>
            <option>Paid experience</option>
            <option>Resume building</option>
            <option>Startup/building</option>
            <option>Research</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Financial pressure</span>
          <select className={inputClass} value={profile.financialPressure} onChange={(e) => update("financialPressure", e.target.value as StudentProfile["financialPressure"])}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Weekly time available</span>
          <input className={inputClass} value={profile.weeklyTime} onChange={(e) => update("weeklyTime", e.target.value)} />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Interests</span>
          <textarea className={inputClass} rows={3} value={profile.interests} onChange={(e) => update("interests", e.target.value)} />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Skills</span>
          <textarea className={inputClass} rows={3} value={profile.skills} onChange={(e) => update("skills", e.target.value)} />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Projects / experience</span>
          <textarea className={inputClass} rows={3} value={profile.projects} onChange={(e) => update("projects", e.target.value)} />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Current confusion</span>
          <textarea className={inputClass} rows={4} value={profile.confusion} onChange={(e) => update("confusion", e.target.value)} />
        </label>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 w-full rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
      >
        Generate my next move
      </button>
    </section>
  );
}
