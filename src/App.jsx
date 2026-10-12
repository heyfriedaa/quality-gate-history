import { useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  CircleAlert,
  ChartLine,
  GitBranch,
  X,
} from 'lucide-react'

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}
import { TopNav } from './components/TopNav'
import { Sidebar } from './components/Sidebar'
import { currentGate, formatReleaseDate, lastRelease, releases } from './data/releases'
import './App.css'

const ranges = [
  { key: 'all', label: 'All time', days: Infinity },
  { key: '30d', label: '30 days', days: 30 },
  { key: '6m', label: '6 months', days: 183 },
  { key: '1y', label: '1 year', days: 365 },
]

const now = new Date('2026-06-12T00:00:00')

function GateIcon({ passed, size = 20 }) {
  return (
    <span className={`gate-icon ${passed ? 'pass' : 'fail'}`}>
      {passed ? <Check size={size * 0.7} /> : <X size={size * 0.7} />}
    </span>
  )
}

function SummaryPage({ onNavigate }) {
  const [tab, setTab] = useState('new')
  const passed = currentGate.passed

  return (
    <>
      <div className="page-hero">
        <nav className="breadcrumbs">
          <a href="#">product-design-ux-org</a>
          <span className="breadcrumb-sep">/</span>
          <a href="#">webapp-sonar</a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Summary</span>
        </nav>
        <div className="page-header">
          <div className="page-title-row">
            <h1 className="page-title">Summary</h1>
            <div className="branch-picker">
              <button className="branch-selector">
                <GitBranch size={16} />
                main
                <ChevronDown size={14} />
              </button>
              <span className={`branch-status ${passed ? 'pass' : 'fail'}`}>
                {passed ? <Check size={14} /> : <X size={14} />}
              </span>
            </div>
          </div>
          <button className="github-btn">
            <GithubIcon size={14} />
            View on GitHub
          </button>
        </div>
        <div className="project-meta">
          <span>Private</span>
          <span className="meta-dot">•</span>
          <span>No tags</span>
          <span className="meta-dot">•</span>
          <span>42k Lines of Code</span>
          <span className="meta-dot">•</span>
          <span>Last analysis 6 days ago</span>
        </div>
      </div>

      <div className="summary-content">
        <div className="qg-header">
          <span className={`gate-status-box ${passed ? 'pass' : 'fail'}`}>
            {passed ? <Check size={22} /> : <X size={22} />}
          </span>
          <div className="qg-header-text">
            <div className="gate-label">
              Quality gate: <a href="#" className="gate-link">{currentGate.qualityGate}</a>
              <span className="gate-label-info"><CircleAlert size={12} /></span>
            </div>
            <div className="gate-status-row">
              <span className="gate-status-text">{passed ? 'Passed' : 'Failed'}</span>
              <button
                className="icon-btn gate-history-btn"
                aria-label="View quality gate history"
                title="Quality Gate History"
                onClick={() => onNavigate('history')}
              >
                <ChartLine size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="code-tabs">
          <button
            className={`code-tab ${tab === 'new' ? 'active' : ''}`}
            onClick={() => setTab('new')}
          >
            New Code
            {!passed && <span className="tab-fail-badge">1 failed</span>}
          </button>
          <button
            className={`code-tab ${tab === 'overall' ? 'active' : ''}`}
            onClick={() => setTab('overall')}
          >
            Overall Code
          </button>
        </div>

        <div className={`summary-panel ${tab === 'new' ? 'corner-left-flat' : ''}`}>
          <div className="summary-body">
            <div className="summary-left">
              <div className="summary-period">
                New code <strong>Since about 1 month ago</strong>
              </div>
              <div className="failed-count">1 condition failed</div>
              <div className="condition-row">
                <span className="condition-icon">
                  <CircleAlert size={16} />
                </span>
                <div className="condition-text">
                  <span className="condition-name">7.0% Duplicated Lines (%)</span>
                  <span className="condition-req">≤ 3.0% required</span>
                </div>
              </div>
            </div>

            <div className="summary-right">
              <div className="metric-cell">
                <div className="card-heading">New Issue</div>
                <div className="metric-value">1</div>
                <div className="metric-sub">No conditions set</div>
              </div>
              <div className="metric-cell">
                <div className="card-heading">Accepted Issues</div>
                <div className="metric-value">0</div>
                <div className="metric-sub">Valid issues that were not fixed</div>
              </div>
              <div className="metric-cell">
                <div className="card-heading">Coverage</div>
                <div className="metric-sub">
                  A few extra steps are needed for SonarQube Cloud to analyze your code coverage.
                </div>
                <a href="#" className="metric-link">Set up coverage analysis</a>
              </div>
              <div className="metric-cell">
                <div className="card-heading">
                  Duplications
                  {!passed && <span className="tab-fail-badge">Failed</span>}
                </div>
                <div className="metric-value">6.98%</div>
                <div className="metric-sub metric-fail">Required: ≤ 3.0%</div>
                <div className="metric-sub">on 387 New Lines</div>
              </div>
              <div className="metric-cell">
                <div className="card-heading">
                  Security Hotspots
                  <span className="badge-deprecated">Deprecated</span>
                </div>
                <div className="metric-value">0</div>
                <div className="metric-sub">No conditions set</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function HistoryPage() {
  const [range, setRange] = useState('all')

  const filtered = useMemo(() => {
    const { days } = ranges.find((r) => r.key === range)
    if (days === Infinity) return releases
    const cutoff = new Date(now.getTime() - days * 86400000)
    return releases.filter((r) => r.date >= cutoff)
  }, [range])

  const safe = filtered.filter((r) => r.passed).length
  const risky = filtered.length - safe
  const pct = (n) => (filtered.length ? Math.round((n / filtered.length) * 100) : 0)

  return (
    <>
      <div className="page-hero">
        <nav className="breadcrumbs">
          <a href="#">product-design-ux-org</a>
          <span className="breadcrumb-sep">/</span>
          <a href="#">webapp-sonar</a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Quality Gate History</span>
        </nav>
        <div className="page-header">
          <div className="page-title-row">
            <h1 className="page-title">Quality Gate History</h1>
          </div>
        </div>
      </div>

      <div className="history-content">
        <p className="history-desc">
          Each version released on the main branch is marked <strong className="safe-text">safe</strong> when
          its quality gate passed at release time, or <strong className="risky-text">risky</strong> when it failed.
        </p>

        <div className="history-toolbar">
          <div className="range-tabs">
            {ranges.map((r) => (
              <button
                key={r.key}
                className={`range-tab ${range === r.key ? 'active' : ''}`}
                onClick={() => setRange(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <span className="last-released">
            Last released: <strong>{lastRelease.version}</strong> on {formatReleaseDate(lastRelease.date)}
          </span>
        </div>

        <div className="ratio-cards">
          <div className="ratio-card">
            <div className="ratio-label"><span className="dot dot-safe" /> Safe releases</div>
            <div className="ratio-value">{pct(safe)}%</div>
            <div className="ratio-sub">{safe} of {filtered.length} releases</div>
          </div>
          <div className="ratio-card">
            <div className="ratio-label"><span className="dot dot-risky" /> Risky releases</div>
            <div className="ratio-value">{pct(risky)}%</div>
            <div className="ratio-sub">{risky} of {filtered.length} releases</div>
          </div>
        </div>

        <div className="timeline-card">
          <div className="timeline">
            {filtered.map((r) => (
              <div key={r.version} className="timeline-item">
                <GateIcon passed={r.passed} />
                <span className="timeline-line" />
                <span className="timeline-axis-seg" />
                <div className="timeline-meta">
                  <span className="timeline-version">{r.version}</span>
                  <span className="timeline-date">
                    {r.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="timeline-legend">
            <span className="legend-item"><GateIcon passed size={16} /> Gate passed (safe)</span>
            <span className="legend-item"><GateIcon passed={false} size={16} /> Gate failed (risky)</span>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  const [page, setPage] = useState('summary')

  return (
    <div className="app-shell">
      <TopNav />
      <div className="app-body">
        <Sidebar page={page} onNavigate={setPage} />
        <main className="main-content">
          {page === 'summary' ? (
            <SummaryPage onNavigate={setPage} />
          ) : (
            <HistoryPage />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
