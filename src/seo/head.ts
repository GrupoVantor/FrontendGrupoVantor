import type { RouteLocationNormalized, Router } from 'vue-router'
import { canonicalUrl, NOT_FOUND_ROUTE_NAME, notFoundSeo, ROBOTS_NOINDEX, seoForPath } from './site'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeHeadElement(selector: string) {
  document.head.querySelector(selector)?.remove()
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** Site-wide robots value from the build; dist/404.html keeps it in data-default. */
function readDefaultRobots(): string {
  const el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  return el?.dataset.default ?? el?.content ?? 'index, follow'
}

export function applyRouteSeo(to: RouteLocationNormalized, defaultRobots: string) {
  if (to.name === NOT_FOUND_ROUTE_NAME) {
    document.title = notFoundSeo.title
    upsertMeta('name', 'description', notFoundSeo.description)
    upsertMeta('name', 'robots', ROBOTS_NOINDEX)
    removeHeadElement('link[rel="canonical"]')
    removeHeadElement('meta[property="og:url"]')
    upsertMeta('property', 'og:title', notFoundSeo.title)
    upsertMeta('property', 'og:description', notFoundSeo.description)
    upsertMeta('name', 'twitter:title', notFoundSeo.title)
    upsertMeta('name', 'twitter:description', notFoundSeo.description)
    return
  }

  const seo = seoForPath(to.path)
  const url = canonicalUrl(seo.path)
  document.title = seo.title
  upsertMeta('name', 'description', seo.description)
  upsertMeta('name', 'robots', defaultRobots)
  upsertCanonical(url)
  upsertMeta('property', 'og:title', seo.title)
  upsertMeta('property', 'og:description', seo.description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('name', 'twitter:title', seo.title)
  upsertMeta('name', 'twitter:description', seo.description)
}

export function installRouteSeo(router: Router) {
  const defaultRobots = readDefaultRobots()
  router.afterEach((to) => applyRouteSeo(to, defaultRobots))
}
