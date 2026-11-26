import { useState } from 'react'
import type { QuizQuestion } from '../../../types'

export default function TopicQuiz({ quiz }: { quiz: QuizQuestion }) {
  const [picked, setPicked] = useState<number | null>(null)
  const done = picked !== null
  const correct = picked === quiz.answerIndex

  return (
    <div className="border-t border-dashed border-line pt-4">
      <p className="text-sm font-semibold text-fg">Knowledge check: {quiz.question}</p>
      <div role="group" aria-label="Answer options" className="mt-2 flex flex-wrap gap-2">
        {quiz.options.map((option, i) => (
          <button
            key={option}
            type="button"
            disabled={done}
            onClick={() => setPicked(i)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors disabled:cursor-default ${
              done && i === quiz.answerIndex
                ? 'border-accent text-accent'
                : done && i === picked
                  ? 'border-red-400 text-red-400'
                  : 'border-white/15 text-fg hover:border-accent/60'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <p role="status" className={`mt-2 min-h-5 text-sm ${correct ? 'text-accent' : 'text-red-400'}`}>
        {done && (correct ? 'Correct.' : `Not quite. The answer is: ${quiz.options[quiz.answerIndex]}.`)}
      </p>
      {done && (
        <button type="button" onClick={() => setPicked(null)} className="text-xs text-azure hover:underline">
          Try again
        </button>
      )}
    </div>
  )
}
