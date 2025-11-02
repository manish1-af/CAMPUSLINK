
  # CampusLink Platform Development

  This is a code bundle for CampusLink Platform Development. The original project is available at https://www.figma.com/design/yZvdhlk5S5huZMnwcNqsJM/CampusLink-Platform-Development.

  ## Running the code

  CampusLink is a student-focused professional networking platform — a Vite + React (TypeScript) app with Tailwind UI primitives. This repository contains the front-end prototype and mock data used for development.

  ## Specs

  - Framework: Vite + React (TypeScript)
  - UI: Tailwind CSS + custom UI primitives (under `src/components/ui`)
  - Icons: lucide-react
  - Dev server: Vite (script: `npm run dev`)
  - Build: Vite (script: `npm run build`)
  - Node: tested with Node.js 18+ (use nvm / asdf to pin if needed)

  Main features in this repo (prototype):
  - Auth UI (email/password flow)
  - Feed, Search, Network, Chat, Clubs, Profile pages
  - Mock data under `src/lib/mockData.ts`
  - Responsive layout with a top navbar (desktop) and bottom nav (mobile)

  ## Project structure (important files)

  - `src/` — application source
    - `components/` — React components and pages
    - `components/ui/` — design primitives (Input, Button, Avatar, etc.)
    - `lib/mockData.ts` — fake users, opportunities and clubs used by the UI
    - `types/` — shared TypeScript types
  - `public/` — static assets (e.g. `avatar-default.svg`)
  - `package.json` — scripts & dependencies

  ## How to run (local)

  1. Install dependencies

  ```powershell
  cd "c:\Users\manis\pvt LTD\CampusLink Platform Development"
  npm install
  ```

  2. Start the dev server (Vite + HMR)

  ```powershell
  npm run dev
  ```

  Open the URL printed by Vite (usually http://localhost:3000/).

  3. Build for production

  ```powershell
  npm run build
  ```

  4. Preview the production build (optional)

  ```powershell
  npm run preview
  ```

  ## Environment / config

  - No secret keys are required for the prototype. If you add environment variables, put them in a `.env` file and add it to `.gitignore`.

  ## Tests & Typecheck

  - This repo doesn't include automated tests by default. To run a TypeScript typecheck use your editor or `tsc --noEmit` if you add a `tsconfig.json` build step.

  ## Contributing

  - Create a branch for features or fixes: `git checkout -b feat/your-feature`
  - Commit changes and open a PR against `main`
  - Keep the git history clean (small, focused commits)

  ## License

  Add your license of choice (MIT, Apache-2.0, etc.) — there's no license file in this repo yet.

  ---

  If you'd like, I can also add a small GitHub Actions workflow that runs `npm ci && npm run build` on every push.
  