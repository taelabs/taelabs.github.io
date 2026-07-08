/**
 * Technologies / Stack.
 * Leads with real expertise (security, architecture, design), not basic libraries.
 * Grouped by category — the UI adapts to whatever you add.
 */
export interface TechGroup {
  category: string
  description: string
  items: string[]
}

export const technologies: TechGroup[] = [
  {
    category: 'Core Expertise',
    description: 'Where the real value is — not just wiring resources together.',
    items: [
      'Security Hardening',
      'Anti-Tamper & Obfuscation',
      'Systems Architecture',
      'Performance Optimization',
      'UI/UX Design',
      'Full Resource Redesigns',
    ],
  },
  {
    category: 'Engineering',
    description: 'Languages and runtimes behind every system I ship.',
    items: ['Lua', 'C#', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Interface / NUI',
    description: 'Custom, brand-driven interfaces engineered for real gameplay.',
    items: ['React', 'Vite', 'NUI', 'Motion Design', 'Design Systems'],
  },
  {
    category: 'Frameworks',
    description: 'Native, first-class support across the major FiveM cores.',
    items: ['ESX', 'QBCore', 'QBox'],
  },
  {
    category: 'Data & Delivery',
    description: 'Reliable persistence, tooling and deployment pipelines.',
    items: ['MySQL', 'oxmysql', 'Git', 'CI/CD', 'Tebex Escrow'],
  },
]
