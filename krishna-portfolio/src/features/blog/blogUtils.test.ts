import { describe, expect, it } from 'vitest'
import type { BlogPost } from '../../types'
import { PAGE_SIZE, categoriesOf, filterPosts, formatPublished, plainText, readingTime, relatedPosts } from './blogUtils'

const mk = (slug: string, category: string, tags: string[], body = 'word '.repeat(10)): BlogPost => ({
  slug, title: `Title ${slug}`, category, tags, intro: body, sections: [{ heading: 'H', body: 'text' }], takeaways: ['t'], references: [],
})
const posts = [mk('a', 'API Security', ['API', 'OWASP']), mk('b', 'API Security', ['API']), mk('c', 'Privacy', ['Privacy']), mk('d', 'AI Security', ['LLM'], 'prompt injection basics')]

describe('blog utils', () => {
  it('lists unique categories in order of appearance', () => {
    expect(categoriesOf(posts)).toEqual(['API Security', 'Privacy', 'AI Security'])
  })
  it('filters by category and treats All as no filter', () => {
    expect(filterPosts(posts, 'All', '').length).toBe(4)
    expect(filterPosts(posts, 'API Security', '').map((p) => p.slug)).toEqual(['a', 'b'])
  })
  it('searches title, body, tags and category, requiring every term', () => {
    expect(filterPosts(posts, 'All', 'PROMPT').map((p) => p.slug)).toEqual(['d'])
    expect(filterPosts(posts, 'All', 'owasp').map((p) => p.slug)).toEqual(['a'])
    expect(filterPosts(posts, 'All', 'privacy title').map((p) => p.slug)).toEqual(['c'])
    expect(filterPosts(posts, 'All', 'prompt privacy')).toEqual([])
  })
  it('combines category and search', () => {
    expect(filterPosts(posts, 'API Security', 'owasp').map((p) => p.slug)).toEqual(['a'])
    expect(filterPosts(posts, 'Privacy', 'owasp')).toEqual([])
  })
  it('computes reading time of at least one minute', () => {
    expect(readingTime(posts[0])).toBe(1)
    expect(readingTime(mk('long', 'X', [], 'word '.repeat(450)))).toBe(3)
    expect(plainText(posts[0]).includes('Title a')).toBe(true)
  })
  it('ranks related posts by shared tags, then category, excluding the post itself', () => {
    expect(relatedPosts(posts[0], posts).map((p) => p.slug)).toEqual(['b', 'c', 'd'])
    expect(relatedPosts(posts[0], posts, 1).map((p) => p.slug)).toEqual(['b'])
  })
  it('formats ISO dates and passes invalid ones through', () => {
    expect(formatPublished('2026-11-24')).toBe('24 November 2026')
    expect(formatPublished('not a date')).toBe('not a date')
  })
  it('uses a page size of six', () => {
    expect(PAGE_SIZE).toBe(6)
  })
})
