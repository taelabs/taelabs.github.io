import { createContext, useContext } from 'react'

export const VIEWS = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'stack', label: 'Stack', index: '03' },
  { id: 'work', label: 'Work', index: '04' },
  { id: 'services', label: 'Services', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
] as const

export type ViewId = (typeof VIEWS)[number]['id']

interface ViewContextValue {
  view: ViewId
  go: (id: ViewId) => void
}

export const ViewContext = createContext<ViewContextValue | null>(null)

export function useView() {
  const ctx = useContext(ViewContext)
  if (!ctx) throw new Error('useView must be used within ViewContext')
  return ctx
}
