<script setup lang="ts">
import { useRouter } from 'vue-router'
import Reveal from './Reveal.vue'
import type { PortfolioLine } from '../data/portfolio'

const props = defineProps<{
  line: PortfolioLine
}>()

const router = useRouter()
const patternId = `svc-grid-${props.line.id}`

function hexWithAlpha(hex: string, alphaHex: string) {
  return `${hex}${alphaHex}`
}

function go(name: string) {
  router.push({ name })
}
</script>

<template>
  <div>
    <section class="bg-[#0D1F3C] py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-8">
        <svg width="100%" height="100%">
          <defs>
            <pattern :id="patternId" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
        </svg>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 hero-anim">
        <nav class="text-white/40 text-xs mb-4 flex items-center gap-2" aria-label="Breadcrumb">
          <button type="button" class="hover:text-white transition-colors" @click="go('inicio')">
            Inicio
          </button>
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
          :delay="i"
        >
          <article class="border border-[#E0E6EF] rounded-lg overflow-hidden">
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
                  class="text-xl font-bold text-[#0D1F3C] mb-3"
                  style="font-family: Manrope, sans-serif"
                >
                  {{ title }}
                </h2>
                <p class="text-[#6B7A90] text-sm leading-relaxed">{{ desc }}</p>
              </div>
              <aside
                class="mt-6 md:mt-0 bg-[#F4F6F9] rounded-lg p-6 border-l-4"
                :style="{ borderLeftColor: line.accent }"
              >
                <div class="text-xs font-bold text-[#0D1F3C] uppercase tracking-widest mb-3">
                  {{ boxLabel }}
                </div>
                <p class="text-[#3D4A5C] text-sm leading-relaxed">{{ box }}</p>
              </aside>
            </div>
          </article>
        </Reveal>
      </div>
    </section>

    <section class="bg-[#0D1F3C] py-20 text-center">
      <div class="max-w-2xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-white mb-4" style="font-family: Manrope, sans-serif">
          ¿Listo para avanzar con {{ line.label.toLowerCase() }}?
        </h2>
        <p class="text-white/60 mb-8">
          Cuéntanos tu caso y un asesor especializado te acompañará en el siguiente paso.
        </p>
        <button
          type="button"
          class="anim-btn bg-[#B8973A] hover:bg-[#D4AF5A] text-white font-semibold px-8 py-4 rounded transition-colors"
          @click="go('contacto')"
        >
          {{ line.ctaLabel }}
        </button>
      </div>
    </section>
  </div>
</template>
