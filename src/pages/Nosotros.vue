<script setup lang="ts">
import { useRouter } from 'vue-router'
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
    <section class="bg-[#0D1F3C] py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-8">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-nosotros" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-nosotros)" />
        </svg>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 hero-anim">
        <div class="text-white/40 text-xs mb-4">
          <button type="button" class="hover:text-white transition-colors" @click="go('inicio')">Inicio</button>
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
      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative rounded-lg overflow-hidden bg-[#0D1F3C] aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format"
            alt="Oficina corporativa moderna"
            class="w-full h-full object-cover opacity-60"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/60 to-transparent" />
        </div>
        <div>
          <span class="text-[#B8973A] text-xs font-bold tracking-[0.18em] uppercase">Nuestra Misión</span>
          <h2 class="text-3xl font-bold text-[#0D1F3C] mt-3 mb-6" style="font-family: Manrope, sans-serif">
            Facilitar liquidez, patrimonio y operación bajo un mismo grupo
          </h2>
          <p class="text-[#6B7A90] text-base leading-relaxed">
            Conectamos capital, activos e infraestructura logística para que nuestros clientes tomen mejores decisiones financieras, patrimoniales y operativas, con respaldo legal y asesoría especializada en cada etapa.
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-[#F4F6F9]">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="text-[#B8973A] text-xs font-bold tracking-[0.18em] uppercase">Nuestros Valores</span>
          <h2 class="text-3xl font-bold text-[#0D1F3C] mt-3" style="font-family: Manrope, sans-serif">
            Los principios que guían cada operación
          </h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <Reveal v-for="({ title, desc, icon }, i) in values" :key="title" :delay="i">
            <div class="anim-card bg-white rounded-lg border border-[#E0E6EF] p-8 hover:shadow-md transition-shadow h-full">
              <div class="w-12 h-12 rounded-lg bg-[#0D1F3C] text-white flex items-center justify-center mb-5">
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
              <h3 class="text-[#0D1F3C] font-bold text-lg mb-3" style="font-family: Manrope, sans-serif">{{ title }}</h3>
              <p class="text-[#6B7A90] text-sm leading-relaxed">{{ desc }}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="bg-[#0D1F3C] py-16">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <Reveal v-for="({ n, l }, i) in stats" :key="l" :delay="i">
          <div class="text-4xl font-bold text-white mb-2" style="font-family: Manrope, sans-serif">{{ n }}</div>
          <div class="text-white/50 text-sm">{{ l }}</div>
        </Reveal>
      </div>
    </section>

    <section class="py-20 bg-white text-center">
      <div class="max-w-2xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-[#0D1F3C] mb-4" style="font-family: Manrope, sans-serif">
          Conoce cómo podemos acompañarte
        </h2>
        <p class="text-[#6B7A90] mb-8">Agenda una asesoría inicial sin costo con nuestro equipo.</p>
        <button
          type="button"
          class="anim-btn bg-[#0D1F3C] hover:bg-[#162D55] text-white font-semibold px-8 py-4 rounded transition-colors"
          @click="go('contacto')"
        >
          Contactar al Equipo
        </button>
      </div>
    </section>
  </div>
</template>
