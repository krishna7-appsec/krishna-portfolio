import { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, ShieldCheck, X } from 'lucide-react'
import { CONTACT_ITEM, NAV_ITEMS } from '../../data/navigation'
import { personal } from '../../data/personal'
import type { NavItem } from '../../types'
import Container from '../ui/Container'

const base = 'rounded-md px-3 py-2 text-sm transition-colors'
const routeClass = ({ isActive }: { isActive: boolean }) => `${base} ${isActive ? 'text-accent' : 'text-muted hover:text-fg'}`
const anchorClass = `${base} text-muted hover:text-fg`

function NavEntry({ item }: { item: NavItem }) {
  return item.kind === 'route' ? (
    <NavLink to={item.to} className={routeClass}>{item.label}</NavLink>
  ) : (
    <Link to={item.to} className={anchorClass}>{item.label}</Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const menuId = useId()

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-wide">
          <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
          {personal.brand}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => <NavEntry key={item.to} item={item} />)}
          <Link
            to={CONTACT_ITEM.to}
            className="ml-2 rounded-lg border border-accent/50 px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-ink"
          >
            {CONTACT_ITEM.label}
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-md p-2 text-fg lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </Container>
      <nav id={menuId} aria-label="Mobile" className={open ? 'border-t border-line lg:hidden' : 'hidden'}>
        <Container className="flex flex-col py-3">
          {[...NAV_ITEMS, CONTACT_ITEM].map((item) => <NavEntry key={item.to} item={item} />)}
        </Container>
      </nav>
    </header>
  )
}
