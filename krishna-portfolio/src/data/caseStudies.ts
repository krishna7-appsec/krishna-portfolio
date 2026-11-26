import type { CaseStudy } from '../types'
import { placeholder } from '../lib/placeholder'

/**
 * Educational case-study TEMPLATES. They describe method and typical findings for each kind of
 * assessment. They are not records of client engagements and contain no client data or results.
 * Add your own confirmed, non-confidential detail through `yourContribution`.
 */
const contribution = (topic: string) =>
  placeholder(`Describe your own role and outcomes on ${topic}, only what you can share without confidential detail`)

export const caseStudies: readonly CaseStudy[] = [
  {
    id: 'web-vapt',
    slug: 'web-application-security-assessment',
    title: 'Web Application Security Assessment',
    illustrative: true,
    overview:
      'A structured assessment of a web application from an attacker’s point of view, mapped to the OWASP Top 10 and combining manual testing with tool support.',
    objectives: [
      'Identify exploitable weaknesses in authentication, authorization, session handling and input processing.',
      'Confirm each finding with a safe, reproducible proof of concept.',
      'Rate risk by exploitability and business impact.',
      'Give developers fixes they can apply, then retest.',
    ],
    technologyContext:
      'A typical target is a server-rendered or single-page web application with a backend API, a database and an identity layer. Testing is done only with written authorization, against an agreed scope and, where possible, a non-production environment.',
    methodology: [
      'Agree scope, rules of engagement and test accounts.',
      'Map pages, endpoints, parameters, roles and workflows.',
      'Test authentication and session management.',
      'Test authorization across roles and objects.',
      'Test input handling: injection, cross-site scripting, file upload and server-side request forgery.',
      'Review configuration, headers, error handling and TLS.',
      'Validate, rate and report findings.',
      'Retest after remediation.',
    ],
    areasEvaluated: [
      'Authentication and password reset',
      'Session management and cookies',
      'Access control and IDOR',
      'Input validation and output encoding',
      'Business logic',
      'Security headers, TLS and error handling',
    ],
    vulnerabilityCategories: [
      'Broken Access Control (including IDOR)',
      'Injection (SQL and command)',
      'Cross-site scripting',
      'Authentication failures',
      'Security misconfiguration',
      'Server-side request forgery',
    ],
    technicalApproach:
      'Manual testing with an intercepting proxy drives the work. Requests are replayed and modified across roles and users to test authorization, and parameters are probed for injection and reflection. Automated scanners add coverage, but their output counts as a lead, not a finding, until it is verified by hand.',
    riskAnalysis:
      'Each finding is rated on how easily it can be exploited, what an attacker gains (data exposure, account takeover, privilege escalation) and how sensitive the affected data or function is. A scoring system such as CVSS gives a common baseline, adjusted for business context.',
    remediation: [
      'Enforce authorization on the server for every object and function, and deny by default.',
      'Use parameterized queries and context-aware output encoding.',
      'Apply rate limiting, multi-factor authentication and secure session settings.',
      'Harden configuration and remove verbose error messages.',
      'Add a regression test for each fixed finding.',
    ],
    learningOutcomes: [
      'Moving from a scanner result to a verified, explained finding.',
      'Why authorization flaws often survive code review.',
      'Writing remediation advice that developers can act on.',
    ],
    yourContribution: contribution('web application security assessments'),
  },
  {
    id: 'sast',
    slug: 'application-security-and-sast',
    title: 'Application Security and SAST',
    illustrative: true,
    overview:
      'Using static application security testing to find security flaws in source code before release, and validating results so that developers receive findings they can trust.',
    objectives: [
      'Scan source code for security weaknesses early in development.',
      'Separate true positives from false positives for every result.',
      'Prioritise findings by exploitability and data sensitivity.',
      'Give developers clear, code-level fixes.',
    ],
    technologyContext:
      'SAST tools such as Checkmarx analyse source code and trace data flow from inputs (sources) to dangerous operations (sinks). They report paths where untrusted data reaches a sink without proper sanitization. Results depend on language support, scan scope and how well the queries are tuned.',
    methodology: [
      'Onboard the repository and agree the scan scope.',
      'Run the scan on the target branch with the relevant query preset.',
      'Triage results by vulnerability type and severity.',
      'Trace each data-flow path from source to sink in the code.',
      'Mark true and false positives, recording the reason.',
      'Report validated findings with fix guidance.',
      'Rescan after fixes to confirm closure.',
    ],
    areasEvaluated: [
      'Input handling and data flow',
      'Injection sinks (SQL, command, XPath, LDAP)',
      'Cross-site scripting sinks',
      'Hardcoded secrets and weak cryptography',
      'Insecure deserialization and file handling',
      'Logging of sensitive data',
    ],
    vulnerabilityCategories: [
      'SQL injection',
      'Cross-site scripting',
      'Path traversal',
      'Hardcoded credentials',
      'Weak cryptography',
      'Insecure deserialization',
    ],
    technicalApproach:
      'A result is validated by following the reported path through the code: where does the input start, is it validated or encoded on the way, and does it really reach the sink? A sanitizer the tool does not recognise causes a false positive; a missing one is a real flaw. Recording the reason for each decision keeps triage consistent and shows where the tool’s queries need tuning.',
    riskAnalysis:
      'Severity combines the vulnerability class, whether the entry point can be reached by an unauthenticated or low-privilege user, and the sensitivity of the data or action at the sink. A high-severity pattern in unreachable code is less urgent than a medium one on an internet-facing endpoint.',
    remediation: [
      'Use parameterized queries and safe framework APIs instead of building strings.',
      'Encode output for the correct context.',
      'Move secrets to a secrets manager and rotate any that were exposed.',
      'Use current, vetted cryptographic algorithms.',
      'Run the scan in CI so new findings appear at review time.',
    ],
    learningOutcomes: [
      'Reading data flow from source to sink.',
      'Why validation matters as much as scanning.',
      'How triage notes make later scans more accurate.',
    ],
    yourContribution: contribution('SAST and Checkmarx work'),
  },
  {
    id: 'dotnet',
    slug: 'dotnet-application-security-review',
    title: '.NET Application Security Review',
    illustrative: true,
    overview:
      'A security-focused review of the code and configuration of a C# and .NET web application, looking at how it handles input, authentication, authorization, data and secrets.',
    objectives: [
      'Review C# source and configuration for insecure patterns.',
      'Check that authentication and authorization are enforced consistently.',
      'Examine data access, serialization and file handling for injection and tampering risks.',
      'Recommend fixes that fit .NET conventions.',
    ],
    technologyContext:
      'Typical targets are ASP.NET Core or ASP.NET MVC and Web API applications that use Entity Framework or ADO.NET for data access, ASP.NET Identity or an external identity provider, and configuration held in appsettings files and environment variables.',
    methodology: [
      'Understand the project structure, entry points and middleware pipeline.',
      'Review authentication setup and the authorization attributes and policies.',
      'Review data access for raw SQL and unsafe query construction.',
      'Review input binding, validation and output encoding.',
      'Review serialization, file upload and deserialization code.',
      'Review configuration, secrets, logging and error handling.',
      'Document findings with code references and fixes.',
    ],
    areasEvaluated: [
      'Authorization attributes and policies',
      'Model binding and over-posting',
      'Raw SQL and ORM usage',
      'Anti-forgery and CORS configuration',
      'Serialization and deserialization',
      'Secrets and configuration',
      'Error handling and logging',
    ],
    vulnerabilityCategories: [
      'Missing or inconsistent authorization',
      'SQL injection through raw queries',
      'Over-posting (mass assignment)',
      'Cross-site request forgery',
      'Insecure deserialization',
      'Hardcoded secrets in configuration',
      'Verbose error disclosure',
    ],
    technicalApproach:
      'The review follows a request through the middleware pipeline to controllers and data access, checking what is enforced at each step. Controllers and actions are compared for consistent authorization, data access code is searched for string-built queries, and model binding is checked for properties a user should never be able to set.',
    riskAnalysis:
      'Impact depends on what the flaw exposes. A missing authorization check on an action that returns personal data, or a raw query built from user input, rates higher than a verbose error page. Reachability by unauthenticated users raises the rating.',
    remediation: [
      'Apply authorization policies centrally and require authentication by default.',
      'Use parameterized queries or LINQ, and avoid concatenating input into raw SQL.',
      'Bind requests to dedicated input models rather than entity classes.',
      'Keep anti-forgery protection on for state-changing browser requests.',
      'Avoid deserializing untrusted data with unsafe formatters.',
      'Keep secrets out of source control.',
    ],
    learningOutcomes: [
      'How the ASP.NET Core pipeline shapes where security checks live.',
      'Spotting over-posting and raw SQL during review.',
      'Mapping .NET features to OWASP categories.',
    ],
    yourContribution: contribution('.NET security reviews'),
  },
  {
    id: 'rest-api',
    slug: 'rest-api-security-assessment',
    title: 'REST API Security Assessment',
    illustrative: true,
    overview:
      'An assessment of a REST API’s authentication, authorization and data handling, aligned with the OWASP API Security Top 10:2023, with attention to JWT handling and object-level access control.',
    objectives: [
      'Test authentication and token handling.',
      'Test object-level and function-level authorization.',
      'Check that responses expose only the intended data.',
      'Check that rate limits and resource controls exist.',
    ],
    technologyContext:
      'A typical REST API exposes resource endpoints such as /users/{id} over HTTPS, uses bearer tokens such as JWTs, and is described by an OpenAPI document or discovered by analysing traffic.',
    methodology: [
      'Collect the API description or capture traffic to build an endpoint inventory.',
      'Create test identities with different roles.',
      'Test authentication, token lifetime and signature validation.',
      'Replay requests with another user’s object IDs to test object-level authorization.',
      'Call privileged endpoints as a low-privilege user to test function-level authorization.',
      'Check responses for excessive data and writable properties.',
      'Test rate limits and input size limits.',
      'Report findings and retest.',
    ],
    areasEvaluated: [
      'Authentication and token issuance',
      'JWT validation: signature, algorithm, expiry and claims',
      'Object-level authorization (BOLA / IDOR)',
      'Function-level authorization',
      'Property-level exposure and mass assignment',
      'Rate limiting and resource consumption',
      'API inventory and versions',
    ],
    vulnerabilityCategories: [
      'Broken Object Level Authorization',
      'Broken Authentication',
      'Broken Object Property Level Authorization',
      'Broken Function Level Authorization',
      'Unrestricted Resource Consumption',
      'Improper Inventory Management',
    ],
    technicalApproach:
      'Requests are replayed in an intercepting proxy under different identities. For object-level authorization, the ID of an object owned by one test user is requested by another. For JWTs, the token is checked for signature enforcement, accepted algorithms, expiry and whether the server trusts claims it should verify. Responses are compared with what the client actually needs, to detect excessive data.',
    riskAnalysis:
      'An object-level authorization flaw on an endpoint that returns personal or financial data is usually severe because it can be automated across many records. Rating considers the data returned, whether authentication is needed and how easily IDs can be enumerated.',
    remediation: [
      'Check object ownership on the server for every request.',
      'Validate JWT signature, algorithm, issuer, audience and expiry, and keep lifetimes short.',
      'Return only required fields and allow-list writable properties.',
      'Enforce role checks on every function.',
      'Apply rate limits and request size limits.',
      'Maintain an API inventory and retire old versions.',
    ],
    learningOutcomes: [
      'Why authentication alone does not protect an object.',
      'How to review JWT handling beyond “is the token present”.',
      'Using the API Top 10 as a test checklist.',
    ],
    yourContribution: contribution('REST API security assessments'),
  },
  {
    id: 'llm',
    slug: 'llm-security-and-prompt-injection-research',
    title: 'LLM Security and Prompt Injection Research',
    illustrative: true,
    overview:
      'Research into how applications built on large language models can be attacked, centred on prompt injection, where untrusted text changes the model’s behaviour, and on the design controls that limit the damage.',
    objectives: [
      'Understand direct and indirect prompt injection.',
      'Identify what an LLM feature can access and do.',
      'Test whether guardrails and output handling hold up.',
      'Recommend design controls such as least privilege and output validation.',
    ],
    technologyContext:
      'LLM-based features include chat assistants, retrieval-augmented generation over documents, and agents that call tools or APIs. Instructions and data share one text channel, so the model cannot reliably tell them apart.',
    methodology: [
      'Map the feature: inputs, system prompt, retrieved content, tools and outputs.',
      'List what the model can read, write and trigger.',
      'Test direct injection through the user input.',
      'Test indirect injection through documents, web pages or other retrieved content.',
      'Check whether downstream code trusts the output (rendering, execution, tool calls).',
      'Check whether sensitive data in the context can be revealed.',
      'Recommend controls and retest.',
    ],
    areasEvaluated: [
      'System prompt and instruction handling',
      'Direct prompt injection',
      'Indirect prompt injection through retrieved content',
      'Sensitive information disclosure',
      'Excessive agency (tool and API permissions)',
      'Insecure output handling',
    ],
    vulnerabilityCategories: [
      'Prompt injection',
      'Sensitive information disclosure',
      'Insecure output handling',
      'Excessive agency',
      'Data and model poisoning',
    ],
    technicalApproach:
      'Testing treats the model as an untrusted component. Crafted inputs try to override instructions, extract context and trigger actions, and the application’s handling of the model’s output is examined, because an injected instruction is harmless if its output cannot cause anything to happen. Tests run only against systems the tester is authorised to test, ideally purpose-built training applications.',
    riskAnalysis:
      'Risk depends less on the injection itself than on what the model can reach. A chat bot with no data or tools exposes little, while an agent with access to email, files or payment APIs can turn one injected instruction into data theft or unauthorised actions.',
    remediation: [
      'Give the model the least privilege it needs and require human approval for sensitive actions.',
      'Treat model output as untrusted: validate, encode and constrain it before use.',
      'Separate untrusted content from instructions where possible and label its source.',
      'Keep secrets and sensitive data out of the prompt context.',
      'Log and monitor interactions, and retest as models and prompts change.',
    ],
    learningOutcomes: [
      'Why prompt injection is hard to prevent outright and must be contained by design.',
      'Evaluating an LLM feature by what it can access and do.',
      'Mapping LLM risks onto a normal security review.',
    ],
    yourContribution: contribution('LLM security and prompt-injection testing'),
  },
]
