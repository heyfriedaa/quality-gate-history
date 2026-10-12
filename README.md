# Quality Gate History — SonarQube Cloud Prototype

A React prototype of a proposed **Quality Gate History** (release risk) feature for SonarQube Cloud. It shows how each version released on the main branch is marked *safe* when its quality gate passed at release time, or *risky* when it failed.

## Pages

- **Summary** (default) — mirrors the current product summary page: quality gate status header, New Code / Overall Code tabs, failed conditions, and metric grid. The chart icon next to the gate status navigates to Quality Gate History, and the status is derived from the latest release so the two pages stay in sync.
- **Quality Gate History** — reachable from the sidebar under *Reporting → Quality Gate History* (`New` badge). Shows Safe vs. Risky release ratios, a version timeline (pass/fail icons, vertical stems, horizontal axis), a "last released" indicator, and time-range filters (All time / 30 days / 6 months / 1 year).

## Tech

- Vite + React 19, no router — page state lives in `src/App.jsx`
- `lucide-react` icons
- Design tokens in `src/index.css` — see `SONAR_STYLE.md` for the shared Sonar prototype style guide
- Mock release data in `src/data/releases.js` (single source of truth for both pages)

## Docs

- `SONAR_STYLE.md` — shared Sonar dark-theme design tokens and base conventions
- `COMPONENTS.md` — reusable component/pattern reference (tabs, metric grid, timeline, sidebar, gotchas)

## Run locally

```bash
npm install
npm run dev
```

## Lint / build

```bash
npm run lint    # oxlint
npm run build   # vite build → dist/
```

## Deploy to GitHub Pages

The Vite `base` is set to `/quality-gate-history/`. Deploy the `dist` folder to the `gh-pages` branch:

```bash
npm run deploy
```

Then enable **Settings → Pages → Deploy from branch → gh-pages** if it isn't already.
