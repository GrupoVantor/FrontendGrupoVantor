<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { portfolioLines, isPortfolioPage } from '../data/portfolio'

const route = useRoute()
const router = useRouter()

const mobileOpen = ref(false)
const portfolioOpen = ref(false)
const mobilePortfolioOpen = ref(false)
const portfolioRef = ref<HTMLDivElement | null>(null)

const currentName = computed(() => String(route.name ?? ''))
const portfolioActive = computed(() => isPortfolioPage(currentName.value))

const flatLinks = [
  { label: 'Inicio', name: 'inicio' },
  { label: 'Nosotros', name: 'nosotros' },
  { label: 'Contacto', name: 'contacto' },
] as const

function go(name: string) {
  router.push({ name })
  portfolioOpen.value = false
  mobilePortfolioOpen.value = false
  mobileOpen.value = false
}

function linkClass(active: boolean) {
  return active
    ? 'text-[#0D1F3C] bg-[#F4F6F9] font-semibold'
    : 'text-[#3D4A5C] hover:text-[#0D1F3C] hover:bg-[#F4F6F9]'
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    portfolioOpen.value = false
    mobilePortfolioOpen.value = false
    mobileOpen.value = false
  }
}

function onPointer(e: MouseEvent) {
  if (portfolioRef.value && !portfolioRef.value.contains(e.target as Node)) {
    portfolioOpen.value = false
  }
}

watch([portfolioOpen, mobileOpen], ([pOpen, mOpen]) => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', onPointer)
  if (!pOpen && !mOpen) return
  document.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', onPointer)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', onPointer)
})
</script>

