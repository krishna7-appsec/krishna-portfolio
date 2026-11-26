import type { OwaspApiItem } from '../../types'

// Migrated from the original static site (index.html). OWASP API Security Top 10:2023, checked against owasp.org on 24 November 2026.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export const OWASP_API_EDITION = 'OWASP API Security Top 10:2023'
export const OWASP_API_URL = 'https://owasp.org/www-project-api-security/'

export const owaspApi: readonly OwaspApiItem[] = [
  {
    "id": "API1",
    "name": "Broken Object Level Authorization",
    "overview": "The API accepts an object ID but does not verify the caller may access that object.",
    "prevention": "Check ownership on every request; unpredictable IDs are only defence in depth."
  },
  {
    "id": "API2",
    "name": "Broken Authentication",
    "overview": "Weak or flawed authentication and token handling.",
    "prevention": "Strong auth flows, token expiry, rate limits on login and reset."
  },
  {
    "id": "API3",
    "name": "Broken Object Property Level Authorization",
    "overview": "The API exposes or accepts properties the user should not see or change (excessive data exposure, mass assignment).",
    "prevention": "Return only needed fields; allow-list writable properties."
  },
  {
    "id": "API4",
    "name": "Unrestricted Resource Consumption",
    "overview": "No limits on requests, payload size, or costly operations.",
    "prevention": "Rate limits, quotas, pagination caps, timeouts."
  },
  {
    "id": "API5",
    "name": "Broken Function Level Authorization",
    "overview": "Regular users can call admin or privileged functions.",
    "prevention": "Role checks on every function; deny by default."
  },
  {
    "id": "API6",
    "name": "Unrestricted Access to Sensitive Business Flows",
    "overview": "Automation abuses legitimate flows such as purchases or signups.",
    "prevention": "Rate limit and detect bots on sensitive flows."
  },
  {
    "id": "API7",
    "name": "Server Side Request Forgery",
    "overview": "The API fetches a user-supplied URL, letting attackers reach internal services.",
    "prevention": "Allow-list destinations; block internal address ranges."
  },
  {
    "id": "API8",
    "name": "Security Misconfiguration",
    "overview": "Insecure defaults, missing hardening, permissive CORS, verbose errors.",
    "prevention": "Hardened, repeatable configuration and regular review."
  },
  {
    "id": "API9",
    "name": "Improper Inventory Management",
    "overview": "Old, forgotten, or undocumented API versions and hosts stay exposed.",
    "prevention": "Keep an API inventory; retire old versions."
  },
  {
    "id": "API10",
    "name": "Unsafe Consumption of APIs",
    "overview": "Third-party API data is trusted without validation.",
    "prevention": "Validate third-party responses; use TLS and timeouts."
  }
]
