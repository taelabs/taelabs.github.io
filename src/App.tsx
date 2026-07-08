import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from './lib/gsap'
import { ViewContext, type ViewId } from './lib/view'
import { Background } from './components/ui/Background'
import { TopBar } from './components/layout/TopBar'
import { Dock } from './components/layout/Dock'
import { Footer } from './components/layout/Footer'
import { HomeView } from './components/views/HomeView'
import { AboutView } from './components/views/AboutView'
import { StackView } from './components/views/StackView'
import { WorkView } from './components/views/WorkView'
import { ServicesView } from './components/views/ServicesView'
import { ContactView } from './components/views/ContactView'

const viewMap: Record<ViewId, () => React.ReactElement> = {
  home: HomeView,
  about: AboutView,
  stack: StackView,
  work: WorkView,
  services: ServicesView,
  contact: ContactView,
}

export default function App() {
  const [view, setView] = useState<ViewId>('home')
  const [shown, setShown] = useState<ViewId>('home')
  const stageRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  const go = useCallback(
    (id: ViewId) => {
      if (animating.current || id === view) return
      animating.current = true
      setView(id)
      gsap.to(stageRef.current, {
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        scale: 0.98,
        duration: 0.38,
        ease: 'power2.in',
        onComplete: () => setShown(id),
      })
    },
    [view],
  )

  // Reveal the freshly-mounted view; its own timeline animates the content in.
  useLayoutEffect(() => {
    if (!stageRef.current) return
    gsap.set(stageRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 })
    animating.current = false
  }, [shown])

  const CurrentView = viewMap[shown]

  return (
    <ViewContext.Provider value={{ view, go }}>
      <Background />
      <TopBar />
      <Dock />

      <main className="relative h-screen w-full overflow-hidden pb-24 pt-20 lg:pb-16 lg:pl-48">
        <div ref={stageRef} className="h-full w-full will-change-transform">
          <CurrentView />
        </div>
      </main>

      <Footer />
    </ViewContext.Provider>
  )
}
