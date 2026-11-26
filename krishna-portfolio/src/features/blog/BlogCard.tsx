import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types'
import { formatPublished, readingTime } from './blogUtils'
import CoverArt from './CoverArt'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-surface/70 transition-colors hover:border-accent/50">
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <div className="aspect-video overflow-hidden">
          <CoverArt category={post.category} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <p className="font-mono text-xs text-accent">{post.category}</p>
          <h3 className="mt-2 font-display text-lg font-bold">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted">{post.intro}</p>
          <p className="mt-4 text-xs text-muted">
            {readingTime(post)} min read
            {post.publishedAt ? ` · ${formatPublished(post.publishedAt)}` : ''}
          </p>
        </div>
      </Link>
    </article>
  )
}
