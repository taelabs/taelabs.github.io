/**
 * Services / What I Build.
 * Focused on high-value work: security, redesigns, architecture — not basics.
 */
export interface Service {
  title: string
  description: string
  icon: 'script' | 'roleplay' | 'ui' | 'bridge' | 'admin' | 'gameplay' | 'inventory' | 'store' | 'performance'
}

export const services: Service[] = [
  {
    title: 'Security & Anti-Tamper',
    description:
      'Hardened resources, exploit mitigation and obfuscation to protect your server and your revenue.',
    icon: 'admin',
  },
  {
    title: 'Full UI/UX Redesigns',
    description:
      'Complete visual overhauls that turn dated interfaces into a cohesive, premium brand identity.',
    icon: 'ui',
  },
  {
    title: 'Systems Architecture',
    description:
      'Scalable, well-structured foundations — designed to grow with your server, not against it.',
    icon: 'bridge',
  },
  {
    title: 'Performance Engineering',
    description:
      'Deep resmon audits and refactors that reclaim server headroom and eliminate hitching.',
    icon: 'performance',
  },
  {
    title: 'Custom Roleplay Systems',
    description:
      'Bespoke gameplay loops and mechanics built around your server’s unique identity.',
    icon: 'gameplay',
  },
  {
    title: 'Bespoke NUI Interfaces',
    description:
      'React-powered, animation-driven interfaces engineered for clarity and real gameplay.',
    icon: 'roleplay',
  },
  {
    title: 'Framework Integrations',
    description:
      'Clean, framework-agnostic bridges across ESX, QBCore and QBox — write once, run anywhere.',
    icon: 'inventory',
  },
  {
    title: 'Premium Script Development',
    description:
      'End-to-end, documented resources built to production standards from the ground up.',
    icon: 'script',
  },
  {
    title: 'Tebex-Ready Products',
    description:
      'Escrow-friendly, polished and packaged resources ready to sell and support at scale.',
    icon: 'store',
  },
]
