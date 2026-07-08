import type { ReactNode } from 'react'

interface ViewHeaderProps {
  index: string
  eyebrow: string
  title: ReactNode
  className?: string
}

/** Consistent per-view header: big index + eyebrow badge + title. */
export function ViewHeader({ index, eyebrow, title, className = '' }: ViewHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`} data-anim="header">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-volt-400">/{index}</span>
        <span className="h-px w-8 bg-volt-400/40" />
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-chalk-400">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-4xl font-extrabold leading-[0.95] sm:text-5xl lg:text-6xl">{title}</h2>
    </div>
  )
}
