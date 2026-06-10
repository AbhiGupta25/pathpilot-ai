export type EducationStage = "High School" | "College" | "Recent Graduate";

export type FinancialPressure = "Low" | "Medium" | "High";

export type PrimaryGoal =
  | "Career clarity"
  | "CS specialization"
  | "Placements"
  | "Paid experience"
  | "Resume building"
  | "Startup/building"
  | "Research";

export type StudentProfile = {
  name: string;
  educationStage: EducationStage;
  degree: string;
  interests: string;
  skills: string;
  projects: string;
  financialPressure: FinancialPressure;
  primaryGoal: PrimaryGoal;
  weeklyTime: string;
  confusion: string;
};

export type PathPilotResult = {
  studentType: string;
  bottleneck: string;
  recommendedPath: string;
  specialization?: string;
  opportunityStrategy: string[];
  resumeStrategy: string[];
  sevenDayPlan: string[];
  thirtyDayRoadmap: string[];
  doThisFirst: string;
  confidenceScore: number;
  reasoning: string;
};
