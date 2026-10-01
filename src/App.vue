<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const pageKey = computed(() => String(route.name ?? route.path))
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main :key="pageKey" class="flex-1 page-enter">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
