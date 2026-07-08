import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import { ViewShell } from '../layout/ViewShell'
import { ViewHeader } from '../ui/ViewHeader'
import { technologies } from '../../data/technologies'

export function StackView() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
      tl.from('[data-anim="header"]', { y: 40, opacity: 0, duration: 0.8 })
        .from(
          '[data-stack="group"]',
          { y: 50, opacity: 0, scale: 0.94, stagger: 0.09, duration: 0.7, ease: EASE.liquid },
          '-=0.4',
        )
        .from('[data-stack="chip"]', { y: 16, opacity: 0, stagger: 0.012, duration: 0.4 }, '-=0.5')
    },
    { scope },
  )

  return (
    <ViewShell ref={scope} className="flex flex-col gap-8">
      <ViewHeader
        index="03"
        eyebrow="Stack & Expertise"
        title={
          <>
            Built on real <span className="text-volt-gradient">expertise</span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((group, gi) => (
          <div
            key={group.category}
            data-stack="group"
            className={`glass rounded-2xl p-6 ${gi === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <div className="mb-4">
              <h3 className="text-base font-bold text-chalk-100">{group.category}</h3>
              <p className="mt-1 text-xs leading-relaxed text-chalk-400">{group.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  data-stack="chip"
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-transform hover:-translate-y-0.5 ${
                    gi === 0
                      ? 'glass-volt text-volt-100'
                      : 'glass text-chalk-200'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ViewShell>
  )
}
