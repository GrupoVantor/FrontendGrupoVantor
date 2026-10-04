import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'

export {
  routeSeo,
  canonicalUrl,
  notFoundSeo,
  NOT_FOUND_PRERENDER_PATH,
  ROBOTS_NOINDEX,
} from './seo/site'

/** Build-time only: renders a route to static HTML for scripts/prerender.mjs. */
export async function render(url: string): Promise<string> {
  const router = createAppRouter(createMemoryHistory())
  const app = createSSRApp(App).use(router)
  await router.push(url)
  await router.isReady()
  return renderToString(app)
}
