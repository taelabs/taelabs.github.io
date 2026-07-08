import { forwardRef, type ReactNode } from 'react'

interface ViewShellProps {
  children: ReactNode
  className?: string
  /** Max content width. Defaults to 6xl. */
  width?: string
}

/**
 * Standard view wrapper.
 * - Fills the stage, scrolls internally if content is taller than the viewport
 *   (so nothing ever overflows or overlaps the chrome).
 * - Vertically centers content when it fits.
 * The forwarded ref points at the inner content box (use it as the GSAP scope).
 */
export const ViewShell = forwardRef<HTMLDivElement, ViewShellProps>(function ViewShell(
  { children, className = '', width = 'max-w-6xl' },
  ref,
) {
  return (
    <div className="scroll-area h-full w-full overflow-x-hidden">
      <div className="flex min-h-full w-full items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div ref={ref} className={`w-full ${width} ${className}`}>
          {children}
        </div>
      </div>
    </div>
  )
})
