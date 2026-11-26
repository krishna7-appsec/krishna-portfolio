import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary'
interface Common { variant?: Variant; className?: string; children: ReactNode }
type AsLink = Common & { to: string }
type AsAnchor = Common & { href: string; external?: boolean; download?: boolean }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonProps = AsLink | AsAnchor | AsButton

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'
const styles: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-accent/85',
  secondary: 'border border-white/15 text-fg hover:border-accent/60 hover:text-accent',
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children } = props
  const cls = `${base} ${styles[variant]} ${className}`

  if ('to' in props) return <Link to={props.to} className={cls}>{children}</Link>

  if ('href' in props) {
    const external = props.external ?? /^https?:/.test(props.href)
    return (
      <a
        href={props.href}
        className={cls}
        {...(props.download ? { download: true } : {})}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props
  return <button type="button" className={cls} {...rest}>{children}</button>
}
