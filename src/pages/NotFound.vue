<script setup lang="ts">
import HeroBackdrop from '../components/HeroBackdrop.vue'
import PortfolioIcon from '../components/PortfolioIcon.vue'
import Reveal from '../components/Reveal.vue'
import { portfolioLines } from '../data/portfolio'
</script>

<template>
  <section class="flex-1 flex flex-col bg-navy relative overflow-hidden">
    <HeroBackdrop align="center" />

    <div class="relative flex-1 flex flex-col justify-center max-w-5xl w-full mx-auto px-6 py-8 lg:py-10">
      <div class="text-center hero-anim hero-anim--zoom">
        <p
          class="text-gold-light text-6xl lg:text-7xl font-bold leading-none mb-4"
          style="font-family: Manrope, sans-serif"
          aria-hidden="true"
        >
          404
        </p>
        <h1 class="text-2xl lg:text-3xl font-bold text-white mb-3" style="font-family: Manrope, sans-serif">
          Página no encontrada
        </h1>
        <p class="text-white/60 text-sm lg:text-base max-w-xl mx-auto mb-6">
          La dirección que buscas no existe o fue movida. Vuelve al inicio o escríbenos y te ayudamos a encontrar lo que necesitas.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="anim-btn bg-gold hover:bg-gold-light text-white font-semibold px-6 py-3 rounded transition-colors text-sm"
          >
            Volver al inicio
          </RouterLink>
          <RouterLink
            :to="{ name: 'contacto' }"
            class="anim-btn border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded transition-colors text-sm"
          >
            Ir a Contacto
          </RouterLink>
        </div>
      </div>

      <nav aria-labelledby="not-found-portfolio" class="mt-10 lg:mt-12 w-full max-w-4xl mx-auto">
        <Reveal variant="blur-in" class="flex items-center justify-center gap-3 mb-5">
          <span class="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-gold/60" aria-hidden="true" />
          <h2 id="not-found-portfolio" class="text-gold-light text-[11px] font-bold tracking-[0.2em] uppercase">
            Quizás te interese
          </h2>
          <span class="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-gold/60" aria-hidden="true" />
        </Reveal>
        <ul class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <Reveal
            v-for="(line, i) in portfolioLines"
            :key="line.id"
            as="li"
            variant="fade-up"
            :delay="i"
            class="min-w-0"
          >
            <RouterLink
              :to="{ name: line.page }"
              class="anim-card group flex flex-col h-full min-w-0 rounded-xl border border-white/10 bg-white/4 p-4 text-left hover:border-gold/60 hover:shadow-lg hover:shadow-black/25"
            >
              <span class="flex items-center justify-between mb-3">
                <span
                  class="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold-light ring-1 ring-gold/25"
                  aria-hidden="true"
                >
                  <PortfolioIcon :name="line.icon" class="w-5 h-5" />
                </span>
                <span
                  class="text-white/30 text-lg leading-none transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-gold-light"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
              <span class="block text-white font-bold text-[15px] leading-tight" style="font-family: Manrope, sans-serif">
                {{ line.label }}
              </span>
              <span class="block text-white/50 text-xs mt-1 truncate" :title="line.tag">{{ line.tag }}</span>
            </RouterLink>
          </Reveal>
        </ul>
      </nav>
    </div>

    <div class="relative border-t border-white/10 bg-navy-dark/60">
      <div class="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row justify-between gap-1 text-[11px] text-white/40 text-center sm:text-left">
        <span>© 2026 Grupo Vantor S.A.S. Todos los derechos reservados.</span>
        <span>Vigilado — Cumplimiento normativo colombiano</span>
      </div>
    </div>
  </section>
</template>
