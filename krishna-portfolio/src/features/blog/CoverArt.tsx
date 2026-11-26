import { CATEGORY_STYLE, DEFAULT_STYLE } from './categories'

/** Original generated cover illustration (SVG, 16:9). No external image is loaded. */
export default function CoverArt({ category, className = '' }: { category: string; className?: string }) {
  const { color, icon } = CATEGORY_STYLE[category] ?? DEFAULT_STYLE
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Cover illustration for ${category}`}
      className={className}
    >
      <rect width="320" height="180" fill="#10151D" />
      <path d="M0 45H320M0 90H320M0 135H320M80 0V180M160 0V180M240 0V180" stroke={color} strokeOpacity="0.16" />
      <circle cx="250" cy="60" r="70" fill={color} fillOpacity="0.12" />
      <text x="26" y="112" fontSize="64">{icon}</text>
      <text x="26" y="158" fill={color} fontFamily="monospace" fontSize="12">{category.toUpperCase()}</text>
    </svg>
  )
}
