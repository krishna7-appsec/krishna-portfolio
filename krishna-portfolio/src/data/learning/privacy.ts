import type { QuizQuestion } from '../../types'

// Migrated from the original static site (index.html). Privacy rules, developer tips, DPDP note and the five-question quiz.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export const privacyQuote = "Your data is your identity. Guard it like your name."
export const safeAiRules: readonly string[] = [
  "Never paste passwords, keys, or Aadhaar/PAN into an AI chat.",
  "Assume prompts may be stored.",
  "Strip names and numbers before sharing documents.",
  "Verify AI facts before acting on them.",
  "Don’t trust links or code it gives you blindly.",
  "Turn off history for sensitive topics.",
  "Use separate accounts for work and personal use.",
  "Check what each plugin or agent can access.",
  "Deepfakes exist: verify voices and videos.",
  "When unsure, leave it out."
]
export const developerTips: readonly string[] = [
  "Collect less. Every field is a liability.",
  "Encrypt in transit and at rest.",
  "Give users control and a delete button.",
  "Never log secrets or personal data."
]
export const dpdp = { title: "India: DPDP Act, 2023", text: "India’s data protection law centres on consent, purpose limits, and the rights of the person the data belongs to. If you build products for Indian users, read it." } as const
export const privacyQuiz: readonly QuizQuestion[] = [
  {
    "question": "Which is safest to paste into a public AI chatbot?",
    "options": [
      "Your Aadhaar number",
      "A client contract",
      "A generic coding question"
    ],
    "answerIndex": 2
  },
  {
    "question": "Under “collect less”, a signup form should ask for…",
    "options": [
      "Everything, just in case",
      "Only what the service needs",
      "Date of birth always"
    ],
    "answerIndex": 1
  },
  {
    "question": "Best response to an urgent voice call asking for money?",
    "options": [
      "Send it fast",
      "Verify through a second channel",
      "Ask them to send an OTP"
    ],
    "answerIndex": 1
  },
  {
    "question": "Prompt injection is most like…",
    "options": [
      "SQL injection",
      "A DDoS",
      "Ransomware"
    ],
    "answerIndex": 0
  },
  {
    "question": "Data you no longer need should be…",
    "options": [
      "Kept forever",
      "Deleted",
      "Moved to email"
    ],
    "answerIndex": 1
  }
]
