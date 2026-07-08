import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import { ViewShell } from '../layout/ViewShell'
import { ViewHeader } from '../ui/ViewHeader'
import { projects, type Project, type ProjectStatus } from '../../data/projects'
import { Badge } from '../ui/Badge'
import { ProjectVisual } from '../ui/ProjectVisual'
import { ProjectModal } from '../cards/ProjectModal'
import { ChevronIcon } from '../ui/Icons'

const statusTone: Record<ProjectStatus, string> = {
  Released: 'text-emerald-300',
  'In Development': 'text-volt-300',
  Private: 'text-rose-300',
  Planned: 'text-sky-300',
}

export function WorkView() {
  const scope = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [modal, setModal] = useState<{ project: Project; origin: DOMRect } | null>(null)
  const total = projects.length

  const go = useCallback(
    (dir: number) => setActive((p) => (p + dir + total) % total),
    [total],
  )
  const jump = useCallback((i: number) => setActive(i), [])

  const openModal = useCallback((i: number) => {
    const el = cardRefs.current[i]
    if (!el) return
    setModal({ project: projects[i], origin: el.getBoundingClientRect() })
  }, [])

  // Coverflow layout
  useGSAP(
    () => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        let offset = i - active
        if (offset > total / 2) offset -= total
        if (offset < -total / 2) offset += total
        const abs = Math.abs(offset)
        const isCenter = offset === 0
        gsap.to(card, {
          xPercent: offset * 62,
          scale: isCenter ? 1 : 0.82 - abs * 0.04,
          rotateY: gsap.utils.clamp(-38, 38, -offset * 22),
          z: -abs * 160,
          opacity: abs > 2 ? 0 : 1 - abs * 0.18,
          filter: isCenter ? 'blur(0px)' : `blur(${Math.min(abs * 2, 5)}px)`,
          zIndex: 100 - abs,
          duration: 0.75,
          ease: EASE.liquid,
          pointerEvents: isCenter ? 'auto' : 'none',
        })
      })
    },
    { scope, dependencies: [active] },
  )

  // Entrance
  useGSAP(
    () => {
      gsap.from('[data-anim="header"]', { y: 40, opacity: 0, duration: 0.8, ease: EASE.expo })
      gsap.from('[data-work="stage"]', {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.9,
        ease: EASE.liquid,
        delay: 0.15,
      })
      gsap.from('[data-work="ctl"]', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: EASE.expo,
        delay: 0.5,
      })
    },
    { scope },
  )

  // Swipe + wheel + keyboard
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false })
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, active: true }
  }
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.x
    drag.current.active = false
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }
  const onWheel = (e: React.WheelEvent) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(d) < 12) return
    go(d > 0 ? 1 : -1)
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'Enter') openModal(active)
  }

  return (
    <ViewShell ref={scope} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <ViewHeader
          index="04"
          eyebrow="Featured Work"
          title={
            <>
              Selected <span className="text-volt-gradient">systems</span>
            </>
          }
        />
        <span className="font-mono text-sm text-chalk-400">
          <span className="text-volt-300">{String(active + 1).padStart(2, '0')}</span> /{' '}
          {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Coverflow stage */}
      <div
        data-work="stage"
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects — click a project to expand"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onWheel={onWheel}
        className="relative h-[350px] w-full cursor-grab touch-pan-y select-none outline-none active:cursor-grabbing sm:h-[390px]"
        style={{ perspective: '1400px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              onClick={() => (i === active ? openModal(i) : jump(i))}
              className="glass absolute w-[84vw] max-w-[360px] cursor-pointer rounded-3xl p-5 [transform-style:preserve-3d]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[0.68rem] uppercase tracking-widest text-volt-300/80">
                  {p.category}
                </span>
                <span className={`inline-flex items-center gap-1.5 text-[0.68rem] font-medium ${statusTone[p.status]}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {p.status}
                </span>
              </div>

              <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-2xl border border-white/8">
                <ProjectVisual project={p} />
                {i === active && (
                  <span className="glass absolute bottom-2 right-2 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold text-volt-200">
                    Click to expand
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-chalk-100">{p.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-chalk-300">
                {p.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 3).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          data-work="ctl"
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="glass grid h-12 w-12 place-items-center rounded-full text-chalk-100 transition-transform hover:-translate-x-0.5 hover:text-volt-200"
        >
          <ChevronIcon width={20} height={20} className="rotate-180" />
        </button>

        <div data-work="ctl" className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Go to ${p.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-7 bg-volt-400' : 'w-2 bg-chalk-400/40 hover:bg-chalk-300'
              }`}
            />
          ))}
        </div>

        <button
          data-work="ctl"
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="glass grid h-12 w-12 place-items-center rounded-full text-chalk-100 transition-transform hover:translate-x-0.5 hover:text-volt-200"
        >
          <ChevronIcon width={20} height={20} />
        </button>
      </div>

      {modal &&
        createPortal(
          <ProjectModal
            project={modal.project}
            origin={modal.origin}
            onClose={() => setModal(null)}
          />,
          document.body,
        )}
    </ViewShell>
  )
}
