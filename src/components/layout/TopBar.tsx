import { Logo } from '../ui/Logo'
import { useView } from '../../lib/view'

/** Minimal top bar — just the brand mark. */
export function TopBar() {
  const { go } = useView()

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center px-5 py-4 lg:px-8">
      <button
        type="button"
        onClick={() => go('home')}
        aria-label="Home"
        className="transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Logo size={46} />
      </button>
    </header>
  )
}
