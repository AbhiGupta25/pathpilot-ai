@'
# PathPilot AI

**PathPilot AI** is a student decision engine built for the **Youth Code x AI / YCFxAI Challenge** by Youth Code Foundation.

It helps students figure out their next move, even when they do not know what they are good at yet.

**Live Demo:** https://pathpilot-ai-five.vercel.app/  
**GitHub Repo:** https://github.com/AbhiGupta25/pathpilot-ai

---

## The Problem

Most career tools assume students can already answer questions like:

- What are your skills?
- What career do you want?
- What specialization are you interested in?
- What kind of opportunity are you looking for?

But many students are not there yet.

A high schooler may not know what they enjoy.  
A college student may be confused between AI, cybersecurity, full-stack, data, research, or placements.  
Another student may need paid experience, internships, hackathons, freelance work, or resume proof.

The real problem is not lack of information. Students already have too much information.

The problem is lack of translation.

Students need help turning their actual experiences, interests, constraints, and confusion into a clear next step.

---

## The Solution

PathPilot AI helps students move from confusion to direction through two modes:

### 1. Discovery Mode

For students who are too confused to name their interests or skills.

Instead of asking them to already know themselves, PathPilot asks story-based questions such as:

> Tell us about one time you actually had fun in school, a hobby, online, or while helping someone.

PathPilot then looks for patterns in the student's answers and reveals:

- their archetype mix
- their hidden strength
- possible directions to explore
- tiny experiments to try
- a 7-day clarity plan

### 2. Strategy Mode

For students who already know their broad goal but need a smarter plan.

PathPilot helps with:

- CS specialization decisions
- placement preparation
- paid experience
- resume building
- internships and hackathons
- student chapter vs independent upskilling decisions
- 7-day and 30-day action planning

---

## Key Features

### Story-first onboarding

Students do not need to know their skills upfront. PathPilot starts with real moments and uses those stories to infer useful signals.

### Archetype reveal

Discovery Mode identifies practical archetypes such as:

- The Builder
- The Investigator
- The Explainer
- The Helper
- The Strategist
- The Creator
- The Organizer
- The Tinkerer

These are not personality labels. They are clue maps that help students understand what kinds of work may be worth exploring.

### Pattern Strength

PathPilot shows a **Pattern Strength** score to explain how strongly the student's answers point toward a particular archetype mix.

### Recommendation Fit

Strategy Mode shows a **Recommendation Fit** score to show how well the recommended path fits the student's profile, constraints, and goal.

### AI personalization

PathPilot uses a rules-first recommendation engine for reliability, then uses Gemini AI to personalize the final explanation and make the guidance more specific to the student's actual story or profile.

If the AI call fails, the app still works using the stable rules-based result.

### Practical action plans

The app does not stop at "you might like this career." It gives students:

- tiny experiments
- possible career directions
- opportunity strategy
- resume strategy
- what to avoid for now
- a 7-day action plan
- a 30-day roadmap

---

## How AI Is Used

PathPilot uses AI in a controlled and safe way.

1. **Rules-first analysis**
   - The app first generates a stable base result using structured logic.
   - This prevents the system from depending completely on an AI model.

2. **Signal extraction**
   - Discovery Mode looks for behavioral signals in student stories, such as building, explaining, helping, investigating, organizing, creating, or strategizing.

3. **AI personalization**
   - Gemini AI receives the base result and the student's profile.
   - It rewrites the explanation to make it warmer, more specific, and more useful.

4. **Fallback protection**
   - If the Gemini API is unavailable or returns an invalid result, PathPilot keeps the original rules-based recommendation.

This makes the app reliable while still using AI to make the guidance feel more human and personalized.

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Gemini API**
- **Vercel**
- **GitHub**

---

## Architecture

```txt
Student input
   ↓
Discovery Mode or Strategy Mode
   ↓
Rules-first recommendation engine
   ↓
Base result shown immediately
   ↓
Gemini personalization API route
   ↓
Personalized result displayed
   ↓
Fallback to rules-based result if AI fails