import type { ExperiencePhase } from '../types'
import { placeholder } from '../lib/placeholder'

export const experience: readonly ExperiencePhase[] = [
  {
    id: 'vapt',
    role: 'Web Application Security Testing / VAPT',
    employer: 'HCL Technologies',
    start: 'August 2022',
    end: 'May 2024',
    focus: [
      'Web application security testing', 'Vulnerability assessment', 'Manual penetration testing', 'OWASP Top 10',
      'SQL Injection', 'Cross-Site Scripting', 'Broken Access Control', 'IDOR',
      'Authentication testing', 'Authorization testing', 'Security reporting', 'Remediation recommendations',
    ],
    details: placeholder('Confirmed responsibilities for the VAPT phase'),
  },
  {
    id: 'sast',
    role: 'Application Security / SAST',
    employer: 'HCL Technologies',
    start: 'June 2024',
    end: 'Present',
    focus: [
      'Static Application Security Testing', 'Checkmarx', 'Source-code analysis', 'Security finding validation',
      'C# and .NET application security', 'REST API security', 'JWT security',
      'Authentication and authorization analysis', 'Vulnerability analysis', 'Remediation guidance',
      'Exposure to LLM security and prompt-injection testing',
    ],
    details: placeholder('Confirmed responsibilities for the Application Security / SAST phase'),
  },
]
