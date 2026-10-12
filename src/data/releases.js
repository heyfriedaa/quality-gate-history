// Reference "now" for the prototype so time-range filters are stable.
export const NOW = new Date('2026-06-12T00:00:00');

const daysAgo = (n) => new Date(NOW.getTime() - n * 86400000);

export const releases = [
  { version: 'v1.0.0', date: daysAgo(284), passed: true },
  { version: 'v1.1.0', date: daysAgo(204), passed: true },
  { version: 'v1.2.0', date: daysAgo(175), passed: true },
  { version: 'v1.5.0', date: daysAgo(165), passed: false },
  { version: 'v1.6.0', date: daysAgo(150), passed: true },
  { version: 'v1.7.0', date: daysAgo(140), passed: false },
  { version: 'v1.8.0', date: daysAgo(120), passed: true },
  { version: 'v1.9.0', date: daysAgo(100), passed: false },
  { version: 'v2.0.0', date: daysAgo(90), passed: false },
  { version: 'v2.1.0', date: daysAgo(63), passed: true },
  { version: 'v2.2.0', date: daysAgo(29), passed: false },
  { version: 'v2.3.0', date: daysAgo(23), passed: true },
  { version: 'v2.3.1', date: daysAgo(15), passed: true },
  { version: 'v2.4.0', date: daysAgo(10), passed: false },
];

const fmt = (d) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatReleaseDate = fmt;

export const lastRelease = releases[releases.length - 1];

// Summary's quality gate status reflects the last release on main.
export const currentGate = {
  qualityGate: 'Sonar way',
  passed: lastRelease.passed,
};
