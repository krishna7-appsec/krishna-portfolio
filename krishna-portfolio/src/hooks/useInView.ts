import { useEffect, useState, type RefObject } from 'react'

/** True while the element is at least partly on screen. Defaults to true where IntersectionObserver is missing. */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return inView
}
