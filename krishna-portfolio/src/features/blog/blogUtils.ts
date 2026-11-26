import type { BlogPost } from '../../types'

export const PAGE_SIZE = 6

export const categoriesOf = (posts: readonly BlogPost[]): string[] => [...new Set(posts.map((p) => p.category))]

/** All readable text of a post, used for reading time and search. */
export function plainText(post: BlogPost): string {
  return [
    post.title,
    post.intro,
    ...post.sections.flatMap((s) => [s.heading, s.body, ...(s.steps ?? [])]),
    ...post.takeaways,
  ].join(' ')
}

export function readingTime(post: BlogPost): number {
  const words = plainText(post).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

/** Category filter ('All' = no filter) and a search where every term must match somewhere in the post. */
export function filterPosts(posts: readonly BlogPost[], category: string, query: string): BlogPost[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  return posts.filter((p) => {
    if (category !== 'All' && p.category !== category) return false
    if (terms.length === 0) return true
    const haystack = `${plainText(p)} ${p.tags.join(' ')} ${p.category}`.toLowerCase()
    return terms.every((t) => haystack.includes(t))
  })
}

/** Posts sharing tags (weighted) or the category rank first; fills with the rest in list order. */
export function relatedPosts(post: BlogPost, posts: readonly BlogPost[], limit = 3): BlogPost[] {
  const score = (p: BlogPost) => p.tags.filter((t) => post.tags.includes(t)).length * 2 + (p.category === post.category ? 1 : 0)
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.p)
}

/** '2026-11-24' -> '24 November 2026'. Returns the input unchanged if it is not a valid date. */
export function formatPublished(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
