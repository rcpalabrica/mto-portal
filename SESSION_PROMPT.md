# Session Prompt — MTO Portal App

Paste everything below this line into a new Claude Code session inside the PORTAL project folder.

---

I need you to build a new React web app called **MTO Portal** — a navigation hub for the Municipal Treasury Office (MTO) of Dingle, Iloilo. This portal shows cards for each LGU app and lets authorized users click through to the individual apps.

There is a planning document in this folder called `MTO_PORTAL_PLAN.md`. Read it first before doing anything. It contains the full architecture, app inventory, design system (colors, typography, component patterns), UI layout spec, and deployment strategy. Treat it as the source of truth.

---

## Context you need to know

- The first sub-app, DCM (Cemetery Management System), is already live on Vercel. Its URL will be provided when we're ready to wire it up — for now use a placeholder.
- Market Stall Rental and Collection System are **coming soon** — their cards must be greyed out (opacity-40, cursor-not-allowed) with a "Coming Soon" badge. No link.
- The portal has its own Google OAuth login (not shared with DCM). Users sign in with Google; the portal just needs to verify the email is on an approved list (stored in its own Google Sheet).
- The portal does **not** embed or host the sub-apps — it only links to them.

## Tech stack (same as DCM — do not deviate)

- React 19 + Vite
- Tailwind CSS 4 via `@tailwindcss/vite`
- Zustand 5
- `@react-oauth/google` for Google OAuth 2.0
- `lucide-react` for icons
- Google Sheets API v4 as the sole data store (no backend)

## Environment variables needed (`.env`)

```
VITE_GOOGLE_CLIENT_ID=       # Google OAuth client ID
VITE_ADMIN_EMAIL=            # hardcoded admin (rcpalabrica@gmail.com)
VITE_SHEET_ID=               # Google Sheet ID for portal users tab
```

## Folder structure to follow

```
PORTAL/
├── public/
│   └── dingle seal.png       ← I will provide this asset
├── src/
│   ├── auth/
│   │   ├── AuthContext.jsx
│   │   ├── LoginPage.jsx
│   │   └── UserMenu.jsx
│   ├── components/
│   │   ├── PortalHome.jsx    ← main page with app cards
│   │   └── AppCard.jsx       ← individual card component
│   ├── services/
│   │   └── sheetsAPI.js      ← users tab only (read approved list)
│   ├── store/
│   │   └── usersStore.js     ← approved user list
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── index.html
├── vite.config.js
└── package.json
```

## Design rules (from the plan doc — summary)

- Primary dark: `slate-800` / `slate-900` (header, login shell background)
- Page background: `slate-100`
- Accent: `sky-600`
- Cards: `bg-white rounded-2xl shadow-md border border-slate-200`
- Live card hover: `hover:-translate-y-1 hover:shadow-lg transition-all`
- Coming soon card: `opacity-40 cursor-not-allowed` + top-right "Coming Soon" badge in `bg-slate-500`
- Login page: same shell pattern as DCM — dark gradient card, Dingle seal centered, Google Sign-in button
- Font: `system-ui, 'Segoe UI', Roboto, sans-serif`

## App cards to render

| App | Icon accent | Status | URL |
|-----|------------|--------|-----|
| Cemetery Management System (DCM) | `sky-600` | Live | TBD placeholder |
| Market Stall Rental (MSR) | `emerald-600` | Coming Soon | — |
| Collection System (COL) | `amber-600` | Coming Soon | — |

## What to build (in order)

1. Scaffold the project (`npm create vite`, install deps)
2. Set up `index.css` with base styles from the plan doc
3. Build `LoginPage.jsx` and `AuthContext.jsx` (Google OAuth, check against approved users sheet)
4. Build `sheetsAPI.js` — only needs a `users` tab (columns: email, role, name)
5. Build `AppCard.jsx` — accepts `{ name, description, icon, accentColor, url, status }` props
6. Build `PortalHome.jsx` — header with seal + title + user info, card grid
7. Wire `App.jsx` to show `LoginPage` when unauthenticated, `PortalHome` when authenticated

## Important patterns (same as DCM — follow these exactly)

- Never mutate Sheets directly from components — all writes go through store actions
- Token is not persisted — on page refresh the user must re-authenticate
- IDs generated with `crypto.randomUUID()` if needed
- All Sheets calls pass the OAuth access token from context
- No TypeScript — plain JSX only

## What to ask me before starting

1. Confirm whether I have the Dingle seal PNG ready to drop in
2. Confirm the Google Client ID and Sheet ID (or proceed with `.env` placeholders)
3. Confirm the live DCM URL (or use a placeholder for now)

Start by reading `MTO_PORTAL_PLAN.md` fully, then ask those three questions, then begin scaffolding.
