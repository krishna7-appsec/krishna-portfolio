import { useState, type ChangeEvent } from 'react'
import Button from '../../../components/ui/Button'
import { simulateIdor } from '../../../lib/simulations'
import { ResultBox, SimCard, checkboxClass } from './SimCard'

const IDS = ['1001', '1002', '1003'] as const

export default function IdorDemo() {
  const [requested, setRequested] = useState<string | null>(null)
  const [fixed, setFixed] = useState(false)
  return (
    <SimCard title="IDOR / BOLA" description="You are user 1001. Request your own record, then someone else’s.">
      <div className="flex flex-wrap gap-2">
        {IDS.map((id) => (
          <Button key={id} variant="secondary" onClick={() => setRequested(id)}>GET /api/user/{id}</Button>
        ))}
      </div>
      <label className={checkboxClass}>
        <input type="checkbox" checked={fixed} onChange={(e: ChangeEvent<HTMLInputElement>) => setFixed(e.target.checked)} />
        Apply the fix (server-side ownership check)
      </label>
      <ResultBox result={requested ? simulateIdor(requested, fixed) : null} />
    </SimCard>
  )
}
