import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
export function DiscordIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 5a19 19 0 0 0-4.5-1.4l-.3.6a14 14 0 0 1 4 2 16 16 0 0 0-11.4 0 14 14 0 0 1 4-2l-.3-.6A19 19 0 0 0 5 5 20 20 0 0 0 2 18.5 19 19 0 0 0 7.7 21l.9-1.3a12 12 0 0 1-1.9-.9l.5-.3a13 13 0 0 0 10.6 0l.5.3a12 12 0 0 1-1.9.9L17.3 21A19 19 0 0 0 23 18.5 20 20 0 0 0 18 5Z" />
      <circle cx="9" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function TebexIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2h12l3 5-9 15L3 7l3-5Z" />
      <path d="M3 7h18M9 2l3 20M15 2l-3 20" />
    </svg>
  )
}
export function EmailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}
export function DocsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  )
}
export function LinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
    </svg>
  )
}
export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
export function ExternalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}
export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}
export function MessageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
    </svg>
  )
}
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/* Service icons */
export function ScriptIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
    </svg>
  )
}
export function RoleplayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}
export function UIIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6h.01M10 6h.01" />
    </svg>
  )
}
export function BridgeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h18M6 12v6M18 12v6M3 12a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4M10 12v3M14 12v3" />
    </svg>
  )
}
export function AdminIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
export function GameplayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="7" width="20" height="10" rx="5" />
      <path d="M7 12h3M8.5 10.5v3M15 11h.01M17.5 13h.01" />
    </svg>
  )
}
export function InventoryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 4v5M15 4v5M9 14h6" />
    </svg>
  )
}
export function StoreIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h16l-1 5a3 3 0 0 1-6 0 3 3 0 0 1-6 0L4 4Z" />
      <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 20v-6h4v6" />
    </svg>
  )
}
export function PerformanceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 12 16 8M21 3l-4 4M8 21h8" />
    </svg>
  )
}

export const serviceIcons = {
  script: ScriptIcon,
  roleplay: RoleplayIcon,
  ui: UIIcon,
  bridge: BridgeIcon,
  admin: AdminIcon,
  gameplay: GameplayIcon,
  inventory: InventoryIcon,
  store: StoreIcon,
  performance: PerformanceIcon,
} as const

export const socialIcons = {
  github: GitHubIcon,
  discord: DiscordIcon,
  tebex: TebexIcon,
  email: EmailIcon,
  docs: DocsIcon,
  link: LinkIcon,
  message: MessageIcon,
} as const
