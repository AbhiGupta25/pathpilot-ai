import { PathPilotResult, StudentProfile } from "./types";

function includesAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

export function generateRecommendation(profile: StudentProfile): PathPilotResult {
  const combined = `${profile.degree} ${profile.interests} ${profile.skills} ${profile.projects} ${profile.confusion}`.toLowerCase();

  const isCS =
    includesAny(combined, ["computer", "cs", "coding", "python", "javascript", "react", "java", "software", "web", "ai", "ml"]) ||
    profile.primaryGoal === "CS specialization";

  const wantsPlacements = profile.primaryGoal === "Placements";
  const wantsMoney = profile.financialPressure === "High" || profile.primaryGoal === "Paid experience";
  const wantsStartup = profile.primaryGoal === "Startup/building";
  const wantsResearch = profile.primaryGoal === "Research";
  const isExplorer = profile.educationStage === "High School" || profile.primaryGoal === "Career clarity";

  let studentType = "Builder";
  let bottleneck = "You have some direction, but your proof, positioning, and next steps are not organized yet.";
  let recommendedPath = "Build one strong portfolio project, connect it to a clear skill path, and use it to target opportunities.";
  let specialization = "Product Engineering";
  let confidenceScore = 78;

  if (isExplorer) {
    studentType = "Explorer";
    bottleneck = "You are not lacking potential. You are lacking a structured way to test your interests before committing to one path.";
    recommendedPath = "Run small experiments across your top interests, then choose the path that combines your strongest curiosity with real-world demand.";
    specialization = "Human-Centered AI / Bio-Design / UX Research";
    confidenceScore = 82;
  }

  if (isCS && profile.educationStage === "College") {
    studentType = "Specializer";
    bottleneck = "You are comparing too many CS paths at once without ranking them by skill fit, market value, and portfolio feasibility.";
    recommendedPath = "Focus on AI Engineering with full-stack implementation so your projects are both intelligent and deployable.";
    specialization = "AI Engineering + Full-Stack Product Development";
    confidenceScore = 86;
  }

  if (wantsPlacements) {
    studentType = "Placement-Focused Builder";
    bottleneck = "Your main challenge is converting skills into placement-ready proof: DSA, deployed projects, resume clarity, and targeted applications.";
    recommendedPath = "Prioritize DSA consistency, two deployed projects, GitHub cleanup, and targeted internship or placement applications.";
    specialization = isCS ? "Software Engineering / AI-Enabled Full Stack" : "Role-specific applied technology";
    confidenceScore = 84;
  }

  if (wantsMoney) {
    studentType = "Earn/Experience Seeker";
    bottleneck = "You need opportunities that create proof and possibly income, not unpaid activity that only looks busy.";
    recommendedPath = "Target paid internships, hackathons with prizes, tutoring, freelance micro-projects, and client-style portfolio work.";
    specialization = isCS ? "Full-Stack Development with AI Tooling" : "Applied Digital Skills";
    confidenceScore = 88;
  }

  if (wantsStartup) {
    studentType = "Founder Track";
    bottleneck = "Your risk is building too broadly before proving that one painful problem is worth solving.";
    recommendedPath = "Pick one user pain, build a small prototype, test it with five users, and use feedback to sharpen the product.";
    specialization = "Product Building / AI Prototyping";
    confidenceScore = 80;
  }

  if (wantsResearch) {
    studentType = "Research Track";
    bottleneck = "You need to turn broad curiosity into a focused research question, mentor target list, and evidence of technical reading or experimentation.";
    recommendedPath = "Choose one research theme, summarize three papers, build a small reproduction or demo, and contact labs or professors with proof.";
    specialization = isCS ? "Applied AI Research" : "Interdisciplinary Research";
    confidenceScore = 79;
  }

  const opportunityStrategy = wantsMoney
    ? [
        "Apply to paid internships and remote junior roles where your existing projects match the job description.",
        "Enter hackathons with cash prizes or strong sponsor visibility instead of random low-value competitions.",
        "Offer small freelance micro-projects: landing pages, dashboards, automation scripts, or portfolio sites.",
        "Use tutoring or campus tech help as a short-term income route if internships take longer.",
      ]
    : wantsPlacements
    ? [
        "Target internships and campus placement prep instead of joining too many unrelated student chapters.",
        "Use hackathons only when the output can become a resume project.",
        "Prioritize company-relevant projects over certificates.",
        "Create a weekly application tracker with roles, deadlines, referrals, and follow-ups.",
      ]
    : isExplorer
    ? [
        "Interview two seniors or professionals from different fields before choosing a path.",
        "Try one mini-project per interest area instead of deciding only from YouTube videos.",
        "Join one meaningful club or event where you can test your interest in public.",
        "Build a beginner portfolio artifact: a poster, prototype, article, or small app.",
      ]
    : [
        "Pick opportunities that create visible proof: projects, demos, GitHub, presentations, or user feedback.",
        "Choose hackathons that align with your target specialization.",
        "Use student chapters only if they give leadership, projects, or strong networking.",
        "Avoid passive upskilling without a project attached.",
      ];

  const resumeStrategy = [
    "Lead with projects that show outcomes, not just tools used.",
    "Turn each project into a one-line impact statement: problem, action, result.",
    "Clean your GitHub or portfolio so a reviewer can understand your best work in under two minutes.",
    "Remove scattered activities that do not support your current target path.",
  ];

  const sevenDayPlan = [
    "Day 1: Define your target user, target role, and current bottleneck in one paragraph.",
    "Day 2: Pick one project or opportunity direction that matches your recommended path.",
    "Day 3: Create or improve one portfolio artifact: GitHub repo, landing page, demo video, or case study.",
    "Day 4: List 15 relevant opportunities: internships, hackathons, labs, freelance leads, or campus roles.",
    "Day 5: Rewrite your resume or profile around your strongest proof.",
    "Day 6: Apply to at least 5 targeted opportunities or reach out to 5 relevant people.",
    "Day 7: Review results, remove weak directions, and commit to one 30-day track.",
  ];

  const thirtyDayRoadmap = [
    "Week 1: Clarify direction and create one visible proof artifact.",
    "Week 2: Build or polish a project that matches your target path.",
    "Week 3: Apply, network, and collect feedback from real people.",
    "Week 4: Improve based on feedback and package your work into a resume-ready story.",
  ];

  const doThisFirst = wantsMoney
    ? "Create a one-page portfolio and apply to five paid, project-matched opportunities today."
    : isCS
    ? "Choose one specialization for the next 30 days and build one deployed project around it."
    : isExplorer
    ? "Pick two interests and test each through one small real-world task this week."
    : "Turn your strongest existing project into a clear resume-ready case study.";

  const reasoning = `PathPilot classified ${profile.name || "this student"} as a ${studentType} because their profile shows ${
    wantsMoney
      ? "a strong need for experience that can also create financial value."
      : isCS
      ? "technical interests but unclear specialization priority."
      : isExplorer
      ? "broad interests without enough real-world testing yet."
      : "some existing direction but not enough structured execution."
  } The recommendation focuses on the next practical move instead of overwhelming them with every possible option.`;

  return {
    studentType,
    bottleneck,
    recommendedPath,
    specialization,
    opportunityStrategy,
    resumeStrategy,
    sevenDayPlan,
    thirtyDayRoadmap,
    doThisFirst,
    confidenceScore,
    reasoning,
  };
}
