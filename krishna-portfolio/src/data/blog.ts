import type { BlogPost } from '../types'

/**
 * HOW TO ADD A POST: append an object to `posts`. Required: slug (lower-case letters, digits, hyphens),
 * title, category, tags, intro, sections, takeaways, references. Optional: diagram (plain text),
 * publishedAt (ISO date such as '2026-12-01'), author, and per-section `code` and `steps`.
 * New categories appear in the blog filter automatically. Leave publishedAt and author out
 * until they are confirmed; nothing is shown for a missing value.
 *
 * The first eight posts were migrated from the original static site. Posts that contained first-person
 * claims, unverified figures or dated predictions were reworded into neutral educational content
 * with the same technical meaning (see docs/MIGRATION.md).
 */
const OWASP_API = { title: 'OWASP API Security Project', url: 'https://owasp.org/www-project-api-security/' } as const
const OWASP_TOP10 = { title: 'OWASP Top 10:2025', url: 'https://owasp.org/Top10/2025/' } as const

export const posts: readonly BlogPost[] = [
  {
    slug: 'why-vapt-is-an-art-not-a-scan',
    title: 'Why VAPT is an art, not a scan',
    category: 'Penetration Testing',
    tags: ['VAPT'],
    intro:
      'A scanner finds known patterns. It can’t see that a harmless info leak plus a weak role check equals account takeover. The real bugs hide in business logic, and you only find them by understanding what the app is meant to do, then asking what it shouldn’t allow.',
    diagram: 'Scanner → findings list\nHuman → how the findings chain together',
    sections: [
      { heading: 'What to take away', body: 'Chains matter more than single findings.' },
      { heading: 'Try this yourself', body: 'Pick one app you use and write three things its logic should never permit.' },
    ],
    takeaways: ['Chains matter more than single findings.'],
    references: [],
  },
  {
    slug: 'idor-when-changing-one-id-exposes-another-users-data',
    title: 'IDOR: when changing one ID exposes another user’s data',
    category: 'API Security',
    tags: ['API', 'OWASP', 'IDOR'],
    intro:
      'In a vulnerable API, the endpoint trusts the ID in the URL and never asks whether the caller owns that object. Changing one number then exposes another person’s data, which may be personal or financial. The fix is boring and essential: check on the server that the authenticated user owns the object, and return 403 when not.',
    diagram: 'GET /api/user/1001 → 200 (mine)\nGET /api/user/1002 → 200 (LEAK)\nFix: ownership check → 403',
    sections: [
      {
        heading: 'What the fix looks like',
        body: 'The ownership check runs on the server for every request, after authentication and before the data is returned.',
        code: 'if (record.ownerId !== req.user.id) return res.sendStatus(403);',
      },
      { heading: 'What to take away', body: 'Authentication proves who you are. Authorization decides what you can touch.' },
      { heading: 'Try this yourself', body: 'Use the IDOR simulation in the Labs, then toggle the fix.' },
    ],
    takeaways: ['Authentication proves who you are. Authorization decides what you can touch.'],
    references: [OWASP_API, OWASP_TOP10],
  },
  {
    slug: 'apis-are-the-new-front-door',
    title: 'APIs are the new front door',
    category: 'API Security',
    tags: ['API', 'OWASP'],
    intro:
      'Modern apps are mostly APIs, and attackers go straight to them. The usual failures: object-level authorization missing, weak authentication, responses that return far more data than the screen shows, and no rate limiting so anyone can brute-force or scrape.',
    diagram: 'BOLA · Broken Auth · Excessive Data · No Rate Limit',
    sections: [
      { heading: 'What to take away', body: 'Hiding a button in the UI is not access control.' },
      { heading: 'Try this yourself', body: 'Open your browser’s network tab and read what one API response actually returns.' },
    ],
    takeaways: ['Hiding a button in the UI is not access control.'],
    references: [OWASP_API],
  },
  {
    slug: 'why-sast-false-positives-are-worth-triaging',
    title: 'Why SAST false positives are worth triaging',
    category: 'Application Security',
    tags: ['SAST'],
    intro:
      'SAST output can feel noisy, but each false positive shows how the tool models data flow and where a codebase does something unusual. Triage them carefully and a team can tune rules, cut noise, and ship real fixes faster.',
    diagram: 'Finding → triage → real bug? → tune rule',
    sections: [
      { heading: 'What to take away', body: 'Noise is data about your codebase.' },
      { heading: 'Try this yourself', body: 'Run SonarQube on a small repo and explain every finding you dismiss.' },
    ],
    takeaways: ['Noise is data about your codebase.'],
    references: [],
  },
  {
    slug: 'when-ai-lies-leaks-and-gets-tricked',
    title: 'When AI lies, leaks and gets tricked',
    category: 'AI Security',
    tags: ['LLM', 'Prompt injection'],
    intro:
      'Prompt injection is the new SQL injection: instructions and data travel in one string, so crafted input can override the rules. Models can also invent facts and leak what’s in their context. Treat model output as untrusted and never give an LLM more access than needed.',
    diagram: 'User text + System rules → same channel → attacker wins',
    sections: [
      { heading: 'What to take away', body: 'Least privilege applies to AI agents too.' },
      { heading: 'Try this yourself', body: 'Try the prompt injection simulation in the Labs.' },
    ],
    takeaways: ['Least privilege applies to AI agents too.'],
    references: [],
  },
  {
    slug: 'ai-attacking-ai-emerging-risks',
    title: 'AI attacking AI: emerging risks',
    category: 'AI Security',
    tags: ['AI', 'LLM'],
    intro:
      'Attacks on AI systems can themselves be automated: poisoned training data, model theft through high-volume queries, and automated jailbreak searches that try thousands of prompts. Defence needs the same speed: monitoring, rate limits, data provenance, and constant red teaming.',
    diagram: 'Poison data → Steal model → Evade filters → Automate',
    sections: [
      { heading: 'What to take away', body: 'Defenders must automate too.' },
      { heading: 'Try this yourself', body: 'List what data would hurt most if poisoned in a system you know.' },
    ],
    takeaways: ['Defenders must automate too.'],
    references: [],
  },
  {
    slug: 'privacy-is-not-a-setting-its-a-right',
    title: 'Privacy is not a setting, it’s a right',
    category: 'Privacy',
    tags: ['Privacy'],
    intro:
      'Privacy by default beats privacy by toggle. A simple framework: collect only what you need, encrypt it, give people control over it, and delete it when the purpose ends. Data you never stored can never leak.',
    diagram: 'Collect less → Encrypt → Control → Delete',
    sections: [
      { heading: 'What to take away', body: 'The safest data is the data you don’t have.' },
      { heading: 'Try this yourself', body: 'Audit one form you work on: remove a field you don’t truly need.' },
    ],
    takeaways: ['The safest data is the data you don’t have.'],
    references: [],
  },
  {
    slug: 'ai-powered-attacks-what-changes-and-what-does-not',
    title: 'AI-powered attacks: what changes and what does not',
    category: 'Threat Landscape',
    tags: ['Threat', 'AI'],
    intro:
      'Attackers use AI for convincing phishing in any language, cloned voices, and faster reconnaissance. The basics still win: MFA, patching, least privilege, and teaching people to verify before they trust. Fancy tools won’t save a team that skips fundamentals.',
    diagram: 'Phishing at scale · Deepfake voice · Auto-recon · Exploit gen',
    sections: [
      { heading: 'What to take away', body: 'Fundamentals beat novelty.' },
      { heading: 'Try this yourself', body: 'Agree on a family code word to verify urgent voice calls.' },
    ],
    takeaways: ['Fundamentals beat novelty.'],
    references: [],
  },
]
