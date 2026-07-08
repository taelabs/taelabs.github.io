import type { Project } from '../../data/projects'

const patterns = [
  'radial-gradient(circle at 25% 20%, rgba(201,162,39,0.22), transparent 55%)',
  'radial-gradient(circle at 75% 30%, rgba(216,189,119,0.18), transparent 55%)',
  'linear-gradient(135deg, rgba(201,162,39,0.16), transparent 60%)',
  'radial-gradient(circle at 50% 80%, rgba(177,134,26,0.20), transparent 60%)',
]

interface ProjectVisualProps {
  project: Project
  /** Which image to show (falls back to a branded placeholder). */
  index?: number
  className?: string
  label?: boolean
}

/** Renders a project image, or a branded gold/dark placeholder when none exists. */
export function ProjectVisual({ project, index = 0, className = '', label = true }: ProjectVisualProps) {
  const src = project.images?.[index]

  if (src) {
    return (
      <img
        src={src}
        alt={`${project.title} preview ${index + 1}`}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative grid h-full w-full place-items-center overflow-hidden bg-void-900 ${className}`}
      style={{ backgroundImage: patterns[index % patterns.length] }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      {label && (
        <div className="relative z-10 flex flex-col items-center gap-1 px-4 text-center">
          <span className="text-volt-gradient text-2xl font-black tracking-tight sm:text-3xl">
            {project.title.split(' ')[0]}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-chalk-400">
            {project.category}
          </span>
        </div>
      )}
    </div>
  )
}
