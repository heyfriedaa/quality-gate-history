import {
  Activity,
  BookOpen,
  Bot,
  Box,
  ChartLine,
  ChevronDown,
  GitPullRequest,
  LayoutDashboard,
  List,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Target,
} from 'lucide-react';

const sections = [
  {
    title: null,
    items: [
      { icon: LayoutDashboard, label: 'Overview' },
      { icon: List, label: 'Dashboards' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      { icon: BookOpen, label: 'Summary', page: 'summary' },
      { icon: Siren, label: 'Issues' },
      { icon: ShieldAlert, label: 'Security Hotspots', badge: 'Deprecated' },
      { icon: ShieldCheck, label: 'Dependency Risks' },
    ],
  },
  {
    title: 'Reporting',
    items: [
      { icon: ShieldCheck, label: 'Security Reports' },
      { icon: Target, label: 'Measures' },
      { icon: Activity, label: 'Activity' },
      { icon: Bot, label: 'Agentic Readiness', badge: 'Alpha' },
      { icon: ChartLine, label: 'Quality Gate History', page: 'history', badge: 'New' },
    ],
  },
  {
    title: 'Policies',
    items: [
      { icon: Box, label: 'Intended architecture' },
      { icon: Target, label: 'Quality profiles' },
      { icon: ShieldCheck, label: 'Quality gate' },
    ],
  },
  {
    title: 'Project',
    items: [
      { icon: GitPullRequest, label: 'Pull Requests' },
    ],
  },
];

export function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-project">
        <div className="project-icon">W</div>
        <div className="project-info">
          <div className="project-name">webapp-sonar</div>
          <div className="project-type">Project</div>
        </div>
        <ChevronDown size={14} className="project-chevron" />
      </div>
      <nav className="sidebar-nav">
        {sections.map((section, idx) => (
          <div key={idx} className="sidebar-section">
            {section.title && (
              <div className="sidebar-section-title">{section.title}</div>
            )}
            <ul className="sidebar-list">
              {section.items.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className={`sidebar-link ${item.page === page ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.page) onNavigate(item.page);
                    }}
                  >
                    <item.icon size={16} className="sidebar-icon" />
                    <span title={item.label}>{item.label}</span>
                    {item.badge && (
                      <span className={`sidebar-badge badge-${item.badge.toLowerCase()}`}>
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
