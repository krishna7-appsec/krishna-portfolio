import { useId, useMemo, useState, type ChangeEvent } from 'react'
import Button from '../../components/ui/Button'
import { posts } from '../../data/blog'
import BlogCard from './BlogCard'
import { PAGE_SIZE, categoriesOf, filterPosts } from './blogUtils'

const CATEGORIES = ['All', ...categoriesOf(posts)]

export default function BlogList() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const searchId = useId()
  const matches = useMemo(() => filterPosts(posts, category, query), [category, query])
  const shown = matches.slice(0, visible)

  return (
    <div>
      <label htmlFor={searchId} className="sr-only">Search articles</label>
      <input
        id={searchId}
        type="search"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value)
          setVisible(PAGE_SIZE)
        }}
        placeholder="Search articles"
        className="w-full max-w-md rounded-lg border border-white/15 bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted/60"
      />
      <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={c === category}
            onClick={() => {
              setCategory(c)
              setVisible(PAGE_SIZE)
            }}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
              c === category ? 'border-accent bg-accent/10 text-accent' : 'border-white/15 text-muted hover:border-accent/50 hover:text-fg'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p role="status" className="mt-4 text-sm text-muted">Showing {shown.length} of {matches.length} articles</p>
      {shown.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => <li key={p.slug}><BlogCard post={p} /></li>)}
        </ul>
      ) : (
        <p className="mt-6 text-muted">No articles match your search.</p>
      )}
      {shown.length < matches.length && (
        <div className="mt-8 text-center">
          <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more</Button>
        </div>
      )}
    </div>
  )
}
