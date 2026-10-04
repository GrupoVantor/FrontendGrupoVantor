// Renders every route to static HTML after `vite build` + `vite build --ssr`.
// Output: dist/index.html, dist/<route>/index.html and dist/404.html (served by Netlify with status 404).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, routeSeo, canonicalUrl, notFoundSeo, NOT_FOUND_PRERENDER_PATH, ROBOTS_NOINDEX } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
const APP_PLACEHOLDER = '<div id="app"></div>'
if (!template.includes(APP_PLACEHOLDER)) {
  throw new Error(`prerender: ${APP_PLACEHOLDER} not found in dist/index.html`)
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function metaPattern(attr, key) {
  return new RegExp(`<meta\\b[^>]*\\b${attr}="${key}"[^>]*>`)
}

function setMeta(html, attr, key, content) {
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}">`
  const pattern = metaPattern(attr, key)
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n  </head>`)
}

function removeTag(html, pattern) {
  return html.replace(new RegExp(`[ \\t]*${pattern.source}\\r?\\n?`), '')
}

const canonicalPattern = /<link\b[^>]*\brel="canonical"[^>]*>/
const robotsPattern = metaPattern('name', 'robots')

function applyHead(html, { title, description }) {
  let result = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
  result = setMeta(result, 'name', 'description', description)
  result = setMeta(result, 'property', 'og:title', title)
  result = setMeta(result, 'property', 'og:description', description)
  result = setMeta(result, 'name', 'twitter:title', title)
  result = setMeta(result, 'name', 'twitter:description', description)
  return result
}

async function renderPage(url) {
  const appHtml = await render(url)
  return template.replace(APP_PLACEHOLDER, `<div id="app">${appHtml}</div>`)
}

for (const route of routeSeo) {
  const url = canonicalUrl(route.path)
  let html = applyHead(await renderPage(route.path), route)
  html = html.replace(canonicalPattern, `<link rel="canonical" href="${escapeAttr(url)}">`)
  html = setMeta(html, 'property', 'og:url', url)

  const outFile =
    route.path === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.path.slice(1), 'index.html')
  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, html)
  console.log(`prerender: ${route.path} -> ${path.relative(root, outFile)}`)
}

{
  let html = applyHead(await renderPage(NOT_FOUND_PRERENDER_PATH), notFoundSeo)
  const defaultRobots = template.match(robotsPattern)?.[0].match(/content="([^"]*)"/)?.[1] ?? 'index, follow'
  html = html.replace(
    robotsPattern,
    `<meta name="robots" content="${ROBOTS_NOINDEX}" data-default="${escapeAttr(defaultRobots)}">`,
  )
  html = removeTag(html, canonicalPattern)
  html = removeTag(html, metaPattern('property', 'og:url'))
  await writeFile(path.join(distDir, '404.html'), html)
  console.log(`prerender: ${NOT_FOUND_PRERENDER_PATH} -> dist/404.html`)
}

await rm(ssrDir, { recursive: true, force: true })
