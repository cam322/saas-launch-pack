# web-frontend

React + TypeScript Vite frontend for the SaaS Launch Pack.

Quick start

1. Install dependencies

   cd web-frontend
   npm install

2. Run the frontend dev server

   npm run dev

3. Run the lightweight backend server (logs signups to SQLite)

   npm run start-server

By default the frontend dev server runs on http://localhost:5173 and the server on http://localhost:4000.

API

POST /api/signup
  { name, email }
  -> 200 { id }

Database & migrations

A simple SQLite schema is provided at server/schema.sql:

CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

Migration instructions:
- On the first run the server will apply schema.sql automatically to server/data/signups.db.
- To re-run migrations manually: sqlite3 server/data/signups.db < server/schema.sql

Testing

Run unit tests (Vitest):

  npm run test

Deployment plan

Option A: Vercel (recommended, free tier)
- Create a Vercel account and connect the GitHub repo.
- Root: `/web-frontend`
- Build command: `npm run build`
- Output directory: `dist`
- If you need the /api/signup endpoint in production, deploy the server separately (Render or Railway free tiers) or convert the endpoint to a serverless function.

Option B: GitHub Pages (static only)
- Build the site (`npm run build`) and publish contents of `dist/` to the `gh-pages` branch (use a GitHub Action or the `gh-pages` npm package).
- Note: GitHub Pages is static-only; the /api/signup endpoint won't run there.

CI suggestions (GitHub Actions)

- On push to main:
  - checkout
  - run `npm ci`
  - run `npm run test`
  - run `npm run build`
  - optionally deploy `dist/` to GitHub Pages or Vercel

Files of interest

- src/components/Landing.tsx (landing UI + form)
- public/lead_magnet.pdf (lead magnet)
- server/server.cjs (light backend logging to SQLite)
- server/schema.sql (DB schema)

Visual style guide (short)

- Brand palette (tailwind theme: brand)
  - brand-700: #7c3aed (primary purple)
  - brand-cyan: #06b6d4 (accent cyan)
  - brand-500: #06b6d4
  - neutral background and white card surfaces with subtle shadows

- Fonts
  - Inter (loaded via Google Fonts) with system fallbacks

- Spacing & layout
  - Mobile-first, single-column stacking with md: two-column grid
  - Large, accessible CTAs with high-contrast text on gradient backgrounds

Changelog

- 2026-05-26: Modernized landing page and visual theme
  - Updated Tailwind config with a new 'brand' color palette
  - Redesigned src/components/Landing.tsx to a mobile-first, accessible layout
  - Added Google Font (Inter) to index.html
  - Ensured CTA triggers download of public/lead_magnet.pdf
  - Removed developer-only guidance and non-product messaging from the public landing

Notes about sensitive/internal information

- The public landing was reviewed and developer-facing guidance and absolute internal paths were removed or converted to relative references so the page contains only product/service messaging. No API keys, tokens, or emails are present in the landing page component.

Verification steps

1. From the project root:
   - cd web-frontend
   - npm install
   - npm run dev
   - npm run start-server (in a separate terminal)

2. Open http://localhost:5173 in your browser.
3. Complete the form and submit; on success the lead magnet at /lead_magnet.pdf should download and the API will receive the signup via POST /api/signup.

If anything looks off, open the files listed above and verify the CTA uses /lead_magnet.pdf and that the tailwind.config.cjs contains theme.extend.colors.brand entries.