<template>
  <!-- Topbar -->
  <div class="hidden md:block text-xs text-white/70 bg-[#081629] py-2">
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <span>Bogotá, Colombia &nbsp;|&nbsp; Lun - Vie: 8:00 a.m. - 5:00 p.m. Hora Colombia</span>
      <span>contacto@grupovantor.com &nbsp;|&nbsp; +57 302 668 7703</span>
    </div>
  </div>

  <!-- Main header -->
  <header class="sticky top-0 z-50 bg-white border-b border-[#E0E6EF] shadow-sm">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
      <!-- Logo -->
      <button
        type="button"
        class="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1F3C]/30 rounded"
        aria-label="Grupo Vantor — Inicio"
        @click="go('inicio')"
      >
        <BrandLogo variant="dark" class="h-12 w-auto" />
      </button>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <button
          type="button"
          :class="['px-4 py-2 text-sm font-medium rounded transition-colors', linkClass(currentName === 'inicio')]"
          @click="go('inicio')"
        >
          Inicio
        </button>
        <button
          type="button"
          :class="['px-4 py-2 text-sm font-medium rounded transition-colors', linkClass(currentName === 'nosotros')]"
          @click="go('nosotros')"
        >
          Nosotros
        </button>

        <!-- Portafolio mega-menu -->
        <div ref="portfolioRef" class="relative">
          <button
            type="button"
            :aria-expanded="portfolioOpen"
            aria-haspopup="true"
            :class="[
              'inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded transition-colors',
              linkClass(portfolioActive),
            ]"
            @click="portfolioOpen = !portfolioOpen"
          >
            Portafolio
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="[
                'w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
                portfolioOpen ? 'rotate-180' : '',
              ]"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div
            :class="['portfolio-mega', portfolioOpen ? 'portfolio-mega--open' : '']"
            :aria-hidden="!portfolioOpen"
          >
            <div class="portfolio-mega__panel bg-white border border-[#E0E6EF] shadow-lg rounded-lg overflow-hidden">
              <div class="grid grid-cols-2 gap-px bg-[#E0E6EF]">
                <button
                  v-for="line in portfolioLines"
                  :key="line.id"
                  type="button"
                  :tabindex="portfolioOpen ? 0 : -1"
                  :class="[
                    'portfolio-mega__item text-left p-5 bg-white hover:bg-[#F4F6F9]',
                    currentName === line.page ? 'bg-[#F4F6F9]' : '',
                  ]"
                  @click="go(line.page)"
                >
                  <div class="flex items-start gap-3">
                    <span
                      class="shrink-0 mt-0.5 text-white p-2 rounded [&_svg]:w-5 [&_svg]:h-5"
                      :style="{ backgroundColor: line.accent }"
                    >
                      <PortfolioIcon :name="line.icon" class="w-5 h-5" />
                    </span>
                    <span>
                      <span class="block text-sm font-semibold text-[#0D1F3C]">
                        {{ line.label }}
                      </span>
                      <span class="block mt-1 text-xs text-[#6B7A90] leading-relaxed">
                        {{ line.shortDesc }}
                      </span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          :class="['px-4 py-2 text-sm font-medium rounded transition-colors', linkClass(currentName === 'contacto')]"
          @click="go('contacto')"
        >
          Contacto
        </button>
      </nav>

      <!-- CTA + mobile hamburger -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="anim-btn hidden lg:inline-flex items-center gap-2 bg-[#0D1F3C] text-white text-sm font-semibold px-5 py-2 rounded hover:bg-[#162D55] transition-colors"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
        <button
          type="button"
          class="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menú"
          :aria-expanded="mobileOpen"
          @click="
            mobileOpen = !mobileOpen;
            if (!mobileOpen) mobilePortfolioOpen = false
          "
        >
          <span :class="['block w-5 h-0.5 bg-[#0D1F3C] transition-all', mobileOpen ? 'rotate-45 translate-y-2' : '']" />
          <span :class="['block w-5 h-0.5 bg-[#0D1F3C] transition-all', mobileOpen ? 'opacity-0' : '']" />
          <span :class="['block w-5 h-0.5 bg-[#0D1F3C] transition-all', mobileOpen ? '-rotate-45 -translate-y-2' : '']" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="lg:hidden border-t border-[#E0E6EF] bg-white px-6 py-4">
      <nav class="flex flex-col gap-1">
        <button
          v-for="{ label, name } in flatLinks.slice(0, 2)"
          :key="name"
          type="button"
          :class="[
            'text-left px-4 py-3 rounded text-sm font-medium transition-colors',
            currentName === name
              ? 'text-[#0D1F3C] bg-[#F4F6F9] font-semibold'
              : 'text-[#3D4A5C] hover:bg-[#F4F6F9]',
          ]"
          @click="go(name)"
        >
          {{ label }}
        </button>

        <!-- Portafolio accordion -->
        <div>
          <button
            type="button"
            :aria-expanded="mobilePortfolioOpen"
            :class="[
              'w-full flex items-center justify-between text-left px-4 py-3 rounded text-sm font-medium transition-colors',
              portfolioActive
                ? 'text-[#0D1F3C] bg-[#F4F6F9] font-semibold'
                : 'text-[#3D4A5C] hover:bg-[#F4F6F9]',
            ]"
            @click="mobilePortfolioOpen = !mobilePortfolioOpen"
          >
            Portafolio
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="[
                'w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
                mobilePortfolioOpen ? 'rotate-180' : '',
              ]"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <div
            :class="['portfolio-accordion', mobilePortfolioOpen ? 'portfolio-accordion--open' : '']"
            :aria-hidden="!mobilePortfolioOpen"
          >
            <div class="portfolio-accordion__inner">
              <div class="ml-2 mt-1 mb-2 border-l-2 border-[#E0E6EF] pl-2 flex flex-col gap-0.5">
                <button
                  v-for="line in portfolioLines"
                  :key="line.id"
                  type="button"
                  :tabindex="mobilePortfolioOpen ? 0 : -1"
                  :class="[
                    'text-left px-4 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2.5',
                    currentName === line.page
                      ? 'text-[#0D1F3C] bg-[#F4F6F9] font-semibold'
                      : 'text-[#3D4A5C] hover:bg-[#F4F6F9]',
                  ]"
                  @click="go(line.page)"
                >
                  <span
                    class="shrink-0 w-1.5 h-1.5 rounded-full"
                    :style="{ backgroundColor: line.accent }"
                  />
                  {{ line.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          :class="[
            'text-left px-4 py-3 rounded text-sm font-medium transition-colors',
            currentName === 'contacto'
              ? 'text-[#0D1F3C] bg-[#F4F6F9] font-semibold'
              : 'text-[#3D4A5C] hover:bg-[#F4F6F9]',
          ]"
          @click="go('contacto')"
        >
          Contacto
        </button>

        <button
          type="button"
          class="anim-btn mt-3 w-full bg-[#0D1F3C] text-white text-sm font-semibold px-5 py-3 rounded hover:bg-[#162D55] transition-colors"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
      </nav>
    </div>
  </header>
</template>
