import type { OwaspWebItem } from '../../types'

// Migrated from the original static site (index.html). OWASP Top 10:2025, checked against owasp.org on 24 November 2026.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export const OWASP_WEB_EDITION = 'OWASP Top 10:2025'
export const OWASP_WEB_URL = 'https://owasp.org/Top10/2025/'

export const owaspWeb: readonly OwaspWebItem[] = [
  {
    "id": "A01",
    "name": "Broken Access Control",
    "overview": "Users act outside their permissions: reading other people’s records, calling admin functions, or tampering with IDs. In 2025, SSRF is grouped under this category.",
    "attackScenario": "Change /api/user/1001 to 1002 and read another account.",
    "rootCause": "Authorization checked only in the UI, or not at all; trusting client-supplied IDs.",
    "testing": "Replay requests as a low-privilege user and with other users’ IDs; try forced browsing to admin paths.",
    "remediation": "Deny by default; enforce checks on the server for every object and function; log denials.",
    "tools": "Burp Suite (Autorize), ZAP",
    "exercise": "Find an IDOR in OWASP Juice Shop.",
    "code": "if (record.ownerId !== req.user.id) return res.sendStatus(403);"
  },
  {
    "id": "A02",
    "name": "Security Misconfiguration",
    "overview": "Insecure defaults, unneeded features, verbose errors, open cloud storage, and missing hardening.",
    "attackScenario": "A default admin console is reachable from the internet.",
    "rootCause": "No repeatable hardening; settings differ between environments.",
    "testing": "Review headers, error pages, exposed panels, and cloud settings; run configuration scanners.",
    "remediation": "Automate hardening, remove unused features, apply least privilege.",
    "tools": "Nikto, ZAP, ScoutSuite, Lynis",
    "exercise": "Scan a local DVWA instance for missing security headers."
  },
  {
    "id": "A03",
    "name": "Software Supply Chain Failures",
    "overview": "Risks in dependencies, build systems, and distribution: compromised packages, poisoned pipelines, unpinned versions.",
    "attackScenario": "A malicious update to a popular library runs inside your build.",
    "rootCause": "Unvetted dependencies, no SBOM, weak CI/CD controls.",
    "testing": "Inventory dependencies, check for known CVEs, review CI permissions and lockfile use.",
    "remediation": "Pin and verify versions, keep an SBOM, scope CI secrets, review updates.",
    "tools": "OWASP Dependency-Check, Trivy, Syft",
    "exercise": "Generate an SBOM for a sample project and list vulnerable packages."
  },
  {
    "id": "A04",
    "name": "Cryptographic Failures",
    "overview": "Missing or weak protection of data in transit and at rest: no TLS, outdated algorithms, poor key handling.",
    "attackScenario": "Passwords stored as fast unsalted hashes are cracked after a leak.",
    "rootCause": "Home-made crypto, old algorithms, hardcoded keys.",
    "testing": "Check TLS configuration, stored hash types, key storage, and sensitive data in responses.",
    "remediation": "TLS everywhere, vetted libraries, Argon2id or bcrypt for passwords, keys in a vault.",
    "tools": "testssl.sh, SSL Labs, Burp",
    "exercise": "Run testssl.sh against a local test server."
  },
  {
    "id": "A05",
    "name": "Injection",
    "overview": "Untrusted input is interpreted as code or commands: SQL, OS command, LDAP, templates, and cross-site scripting.",
    "attackScenario": "A quote in a login field changes the SQL query logic.",
    "rootCause": "Building queries by string concatenation; missing output encoding.",
    "testing": "Send metacharacters in every input and watch for errors, changed behavior, or reflected content.",
    "remediation": "Parameterized queries, allow-list validation, output encoding, least-privilege database accounts.",
    "tools": "SQLMap, Burp, ZAP",
    "exercise": "Exploit, then fix, the SQL injection lab in DVWA.",
    "code": "db.query(\"SELECT * FROM users WHERE name = ?\", [name]);"
  },
  {
    "id": "A06",
    "name": "Insecure Design",
    "overview": "Flaws in the design itself, not the code: no threat modeling, missing controls, abusable business logic.",
    "attackScenario": "A coupon flow lets the same code be applied unlimited times.",
    "rootCause": "No threat model or abuse cases during design.",
    "testing": "Review designs and flows for abuse cases; test business-logic limits.",
    "remediation": "Threat model early, write abuse cases, use secure design patterns and limits.",
    "tools": "OWASP Threat Dragon, STRIDE",
    "exercise": "Threat-model a login and password-reset flow with STRIDE."
  },
  {
    "id": "A07",
    "name": "Authentication Failures",
    "overview": "Weak identity checks: credential stuffing, weak passwords, broken session handling, missing MFA.",
    "attackScenario": "Automated logins with leaked passwords succeed because nothing limits attempts.",
    "rootCause": "No rate limiting or MFA; predictable or long-lived session tokens.",
    "testing": "Test lockout and rate limits, password policy, session expiry, and reset flows.",
    "remediation": "MFA, rate limiting, strong password checks, random session IDs rotated at login.",
    "tools": "Burp Intruder (authorized use only)",
    "exercise": "Review a Juice Shop login for missing rate limits."
  },
  {
    "id": "A08",
    "name": "Software or Data Integrity Failures",
    "overview": "Code or data trusted without verifying integrity: unsigned updates, insecure deserialization, untrusted CI artifacts.",
    "attackScenario": "An app deserializes attacker-supplied data and runs unintended code.",
    "rootCause": "No signatures or checksums; trusting serialized objects from clients.",
    "testing": "Look for unsigned updates, deserialization of user data, and unverified plugin sources.",
    "remediation": "Sign and verify artifacts, avoid deserializing untrusted data, protect the pipeline.",
    "tools": "Burp extensions, Sigstore",
    "exercise": "Read the OWASP Deserialization Cheat Sheet and spot unsafe patterns in sample code."
  },
  {
    "id": "A09",
    "name": "Security Logging & Alerting Failures",
    "overview": "Security events are not recorded or alerted on, so attacks go unnoticed.",
    "attackScenario": "Repeated failed logins and bulk data exports trigger no alert.",
    "rootCause": "No logging of auth and access events; unmonitored logs; secrets written to logs.",
    "testing": "Trigger failed logins and denied access, then check they are logged and alerted.",
    "remediation": "Log security events with context, protect log integrity, alert on anomalies, never log secrets.",
    "tools": "ELK, Wazuh, Splunk",
    "exercise": "Add structured login-failure logging to a sample app."
  },
  {
    "id": "A10",
    "name": "Mishandling of Exceptional Conditions",
    "overview": "Poor handling of errors and abnormal states: failing open, leaking stack traces, unhandled exceptions.",
    "attackScenario": "A crafted request throws an error that skips an authorization check.",
    "rootCause": "Missing or inconsistent error handling; fail-open logic.",
    "testing": "Send malformed, missing, and oversized inputs and watch behavior and messages.",
    "remediation": "Fail closed, handle errors centrally, return generic messages, test failure paths.",
    "tools": "ffuf, Burp Intruder, unit tests",
    "exercise": "Fuzz a sample endpoint with malformed JSON and review the responses."
  }
]
