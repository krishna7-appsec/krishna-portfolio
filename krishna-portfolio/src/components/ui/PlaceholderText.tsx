import { placeholderLabel } from '../../lib/placeholder'

/** Renders normal text as-is; renders an editable placeholder as a clearly marked chip. */
export default function PlaceholderText({ text }: { text: string }) {
  const label = placeholderLabel(text)
  if (label === null) return <>{text}</>
  return (
    <span
      title="Editable placeholder: replace this in src/data"
      className="rounded border border-dashed border-azure/60 bg-azure/10 px-2 py-0.5 font-mono text-xs text-azure"
    >
      Add: {label}
    </span>
  )
}
