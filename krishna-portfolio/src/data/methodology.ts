import type { MethodologyStep } from '../types'

export const methodology: readonly MethodologyStep[] = [
  { id: 'understand', title: 'Understand the Application', description: 'Review what the application does, who uses it, what data it handles and how it is built.' },
  { id: 'surface', title: 'Identify Attack Surface', description: 'Map entry points: pages, APIs, parameters, authentication flows and integrations.' },
  { id: 'test', title: 'Perform Security Testing', description: 'Test those entry points manually and with tools against weakness classes such as the OWASP Top 10.' },
  { id: 'analyze', title: 'Analyze Vulnerabilities', description: 'Work out the cause, the conditions needed to exploit it and what an attacker could reach.' },
  { id: 'validate', title: 'Validate Findings', description: 'Confirm each finding is real and reproducible, and filter out false positives.' },
  { id: 'risk', title: 'Assess Business Risk', description: 'Rate severity by likelihood and by impact on the data and processes involved.' },
  { id: 'remediate', title: 'Recommend Remediation', description: 'Give specific, practical fixes that developers can apply.' },
  { id: 'verify', title: 'Verify Security Improvements', description: 'Retest after fixes to confirm the weakness is closed and nothing regressed.' },
]
