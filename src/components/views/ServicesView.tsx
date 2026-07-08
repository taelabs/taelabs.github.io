import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../../lib/gsap'
import { ViewShell } from '../layout/ViewShell'
import { ViewHeader } from '../ui/ViewHeader'
import { services } from '../../data/services'
import { serviceIcons } from '../ui/Icons'

export function ServicesView() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE.expo } })
      tl.from('[data-anim="header"]', { y: 40, opacity: 0, duration: 0.8 }).from(
        '[data-svc="card"]',
        { y: 44, opacity: 0, scale: 0.95, stagger: 0.06, duration: 0.6, ease: EASE.liquid },
        '-=0.4',
      )
    },
    { scope },
  )

  return (
    <ViewShell ref={scope} className="flex flex-col gap-8">
      <ViewHeader
        index="05"
        eyebrow="What I Build"
        title={
          <>
            Serious work, <span className="text-volt-gradient">seriously done</span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon]
          return (
            <div
              key={service.title}
              data-svc="card"
              className="glass group relative overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="glass-volt mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-volt-200">
                <Icon width={22} height={22} />
              </div>
              <h3 className="mb-2 text-base font-bold text-chalk-100">{service.title}</h3>
              <p className="text-sm leading-relaxed text-chalk-300">{service.description}</p>
              <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-volt-400/0 blur-2xl transition-all duration-500 group-hover:bg-volt-400/15" />
            </div>
          )
        })}
      </div>
    </ViewShell>
  )
}
