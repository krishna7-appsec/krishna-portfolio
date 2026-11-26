import type { SkillCategory } from '../types'

export const skills: readonly SkillCategory[] = [
  { id: 'appsec', title: 'Application Security', items: ['VAPT', 'OWASP Top 10', 'Vulnerability Assessment', 'Application Security', 'Secure Code Review'] },
  { id: 'web', title: 'Web Security', items: ['SQL Injection', 'XSS', 'IDOR / BOLA', 'SSRF', 'Authentication', 'Authorization', 'Broken Access Control'] },
  { id: 'sast', title: 'SAST', items: ['Checkmarx', 'Static Application Security Testing', 'Source Code Analysis', 'Security Finding Validation'] },
  { id: 'api', title: 'API Security', items: ['REST API Security', 'JWT Security', 'API Authentication', 'API Authorization'] },
  { id: 'dev', title: 'Development', items: ['C#', '.NET', 'JavaScript', 'HTML', 'CSS'] },
  { id: 'emerging', title: 'Emerging Security', items: ['LLM Security', 'Prompt Injection Testing'] },
]
