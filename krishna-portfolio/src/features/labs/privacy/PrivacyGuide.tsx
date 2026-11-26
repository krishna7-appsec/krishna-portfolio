import Card from '../../../components/ui/Card'
import { developerTips, dpdp, privacyQuote, safeAiRules } from '../../../data/learning/privacy'

export default function PrivacyGuide() {
  return (
    <div className="space-y-6">
      <blockquote className="border-l-2 border-accent pl-4 text-lg text-fg">“{privacyQuote}”</blockquote>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-bold">10 rules for safe AI use</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted marker:text-accent">
            {safeAiRules.map((r) => <li key={r}>{r}</li>)}
          </ol>
        </Card>
        <div className="space-y-4">
          <Card>
            <h3 className="font-display text-lg font-bold">For developers</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted marker:text-accent">
              {developerTips.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-bold">{dpdp.title}</h3>
            <p className="mt-2 text-sm text-muted">{dpdp.text}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
