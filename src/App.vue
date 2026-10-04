<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { NOT_FOUND_ROUTE_NAME } from './seo/site'

const route = useRoute()
const pageKey = computed(() => String(route.name ?? route.path))
const isNotFound = computed(() => route.name === NOT_FOUND_ROUTE_NAME)
</script>

<template>
  <div class="flex flex-col overflow-x-clip" :class="isNotFound ? 'min-h-dvh' : 'min-h-screen'">
    <Navbar />
    <main :key="pageKey" class="flex-1 min-w-0 w-full page-enter" :class="{ 'flex flex-col': isNotFound }">
      <RouterView />
    </main>
    <Footer v-if="!isNotFound" />
  </div>
</template>
