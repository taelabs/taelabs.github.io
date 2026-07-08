import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

type Variant = 'volt' | 'glass' | 'ghost'
type Size = 'md' | 'lg'

interface ButtonProps {
  href?: string
  children: ReactNode
  variant?: Variant
  size?: Size
  external?: boolean
  magnetic?: boolean
  className?: string
  onClick?: () => void
  'aria-label'?: string
}

const variants: Record<Variant, string> = {
  volt: 'volt-fill font-bold',
  glass: 'glass text-chalk-100 hover:border-volt-400/40',
  ghost: 'text-chalk-300 hover:text-volt-200',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-8 text-[0.95rem]',
}

export function Button({
  href,
  children,
  variant = 'volt',
  size = 'md',
  external,
  magnetic = true,
  className = '',
  onClick,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!magnetic || !ref.current) return
      const el = ref.current
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const relX = e.clientX - (r.left + r.width / 2)
        const relY = e.clientY - (r.top + r.height / 2)
        xTo(relX * 0.35)
        yTo(relY * 0.4)
      }
      const reset = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', reset)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', reset)
      }
    },
    { dependencies: [magnetic], scope: ref },
  )

  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-full transition-[background,border-color,box-shadow] duration-300 will-change-transform ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}
