import type { AboutPillar } from '../types'
import { placeholder } from '../lib/placeholder'

export const about = {
  heading: 'Beyond Finding Vulnerabilities.',
  paragraphs: [
    'I am an Application Security Analyst at HCL Technologies. I started in August 2022 in web application security testing and VAPT, and since June 2024 I have worked in application security with a focus on static application security testing (SAST).',
    'My work covers web applications, REST APIs and application source code, including C# and .NET. I also have exposure to LLM security, including prompt-injection testing.',
  ],
  personalNote: placeholder('A short personal paragraph in your own words'),
} as const

export const pillars: readonly AboutPillar[] = [
  { title: 'Application Security', text: 'Finding and reducing security weaknesses across the application lifecycle.' },
  { title: 'VAPT', text: 'Testing running applications for exploitable weaknesses and reporting them with remediation guidance.' },
  { title: 'SAST', text: 'Analysing source code with tools such as Checkmarx and validating what they report.' },
  { title: 'REST API Security', text: 'Assessing authentication, authorization and token handling, including JWT.' },
  { title: 'Secure Code Analysis', text: 'Reading code to find security flaws that testing alone can miss.' },
  { title: '.NET Application Security', text: 'Security review of C# and .NET applications.' },
  { title: 'LLM Security Exposure', text: 'Prompt-injection testing and the security concerns of LLM-based features.' },
]
