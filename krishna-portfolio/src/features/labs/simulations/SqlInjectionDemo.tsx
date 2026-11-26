import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import Button from '../../../components/ui/Button'
import { simulateSqlLogin } from '../../../lib/simulations'
import { ResultBox, SimCard, checkboxClass, inputClass } from './SimCard'

export default function SqlInjectionDemo() {
  const [username, setUsername] = useState('admin')
  const [attempt, setAttempt] = useState<string | null>(null)
  const [parameterized, setParameterized] = useState(false)
  const id = useId()
  const run = attempt === null ? null : simulateSqlLogin(attempt, parameterized)

  return (
    <SimCard title="SQL injection" description="Try to log in as admin without knowing the password. Example input: ' OR '1'='1">
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          setAttempt(username)
        }}
      >
        <label htmlFor={id} className="text-sm font-medium">Username</label>
        <input id={id} type="text" spellCheck={false} autoComplete="off" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className={inputClass} />
        <div className="mt-3"><Button type="submit">Log in</Button></div>
        <label className={checkboxClass}>
          <input type="checkbox" checked={parameterized} onChange={(e: ChangeEvent<HTMLInputElement>) => setParameterized(e.target.checked)} />
          Use a parameterized query (the fix)
        </label>
      </form>
      {run && <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-ink p-3 font-mono text-xs text-azure"><code>{run.query}</code></pre>}
      <ResultBox result={run ? run.result : null} />
    </SimCard>
  )
}
