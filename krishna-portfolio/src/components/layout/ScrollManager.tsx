import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** A malformed escape in the URL hash (e.g. "#%E0%A4%A") must never crash the app. */
function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/**
 * On navigation: scroll to the hash target (retrying briefly while a lazy route mounts) or to the top,
 * and move focus to <main> for screen-reader users.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const reduced = useReducedMotion()
  const first = useRef(true)

  useEffect(() => {
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth'
    let timer = 0
    if (hash) {
      const id = safeDecode(hash.slice(1))
      let tries = 0
      const go = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior })
        else if (tries++ < 30) timer = window.setTimeout(go, 50)
      }
      go()
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    if (first.current) first.current = false
    else if (!hash) document.getElementById('main')?.focus({ preventScroll: true })
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key, reduced])

  return null
}
