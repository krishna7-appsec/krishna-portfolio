import { useEffect, useState, type SyntheticEvent } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import { networkTopics } from '../../../data/learning/networking'
import TopicQuiz from './TopicQuiz'

export default function NetworkingCourse() {
  const { hash } = useLocation()
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())

  useEffect(() => {
    if (!hash.startsWith('#net-')) return
    const id = hash.slice(5)
    if (networkTopics.some((t) => t.id === id)) setOpen((prev) => new Set(prev).add(id))
  }, [hash])

  const setTopic = (id: string, isOpen: boolean) =>
    setOpen((prev) => {
      if (prev.has(id) === isOpen) return prev
      const next = new Set(prev)
      if (isOpen) next.add(id)
      else next.delete(id)
      return next
    })

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setOpen(new Set(networkTopics.map((t) => t.id)))}>Expand all</Button>
        <Button variant="secondary" onClick={() => setOpen(new Set())}>Collapse all</Button>
      </div>
      <ol className="space-y-3">
        {networkTopics.map((t, i) => (
          <li key={t.id}>
            <details
              id={`net-${t.id}`}
              open={open.has(t.id)}
              onToggle={(e: SyntheticEvent<HTMLDetailsElement>) => setTopic(t.id, e.currentTarget.open)}
              className="scroll-mt-24 rounded-xl border border-line bg-surface/70 p-5"
            >
              <summary className="cursor-pointer font-display text-lg font-bold">
                <span className="mr-3 font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                {t.title}
              </summary>
              <div className="mt-4 space-y-4 text-muted">
                <p>{t.explanation}</p>
                <p><strong className="text-fg">Real-world example.</strong> {t.example}</p>
                <pre
                  role="img"
                  aria-label={`Diagram: ${t.diagram}`}
                  className="overflow-x-auto rounded-lg border border-dashed border-azure/40 bg-ink p-3 font-mono text-xs text-azure"
                >
                  {t.diagram}
                </pre>
                <div>
                  <p className="text-xs uppercase tracking-widest">Commands</p>
                  <pre className="mt-1 overflow-x-auto rounded-lg border border-line bg-ink p-3 font-mono text-sm text-accent"><code>{t.command}</code></pre>
                </div>
                <p><strong className="text-fg">Key takeaway.</strong> {t.takeaway}</p>
                <TopicQuiz quiz={t.quiz} />
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  )
}
