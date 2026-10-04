import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'
import { installRouteSeo } from './seo/head'
import './index.css'

const router = createAppRouter(createWebHistory(import.meta.env.BASE_URL))
installRouteSeo(router)

const app = createApp(App).use(router)
// Mount once the lazy route component is resolved so prerendered HTML is swapped in a single pass.
router.isReady().then(() => app.mount('#app'))
