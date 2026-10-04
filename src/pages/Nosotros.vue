<script setup lang="ts">
import { useRouter } from 'vue-router'
import HeroBackdrop from '../components/HeroBackdrop.vue'
import Reveal from '../components/Reveal.vue'

const router = useRouter()

const values = [
  {
    title: 'Transparencia',
    desc: 'Condiciones claras y cumplimiento normativo en cada línea de negocio.',
    icon: 'shield' as const,
  },
  {
    title: 'Agilidad',
    desc: 'Procesos de originación y desembolso diseñados para responder rápido.',
    icon: 'bolt' as const,
  },
  {
    title: 'Cercanía',
    desc: 'Un equipo de asesores dedicados a entender cada caso particular.',
    icon: 'users' as const,
  },
]

const stats = [
  { n: '+12', l: 'Años de experiencia' },
  { n: '+800', l: 'Clientes atendidos' },
  { n: '+2.500', l: 'Operaciones formalizadas' },
  { n: '4', l: 'Líneas de negocio' },
]

function go(name: string) {
  router.push({ name })
}
</script>

<template>
  <div>
    <section class="bg-navy py-14 sm:py-20 relative overflow-hidden">
      <HeroBackdrop />
      <div class="relative max-w-7xl mx-auto px-6 hero-anim hero-anim--clip">
        <div class="text-white/40 text-xs mb-4">
          <RouterLink :to="{ name: 'inicio' }" class="hover:text-white transition-colors">Inicio</RouterLink>
          <span class="mx-2">/</span>
          <span class="text-white font-medium">Nosotros</span>
        </div>
        <h1 class="text-4xl font-bold text-white mb-4" style="font-family: Manrope, sans-serif">Quiénes Somos</h1>
        <p class="text-white/60 text-lg max-w-2xl">
          Grupo Vantor S.A.S. integra un portafolio de servicios financieros, inmobiliarios, logísticos y corporativos, diseñado para acompañar el crecimiento de empresas y personas naturales.
        </p>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal variant="zoom-out" class="relative rounded-lg overflow-hidden bg-navy aspect-4/3 sm:aspect-video lg:aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format"
            alt="Oficina corporativa moderna"
            loading="lazy"
            width="800"
            height="600"
            class="w-full h-full object-cover opacity-60"
          />
          <div class="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent" />
        </Reveal>
        <Reveal variant="fade-left" :delay="1">
          <span class="text-gold text-xs font-bold tracking-[0.18em] uppercase">Nuestra Misión</span>
          <h2 class="text-3xl font-bold text-navy mt-3 mb-6" style="font-family: Manrope, sans-serif">
            Facilitar liquidez, patrimonio y operación bajo un mismo grupo
          </h2>
          <p class="text-muted text-base leading-relaxed">
            Conectamos capital, activos e infraestructura logística para que nuestros clientes tomen mejores decisiones financieras, patrimoniales y operativas, con respaldo legal y asesoría especializada en cada etapa.
          </p>
        </Reveal>
      </div>
    </section>

    <section class="py-20 bg-surface">
      <div class="max-w-7xl mx-auto px-6">
        <Reveal variant="blur-in" class="text-center mb-14">
          <span class="text-gold text-xs font-bold tracking-[0.18em] uppercase">Nuestros Valores</span>
          <h2 class="text-3xl font-bold text-navy mt-3" style="font-family: Manrope, sans-serif">
            Los principios que guían cada operación
          </h2>
        </Reveal>
        <div class="grid md:grid-cols-3 gap-8">
          <Reveal v-for="({ title, desc, icon }, i) in values" :key="title" variant="flip-up" :delay="i + 1">
            <div class="anim-card bg-white rounded-lg border border-border p-8 hover:shadow-md transition-shadow h-full">
              <div class="w-12 h-12 rounded-lg bg-navy text-white flex items-center justify-center mb-5">
                <svg
                  v-if="icon === 'shield'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-7 h-7"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else-if="icon === 'bolt'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-7 h-7"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-7 h-7"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="9" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 class="text-navy font-bold text-lg mb-3" style="font-family: Manrope, sans-serif">{{ title }}</h3>
              <p class="text-muted text-sm leading-relaxed">{{ desc }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="bg-navy py-16">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <Reveal v-for="({ n, l }, i) in stats" :key="l" variant="zoom-in" :delay="i">
          <div class="text-4xl font-bold text-white mb-2" style="font-family: Manrope, sans-serif">{{ n }}</div>
          <div class="text-white/50 text-sm">{{ l }}</div>
        </Reveal>
      </div>
    </section>

    <section class="py-20 bg-white text-center">
      <Reveal class="max-w-2xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-navy mb-4" style="font-family: Manrope, sans-serif">
          Conoce cómo podemos acompañarte
        </h2>
        <p class="text-muted mb-8">Agenda una asesoría inicial sin costo con nuestro equipo.</p>
        <button
          type="button"
          class="anim-btn bg-navy hover:bg-navy-mid text-white font-semibold px-8 py-4 rounded transition-colors"
          @click="go('contacto')"
        >
          Contactar al Equipo
        </button>
      </Reveal>
    </section>
  </div>
</template>
