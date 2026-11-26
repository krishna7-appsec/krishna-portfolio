import type { NavItem } from '../types'

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About', to: '/#about', kind: 'anchor' },
  { label: 'Experience', to: '/#experience', kind: 'anchor' },
  { label: 'Skills', to: '/#skills', kind: 'anchor' },
  { label: 'Projects', to: '/#projects', kind: 'anchor' },
  { label: 'Learn', to: '/learn', kind: 'route' },
  { label: 'Labs', to: '/labs', kind: 'route' },
  { label: 'Blog', to: '/blog', kind: 'route' },
]

export const CONTACT_ITEM: NavItem = { label: 'Contact', to: '/#contact', kind: 'anchor' }
