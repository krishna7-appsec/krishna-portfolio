import { describe, expect, it } from 'vitest'
import { posts } from './blog'

describe('blog content', () => {
  it('has the eight migrated posts with unique, URL-safe slugs', () => {
    expect(posts).toHaveLength(8)
    expect(new Set(posts.map((p) => p.slug)).size).toBe(8)
    for (const p of posts) expect(p.slug).toMatch(/^[a-z0-9-]+$/)
  })
  it('keeps every original diagram', () => {
    expect(posts.filter((p) => p.diagram).length).toBe(8)
  })
  it('does not invent dates or authorship', () => {
    for (const p of posts) {
      expect(p.publishedAt === undefined).toBe(true)
      expect(p.author === undefined).toBe(true)
    }
  })
  it('contains no first-person claims, unverified figures or engagement details', () => {
    // Prose only: diagrams are short labels (for example "200 (mine)" in the IDOR request example).
    const prose = posts.map((p) => [p.title, p.intro, ...p.sections.map((s) => s.body), ...p.takeaways].join(' ')).join(' ')
    expect(prose).not.toMatch(/\b(I|My|Me)\b|\b(my|me|mine)\b/)
    expect(JSON.stringify(posts)).not.toMatch(/CVSS|BFSI|\d+%|2026 prediction/)
  })
  it('only cites verified owasp.org references', () => {
    for (const p of posts) for (const r of p.references) expect(r.url).toMatch(/^https:\/\/owasp\.org\//)
  })
  it('has complete content on every post', () => {
    for (const p of posts) {
      for (const f of [p.title, p.category, p.intro]) expect(f.length > 0).toBe(true)
      expect(p.sections.length >= 2).toBe(true)
      expect(p.takeaways.length >= 1).toBe(true)
      expect(p.tags.length >= 1).toBe(true)
    }
  })
})
