import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container'
import { posts } from '../../data/blog'
import type { BlogPost } from '../../types'
import BlogCard from './BlogCard'
import { formatPublished, readingTime, relatedPosts } from './blogUtils'
import CoverArt from './CoverArt'

const sectionId = (i: number) => `section-${i + 1}`

export default function ArticleView({ post }: { post: BlogPost }) {
  const related = relatedPosts(post, posts)
  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">{post.category}</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {post.author && <>By {post.author} · </>}
          {post.publishedAt && <><time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time> · </>}
          {readingTime(post)} min read
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">#{t}</li>)}
        </ul>
        <div className="mt-6 aspect-video overflow-hidden rounded-xl border border-line">
          <CoverArt category={post.category} className="h-full w-full" />
        </div>

        <p className="mt-8 text-lg text-muted">{post.intro}</p>

        <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-line p-4">
          <p className="text-xs uppercase tracking-widest text-muted">Contents</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm marker:text-accent">
            {post.sections.map((s, i) => (
              <li key={s.heading}><Link to={`#${sectionId(i)}`} className="text-azure hover:underline">{s.heading}</Link></li>
            ))}
            <li><Link to="#takeaways" className="text-azure hover:underline">Key takeaways</Link></li>
            {post.references.length > 0 && <li><Link to="#references" className="text-azure hover:underline">References</Link></li>}
          </ol>
        </nav>

        {post.diagram && (
          <pre
            role="img"
            aria-label={`Diagram: ${post.diagram}`}
            className="mt-8 overflow-x-auto rounded-lg border border-dashed border-azure/40 bg-ink p-4 font-mono text-sm text-azure"
          >
            {post.diagram}
          </pre>
        )}

        <div className="mt-8 space-y-8">
          {post.sections.map((s, i) => (
            <section key={s.heading} id={sectionId(i)} className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold">{s.heading}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
              {s.steps && (
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted marker:text-accent">
                  {s.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
              {s.code && (
                <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-ink p-3 font-mono text-sm text-accent"><code>{s.code}</code></pre>
              )}
            </section>
          ))}
          <section id="takeaways" className="scroll-mt-24">
            <h2 className="font-display text-xl font-bold">Key takeaways</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted marker:text-accent">
              {post.takeaways.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>
          {post.references.length > 0 && (
            <section id="references" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold">References</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {post.references.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-azure hover:underline">{r.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16 max-w-6xl border-t border-line pt-10">
          <h2 className="font-display text-xl font-bold">Related articles</h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <li key={p.slug}><BlogCard post={p} /></li>)}
          </ul>
        </Container>
      )}
    </article>
  )
}
