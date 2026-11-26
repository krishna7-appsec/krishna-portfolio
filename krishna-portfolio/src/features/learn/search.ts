export type EntryKind = 'networking' | 'owasp-web' | 'owasp-api'

export interface SearchEntry {
  kind: EntryKind
  id: string
  title: string
  text: string
  to: string
}

/** Every whitespace-separated term must appear in the title or text. Title hits rank higher. */
export function searchEntries<T extends SearchEntry>(entries: readonly T[], query: string, limit = 20): T[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []
  const scored: { entry: T; score: number }[] = []
  for (const entry of entries) {
    const title = entry.title.toLowerCase()
    const text = entry.text.toLowerCase()
    let score = 0
    let matchesAll = true
    for (const term of terms) {
      const inTitle = title.includes(term)
      if (!inTitle && !text.includes(term)) {
        matchesAll = false
        break
      }
      score += inTitle ? 3 : 1
    }
    if (matchesAll) scored.push({ entry, score })
  }
  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
  return scored.slice(0, limit).map((s) => s.entry)
}
