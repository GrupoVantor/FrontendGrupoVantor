import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('../pages/Home.vue'),
      meta: { title: 'Inicio | Grupo Vantor S.A.S.' },
    },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: () => import('../pages/Nosotros.vue'),
      meta: { title: 'Nosotros | Grupo Vantor S.A.S.' },
    },
    {
      path: '/financiero',
      name: 'financiero',
      component: () => import('../pages/Financiero.vue'),
      meta: { title: 'Servicios Financieros | Grupo Vantor S.A.S.' },
    },
    {
      path: '/inmobiliario',
      name: 'inmobiliario',
      component: () => import('../pages/Inmobiliario.vue'),
      meta: { title: 'Servicios Inmobiliarios | Grupo Vantor S.A.S.' },
    },
    {
      path: '/logistico',
      name: 'logistico',
      component: () => import('../pages/Logistico.vue'),
      meta: { title: 'Logística & Comercio Exterior | Grupo Vantor S.A.S.' },
    },
    {
      path: '/corporativo',
      name: 'corporativo',
      component: () => import('../pages/Corporativo.vue'),
      meta: { title: 'Servicios Corporativos | Grupo Vantor S.A.S.' },
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../pages/Contacto.vue'),
      meta: { title: 'Contacto | Grupo Vantor S.A.S.' },
    },
    {
      path: '/politica-de-datos',
      name: 'politica-datos',
      component: () => import('../pages/PoliticaDatos.vue'),
      meta: { title: 'Autorización de Datos Personales | Grupo Vantor S.A.S.' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') document.title = title
})

export default router
