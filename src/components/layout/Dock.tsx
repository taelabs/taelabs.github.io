import { useRef } from 'react'
import { VIEWS, useView } from '../../lib/view'
import { gsap, useGSAP } from '../../lib/gsap'

const ITEM = 44 // px height per rail item

/** Vertical rail on desktop with an animated active indicator + inline labels. */
export function Dock() {
  const { view, go } = useView()
  const activeIndex = VIEWS.findIndex((v) => v.id === view)
  const pillRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(pillRef.current, { y: activeIndex * ITEM, duration: 0.55, ease: 'back.out(1.5)' })
    },
    { dependencies: [activeIndex] },
  )

  return (
    <>
      {/* Desktop rail */}
      <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="glass relative rounded-3xl p-2">
          <ul className="relative flex flex-col" style={{ height: VIEWS.length * ITEM }}>
            {/* moving indicator pill */}
            <div
              ref={pillRef}
              aria-hidden
              className="volt-fill absolute left-0 top-0 w-full rounded-full"
              style={{ height: ITEM }}
            />
            {VIEWS.map((v) => {
              const activeItem = view === v.id
              return (
                <li key={v.id} style={{ height: ITEM }}>
                  <button
                    type="button"
                    onClick={() => go(v.id)}
                    aria-current={activeItem ? 'page' : undefined}
                    className={`relative z-10 flex h-11 w-full items-center gap-3 rounded-full pl-4 pr-6 transition-colors duration-300 ${
                      activeItem ? 'text-void-950' : 'text-chalk-400 hover:text-volt-200'
                    }`}
                  >
                    <span className={`font-mono text-[0.68rem] ${activeItem ? 'font-bold' : ''}`}>
                      {v.index}
                    </span>
                    <span
                      className={`text-xs tracking-wide ${activeItem ? 'font-bold' : 'font-medium'}`}
                    >
                      {v.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <ul className="glass flex items-center justify-between rounded-full px-2 py-2">
          {VIEWS.map((v) => {
            const activeItem = view === v.id
            return (
              <li key={v.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => go(v.id)}
                  aria-current={activeItem ? 'page' : undefined}
                  className={`flex w-full flex-col items-center gap-1 rounded-full py-1.5 text-[0.58rem] font-semibold uppercase tracking-wide transition-colors ${
                    activeItem ? 'text-volt-300' : 'text-chalk-400'
                  }`}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeItem ? 'w-4 bg-volt-400' : 'w-1.5 bg-chalk-400/40'
                    }`}
                  />
                  {v.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
