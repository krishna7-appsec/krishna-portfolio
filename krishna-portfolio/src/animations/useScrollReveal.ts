import { useEffect } from 'react'
import { ScrollTrigger, gsap } from './gsapSetup'

/**
 * Home-page scroll animations: elements marked data-reveal fade up once as they enter, and the
 * experience timeline line draws as you scroll. Does nothing under reduced motion.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('[data-reveal]', { autoAlpha: 0, y: 24 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch: Element[]) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: true }),
      })
      gsap.fromTo(
        '[data-timeline-line]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#experience', start: 'top 70%', end: 'bottom 70%', scrub: true } },
      )
    })
    const refresh = () => ScrollTrigger.refresh()
    void document.fonts?.ready.then(refresh)
    return () => mm.revert()
  }, [])
}
