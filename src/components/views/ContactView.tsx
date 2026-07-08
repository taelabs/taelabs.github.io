import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import { ViewShell } from '../layout/ViewShell'
import { ViewHeader } from '../ui/ViewHeader'
import { links } from '../../data/links'
import { socialIcons, ArrowIcon } from '../ui/Icons'

function useLocalTime() {
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
  return time
}

export function ContactView() {
  const scope = useRef<HTMLDivElement>(null)
  const time = useLocalTime()
  const primary = links.filter((l) => l.url && l.primary)
  const secondary = links.filter((l) => l.url && !l.primary)
  const pending = links.filter((l) => !l.url)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
      tl.from('[data-anim="header"]', { y: 40, opacity: 0, duration: 0.8 })
        .from('[data-contact="lead"]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
        .from(
          '[data-contact="primary"]',
          { y: 24, opacity: 0, scale: 0.97, stagger: 0.1, duration: 0.65, ease: EASE.liquid },
          '-=0.3',
        )
        .from('[data-contact="elsewhere"]', { opacity: 0, y: 14, duration: 0.55 }, '-=0.15')
        .from('[data-contact="pending"]', { opacity: 0, y: 8, duration: 0.45 }, '-=0.3')
    },
    { scope },
  )

  return (
    <ViewShell ref={scope} className="flex flex-col gap-8" width="max-w-3xl">
      <ViewHeader
        index="06"
        eyebrow="Contact"
        title={
          <>
            Let's build something <span className="text-volt-gradient">great</span>
          </>
        }
      />

      <div data-contact="lead" className="flex flex-col gap-4">
        <p className="max-w-xl text-base leading-relaxed text-chalk-300">
          Got a project, a custom system in mind, or a redesign you want done right? The fastest way to
          reach me is Discord — join the community server or send me a direct message.
        </p>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-chalk-400">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-chalk-200">Open for commissions</span>
          </span>
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="text-volt-300">local time</span>
            <span className="text-chalk-200 tabular-nums">{time}</span>
          </span>
        </div>
      </div>

      {/* Primary actions (Discord) */}
      {primary.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {primary.map((link) => {
            const Icon = socialIcons[link.icon]
            return (
              <a
                key={link.label}
                data-contact="primary"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-volt group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-void-950/40 text-volt-200">
                  <Icon width={24} height={24} />
                </span>
                <span>
                  <span className="block text-base font-bold text-chalk-100">{link.label}</span>
                  {link.handle && <span className="mt-0.5 block text-sm text-volt-100/80">{link.handle}</span>}
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-volt-100">
                  Open
                  <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-volt-400/20 blur-2xl transition-all duration-500 group-hover:bg-volt-400/35" />
              </a>
            )
          })}
        </div>
      )}

      {/* Elsewhere — secondary links + coming soon, clearly separated */}
      {(secondary.length > 0 || pending.length > 0) && (
        <div data-contact="elsewhere" className="flex flex-col gap-4 border-t border-white/8 pt-6">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-chalk-400">
            Elsewhere
          </span>

          {secondary.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {secondary.map((link) => {
                const Icon = socialIcons[link.icon]
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass group inline-flex items-center gap-3 rounded-full py-2.5 pl-3 pr-5 transition-colors hover:text-volt-200"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-void-800/60 text-chalk-200 transition-colors group-hover:text-volt-200">
                      <Icon width={17} height={17} />
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold text-chalk-100">{link.label}</span>
                      {link.handle && <span className="block text-[0.7rem] text-chalk-400">{link.handle}</span>}
                    </span>
                  </a>
                )
              })}
            </div>
          )}

          {pending.length > 0 && (
            <div data-contact="pending" className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-chalk-400">Coming soon:</span>
              {pending.map((link) => (
                <span
                  key={link.label}
                  className="rounded-full border border-dashed border-white/12 px-3 py-1 text-xs text-chalk-400"
                >
                  {link.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </ViewShell>
  )
}
