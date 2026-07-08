import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/**
 * Liquid glass ambient background:
 * animated volt/black blobs, rotating conic sheen, grid + film grain.
 * Blobs drift subtly toward the pointer for a "living glass" feel.
 */
export function Background() {
  const scope = useRef<HTMLDivElement>(null)
  const b1 = useRef<HTMLDivElement>(null)
  const b2 = useRef<HTMLDivElement>(null)
  const b3 = useRef<HTMLDivElement>(null)
  const spot = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const setters = [b1, b2, b3].map((r) => ({
        x: gsap.quickTo(r.current, 'xPercent', { duration: 1.4, ease: 'power2.out' }),
        y: gsap.quickTo(r.current, 'yPercent', { duration: 1.4, ease: 'power2.out' }),
      }))
      const spotX = gsap.quickTo(spot.current, 'x', { duration: 0.6, ease: 'power3.out' })
      const spotY = gsap.quickTo(spot.current, 'y', { duration: 0.6, ease: 'power3.out' })
      const onMove = (e: PointerEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        const ny = (e.clientY / window.innerHeight - 0.5) * 2
        setters.forEach((s, i) => {
          const depth = (i + 1) * 6
          s.x(nx * depth)
          s.y(ny * depth)
        })
        spotX(e.clientX)
        spotY(e.clientY)
      }
      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope },
  )

  return (
    <div ref={scope} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void-950" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_45%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)',
          backgroundSize: '54px 54px',
        }}
      />

      {/* Liquid blobs */}
      <div
        ref={b1}
        className="animate-blob absolute -left-[10%] top-[-8%] h-[46vw] w-[46vw] rounded-full bg-volt-500/10 blur-[140px]"
      />
      <div
        ref={b2}
        className="animate-blob absolute right-[-12%] top-[25%] h-[42vw] w-[42vw] rounded-full bg-volt-600/8 blur-[150px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        ref={b3}
        className="animate-blob absolute bottom-[-15%] left-[30%] h-[38vw] w-[38vw] rounded-full bg-volt-400/6 blur-[160px]"
        style={{ animationDelay: '-11s' }}
      />

      {/* Rotating conic sheen */}
      <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full opacity-[0.07] [background:conic-gradient(from_0deg,transparent,rgba(201,162,39,.5),transparent_35%)] blur-3xl" />

      {/* Pointer-following volt spotlight */}
      <div
        ref={spot}
        className="absolute left-0 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 mix-blend-screen [background:radial-gradient(circle,rgba(201,162,39,.09),rgba(201,162,39,.03)_40%,transparent_70%)]"
      />

      {/* Film grain */}
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,var(--color-void-950)_100%)]" />
    </div>
  )
}
