interface LogoProps {
  className?: string
  /** Height in px. */
  size?: number
  /** Show the wordmark next to the badge. */
  showText?: boolean
}

/** Tae Lab's brand mark — uses the real logo asset. */
export function Logo({ className = '', size = 40, showText = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.webp"
        alt="Tae Lab's"
        width={size}
        height={size}
        className="block select-none object-contain drop-shadow-[0_4px_18px_rgba(201,162,39,0.28)]"
        style={{ height: size, width: 'auto' }}
        draggable={false}
      />
      {showText && (
        <span className="text-[1.05rem] font-extrabold tracking-tight text-chalk-100">
          Tae<span className="text-volt-gradient"> Lab's</span>
        </span>
      )}
    </span>
  )
}
