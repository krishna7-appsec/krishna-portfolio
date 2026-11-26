import { useId, useState, type ChangeEvent } from 'react'
import { scorePassword, type Tone } from '../../../lib/simulations'
import { SimCard, inputClass } from './SimCard'

const BAR: Record<Tone, string> = { ok: 'bg-accent', bad: 'bg-red-400', warn: 'bg-yellow-300', neutral: 'bg-white/20' }
const TEXT: Record<Tone, string> = { ok: 'text-accent', bad: 'text-red-400', warn: 'text-yellow-300', neutral: 'text-muted' }

export default function PasswordDemo() {
  const [value, setValue] = useState('')
  const id = useId()
  const score = scorePassword(value)
  return (
    <SimCard title="Password strength" description="Checked in your browser. Nothing you type here is sent anywhere.">
      <label htmlFor={id} className="text-sm font-medium">Try a password</label>
      <input
        id={id}
        type="password"
        autoComplete="off"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        className={inputClass}
      />
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <div className={`h-full transition-all ${BAR[score.tone]}`} style={{ width: `${score.percent}%` }} />
      </div>
      <p role="status" className={`mt-3 text-sm ${TEXT[score.tone]}`}>
        <strong>{score.label}.</strong> {score.message}
      </p>
    </SimCard>
  )
}
