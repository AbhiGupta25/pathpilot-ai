import { PathPilotResult, StudentProfile, WhyNotPath, OpportunityMatch } from "./types";

function includesAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function getWhyNotPaths(studentType: string, isCS: boolean, wantsMoney: boolean, wantsPlacements: boolean): WhyNotPath[] {
  if (studentType === "Explorer") {
    return [
      {
        path: "Choosing one career immediately",
        reason: "Too early. The student needs small real-world tests before committing to a single identity.",
      },
      {
        path: "Only watching career videos",
        reason: "Passive research creates more options but not more clarity. They need experiments, conversations, and artifacts.",
      },
      {
        path: "Building a resume first",
        reason: "Resume work matters later. Right now the bigger problem is discovering which direction is worth building proof for.",
      },
    ];
  }

  if (studentType === "Specializer") {
    return [
      {
        path: "Pure AI/ML theory",
        reason: "Interesting, but harder to prove quickly unless paired with deployed products or visible demos.",
      },
      {
        path: "Cybersecurity as the immediate focus",
        reason: "Valuable, but usually needs labs, certifications, and deeper domain proof before it becomes placement-ready.",
      },
      {
        path: "Only DSA preparation",
        reason: "Useful for placements, but it does not create differentiated portfolio proof by itself.",
      },
      {
        path: "Random student chapter work",
        reason: "Helpful only if it gives leadership, referrals, or project ownership. Otherwise it becomes time-consuming noise.",
      },
    ];
  }

  if (wantsMoney) {
    return [
      {
        path: "Unpaid clubs as the main strategy",
        reason: "May build community, but it does not directly solve the income or experience constraint.",
      },
      {
        path: "Certificates without projects",
        reason: "Certificates are weak proof unless attached to a shipped project, client-style output, or internship application.",
      },
      {
        path: "Waiting for perfect internships",
        reason: "Too slow. The student needs parallel routes: paid internships, micro-freelance, tutoring, and hackathons.",
      },
    ];
  }

  if (wantsPlacements || isCS) {
    return [
      {
        path: "Only joining clubs",
        reason: "Good for exposure, but placements need measurable proof: DSA, projects, GitHub, resume, and applications.",
      },
      {
        path: "Only building side projects",
        reason: "Projects help, but without DSA and applications, they may not convert into interviews.",
      },
      {
        path: "Only doing online courses",
        reason: "Upskilling is useful only when converted into visible proof and targeted applications.",
      },
    ];
  }

  return [
    {
      path: "Doing everything at once",
      reason: "The student needs a priority order. Too many simultaneous tracks dilute proof and momentum.",
    },
    {
      path: "Waiting for clarity before acting",
      reason: "Clarity usually comes after small experiments, not before them.",
    },
    {
      path: "Generic resume building",
      reason: "The resume should follow a target path. Otherwise it becomes a list of disconnected activities.",
    },
  ];
}

