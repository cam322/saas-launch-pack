# web-frontend

React + TypeScript Vite frontend for the SaaS Launch Pack.

Quick start

1. Install dependencies

   cd /root/watson/web-frontend
   npm install

2. Run the frontend dev server

   npm run dev

3. Run the lightweight backend server (logs signups to SQLite)

   npm run start-server

By default the frontend dev server runs on http://localhost:5173 and server on http://localhost:4000.

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
- public/lead_magnet.pdf (lead magnet copy)
- server/server.cjs (light backend logging to SQLite)
- server/schema.sql (DB schema)

Verification checklist

- cd /root/watson/web-frontend
- npm install
- npm run dev   (frontend)
- npm run start-server  (backend)
- Open http://localhost:5173 and submit the form — server/db file is at server/data/signups.db

Changelog

- Modernized landing UI, responsive layout, brand colors, and removed developer/internal messaging from public landing.
