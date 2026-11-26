// Usage: npm run set-domain -- my-site.vercel.app
// Replaces the YOUR-DOMAIN placeholder in robots.txt and sitemap.xml and adds an og:url tag to index.html.
import { readFileSync, writeFileSync } from 'node:fs'

const raw = process.argv[2]
if (!raw) {
  console.error('Usage: npm run set-domain -- your-domain.com')
  process.exit(1)
}
const host = raw.replace(/^https?:\/\//, '').replace(/\/+$/, '')
if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(host)) {
  console.error(`"${raw}" does not look like a domain name.`)
  process.exit(1)
}

for (const file of ['public/robots.txt', 'public/sitemap.xml']) {
  const text = readFileSync(file, 'utf8')
  writeFileSync(file, text.replaceAll('YOUR-DOMAIN', host))
  console.log(`updated ${file}`)
}

const html = readFileSync('index.html', 'utf8')
if (html.includes('property="og:url"')) {
  console.log('index.html already has og:url, left unchanged')
} else {
  const tag = `<meta property="og:url" content="https://${host}/" />`
  const next = html.replace(/(<meta property="og:description"[^>]*\/>)/, `$1\n    ${tag}`)
  if (next === html) console.warn('Could not find the og:description line; add og:url by hand.')
  else writeFileSync('index.html', next)
  console.log('updated index.html')
}
