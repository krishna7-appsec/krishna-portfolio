/**
 * Editable-placeholder convention: unconfirmed professional facts are stored as
 * "[[EDIT: what to add]]" so they are visible in the UI and searchable in the code.
 */
const OPEN = '[[EDIT: '
const CLOSE = ']]'

export const placeholder = (label: string): string => `${OPEN}${label}${CLOSE}`
export const isPlaceholder = (value: string): boolean => value.startsWith(OPEN) && value.endsWith(CLOSE)
export const containsPlaceholder = (value: string): boolean => value.includes(OPEN)
export const placeholderLabel = (value: string): string | null =>
  isPlaceholder(value) ? value.slice(OPEN.length, -CLOSE.length) : null

export interface FoundPlaceholder { path: string; label: string }

/** Walks any data structure and lists every whole-string placeholder with its path. */
export function collectPlaceholders(value: unknown, path = ''): FoundPlaceholder[] {
  if (typeof value === 'string') {
    const label = placeholderLabel(value)
    return label === null ? [] : [{ path, label }]
  }
  if (Array.isArray(value)) return value.flatMap((v, i) => collectPlaceholders(v, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => collectPlaceholders(v, path ? `${path}.${k}` : k))
  }
  return []
}
