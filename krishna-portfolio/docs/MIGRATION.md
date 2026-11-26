# Migration report

The original static site is untouched at `../original-static-backup/index.html`.

| Existing feature | New destination | Status |
|---|---|---|
| Networking course (15 topics, with diagrams, commands, takeaways, quizzes) | `/learn/networking` | Migrated (Phase 4a) |
| OWASP Top 10:2025 (10 entries) | `/learn/owasp#web` | Migrated, checked against owasp.org |
| OWASP API Security Top 10:2023 (10 entries) | `/learn/owasp#api` | Migrated, checked against owasp.org |
| Six gallery SVG illustrations | `/learn#illustrations` | Migrated as standalone SVG files |
| Learn search | `/learn` | New (not in the original) |
| OSI explorer | `/labs#osi` | Migrated (Phase 4b) |
| Packet-flow SVG animation | `/labs#packet-flow` | Migrated (Phase 4b) |
| CIDR calculator | `/labs#cidr` | Migrated; logic extracted to `lib/cidr.ts` with 13 tests |
| Four attack simulations (IDOR, password, SQL injection, prompt injection) | `/labs#simulations` | Migrated; logic in `lib/simulations.ts` with 13 tests |
| Privacy rules, developer tips, DPDP note, five-question quiz | `/labs#privacy` | Migrated (Phase 4b) |
| Eight blog posts and diagrams | `/blog`, `/blog/:slug` | Migrated (Phase 4c); five reworded, see below |
| Blog listing, search, categories, load-more, article pages, related posts, reading time | `/blog` | Rebuilt as typed, tested code |

## Deviations from the original content
- **A09 renamed** from "Logging & Alerting Failures" to the official "Security Logging & Alerting Failures" (owasp.org Top 10:2025 introduction).
- Content was extracted programmatically from the original file and compared field by field: no other text differs.
- Illustrations gained a dark background rectangle (the original relied on the page background) and their parallax shift was dropped.
- The original's drag-and-arrow gallery carousel was replaced by a plain responsive grid.
- The original "Practise: OWASP crAPI or VAmPI" line is kept. crAPI is listed on the OWASP API Security project page; VAmPI was not verified on owasp.org.

## Labs deviations from the original
- **CIDR calculator:** rewritten as a pure function and cross-checked against an independent BigInt implementation for every prefix. Changes: a `/31` now reports 2 usable addresses (RFC 3021) and a `/32` reports 1 (the original printed "n/a"); octets with leading zeros are rejected because some tools read them as octal; wildcard mask and first/last host were added.
- **SQL injection demo:** with the parameterized-query option on, a normal username now shows "Login failed" instead of "Blocked", and the query shown uses placeholders. Detection patterns are identical to the original.
- **Prompt-injection demo:** the fake secret changed from `VULNEX-7731` to `DEMO-7731` because the VULNEX brand is no longer used. Detection pattern identical.
- **Password demo and IDOR demo:** scoring thresholds and responses are unchanged. Status emoji were replaced by text labels and colour, so meaning never depends on colour alone.
- **Privacy quiz:** it no longer auto-advances after 900 ms. A "Next question" button replaces the timer, which is easier to use with assistive technology. Questions, answers and scoring text are unchanged.
- **Packet flow:** emoji device icons kept as in the original. Animation pauses when the visitor prefers reduced motion.
- The original gallery carousel, "Request this" service cards and Matrix-style effects were not migrated, per the approved scope.

## Blog deviations from the original
Posts 1 and 3 are word for word identical, and all eight diagrams are preserved exactly. Five posts were reworded into neutral educational content with the same technical meaning:

| # | Original | Change |
|---|---|---|
| 2 | "My IDOR story: CVSS 9.1" | Retitled "IDOR: when changing one ID exposes another user's data". The personal story, the CVSS score and "financial data" specifics were removed (the BFSI story is excluded). A short code snippet (from the OWASP A01 entry) and two OWASP references were added. |
| 4 | "Why I learned to love SAST false positives" | Retitled "Why SAST false positives are worth triaging". First-person wording and the "80% false-positive reduction" claim were removed. |
| 5 | Prompt injection post | Only "Try the prompt injection demo below" became "in the Labs". |
| 6 | "AI attacking AI: a 2026 prediction" | Retitled "AI attacking AI: emerging risks". "Expect..." and "overnight" were softened. |
| 7 | Privacy post | "My framework" became "A simple framework"; "a form you built" became "a form you work on". |
| 8 | "Threat landscape 2026: AI-powered attacks" | Retitled "AI-powered attacks: what changes and what does not". Body unchanged. |

Other changes:
- **Slugs** changed for retitled posts (2, 4, 6, 8). Old links did not exist on a deployed site, so no redirects are needed.
- **No author and no publication date** are set. The original author name and date were placeholders added by the previous build, not facts. Add `author` and `publishedAt` to a post when confirmed.
- **Categories:** "Application Security" was added for the SAST post. Existing categories keep their names.
- **References:** only the two OWASP pages verified on owasp.org were added, on posts 2 and 3. No other references were invented.
- Covers are generated SVGs in the new palette; the tilt effect and red glow were dropped.

## Fixes found while migrating
- `ScrollManager` could throw on a malformed URL hash (for example `#%E0%A4%A`). It now decodes safely.
- `ScrollManager` now retries briefly so deep links into lazy-loaded routes (for example `/learn/owasp#web-a05`) scroll correctly.
