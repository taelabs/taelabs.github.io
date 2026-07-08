import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import type { Project, ProjectStatus } from '../../data/projects'
import { ProjectVisual } from '../ui/ProjectVisual'
import { Badge } from '../ui/Badge'
import { CloseIcon, CheckIcon, ExternalIcon } from '../ui/Icons'

const statusTone: Record<ProjectStatus, string> = {
  Released: 'text-emerald-300',
  'In Development': 'text-volt-300',
  Private: 'text-rose-300',
  Planned: 'text-sky-300',
}

interface ProjectModalProps {
  project: Project
  origin: DOMRect
  onClose: () => void
}

/** Expands a project from its card (FLIP) into a full detail view. */
export function ProjectModal({ project, origin, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closing = useRef(false)

  const galleryCount = project.images?.length || 3
  const [active, setActive] = useState(0)
  const activeLinks = project.links?.filter((l) => l.url) ?? []

  // Open animation — FLIP from the card's rect to the panel's natural layout.
  useGSAP(
    () => {
      const panel = panelRef.current!
      const last = panel.getBoundingClientRect()
      const dx = origin.left - last.left
      const dy = origin.top - last.top
      const sx = origin.width / last.width
      const sy = origin.height / last.height

      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(panel, {
        transformOrigin: 'top left',
        x: dx,
        y: dy,
        scaleX: sx,
        scaleY: sy,
        borderRadius: 24,
      })
      gsap.set(contentRef.current, { opacity: 0 })

      const tl = gsap.timeline()
      tl.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
        .to(panel, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.6, ease: 'expo.out' }, 0)
        .to(contentRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.25)
        .from(
          '[data-modal="stagger"]',
          { y: 24, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
          0.3,
        )
    },
    { dependencies: [] },
  )

  const close = useCallback(() => {
    if (closing.current) return
    closing.current = true
    const panel = panelRef.current!
    const last = panel.getBoundingClientRect()
    const dx = origin.left - last.left
    const dy = origin.top - last.top
    const sx = origin.width / last.width
    const sy = origin.height / last.height

    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(contentRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
      .to(
        panel,
        {
          x: dx,
          y: dy,
          scaleX: sx,
          scaleY: sy,
          duration: 0.45,
          ease: 'power3.inOut',
          transformOrigin: 'top left',
        },
        0,
      )
      .to(overlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.05)
  }, [origin, onClose])

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={close}
        className="absolute inset-0 bg-void-950/80 backdrop-blur-md"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="glass relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="glass absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full text-chalk-200 transition-all hover:rotate-90 hover:text-volt-200"
        >
          <CloseIcon width={18} height={18} />
        </button>

        <div ref={contentRef} className="scroll-area grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Gallery */}
          <div data-modal="stagger" className="flex flex-col gap-3 p-5 sm:p-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/8">
              <ProjectVisual project={project} index={active} />
              <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.65rem] text-chalk-200">
                {String(active + 1).padStart(2, '0')} / {String(galleryCount).padStart(2, '0')}
              </span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: galleryCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-video flex-1 overflow-hidden rounded-lg border transition-all ${
                    i === active
                      ? 'border-volt-400/60 ring-1 ring-volt-400/40'
                      : 'border-white/8 opacity-60 hover:opacity-100'
                  }`}
                >
                  <ProjectVisual project={project} index={i} label={false} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:pl-2">
            <div data-modal="stagger" className="flex flex-col gap-3">
              <div className="flex items-center gap-3 pr-12 lg:pr-14">
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-volt-300/80">
                  {project.category}
                </span>
                {project.year && (
                  <span className="font-mono text-[0.7rem] text-chalk-400">{project.year}</span>
                )}
                <span
                  className={`ml-auto inline-flex items-center gap-1.5 text-[0.7rem] font-medium ${statusTone[project.status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl font-black leading-tight text-chalk-100 sm:text-3xl">
                {project.title}
              </h2>
              <p className="text-sm leading-relaxed text-chalk-300">{project.longDescription}</p>
            </div>

            <div data-modal="stagger" className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-chalk-400">
                Highlights
              </span>
              <ul className="grid gap-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-chalk-200">
                    <span className="glass-volt mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-volt-200">
                      <CheckIcon width={10} height={10} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div data-modal="stagger" className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} tone="volt">
                  {t}
                </Badge>
              ))}
            </div>

            {activeLinks.length > 0 && (
              <div data-modal="stagger" className="mt-auto flex flex-wrap gap-2 pt-2">
                {activeLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-chalk-100 hover:text-volt-200"
                  >
                    {link.label}
                    <ExternalIcon width={12} height={12} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
