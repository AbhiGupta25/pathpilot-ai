import { ArchetypeScore, DiscoveryProfile, DiscoveryResult } from "./types";

const archetypes = [
  {
    name: "The Builder",
    keywords: ["build", "built", "make", "made", "create", "created", "app", "website", "project", "prototype", "code", "fix"],
    signal: "You like turning ideas into something real that other people can actually use.",
  },
  {
    name: "The Investigator",
    keywords: ["why", "research", "science", "data", "analyze", "experiment", "understand", "question", "study", "observe"],
    signal: "You chase the why behind things and enjoy figuring out what is really going on.",
  },
  {
    name: "The Explainer",
    keywords: ["explain", "teach", "presentation", "present", "simplify", "write", "helped understand", "debate", "story"],
    signal: "You can turn confusing ideas into something other people can finally understand.",
  },
  {
    name: "The Helper",
    keywords: ["help", "people", "friend", "support", "community", "care", "problem", "listen", "guide"],
    signal: "You notice what people need and enjoy making things easier, calmer, or more accessible.",
  },
  {
    name: "The Strategist",
    keywords: ["business", "money", "competition", "win", "market", "growth", "plan", "strategy", "sell", "startup"],
    signal: "You think in moves, tradeoffs, outcomes, and what gives you an edge.",
  },
  {
    name: "The Creator",
    keywords: ["design", "art", "video", "music", "content", "canva", "draw", "edit", "writing", "creative", "aesthetic"],
    signal: "You care about expression, visuals, storytelling, and making things feel alive.",
  },
  {
    name: "The Organizer",
    keywords: ["organize", "event", "schedule", "manage", "team", "coordinate", "lead", "structure", "planner"],
    signal: "You bring order to messy situations and make people, tasks, or ideas work together.",
  },
  {
    name: "The Tinkerer",
    keywords: ["try", "tool", "tools", "fix", "broken", "repair", "experiment", "hardware", "test", "mess around"],
    signal: "You learn by touching the thing, testing it, breaking it, fixing it, and trying again.",
  },
];

function countMatches(text: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => {
    return score + (text.includes(keyword) ? 1 : 0);
  }, 0);
}

function getDirections(names: string[]) {
  const has = (name: string) => names.includes(name);

  if (has("The Builder") && has("The Helper")) {
    return [
      "Human-centered product building",
      "Education technology",
      "Accessibility or community tech",
      "UX/product design",
    ];
  }

  if (has("The Investigator") && has("The Builder")) {
    return [
      "AI/data projects",
      "Research engineering",
      "Cybersecurity labs",
      "Science or technology research",
    ];
  }

  if (has("The Creator") && has("The Strategist")) {
    return [
      "Content strategy",
      "Brand building",
      "Creator tools",
      "Marketing and growth",
    ];
  }

  if (has("The Explainer") && has("The Investigator")) {
    return [
      "Research communication",
      "Teaching or education technology",
      "UX research",
      "Policy or science communication",
    ];
  }

  if (has("The Organizer") && has("The Strategist")) {
    return [
      "Operations",
      "Project management",
      "Entrepreneurship",
      "Business analytics",
    ];
  }

  if (has("The Creator")) {
    return ["Design", "Media/content", "Product storytelling", "Creative technology"];
  }

  if (has("The Builder")) {
    return ["Software projects", "Product engineering", "Startup prototyping", "AI tools"];
  }

  if (has("The Helper")) {
    return ["Social impact", "Healthcare support tools", "Community programs", "Human-centered design"];
  }

  return ["Career exploration", "Student projects", "Beginner hackathons", "Skill discovery experiments"];
}

function getComboName(primary: string, secondary: string) {
  const cleanPrimary = primary.replace("The ", "");
  const cleanSecondary = secondary.replace("The ", "");

  if (primary === "The Explainer" && secondary === "The Builder") return "The Idea Translator";
  if (primary === "The Builder" && secondary === "The Helper") return "The Human-Centered Builder";
  if (primary === "The Investigator" && secondary === "The Builder") return "The Lab-Maker";
  if (primary === "The Creator" && secondary === "The Strategist") return "The Creative Operator";
  if (primary === "The Organizer" && secondary === "The Strategist") return "The Systems Planner";
  if (primary === "The Helper" && secondary === "The Explainer") return "The Support Guide";

  return `${cleanPrimary} + ${cleanSecondary}`;
}

