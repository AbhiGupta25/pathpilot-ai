import { ArchetypeScore, DiscoveryProfile, DiscoveryResult } from "./types";

const archetypes = [
  {
    name: "The Builder",
    keywords: ["build", "built", "make", "made", "create", "created", "app", "website", "project", "prototype", "code", "fix"],
    signal: "You seem to enjoy turning ideas into something real.",
  },
  {
    name: "The Investigator",
    keywords: ["why", "research", "science", "data", "analyze", "experiment", "understand", "question", "study", "observe"],
    signal: "You seem to enjoy figuring out why things work.",
  },
  {
    name: "The Explainer",
    keywords: ["explain", "teach", "presentation", "present", "simplify", "write", "helped understand", "debate", "story"],
    signal: "You seem to enjoy making ideas easier for other people to understand.",
  },
  {
    name: "The Helper",
    keywords: ["help", "people", "friend", "support", "community", "care", "problem", "listen", "guide"],
    signal: "You seem to notice what people need and enjoy making things easier for them.",
  },
  {
    name: "The Strategist",
    keywords: ["business", "money", "competition", "win", "market", "growth", "plan", "strategy", "sell", "startup"],
    signal: "You seem to enjoy decisions, tradeoffs, competition, and outcomes.",
  },
  {
    name: "The Creator",
    keywords: ["design", "art", "video", "music", "content", "canva", "draw", "edit", "writing", "creative", "aesthetic"],
    signal: "You seem to enjoy expression, visuals, storytelling, or making things feel alive.",
  },
  {
    name: "The Organizer",
    keywords: ["organize", "event", "schedule", "manage", "team", "coordinate", "lead", "structure", "planner"],
    signal: "You seem to enjoy bringing order to messy situations.",
  },
  {
    name: "The Tinkerer",
    keywords: ["try", "tool", "tools", "fix", "broken", "repair", "experiment", "hardware", "test", "mess around"],
    signal: "You seem to learn by trying, testing, and adjusting things hands-on.",
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
        signal: "You may not have clear patterns yet, which is normal. The next move is to test small interests instead of forcing one answer.",
      },
      {
        name: "The Builder",
        score: 2,
        signal: "Even without clear skills, you can learn a lot by making small things and seeing what feels interesting.",
      },
      {
        name: "The Helper",
        score: 1,
        signal: "Your answers suggest that people-facing problems may be worth testing.",
      },
    ];
  }

  const top = [...scores].sort((a, b) => b.score - a.score).slice(0, 3);
  const names = top.map((item) => item.name);
  const primary = top[0];
  const secondary = top[1];

  const possibleDirections = getDirections(names);

  const headline =
    primary.name === "The Explorer"
      ? "Your pattern is still forming — and that is useful information."
      : `You may be ${primary.name.replace("The ", "a ")} with a strong ${secondary.name.replace("The ", "").toLowerCase()} streak.`;

  const pattern =
    primary.name === "The Explorer"
      ? "Right now, PathPilot sees uncertainty rather than one obvious path. That does not mean you are behind. It means your best move is to run small experiments and collect evidence about what actually holds your attention."
      : `Your answers suggest that you are drawn to ${primary.signal.toLowerCase()} You may also show signs of ${secondary.signal.toLowerCase()}`;

  const hiddenStrength =
    primary.name === "The Builder"
      ? "You may not think of yourself as skilled yet, but you seem to learn by making things tangible."
      : primary.name === "The Explainer"
      ? "You may be underestimating your ability to turn confusing ideas into something other people can follow."
      : primary.name === "The Helper"
      ? "You may be good at spotting human problems before other people can name them."
      : primary.name === "The Investigator"
      ? "You may be strongest when you are allowed to ask better questions instead of memorizing answers."
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
