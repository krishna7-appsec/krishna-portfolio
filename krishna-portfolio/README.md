# Krishna: Application Security Portfolio

Vite + React + TypeScript + Tailwind CSS + React Router. Deploys to Vercel.
The original static site is untouched at `../original-static-backup/index.html`.

## Commands
    npm install
    npm run dev        # http://localhost:5173
    npm run typecheck
    npm test           # Vitest
    npm run build      # production build to dist/ (what Vercel runs)
    npm run build:strict  # typecheck, then build
    npm run preview

Requires Node 20 or newer. Commit the generated `package-lock.json`. Step-by-step GitHub and Vercel instructions for non-technical use are in `docs/DEPLOYMENT.md`.

## Status
Phases 1 (foundation), 2 (portfolio sections) and 3 (five case-study templates at `/projects/:slug`) are written. Phase 4 is complete in code: 4a (Learn), 4b (Labs) and 4c (Blog with eight migrated posts). Phase 5 (GSAP animations and the lazy 3D hero) is written. Phases 6 (testing on a real toolchain) and 7 (deployment docs) are pending.
The contact form posts to `VITE_CONTACT_ENDPOINT` (https only) when set; otherwise it opens the visitor's email app. If you set an endpoint, add its origin to `connect-src` in `vercel.json`.

## Dependencies (Phase 1)
Runtime: react ^19.0.0, react-dom ^19.0.0, react-router-dom ^7.1.1, lucide-react ^0.468.0.
Dev: vite ^6.0.5, @vitejs/plugin-react ^4.3.4, typescript ~5.6.3, tailwindcss ^3.4.17, postcss, autoprefixer, vitest ^2.1.8, @types/react(-dom) ^19.
Phase 5 adds gsap ^3.12.5 (ScrollTrigger is included), three ^0.170.0, @react-three/fiber ^9.0.0 and @types/three ^0.170.0. Drei is not used: nothing in the scene needs it.
Ranges were chosen without running an install; if `npm install` reports a conflict, send me the output.

## Structure
    src/components/{layout,ui}  reusable UI      src/data   typed professional content
    src/routes                  one file per route src/types  shared interfaces
    src/hooks, src/lib          helpers and tests  src/styles design tokens
    public/                     robots, sitemap, favicon     vercel.json  rewrites + security headers

## Animation and 3D (Phase 5)
- `src/animations/`: `useHeroIntro` (entrance timeline) and `useScrollReveal` (fade-up on scroll, timeline line scrub). Elements opt in with `data-hero`, `data-reveal` and `data-timeline-line`. Both use `gsap.matchMedia()` so nothing runs, and nothing is hidden, under reduced motion; cleanup is automatic.
- `src/three/`: the lazy-loaded hero scene. Pure geometry helpers are in `geometry.ts` (tested). The 3D chunk loads only when `shouldRender3D()` in `src/lib/capabilities.ts` says yes: no reduced motion, tablet or desktop width, WebGL available, data saver off. Otherwise `StaticShield` (an SVG) is shown, including while the chunk loads or if WebGL throws (`ErrorBoundary`). Rendering pauses when the hero is off screen.
- No `vercel.json` change was made: the scene uses no workers, textures or external requests. If a CSP violation appears in the console after deploying, report it.

## Adding a blog post
Append an object to `posts` in `src/data/blog.ts` (the field list is in the comment at the top). The listing, filters, search, article page, related posts and reading time pick it up automatically. Add the new URL to `public/sitemap.xml`.

## Editable placeholders
Unconfirmed facts are stored as `[[EDIT: ...]]` in `src/data` and render as a marked chip.
`collectPlaceholders()` in `src/lib/placeholder.ts` lists every one that is still open.

## Before launch
Replace `YOUR-DOMAIN` in `public/robots.txt` and `public/sitemap.xml`; add `og:image`/`og:url`; add `public/resume.pdf`
and set `resume.available` to true in `src/data/site.ts`; configure the contact-form service.
