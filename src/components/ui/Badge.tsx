import type { ReactNode } from 'react'

type Tone = 'default' | 'volt' | 'live'

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

const tones: Record<Tone, string> = {
  default: 'glass text-chalk-200',
  volt: 'glass-volt text-volt-100',
  live: 'glass text-volt-200',
}

export function Badge({ children, tone = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {tone === 'live' && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt-400 opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-volt-400" />
        </span>
      )}
      {children}
    </span>
  )
}