export function analyzeDiscoveryProfile(profile: DiscoveryProfile): DiscoveryResult {
  const text = Object.values(profile).join(" ").toLowerCase();

  let scores: ArchetypeScore[] = archetypes.map((archetype) => ({
    name: archetype.name,
    score: countMatches(text, archetype.keywords),
    signal: archetype.signal,
  }));

  const totalScore = scores.reduce((sum, item) => sum + item.score, 0);

  if (totalScore === 0) {
    scores = [
      {
        name: "The Explorer",
        score: 3,
        signal: "Your pattern is still forming. That is not a flaw — it means you need small experiments, not pressure.",
      },
      {
        name: "The Builder",
        score: 2,
        signal: "You may learn best by making small things and seeing what actually feels interesting.",
      },
      {
        name: "The Helper",
        score: 1,
        signal: "People-facing problems may be worth testing because they can reveal what you care about.",
      },
    ];
  }

  const top = [...scores].sort((a, b) => b.score - a.score).slice(0, 3);
  const names = top.map((item) => item.name);
  const primary = top[0];
  const secondary = top[1];
  const comboName = getComboName(primary.name, secondary.name);

  const possibleDirections = getDirections(names);

  const headline =
    primary.name === "The Explorer"
      ? "Your pattern is still forming — and that is useful data."
      : `Your current signal looks like: ${comboName}.`;

  const pattern =
    primary.name === "The Explorer"
      ? "PathPilot is not seeing one loud signal yet. That does not mean you are behind. It means your next step is to collect better evidence through small, low-pressure experiments."
      : `The strongest clue is ${primary.name}: ${primary.signal} There is also a secondary clue from ${secondary.name}: ${secondary.signal}`;

  const hiddenStrength =
    primary.name === "The Builder"
      ? "You may not think of yourself as skilled yet, but your instinct is to make ideas tangible. That is a real advantage."
      : primary.name === "The Explainer"
      ? "You may be underestimating how valuable it is to make confusing things feel simple. That can become teaching, content, research, UX, product, or leadership."
      : primary.name === "The Helper"
      ? "You may be good at spotting human problems before other people can name them. That is the root of strong social-impact and design work."
      : primary.name === "The Investigator"
      ? "You may be strongest when you are allowed to ask better questions instead of memorizing answers. That points toward research, data, science, or analysis."
      : primary.name === "The Creator"
      ? "You may understand attention, feeling, and presentation better than you realize. That matters in design, media, branding, and creator tools."
      : "Your useful signal is not a fixed career label yet. It is the kind of situations that make you curious enough to keep going.";

  return {
    headline,
    pattern,
    archetypeMix: top,
    hiddenStrength,
    whatThisSays: [
      "You do not need a perfect career answer yet. You need better evidence from real experiences.",
      "Your interests are easier to understand through stories than through generic labels.",
      "The best next step is a small experiment, not a life-long commitment.",
    ],
    possibleDirections,
    experiments: [
      "Pick one direction from the list and make a tiny project around it this week.",
      "Talk to two people who are already doing something close to that direction.",
      "Create one visible artifact: a poster, prototype, article, short video, GitHub repo, or one-page case study.",
      "After seven days, ask: did this give me energy, boredom, stress, curiosity, or confidence?",
    ],
    avoidForNow: [
      "Do not choose a path only because it sounds prestigious.",
      "Do not collect random courses before testing whether you like the actual work.",
      "Do not compare yourself to students who already know their specialization.",
      "Do not treat confusion as failure. Treat it as missing data.",
    ],
    sevenDayClarityPlan: [
      "Day 1: Write one paragraph about the moment you had fun and what exactly made it interesting.",
      "Day 2: Choose one possible direction and watch or read one beginner-friendly example of real work in that field.",
      "Day 3: Make a tiny artifact connected to that direction.",
      "Day 4: Show it to one friend, teacher, or senior and ask what it reminds them of.",
      "Day 5: Compare how much energy you felt before, during, and after the task.",
      "Day 6: Try a second mini-task in a different direction.",
      "Day 7: Pick one direction to explore for 30 days, not forever.",
    ],
    confidenceScore: Math.min(92, 68 + totalScore * 4),
  };
}
