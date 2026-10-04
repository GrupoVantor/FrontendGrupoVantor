<script setup lang="ts">
import { useRouter } from 'vue-router'
import HeroBackdrop from './HeroBackdrop.vue'
import Reveal from './Reveal.vue'
import type { PortfolioLine } from '../data/portfolio'

defineProps<{
  line: PortfolioLine
}>()

const router = useRouter()

function hexWithAlpha(hex: string, alphaHex: string) {
  return `${hex}${alphaHex}`
}

function go(name: string) {
  router.push({ name })
}
</script>

<template>
  <div>
    <section class="bg-navy py-14 sm:py-20 relative overflow-hidden">
      <HeroBackdrop />
      <div class="relative max-w-7xl mx-auto px-6 hero-anim hero-anim--blur">
        <nav class="hero-anim--slide text-white/40 text-xs mb-4 flex items-center gap-2" aria-label="Breadcrumb">
          <RouterLink :to="{ name: 'inicio' }" class="hover:text-white transition-colors">
            Inicio
          </RouterLink>
          <span>/</span>
          <span>Portafolio</span>
          <span>/</span>
          <span class="text-white font-medium">{{ line.label }}</span>
        </nav>
        <div
          class="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-4"
          :style="{
            backgroundColor: hexWithAlpha(line.accent, '66'),
            color: '#E8EEF8',
          }"
        >
          {{ line.tag }}
        </div>
        <h1 class="text-4xl font-bold text-white mb-4" style="font-family: Manrope, sans-serif">
          {{ line.title }}
        </h1>
        <p class="text-white/60 text-lg max-w-2xl">{{ line.heroLead }}</p>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-5xl mx-auto px-6 space-y-8">
        <Reveal
          v-for="({ tag, title, desc, box, boxLabel }, i) in line.detailBlocks"
          :key="title"
          :variant="i % 2 === 0 ? 'fade-right' : 'fade-left'"
          :delay="i === 0 ? 0 : 1"
        >
          <article class="border border-border rounded-lg overflow-hidden">
            <div class="p-8 md:grid md:grid-cols-2 gap-10">
              <div>
                <span
                  class="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-4"
                  :style="{
                    backgroundColor: hexWithAlpha(line.accent, '1A'),
                    color: line.accent,
                  }"
                >
                  {{ tag }}
                </span>
                <h2
                  class="text-xl font-bold text-navy mb-3"
                  style="font-family: Manrope, sans-serif"
                >
                  {{ title }}
                </h2>
                <p class="text-muted text-sm leading-relaxed">{{ desc }}</p>
              </div>
              <aside
                class="mt-6 md:mt-0 bg-surface rounded-lg p-6 border-l-4"
                :style="{ borderLeftColor: line.accent }"
              >
                <div class="text-xs font-bold text-navy uppercase tracking-widest mb-3">
                  {{ boxLabel }}
                </div>
                <p class="text-grafito text-sm leading-relaxed">{{ box }}</p>
              </aside>
            </div>
          </article>
        </Reveal>
      </div>
    </section>

    <section class="bg-navy py-20 text-center">
      <Reveal variant="zoom-in" class="max-w-2xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-white mb-4" style="font-family: Manrope, sans-serif">
          ¿Listo para avanzar con {{ line.label.toLowerCase() }}?
        </h2>
        <p class="text-white/60 mb-8">
          Cuéntanos tu caso y un asesor especializado te acompañará en el siguiente paso.
        </p>
        <button
          type="button"
          class="anim-btn bg-gold hover:bg-gold-light text-white font-semibold px-8 py-4 rounded transition-colors"
          @click="go('contacto')"
        >
          {{ line.ctaLabel }}
        </button>
      </Reveal>
    </section>
  </div>
</template>
