import type { NextApiRequest, NextApiResponse } from 'next';

type Category = 'coding' | 'content' | 'startup';

const prompts: Record<Category, string[]> = {
  coding: [
    "Build a SaaS tool for remote teams to manage async standups.",
    "Create a landing page for a subscription-based fitness app.",
    "Design a Chrome extension that tracks your daily Twitter activity.",
    "Develop a browser-based code editor with real-time collaboration.",
    "Create a productivity timer app with statistics dashboard.",
    "Build an open-source GitHub issue tracker with Kanban board.",
    "Create a VS Code extension that summarizes highlighted code.",
    "Build a web app that converts UI screenshots to Tailwind CSS.",
    "Generate documentation from TypeScript code comments.",
    "Design a portfolio generator using markdown input.",
    "Build a headless CMS visual playground.",
    "Develop a real-time collaborative whiteboard.",
    "Create a job board with filters for remote + tech stacks.",
    "Make a code snippet manager that syncs with the cloud.",
    "Develop a mobile app that auto-suggests commits from diffs.",
    "Build an AI-assisted bug report summarizer.",
    "Create a web app to simulate API responses visually.",
    "Generate code review feedback with AI from PRs.",
  ],
  content: [
    "Generate 5 blog post ideas for AI-powered productivity tools.",
    "Write copy for a new marketplace for handmade pet accessories.",
    "Draft a newsletter concept for indie game developers.",
    "Create an email sequence for an online writing course.",
    "Generate captions for a minimalist fashion brand’s Instagram.",
    "Write a Twitter thread on remote work productivity hacks.",
    "Brainstorm YouTube video ideas about solo entrepreneurship.",
    "Write a blog outline comparing Midjourney and DALL·E.",
    "Craft ad copy for a subscription meal prep service.",
    "Write a product launch tweet for a journaling app.",
    "Create a newsletter hook for tech-curious freelancers.",
    "Generate a script for a 60-sec TikTok on healthy habits.",
    "Outline a carousel for LinkedIn about career pivots into tech.",
    "Write a landing page hero line for an AI writing assistant.",
    "Create microcopy for a budgeting mobile app.",
    "Generate ideas for a productivity podcast.",
    "Write a short SEO intro for a blog post on React Server Components.",
    "Craft onboarding email copy for a digital planner app.",
  ],
  startup: [
    "Come up with a viral TikTok challenge for a clothing brand.",
    "Think of a side project idea that uses OpenAI's API.",
    "Invent a subscription box service for pet lovers.",
    "Design an MVP for a peer-to-peer skill-sharing app.",
    "Come up with a business idea in the climate tech space.",
    "Describe a landing page concept for a mental wellness startup.",
    "Brainstorm a freemium model for a video analytics platform.",
    "Create a 1-liner pitch for a browser privacy tool.",
    "Suggest early traction ideas for a pre-seed SaaS product.",
    "Generate 3 startup names for a remote team tool.",
    "Ideate a B2B product solving remote onboarding.",
    "Describe a value prop for a non-technical startup founder.",
    "Pitch a mobile app for language learners with gamification.",
    "Design a concierge MVP for a local home-cleaning app.",
    "Brainstorm a niche newsletter that can become a SaaS later.",
    "Think of an AI use case for early-stage DTC brands.",
    "Pitch an idea for a fintech tool targeting freelancers.",
    "Describe a flywheel growth loop for a community platform.",
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  const isValidCategory = (cat: any): cat is Category =>
    ['coding', 'content', 'startup'].includes(cat);

  if (category) {
    if (typeof category === 'string' && isValidCategory(category)) {
      const selectedPrompts = prompts[category];
      const randomPrompt = selectedPrompts[Math.floor(Math.random() * selectedPrompts.length)];
      return res.status(200).json({ prompt: randomPrompt, category });
    } else {
      return res.status(400).json({ error: 'Invalid category' });
    }
  }

  // Random prompt from any category
  const categories = Object.keys(prompts) as Category[];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomPrompt = prompts[randomCategory][Math.floor(Math.random() * prompts[randomCategory].length)];

  return res.status(200).json({ prompt: randomPrompt, category: randomCategory });
}
