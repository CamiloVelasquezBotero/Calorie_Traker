import { useRef } from 'react' /* Se usa para tomar una referencia como document.queriSelector */

export function useScrollToView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  const scroll = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return [ref, scroll] as const
}
