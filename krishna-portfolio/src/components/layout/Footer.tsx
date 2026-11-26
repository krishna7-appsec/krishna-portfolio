import { CONTACT_ITEM, NAV_ITEMS } from '../../data/navigation'
import { personal } from '../../data/personal'
import { social } from '../../data/social'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold tracking-wide">{personal.brand}</p>
          <p className="mt-1 text-sm text-muted">{personal.title}</p>
          <p className="font-mono text-xs text-muted">{personal.specialties.join(' | ')}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {[...NAV_ITEMS, CONTACT_ITEM].map((item) => (
            <Link key={item.to} to={item.to} className="text-muted hover:text-fg">{item.label}</Link>
          ))}
        </nav>
        <ul className="flex flex-col gap-2 text-sm">
          {social.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                className="text-muted hover:text-accent"
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="mt-8">
        <p className="text-xs text-muted">© {new Date().getFullYear()} {personal.displayName}. All rights reserved.</p>
      </Container>
    </footer>
  )
}