function getOpportunityMatch(studentType: string, wantsMoney: boolean, wantsPlacements: boolean, isCS: boolean): OpportunityMatch {
  if (wantsMoney) {
    return {
      bestFit: "Paid internships + freelance micro-projects + prize-focused hackathons",
      avoid: "Unpaid activity that does not create income, proof, or strong networking",
      rationale:
        "The student has to optimize for both experience and financial value. The best opportunities are the ones that create proof while also creating possible income.",
    };
  }

  if (wantsPlacements) {
    return {
      bestFit: "Placement preparation + deployed projects + targeted internship applications",
      avoid: "Scattered clubs, passive certificates, and projects that are never deployed",
      rationale:
        "For placements, the student needs interview readiness and visible proof. A clean GitHub, strong resume stories, and consistent DSA matter more than random activity.",
    };
  }

  if (studentType === "Explorer") {
    return {
      bestFit: "Mini-projects, mentor conversations, school clubs, and guided experiments",
      avoid: "Committing to one career path before testing real work",
      rationale:
        "The student is still exploring. The right opportunity is not necessarily the most prestigious one; it is the one that helps them learn what kind of work energizes them.",
    };
  }

  if (isCS) {
    return {
      bestFit: "Hackathons + deployed portfolio projects + internships aligned to one specialization",
      avoid: "Learning many technologies without one coherent project story",
      rationale:
        "A CS student wins by showing a clear direction. Hackathons and deployed projects are useful because they convert learning into visible proof.",
    };
  }

  return {
    bestFit: "Portfolio projects + relevant student roles + targeted applications",
    avoid: "Busy work that does not support the student's next target",
    rationale:
      "The student needs opportunities that create visible evidence of ability, not just more lines on a resume.",
  };
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
  let decisionDiagnosis =
    "The student is not starting from zero. The real issue is converting scattered effort into a clear direction, visible proof, and an execution plan.";
  let recommendedPath = "Build one strong portfolio project, connect it to a clear skill path, and use it to target opportunities.";
  let specialization = "Product Engineering";
  let confidenceScore = 78;
  let whyThisPath = [
    "It turns existing effort into proof that other people can understand.",
    "It gives the student a concrete next move instead of another list of options.",
    "It keeps the plan realistic within the student's available weekly time.",
  ];

  if (isExplorer) {
    studentType = "Explorer";
    bottleneck = "You are not lacking potential. You are lacking a structured way to test your interests before committing to one path.";
    decisionDiagnosis =
      "This student has broad curiosity but not enough real-world evidence yet. The best next move is not choosing a final career; it is running small experiments that reveal which interests survive contact with actual work.";
    recommendedPath = "Run small experiments across your top interests, then choose the path that combines your strongest curiosity with real-world demand.";
    specialization = "Human-Centered AI / Bio-Design / UX Research";
    confidenceScore = 82;
    whyThisPath = [
      "It combines creativity, people-centered thinking, and technology without forcing a premature career decision.",
      "It lets the student test multiple interests through small projects instead of abstract research.",
      "It creates early portfolio proof while preserving exploration.",
    ];
  }

  if (isCS && profile.educationStage === "College") {
    studentType = "Specializer";
    bottleneck = "You are comparing too many CS paths at once without ranking them by skill fit, market value, and portfolio feasibility.";
    decisionDiagnosis =
      "The student does not need more career options. They need a priority decision. AI/ML, cybersecurity, full-stack, cloud, and placements are not equal short-term moves. The best path is the one that can create visible proof quickly while still supporting internships and placements.";
    recommendedPath = "Focus on AI Engineering with full-stack implementation so your projects are both intelligent and deployable.";
    specialization = "AI Engineering + Full-Stack Product Development";
    confidenceScore = 86;
    whyThisPath = [
      "It matches the student's existing Python, JavaScript, React, and basic ML foundation.",
      "It creates projects that are easier to demo than pure notebooks or abstract algorithms.",
      "It supports both hackathons and placement readiness because the output is visible, deployed, and explainable.",
    ];
  }

  if (wantsPlacements) {
    studentType = "Placement-Focused Builder";
    bottleneck = "Your main challenge is converting skills into placement-ready proof: DSA, deployed projects, resume clarity, and targeted applications.";
    decisionDiagnosis =
      "The student is optimizing for hiring outcomes, so the plan must balance interview preparation with portfolio differentiation. Only projects or only DSA would be incomplete.";
    recommendedPath = "Prioritize DSA consistency, two deployed projects, GitHub cleanup, and targeted internship or placement applications.";
    specialization = isCS ? "Software Engineering / AI-Enabled Full Stack" : "Role-specific applied technology";
    confidenceScore = 84;
    whyThisPath = [
      "It directly supports the placement funnel: resume shortlisting, interviews, and project discussion.",
      "It avoids wasting time on activities that look busy but do not improve hiring conversion.",
      "It gives the student a weekly structure instead of vague preparation.",
    ];
  }

  if (wantsMoney) {
    studentType = "Earn/Experience Seeker";
    bottleneck = "You need opportunities that create proof and possibly income, not unpaid activity that only looks busy.";
    decisionDiagnosis =
      "The student has a real constraint: experience alone is not enough if financial pressure is high. The best plan should create proof, applications, and income routes in parallel.";
    recommendedPath = "Target paid internships, hackathons with prizes, tutoring, freelance micro-projects, and client-style portfolio work.";
    specialization = isCS ? "Full-Stack Development with AI Tooling" : "Applied Digital Skills";
    confidenceScore = 88;
    whyThisPath = [
      "It respects the student's money constraint instead of giving idealized unpaid advice.",
      "It creates several routes to experience: internships, freelance work, hackathons, and tutoring.",
      "It turns existing projects into marketable proof instead of starting from scratch.",
    ];
  }

  if (wantsStartup) {
    studentType = "Founder Track";
    bottleneck = "Your risk is building too broadly before proving that one painful problem is worth solving.";
    decisionDiagnosis =
      "The student wants to build, but the main startup risk is not code. It is building before validating a painful user problem.";
    recommendedPath = "Pick one user pain, build a small prototype, test it with five users, and use feedback to sharpen the product.";
    specialization = "Product Building / AI Prototyping";
    confidenceScore = 80;
    whyThisPath = [
      "It keeps the project small enough to actually test.",
      "It forces real user feedback before overbuilding.",
      "It creates a demo, story, and evidence base for future hackathons or startup work.",
    ];
  }

  if (wantsResearch) {
    studentType = "Research Track";
    bottleneck = "You need to turn broad curiosity into a focused research question, mentor target list, and evidence of technical reading or experimentation.";
    decisionDiagnosis =
      "The student is not just looking for a project. They need a focused research theme and proof that they can read, summarize, and experiment independently.";
    recommendedPath = "Choose one research theme, summarize three papers, build a small reproduction or demo, and contact labs or professors with proof.";
    specialization = isCS ? "Applied AI Research" : "Interdisciplinary Research";
    confidenceScore = 79;
    whyThisPath = [
      "It creates evidence that a mentor or lab can evaluate.",
      "It prevents the student from emailing professors with only vague interest.",
      "It turns curiosity into a concrete research artifact.",
    ];
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

  const opportunityMatch = getOpportunityMatch(studentType, wantsMoney, wantsPlacements, isCS);
  const whyNotOtherPaths = getWhyNotPaths(studentType, isCS, wantsMoney, wantsPlacements);

  const tradeoffAdvice = wantsMoney
    ? "For the next month, choose paid or proof-generating work over prestige-only activities. The right opportunity should either pay you, strengthen your portfolio, or create a credible contact."
    : wantsPlacements
    ? "For the next month, split effort between interview readiness and proof. Do not let DSA erase projects, and do not let projects become an excuse to avoid applications."
    : isExplorer
    ? "For the next month, optimize for learning signal, not status. A small experiment that teaches you what you like is more valuable than a prestigious activity you do not understand."
    : "For the next month, reduce optional paths. Pick one target, one proof artifact, and one opportunity channel.";

  const studentChapterAdvice =
    wantsPlacements || isCS || wantsMoney
      ? "Join a student chapter only if it gives you leadership, referrals, events, technical ownership, or a project you can put on your resume. If it only consumes time, independent upskilling plus a shipped project is stronger."
      : "A student chapter is useful if it helps the student test interests, meet mentors, or create visible work. It should not replace actual experimentation.";

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
    decisionDiagnosis,
    recommendedPath,
    specialization,
    whyThisPath,
    whyNotOtherPaths,
    opportunityMatch,
    tradeoffAdvice,
    studentChapterAdvice,
    opportunityStrategy,
    resumeStrategy,
    sevenDayPlan,
    thirtyDayRoadmap,
    doThisFirst,
    confidenceScore,
    reasoning,
  };
}
