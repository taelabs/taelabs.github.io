import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import { ViewShell } from '../layout/ViewShell'
import { ViewHeader } from '../ui/ViewHeader'
import { site } from '../../data/site'

const highlights = [
  {
    n: '01',
    title: 'Security-minded',
    body: 'Server-authoritative logic and hardened resources — protecting your server and revenue.',
  },
  {
    n: '02',
    title: 'Framework-ready',
    body: 'Native support across ESX, QBCore and QBox with clean, portable architecture.',
  },
  {
    n: '03',
    title: 'Design-driven',
    body: 'Bespoke NUI and full redesigns that give your server a real, cohesive identity.',
  },
  {
    n: '04',
    title: 'Built to scale',
    body: 'Documented, modular systems engineered to grow without collapsing under their own weight.',
  },
]

export function AboutView() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
      tl.from('[data-anim="header"]', { y: 40, opacity: 0, duration: 0.8 })
        .from('[data-about="lead"]', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from(
          '[data-about="card"]',
          { y: 50, opacity: 0, rotateX: -20, stagger: 0.1, duration: 0.7, ease: EASE.liquid },
          '-=0.3',
        )
    },
    { scope },
  )

  return (
    <ViewShell ref={scope} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-center gap-6">
        <ViewHeader
          index="02"
          eyebrow="About"
          title={
            <>
              Engineering, not <span className="text-volt-gradient">templates</span>
            </>
          }
        />
        <p data-about="lead" className="max-w-md text-base leading-relaxed text-chalk-300">
          {site.aboutLong}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 self-center sm:grid-cols-2 [perspective:1000px]">
        {highlights.map((h) => (
          <div
            key={h.n}
            data-about="card"
            className="glass group rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1.5"
          >
            <span className="text-volt-gradient font-mono text-2xl font-black">{h.n}</span>
            <h3 className="mt-3 text-lg font-bold text-chalk-100">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-chalk-300">{h.body}</p>
          </div>
        ))}
      </div>
    </ViewShell>
  )
}
