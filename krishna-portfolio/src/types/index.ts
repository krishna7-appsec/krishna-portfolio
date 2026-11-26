/** Shared domain types. Content lives in src/data and must satisfy these. */

export interface SocialLink {
  id: 'email' | 'linkedin' | 'github'
  label: string
  href: string
  handle: string
}

export interface PersonalInfo {
  brand: string
  displayName: string
  title: string
  specialties: readonly string[]
  headline: readonly [string, string]
  summary: string
  employer: string
  employmentStart: string
}

export interface NavItem {
  label: string
  to: string
  /** 'anchor' = section on the home page, 'route' = separate page. */
  kind: 'route' | 'anchor'
}

export interface ExperiencePhase {
  id: string
  role: string
  employer: string
  start: string
  end: string
  /** Areas the owner confirmed. Not a claim of specific achievements. */
  focus: readonly string[]
  /** Confirmed responsibilities; stays a placeholder until the owner supplies them. */
  details: string
}

export interface SkillCategory {
  id: string
  title: string
  /** Deliberately no proficiency level or percentage. */
  items: readonly string[]
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  /** true = educational template, never a completed client engagement. */
  illustrative: boolean
  overview: string
  objectives: readonly string[]
  technologyContext: string
  methodology: readonly string[]
  areasEvaluated: readonly string[]
  vulnerabilityCategories: readonly string[]
  technicalApproach: string
  riskAnalysis: string
  remediation: readonly string[]
  learningOutcomes: readonly string[]
  /** Owner-supplied, non-confidential detail. Stays a placeholder until confirmed. */
  yourContribution: string
}

export interface BlogReference { title: string; url: string }
export interface BlogSection { heading: string; body: string; code?: string; steps?: readonly string[] }
export interface BlogPost {
  slug: string
  title: string
  category: string
  tags: readonly string[]
  /** ISO date. Omitted until a real publication date is confirmed. */
  publishedAt?: string
  author?: string
  intro: string
  diagram?: string
  sections: readonly BlogSection[]
  takeaways: readonly string[]
  references: readonly BlogReference[]
}

export interface QuizQuestion { question: string; options: readonly string[]; answerIndex: number }
export interface NetworkTopic {
  id: string
  title: string
  explanation: string
  example: string
  diagram: string
  command: string
  takeaway: string
  quiz: QuizQuestion
}
export interface OsiLayer { number: number; name: string; unit: string; protocols: string; devices: string; attacks: string }
export interface OwaspWebItem {
  id: string; name: string; overview: string; attackScenario: string; rootCause: string
  testing: string; remediation: string; tools: string; exercise: string; code?: string
}
export interface OwaspApiItem { id: string; name: string; overview: string; prevention: string }

export interface AboutPillar { title: string; text: string }
export interface MethodologyStep { id: string; title: string; description: string }
export interface ToolGroup { group: string; items: readonly string[] }
export interface EducationInfo { degree: string; institution: string; year: string }
export interface PacketNode { id: string; icon: string; name: string; description: string }
