import { useEffect } from 'react'

const DEFAULT_TITLE = 'Krishna | Application Security Analyst – VAPT, SAST, REST API Security'

export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} | Krishna – Application Security Analyst` : DEFAULT_TITLE
  }, [title])
}
