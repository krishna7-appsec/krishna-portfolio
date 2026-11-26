# Put the site on GitHub and Vercel

You do not need to install anything or run `npm install` on your own computer.
Vercel downloads the packages and builds the site for you every time you push to GitHub.

## What you need
- A free GitHub account (github.com)
- A free Vercel account (vercel.com): sign up with "Continue with GitHub"
- The unzipped `krishna-portfolio` folder. Its contents (package.json, src, public and so on) become the root of your repository.

## Part A: Put the project on GitHub
The project has about 130 files. GitHub's web upload page accepts only 100 files at a time, so use one of these instead.

**Option 1: GitHub Desktop (no commands)**
1. Install GitHub Desktop (desktop.github.com) and sign in.
2. File, then New repository. Name it `krishna-portfolio`. For "Local path", choose the folder that CONTAINS the unzipped `krishna-portfolio` folder, so the repository is created inside it. If the folder already exists, choose File, then Add local repository, and pick the unzipped folder; accept "create a repository" when asked.
3. Click "Commit to main", then "Publish repository". Untick "Keep this code private" only if you want it public.

**Option 2: Git commands** (open a terminal inside the unzipped folder)

    git init
    git add .
    git commit -m "Initial portfolio"
    git branch -M main
    git remote add origin https://github.com/YOUR-USERNAME/krishna-portfolio.git
    git push -u origin main

(Create the empty repository `krishna-portfolio` on github.com first, without a README.)

## Part B: Deploy on Vercel
1. On vercel.com choose Add New, then Project, then Import your `krishna-portfolio` repository.
2. Vercel detects Vite. Leave the defaults:

   | Setting | Value |
   |---|---|
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Install command | `npm install` |
   | Environment variables | none needed |

3. Click Deploy. The first build takes one to three minutes. You get a link like `https://krishna-portfolio-xxxx.vercel.app`.

## Part C: If the build fails
The first build is the first time the real tools see this code, so a failure is possible and normal.
1. Open the failed deployment, then Build Logs.
2. Copy the red error lines (about 20 lines around the first "error").
3. Send them to Claude. Fix, push again, and Vercel rebuilds automatically.

## Part D: After the first successful deploy
1. Set your address in the search-engine files. In a terminal in the project folder, run: `npm run set-domain -- krishna-portfolio-xxxx.vercel.app` (use your real address). Commit and push.
2. For your own domain: in Vercel open the project, Settings, Domains, and follow the prompts. Run `set-domain` again with the new domain.
3. Open the site on a phone and a laptop and click through every page.

## Part E: Fill in your own content
The site shows clearly marked "Add: ..." chips wherever information is missing. Edit these files, push, and Vercel redeploys:

| What | File |
|---|---|
| Personal paragraph in About | `src/data/about.ts` (`personalNote`) |
| Responsibilities at each HCL phase | `src/data/experience.ts` (`details`) |
| Other tools you have used | `src/data/tools.ts` |
| Certifications | `src/data/education.ts` |
| "My contribution" on each case study | `src/data/caseStudies.ts` (`yourContribution`) |
| Blog author and dates | `src/data/blog.ts` (`author`, `publishedAt`) |
| Resume | put `resume.pdf` in `public/`, then set `available: true` in `src/data/site.ts` |
| Contact form service | see below |

**Contact form:** until you set one up, the form opens the visitor's email app. To use a form service (for example Formspree), create a form there, add its https address in Vercel as the environment variable `VITE_CONTACT_ENDPOINT`, and add that address's origin to `connect-src` in `vercel.json`.

## Part F: Optional, test on your own computer
Needs Node 20 or newer from nodejs.org.

    npm install
    npm run dev          # opens http://localhost:5173
    npm test
    npm run typecheck
    npm run build:strict # type check plus build

`npm run build` (used by Vercel) builds without the type check, so a small type warning cannot block a deploy. Use `build:strict` to see them.

## Keeping your old site
Your original single-file site is untouched. Keep it somewhere safe; it is not part of this repository.
