/**
 * Projects / Featured Work.
 *
 * Shown in the coverflow carousel; click a project to expand full details.
 * - `images` is optional — leave empty and branded placeholders are generated.
 * - `links` is optional — only entries with a `url` are rendered.
 */
export type ProjectStatus = 'Released' | 'In Development' | 'Private' | 'Planned'

export type ProjectCategory =
  | 'Security'
  | 'UI System'
  | 'Architecture'
  | 'Admin Suite'
  | 'Gameplay System'
  | 'Redesign'
  | 'Framework Core'

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  title: string
  /** Short one-liner shown on the card. */
  description: string
  /** Full write-up shown in the expanded view. */
  longDescription: string
  category: ProjectCategory
  tech: string[]
  status: ProjectStatus
  /** Key selling points shown in the expanded view. */
  highlights: string[]
  /** Optional preview images. Empty → branded placeholders. */
  images?: string[]
  links?: ProjectLink[]
  year?: string
}

export const projects: Project[] = [
  {
    title: 'Aegis Security Layer',
    description: 'Server-side protection & anti-tamper framework.',
    longDescription:
      'A defense-in-depth security layer that hardens resources against common exploits, event abuse and injection. Includes server-authoritative validation, rate limiting, encrypted payloads and tamper detection — engineered to protect both your players and your revenue without hurting performance.',
    category: 'Security',
    tech: ['Lua', 'Server Auth', 'Encryption', 'Anti-Tamper'],
    status: 'Private',
    highlights: [
      'Server-authoritative event validation',
      'Exploit & injection mitigation',
      'Encrypted NUI ↔ client payloads',
      'Zero measurable resmon impact',
    ],
    year: '2025',
    links: [],
  },
  {
    title: 'Nova HUD & UI Overhaul',
    description: 'Complete, brand-driven interface redesign.',
    longDescription:
      'A full front-end overhaul replacing dated, inconsistent UI with a single cohesive design system. Every element — HUD, menus, notifications — rebuilt in React with fluid motion, accessible contrast and a configurable theme engine so servers can own their visual identity.',
    category: 'Redesign',
    tech: ['React', 'TypeScript', 'NUI', 'Design System'],
    status: 'In Development',
    highlights: [
      'Unified design system & theme engine',
      'Motion-driven, 60fps interfaces',
      'Fully responsive NUI scaling',
      'Config-first customization',
    ],
    year: '2025',
    links: [],
  },
  {
    title: 'Sentinel Admin Suite',
    description: 'Pro moderation with live anti-cheat signals.',
    longDescription:
      'A staff platform built for serious servers: role-based permissions, full action logging, live player telemetry and anti-cheat signal surfacing — all inside a fast, keyboard-friendly NUI. Designed so moderators act in seconds and every action is auditable.',
    category: 'Admin Suite',
    tech: ['React', 'Lua', 'MySQL', 'RBAC'],
    status: 'Private',
    highlights: [
      'Granular role-based permissions',
      'Immutable audit logging',
      'Live telemetry & anti-cheat signals',
      'Sub-second moderator workflows',
    ],
    year: '2025',
    links: [],
  },
  {
    title: 'Forge Framework Core',
    description: 'Unified core & bridge for ESX/QBCore/QBox.',
    longDescription:
      'A clean architectural core that abstracts framework differences behind one stable API. Write resources once and run them across ESX, QBCore and QBox — with typed exports, lifecycle hooks and a modular structure designed for long-term maintainability.',
    category: 'Framework Core',
    tech: ['Lua', 'ESX', 'QBCore', 'QBox'],
    status: 'Planned',
    highlights: [
      'Single stable API across cores',
      'Typed, documented exports',
      'Modular, testable structure',
      'Future-proof by design',
    ],
    year: '2026',
    links: [],
  },
  {
    title: 'Momentum Job System',
    description: 'Progression-driven jobs & economy engine.',
    longDescription:
      'A scalable job and economy engine with progression, dynamic payouts, reputation and interaction-based tasks. Built with a data-driven config so new jobs are added without touching core logic — balanced for real, long-term server economies.',
    category: 'Gameplay System',
    tech: ['Lua', 'MySQL', 'Data-Driven', 'QBCore'],
    status: 'Planned',
    highlights: [
      'Progression & reputation systems',
      'Dynamic, balanced payouts',
      'Data-driven job definitions',
      'Economy-safe by design',
    ],
    year: '2026',
    links: [],
  },
  {
    title: 'Pulse Performance Toolkit',
    description: 'Profiling & optimization for heavy servers.',
    longDescription:
      'A toolkit and consulting workflow for diagnosing and fixing performance bottlenecks: resmon profiling, hot-path refactoring, event batching and memory tuning. The result is reclaimed server headroom, fewer hitches and a smoother experience under load.',
    category: 'Architecture',
    tech: ['Lua', 'Profiling', 'Optimization'],
    status: 'In Development',
    highlights: [
      'Resmon & hot-path profiling',
      'Event batching & throttling',
      'Memory & GC tuning',
      'Measurable, documented gains',
    ],
    year: '2025',
    links: [],
  },
]
