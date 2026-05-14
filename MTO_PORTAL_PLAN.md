# MTO Portal — Planning Document

Municipal Treasury Office, Municipality of Dingle, Iloilo

---

## 1. Overall Architecture

```
mto-portal (new repo + Vercel project)
  └── Landing page with app cards → links out to each app

dcm (existing repo + Vercel project)         ← LIVE
market (new repo + Vercel project)           ← COMING SOON
collection (new repo + Vercel project)       ← COMING SOON
[future apps...]
```

Each app is an **independent Vercel deployment** — separate repo, separate URL.
The portal is just a navigation hub; it does not own any app logic.

---

## 2. App Inventory

| App | Short Name | Status | Description |
|-----|-----------|--------|-------------|
| Cemetery Management System | DCM | **Live** | Burial unit rentals, occupant records, transfers |
| Market Stall Rental System | MSR | Coming Soon | Stall assignments and rental payments |
| Collection System | COL | Coming Soon | Municipal fee and payment collection tracking |
| _(future)_ | — | — | Add as needed |

### Coming Soon behavior
- Card is rendered but **greyed out** (opacity-40, cursor-not-allowed)
- No link — clicking does nothing
- Shows a "Coming Soon" badge in the top-right corner of the card

---

## 3. Shared Design System

All apps — including the portal — follow these conventions.
Copy-paste into each new project's `index.css` and Tailwind usage.

### 3.1 Color Palette

| Role | Tailwind Class | Hex |
|------|---------------|-----|
| Primary dark (header, sidebar) | `slate-800` | `#1e293b` |
| Primary darker (gradient) | `slate-900` | `#0f172a` |
| Page background | `slate-100` | `#f1f5f9` |
| Body text | `slate-800` | `#1e293b` |
| Muted text | `slate-500` | `#64748b` |
| Accent / interactive | `sky-600` | `#0284c7` |
| Accent hover | `sky-700` | `#0369a1` |
| Success | `emerald-600` | `#059669` |
| Warning | `amber-500` | `#f59e0b` |
| Danger | `red-600` | `#dc2626` |
| Card background | `white` | `#ffffff` |
| Border | `slate-200` | `#e2e8f0` |

### 3.2 Typography

```css
font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
```

| Use | Class |
|-----|-------|
| Page title | `text-xl font-bold text-slate-800` |
| Section heading | `text-base font-semibold text-slate-700` |
| Body text | `text-sm text-slate-600` |
| Caption / meta | `text-xs text-slate-400` |

### 3.3 Core Component Patterns

**Card**
```
bg-white rounded-2xl shadow-sm border border-slate-200 p-6
```

**Primary button**
```
px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors
```

**Danger button**
```
px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors
```

**Input field**
```
w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500
```

**Badge / pill**
```
inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
```

---

## 4. Portal UI

### 4.1 Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Dingle Seal]  MTO Portal  Municipality of Dingle,     │
│                             Iloilo                       │
│              bg-gradient-to-br from-slate-800 to-slate-900 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Welcome, <username>        [Sign Out]                 │
│                                                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│   │  [icon]  │  │  [icon]  │  │  [icon]  │             │
│   │          │  │  [icon]  │  │          │             │
│   │   DCM    │  │  Market  │  │Collection│             │
│   │Cemetery  │  │  Stall   │  │  System  │             │
│   │Management│  │  Rental  │  │          │             │
│   │          │  │🔒Coming  │  │🔒Coming  │             │
│   └──────────┘  │  Soon    │  │  Soon    │             │
│                 └──────────┘  └──────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.2 App Card Spec

**Live card**
- `bg-white rounded-2xl shadow-md hover:shadow-lg border border-slate-200`
- Hover: slight lift (`hover:-translate-y-1 transition-all`)
- Icon: large centered (64×64 area), app-specific color accent
- App name: `text-base font-semibold text-slate-800`
- Description: `text-xs text-slate-500`
- Clicks → `window.open(url, '_blank')`

