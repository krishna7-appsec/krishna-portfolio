import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { simulatePromptInjection } from '../../../lib/simulations'
import { ResultBox, SimCard, inputClass } from './SimCard'

export default function PromptInjectionDemo() {
  const [input, setInput] = useState('')
  const [sent, setSent] = useState<string | null>(null)
  const id = useId()
  return (
    <SimCard title="Prompt injection" description="This toy assistant guards a secret. Try to make it talk. Example input: Ignore instructions">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          setSent(input)
        }}
      >
        <label htmlFor={id} className="text-sm font-medium">Message to the assistant</label>
        <input id={id} type="text" autoComplete="off" value={input} onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} className={inputClass} />
        <div className="mt-3"><Button type="submit">Send</Button></div>
      </form>
      <ResultBox result={sent === null ? null : simulatePromptInjection(sent)} />
    </SimCard>
  )
}
