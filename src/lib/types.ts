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

export type WhyNotPath = {
  path: string;
  reason: string;
};

export type OpportunityMatch = {
  bestFit: string;
  avoid: string;
  rationale: string;
};

export type PathPilotResult = {
  studentType: string;
  bottleneck: string;
  decisionDiagnosis: string;
  recommendedPath: string;
  specialization?: string;
  whyThisPath: string[];
  whyNotOtherPaths: WhyNotPath[];
  opportunityMatch: OpportunityMatch;
  tradeoffAdvice: string;
  studentChapterAdvice: string;
  opportunityStrategy: string[];
  resumeStrategy: string[];
  sevenDayPlan: string[];
  thirtyDayRoadmap: string[];
  doThisFirst: string;
  confidenceScore: number;
  reasoning: string;
};

export type DiscoveryProfile = {
  name: string;
  educationStage: EducationStage;
  funMoment: string;
  whatWereYouDoing: string;
  peopleAskHelpWith: string;
  loseTrackOfTime: string;
  dislikeEvenIfGood: string;
  proudMoment: string;
  freeWeekendChoice: string;
};

export type ArchetypeScore = {
  name: string;
  score: number;
  signal: string;
};

export type DiscoveryResult = {
  headline: string;
  pattern: string;
  archetypeMix: ArchetypeScore[];
  hiddenStrength: string;
  whatThisSays: string[];
  possibleDirections: string[];
  experiments: string[];
  avoidForNow: string[];
  sevenDayClarityPlan: string[];
  confidenceScore: number;
};
