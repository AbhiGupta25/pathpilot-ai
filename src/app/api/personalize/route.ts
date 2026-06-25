import { DiscoveryResult, PathPilotResult } from "@/lib/types";

type PersonalizeMode = "discovery" | "strategy";

type PersonalizePayload = {
  mode: PersonalizeMode;
  profile: unknown;
  result: unknown;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDiscoveryResult(value: unknown): value is DiscoveryResult {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.headline === "string" &&
    typeof value.pattern === "string" &&
    Array.isArray(value.archetypeMix) &&
    Array.isArray(value.whatThisSays) &&
    Array.isArray(value.possibleDirections) &&
    Array.isArray(value.experiments) &&
    Array.isArray(value.avoidForNow) &&
    Array.isArray(value.sevenDayClarityPlan) &&
    typeof value.hiddenStrength === "string" &&
    typeof value.confidenceScore === "number"
  );
}

function isPathPilotResult(value: unknown): value is PathPilotResult {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.studentType === "string" &&
    typeof value.bottleneck === "string" &&
    typeof value.decisionDiagnosis === "string" &&
    typeof value.recommendedPath === "string" &&
    Array.isArray(value.whyThisPath) &&
    Array.isArray(value.whyNotOtherPaths) &&
    isRecord(value.opportunityMatch) &&
    typeof value.tradeoffAdvice === "string" &&
    typeof value.studentChapterAdvice === "string" &&
    Array.isArray(value.opportunityStrategy) &&
    Array.isArray(value.resumeStrategy) &&
    Array.isArray(value.sevenDayPlan) &&
    Array.isArray(value.thirtyDayRoadmap) &&
    typeof value.doThisFirst === "string" &&
    typeof value.confidenceScore === "number" &&
    typeof value.reasoning === "string"
  );
}

function sanitizeWithBase<T>(base: T, candidate: unknown): T {
  if (typeof base === "string") {
    return (typeof candidate === "string" ? candidate : base) as T;
  }

  if (typeof base === "number") {
    return (typeof candidate === "number" && Number.isFinite(candidate) ? candidate : base) as T;
  }

  if (typeof base === "boolean") {
    return (typeof candidate === "boolean" ? candidate : base) as T;
  }

  if (Array.isArray(base)) {
    if (!Array.isArray(candidate) || candidate.length === 0) {
      return base;
    }

    if (base.length === 0) {
      return candidate as T;
    }

    return candidate.map((item) => sanitizeWithBase(base[0], item)) as T;
  }

  if (isRecord(base)) {
    if (!isRecord(candidate)) {
      return base;
    }

    const sanitized: Record<string, unknown> = {};

    for (const key of Object.keys(base)) {
      sanitized[key] = sanitizeWithBase(base[key], candidate[key]);
    }

    return sanitized as T;
  }

  return base;
}

function buildPrompt(mode: PersonalizeMode, profile: unknown, result: DiscoveryResult | PathPilotResult) {
  const modeLabel = mode === "discovery" ? "discovery profile analysis" : "student strategy recommendation";

  return [
    "You are personalizing a student guidance result for PathPilot AI.",
    `Task: rewrite and personalize the existing ${modeLabel} while preserving the exact JSON structure of the base result.`,
    "Return valid JSON only.",
    "Do not add markdown, code fences, commentary, or extra keys.",
    "Keep the same top-level keys, nested keys, and value types as the base result.",
    "Keep the tone practical, encouraging, and specific to the student's profile.",
    "Do not make medical, therapy, diagnostic, destiny, guaranteed job, or guaranteed internship claims.",
    "Do not present certainty where the information is ambiguous.",
    "Base result JSON:",
    JSON.stringify(result, null, 2),
    "Student profile JSON:",
    JSON.stringify(profile, null, 2),
  ].join("\n\n");
}

function extractJsonText(response: GeminiResponse): string | null {
  const text = response.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();

  if (!text) {
    return null;
  }

  if (text.startsWith("```")) {
    return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }

  return text;
}

async function personalizeWithGemini<T extends DiscoveryResult | PathPilotResult>(
  mode: PersonalizeMode,
  profile: unknown,
  baseResult: T
): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    throw new Error("Missing Gemini API key.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: buildPrompt(mode, profile, baseResult) }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as GeminiResponse;
  const jsonText = extractJsonText(data);

  if (!jsonText) {
    throw new Error("Gemini response did not contain JSON text.");
  }

  const parsed = JSON.parse(jsonText) as unknown;
  return sanitizeWithBase(baseResult, parsed);
}

export async function POST(request: Request) {
  let payload: PersonalizePayload;

  try {
    payload = (await request.json()) as PersonalizePayload;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload || (payload.mode !== "discovery" && payload.mode !== "strategy")) {
    return Response.json({ error: "Invalid personalization mode." }, { status: 400 });
  }

  const { mode, profile, result } = payload;

  if (mode === "discovery") {
    if (!isDiscoveryResult(result)) {
      return Response.json({ error: "Invalid discovery result." }, { status: 400 });
    }

    try {
      const personalized = await personalizeWithGemini(mode, profile, result);
      return Response.json({ result: personalized, usedAI: true });
    } catch {
      return Response.json({ result, usedAI: false });
    }
  }

  if (!isPathPilotResult(result)) {
    return Response.json({ error: "Invalid strategy result." }, { status: 400 });
  }

  try {
    const personalized = await personalizeWithGemini(mode, profile, result);
    return Response.json({ result: personalized, usedAI: true });
  } catch {
    return Response.json({ result, usedAI: false });
  }
}
