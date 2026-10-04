import { createRouter, type RouterHistory, type RouteRecordRaw } from 'vue-router'
import { NOT_FOUND_ROUTE_NAME, notFoundSeo, seoForName } from '../seo/site'

function seoMeta(name: string) {
  const seo = seoForName(name)
  return { title: seo?.title, description: seo?.description }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: () => import('../pages/Home.vue'),
    meta: seoMeta('inicio'),
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: () => import('../pages/Nosotros.vue'),
    meta: seoMeta('nosotros'),
  },
  {
    path: '/financiero',
    name: 'financiero',
    component: () => import('../pages/Financiero.vue'),
    meta: seoMeta('financiero'),
  },
  {
    path: '/inmobiliario',
    name: 'inmobiliario',
    component: () => import('../pages/Inmobiliario.vue'),
    meta: seoMeta('inmobiliario'),
  },
  {
    path: '/logistico',
    name: 'logistico',
    component: () => import('../pages/Logistico.vue'),
    meta: seoMeta('logistico'),
  },
  {
    path: '/corporativo',
    name: 'corporativo',
    component: () => import('../pages/Corporativo.vue'),
    meta: seoMeta('corporativo'),
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: () => import('../pages/Contacto.vue'),
    meta: seoMeta('contacto'),
  },
  {
    path: '/politica-de-datos',
    name: 'politica-datos',
    component: () => import('../pages/PoliticaDatos.vue'),
    meta: seoMeta('politica-datos'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: NOT_FOUND_ROUTE_NAME,
    component: () => import('../pages/NotFound.vue'),
    meta: { title: notFoundSeo.title, description: notFoundSeo.description },
  },
]

export function createAppRouter(history: RouterHistory) {
  return createRouter({
    history,
    scrollBehavior(to) {
      if (to.hash) {
        return new Promise((resolve) => {
          window.setTimeout(() => {
            resolve({ el: to.hash, behavior: 'smooth', top: 96 })
          }, 80)
        })
      }
      return { top: 0, behavior: 'smooth' }
    },
    routes,
  })
}