**Coming soon card**
- Same structure but: `opacity-40 cursor-not-allowed`
- Top-right badge: `bg-slate-500 text-white text-[10px] px-2 py-0.5 rounded-full` → "Coming Soon"
- No link, no hover effect

### 4.3 Header

- Full-width dark bar: `bg-gradient-to-br from-slate-800 to-slate-900`
- Left: Dingle LGU seal (small, circular) + "MTO Portal" title + "Municipality of Dingle, Iloilo" subtitle
- Right: logged-in user name + Sign Out button

### 4.4 Login Page (Portal)

Same shell as DCM's `LoginShell`:
- Dark gradient card
- Dingle seal centered
- Title: "MTO Portal" / subtitle: "Municipality of Dingle, Iloilo"
- Google Sign-in button
- Access is **portal-specific** (not tied to any sub-app's sheet)

---

## 5. Per-App UI Conventions

Every app (DCM, Market, Collection, etc.) follows this shell:

```
┌────────────────────────────────────────────────────────┐
│ [Seal] [App Name]    [Nav items...]     [User + logout] │
│              bg-slate-800                               │
├──────────────┬─────────────────────────────────────────┤
│              │                                         │
│   Sidebar    │           Main Content Area             │
│  (nav links) │         bg-slate-100                    │
│  bg-slate-800│                                         │
│  text-white  │                                         │
│              │                                         │
└──────────────┴─────────────────────────────────────────┘
```

- Sidebar: `bg-slate-800 text-white`, active item: `bg-sky-600`
- Collapsed sidebar: icons only (as DCM does today)
- Content: `bg-slate-100`, cards: `bg-white rounded-2xl shadow-sm`
- Each app's login page uses the **same LoginShell pattern** as DCM

### App-specific accent (for icons/cards on portal)

| App | Icon color accent |
|-----|------------------|
| DCM | `sky-600` (existing) |
| Market Stall | `emerald-600` |
| Collection | `amber-600` |
| _(future)_ | Pick from: violet, rose, teal |

---

## 6. Tech Stack (per app)

All apps use the same stack to keep builds and patterns consistent:

| Item | Choice |
|------|--------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| State | Zustand 5 |
| Icons | lucide-react |
| Auth | Google OAuth 2.0 (`@react-oauth/google`) |
| Data store | Google Sheets API v4 |

---

## 7. Deployment Strategy

| Project | Vercel Project Name | URL (suggested subdomain) |
|---------|--------------------|-----------------------------|
| Portal | `mto-portal` | `portal.mto-dingle.gov.ph` or Vercel default URL |
| DCM | `mto-dcm` | `dcm.mto-dingle.gov.ph` or existing Vercel URL |
| Market | `mto-market` | `market.mto-dingle.gov.ph` |
| Collection | `mto-collection` | `collection.mto-dingle.gov.ph` |

**Each app:**
- Its own GitHub repo
- Its own Vercel project (free tier)
- Its own `.env` file (its own Google Sheet ID, Client ID)
- Deployed independently — changes to one app never affect others

---

## 8. Folder Structure (per new app repo)

Mirror DCM's structure exactly so patterns are familiar:

```
mto-market/
├── public/
│   └── dingle seal.png        ← same seal, copy from DCM
├── src/
│   ├── auth/
│   │   ├── AuthContext.jsx
│   │   ├── LoginPage.jsx      ← copy + change app name/title
│   │   └── UserMenu.jsx
│   ├── components/            ← app-specific views
│   ├── services/
│   │   └── sheetsAPI.js       ← copy + update TABS for this app
│   ├── store/
│   │   └── appStore.js        ← app-specific state
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              ← copy from DCM (same base styles)
├── .env
├── index.html
├── vite.config.js
└── package.json
```

---

## 9. Build Order

1. **Portal** — build first; DCM card is live, Market and Collection are greyed out
2. **DCM** — already live; update URL in portal card
3. **Market Stall Rental** — when ready, un-grey the card and set URL
4. **Collection System** — same pattern

---

_Last updated: 2026-05-14_
