import { useEffect, type RefObject } from 'react'
import { gsap } from './gsapSetup'

/** Hero entrance. Skipped entirely when the visitor prefers reduced motion. Cleans up on unmount. */
export function useHeroIntro(scope: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero="eyebrow"]', { autoAlpha: 0, y: 12, duration: 0.5 })
          .from('[data-hero="line"]', { autoAlpha: 0, yPercent: 40, duration: 0.7, stagger: 0.12 }, '-=0.2')
          .from('[data-hero="meta"]', { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.3')
          .from('[data-hero="visual"]', { autoAlpha: 0, scale: 0.94, duration: 0.9 }, '-=0.6')
      },
      root,
    )
    return () => mm.revert()
  }, [scope])
}
