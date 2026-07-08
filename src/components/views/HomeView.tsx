import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import { ViewShell } from '../layout/ViewShell'
import { site } from '../../data/site'
import { primaryLinks } from '../../data/links'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ArrowIcon, DiscordIcon, TebexIcon } from '../ui/Icons'
import { useView } from '../../lib/view'

const words = 'Premium systems for FiveM'.split(' ')
const spec: [string, string][] = [
  ['focus', 'security · ui · systems'],
  ['stack', 'Lua · React · TS'],
  ['builds', 'framework-agnostic'],
  ['perf', 'low resmon'],
]

export function HomeView() {
  const scope = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const { go } = useView()

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
      tl.from('[data-home="ghost"]', { opacity: 0, scale: 1.2, duration: 1.2 }, 0)
        .from('[data-home="badge"]', { y: 30, opacity: 0, duration: 0.7 }, 0.1)
        .from(
          '[data-home="word"]',
          { yPercent: 120, opacity: 0, rotateX: -60, stagger: 0.08, duration: 0.9 },
          0.15,
        )
        .from('[data-home="sub"]', { y: 26, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('[data-home="cta"]', { y: 24, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from(
          '[data-home="panel"]',
          { x: 60, opacity: 0, rotateY: 18, duration: 1, ease: EASE.liquid },
          0.35,
        )
        .from('[data-home="row"]', { y: 16, opacity: 0, stagger: 0.06, duration: 0.5 }, '-=0.6')

      // Interactive 3D tilt on the spec panel
      const panel = panelRef.current
      if (panel && window.matchMedia('(pointer: fine)').matches) {
        const rx = gsap.quickTo(panel, 'rotateX', { duration: 0.7, ease: 'power3.out' })
        const ry = gsap.quickTo(panel, 'rotateY', { duration: 0.7, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          const r = panel.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          rx(-ny * 10)
          ry(nx * 12)
        }
        const reset = () => {
          rx(0)
          ry(0)
        }
        panel.addEventListener('pointermove', move)
        panel.addEventListener('pointerleave', reset)
        return () => {
          panel.removeEventListener('pointermove', move)
          panel.removeEventListener('pointerleave', reset)
        }
      }
    },
    { scope },
  )

  return (
    <ViewShell ref={scope} className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Ghost display text (technical, not the brand) */}
      <span
        data-home="ghost"
        aria-hidden
        className="text-stroke pointer-events-none absolute left-0 top-2 -z-0 select-none text-[20vw] font-black leading-none opacity-70 lg:text-[11vw]"
      >
        SYSTEMS
      </span>

      {/* Left: headline */}
      <div className="relative z-10 flex flex-col items-start gap-6">
        <div data-home="badge">
          <Badge tone="live">{site.location}</Badge>
        </div>

        <h1
          className="text-[3rem] font-black leading-[0.92] tracking-tight [perspective:800px] sm:text-6xl lg:text-7xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words.map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-top">
              <span
                data-home="word"
                className={`inline-block ${w === 'FiveM' ? 'text-volt-gradient' : 'text-chalk-100'}`}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p data-home="sub" className="max-w-md text-base leading-relaxed text-chalk-300">
          {site.heroSub}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div data-home="cta">
            <Button variant="volt" size="lg" onClick={() => go('work')}>
              View Work
              <ArrowIcon width={18} height={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div data-home="cta">
            <Button variant="glass" size="lg" href={primaryLinks.discord} external magnetic={false}>
              <DiscordIcon width={18} height={18} />
              Discord
            </Button>
          </div>
          <div data-home="cta">
            <Button variant="glass" size="lg" href={primaryLinks.tebex} external magnetic={false}>
              <TebexIcon width={18} height={18} />
              Store
            </Button>
          </div>
          <div data-home="cta">
            <Button variant="ghost" size="lg" onClick={() => go('contact')}>
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Right: floating spec panel */}
      <div className="relative z-10 [perspective:900px]">
        <div
          ref={panelRef}
          data-home="panel"
          className="glass relative rounded-3xl p-6 will-change-transform [transform-style:preserve-3d]"
        >
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-chalk-400">
            resource.spec
          </span>
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-volt-400/80" />
            <span className="h-2 w-2 rounded-full bg-chalk-400/40" />
            <span className="h-2 w-2 rounded-full bg-chalk-400/40" />
          </span>
        </div>

        <div className="space-y-3 font-mono text-[0.8rem]">
          {spec.map(([k, v]) => (
            <div key={k} data-home="row" className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-chalk-400">{k}</span>
              <span className="text-volt-200">{v}</span>
            </div>
          ))}
        </div>

        <div data-home="row" className="mt-6 flex items-center gap-2 font-mono text-[0.72rem] text-chalk-300">
          <span className="text-volt-400">&gt;</span> code. build. deploy.
        </div>
        </div>
      </div>
    </ViewShell>
  )
}
