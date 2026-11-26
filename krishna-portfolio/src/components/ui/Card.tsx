import type { ReactNode } from 'react'

export default function Card({ children, className = '', hover = false, reveal = false }: { children: ReactNode; className?: string; hover?: boolean; reveal?: boolean }) {
  return (
    <div data-reveal={reveal ? '' : undefined} className={`rounded-xl border border-line bg-surface/70 p-6 ${hover ? 'transition-colors hover:border-accent/40' : ''} ${className}`}>
      {children}
    </div>
  )
}
