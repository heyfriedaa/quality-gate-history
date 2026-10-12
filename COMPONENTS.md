# Component & Pattern Reference

Reusable UI patterns from the Quality Gate History prototype. Pair with `SONAR_STYLE.md` for color tokens and base conventions — reuse tokens, don't hardcode hex.

## File map

| File | Contents |
|---|---|
| `src/components/TopNav.jsx` | Global SonarQube Cloud header (logo, nav links, Upgrade, icons, avatar) |
| `src/components/Sidebar.jsx` | Project nav with sections, badges, counts — drives page state |
| `src/data/releases.js` | Mock release data — single source of truth shared by both pages |
| `src/App.jsx` | `SummaryPage`, `HistoryPage`, `GateIcon`, `GithubIcon`, page switching |
| `src/App.css` | All styles; sections marked with comment banners |

## App shell

```
<div class="app-shell">       column flex, 100vh, overflow hidden
  <TopNav />
  <div class="app-body">      row flex
    <Sidebar page={page} onNavigate={setPage} />
    <main class="main-content">  scrolls independently
      <div class="page-hero">…</div>
      <div class="*-content">…</div>
```

- Page switching is a `useState` in `App` (`'summary'` | `'history'`) — no router needed for prototypes.
- Content column: `.summary-content` / `.history-content` = `max-width: 1012px`, centered, `0 24px 40px` padding.
- Page hero: `.page-hero` surface strip with breadcrumbs + title row + optional meta row (`.project-meta` with `.meta-dot` separators).

## Sidebar (`Sidebar.jsx`)

- `sections` array: `{ title, items: [{ icon, label, page?, badge?, count? }] }`.
- `item.page` matches the active `page` prop → `.sidebar-link.active`; `onNavigate(item.page)` on click.
- Badges: `<span class="sidebar-badge badge-{lowercase}">` — variants: `badge-new` (accent fill), `badge-alpha` (tag style), `badge-deprecated` (muted).
- **Long labels**: label span is `flex:1; min-width:0; nowrap; ellipsis`, badges have `flex-shrink:0` — text truncates, badge always visible. `title={item.label}` gives a hover tooltip.

## Quality gate status header (Summary)

```
<div class="qg-header">
  <span class="gate-status-box fail|pass">   48px rounded square, X or Check
  <div class="qg-header-text">
    <div class="gate-label">Quality gate: <a class="gate-link">Sonar way</a> ⓘ</div>
    <div class="gate-status-row">
      <span class="gate-status-text">Failed</span>
      <button class="icon-btn gate-history-btn"><ChartLine /></button>
    </div>
```

- Status colors: `fail` = `#6E4552` bg / `#F0B7C0` glyph, `pass` = `#5F7A52` bg / `#D3E8C4`.
- `gate-history-btn` is the cross-page link → `onNavigate('history')`. Icon is `ChartLine` — same icon the sidebar uses for Quality Gate History, keep them in sync.

## Folder tabs attached to a panel (New Code / Overall Code)

The tricky part — order matters:

```jsx
<div className="code-tabs">           {/* OUTSIDE the panel */}
  <button className="code-tab active">New Code …</button>
  <button className="code-tab">Overall Code</button>
</div>
<div className={`summary-panel ${tab === 'new' ? 'corner-left-flat' : ''}`}>
  …panel body…
</div>
```

- Tabs sit **above** the bordered panel — never inside it (inside = border wraps the whole strip, looks wrong).
- Inactive tab: `border: none`, plain text on background.
- Active tab: `border: 1px solid` top/left/right, `border-bottom: 1px solid var(--sc-surface)` (covers the panel's top edge under itself), `border-radius: 8px 8px 0 0`, `margin-bottom: -1px`, `z-index: 1`.
- The only continuous horizontal line is the **panel's own top border** — don't add a `.code-tabs` bottom border.
- If the active tab is the **first** tab: add `corner-left-flat` to the panel (`border-top-left-radius: 0`) so the tab's left edge flows into the panel's left edge with no notch. Keep the tab's left border — removing it loses the stroke.
- Sizing: `padding: 19px 22px`, `font-size: 15px`, weight 600; active text = `--sc-text-accent`.
- Failure badge inside tab: `.tab-fail-badge` (danger bg pill).

## Metric grid inside the panel

```
.summary-body     flex row
.summary-left     300px fixed, border-right → "New code Since…" + failed conditions
.summary-right    flex 1, grid 2 columns of .metric-cell
```

- `.metric-cell`: `border-bottom` on all; `border-left` on `:nth-child(even)` (column divider).
- **Last-row rule** (this was a bug): remove bottom border only on the last row —
  `&:last-child, &:nth-last-child(2):nth-child(odd) { border-bottom: none }`.
  A blanket `nth-last-child(-n+2)` wrongly clears the second-to-last row when the grid has an odd cell count.
- Cell content: `.card-heading` (12px label, can hold `.badge-deprecated`/`.tab-fail-badge`), `.metric-value` (24px), `.metric-sub` (12px; `.metric-fail` for required-but-failed text).

## Failed-condition row (left column)

```
<div class="failed-count">1 condition failed</div>   red, 13px, 600
<div class="condition-row">
  <span class="condition-icon"><CircleAlert /></span>  28px circle, warning stroke
  <div class="condition-text">
    <span class="condition-name">7.0% Duplicated Lines (%)</span>
    <span class="condition-req">≤ 3.0% required</span>
```

## Release timeline (Quality Gate History)

```
.timeline-card → .timeline → .timeline-item per release
  <GateIcon passed={bool} />
  <span class="timeline-line" />        44px vertical dashed stem
  <span class="timeline-axis-seg" />    full-width segment of the horizontal axis
  <div class="timeline-meta">version + date</div>
```

- The horizontal axis is **per-item segments** (`.timeline-axis-seg` = `width:100%; border-top`), which join into one continuous line — no absolute positioning needed.
- `GateIcon` colors (timeline): pass `#CDEECD`/`#1F5C2E`, fail `#F4CFD3`/`#9C2B35` — pastel, distinct from the status-box colors.
- Legend: `.timeline-legend` centered below the axis.
- Range tabs: `.range-tabs` segmented control (`All time / 30 days / 6 months / 1 year`); filter releases by `days` cutoff in `releases.js` — ratios recompute from the filtered set.

## Data conventions

- `src/data/releases.js` exports `NOW` (fixed reference date — keeps ranges stable), `releases` (`{version, date, passed}`), `formatReleaseDate`, `lastRelease`, and `currentGate` (`passed` derived from `lastRelease`).
- **Keep the Summary status derived from the last release** so Summary and History can't drift apart.

## Gotchas learned

- `lucide-react` (this version) has **no brand icons** — `Github` doesn't exist; use the inline `GithubIcon` SVG in `App.jsx`.
- Vite `base` is `/quality-gate-history/` for GitHub Pages; local dev serves at that path too.
- Icons on this lucide version prefer `ChartLine`, `GitPullRequest`, etc. — check exports before importing (`grep "as X" node_modules/lucide-react/dist/esm/lucide-react.mjs`).

## Commands

```bash
npm run dev      # local dev
npm run lint     # oxlint
npm run build    # → dist/
npm run deploy   # build + publish gh-pages branch
```
