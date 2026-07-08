import { useEffect, useState } from 'react'
import { socialIcons } from '../ui/Icons'
import { links } from '../../data/links'

/** Slim desktop footer — brand mention + live clock + social links. */
export function Footer() {
  const active = links.filter((l) => l.url)
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  )

  useEffect(() => {
    const id = setInterval(
      () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })),
      30_000,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-30 hidden items-center justify-between px-8 py-4 lg:flex">
      <span className="font-mono text-[0.7rem] tracking-wide text-chalk-400">
        © {new Date().getFullYear()} Tae Lab's
        <span className="mx-2 text-volt-500/60">/</span>
        <span className="text-chalk-300">code · build · deploy</span>
        <span className="mx-2 text-volt-500/60">/</span>
        <span className="tabular-nums text-chalk-300">{time}</span>
      </span>

      <div className="pointer-events-auto flex items-center gap-1.5">
        {active.map((link) => {
          const Icon = socialIcons[link.icon]
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="glass grid h-9 w-9 place-items-center rounded-full text-chalk-300 transition-colors hover:text-volt-200"
            >
              <Icon width={16} height={16} />
            </a>
          )
        })}
      </div>
    </footer>
  )
}
