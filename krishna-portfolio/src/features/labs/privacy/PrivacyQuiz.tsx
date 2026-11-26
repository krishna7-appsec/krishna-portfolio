import { useState } from 'react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import type { QuizQuestion } from '../../../types'

export default function PrivacyQuiz({ questions }: { questions: readonly QuizQuestion[] }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  if (index >= questions.length) {
    return (
      <Card>
        <p role="status" className="text-lg">
          Score: <strong className="text-accent">{score}/{questions.length}</strong>.{' '}
          {score >= 4 ? 'Privacy defender!' : 'Review the rules for safe AI use above and try again.'}
        </p>
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={() => {
              setIndex(0)
              setScore(0)
              setPicked(null)
            }}
          >
            Retry
          </Button>
        </div>
      </Card>
    )
  }

  const q = questions[index]
  const answered = picked !== null
  const choose = (i: number) => {
    if (answered) return
    setPicked(i)
    if (i === q.answerIndex) setScore((s) => s + 1)
  }

  return (
    <Card>
      <p className="font-mono text-xs text-accent">Question {index + 1} of {questions.length}</p>
      <p className="mt-2 font-semibold">{q.question}</p>
      <div role="group" aria-label="Answer options" className="mt-3 space-y-2">
        {q.options.map((o, i) => (
          <button
            key={o}
            type="button"
            disabled={answered}
            onClick={() => choose(i)}
            className={`block w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default ${
              answered && i === q.answerIndex ? 'border-accent text-accent' : answered && i === picked ? 'border-red-400 text-red-400' : 'border-white/15 hover:border-accent/50'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <p role="status" className="mt-3 min-h-5 text-sm">
        {answered && (picked === q.answerIndex ? <span className="text-accent">Correct.</span> : <span className="text-red-400">Not quite. The answer is: {q.options[q.answerIndex]}.</span>)}
      </p>
      {answered && (
        <div className="mt-3">
          <Button onClick={() => { setPicked(null); setIndex((i) => i + 1) }}>
            {index + 1 === questions.length ? 'See score' : 'Next question'}
          </Button>
        </div>
      )}
    </Card>
  )
}
