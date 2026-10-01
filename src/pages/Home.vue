<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Reveal from '../components/Reveal.vue'
import PortfolioIcon from '../components/PortfolioIcon.vue'
import { portfolioLines, type PortfolioPage } from '../data/portfolio'

const router = useRouter()
const activeTab = ref<PortfolioPage>('financiero')
const activeLine = computed(
  () => portfolioLines.find((line) => line.page === activeTab.value) ?? portfolioLines[0],
)

const steps = [
  { n: '01', title: 'Cuéntenos su necesidad', desc: 'Compártanos su caso financiero, patrimonial o logístico.' },
  { n: '02', title: 'Analizamos su caso', desc: 'Nuestro equipo evalúa la mejor alternativa para su situación.' },
  { n: '03', title: 'Estructuramos la solución', desc: 'Diseñamos una propuesta clara con condiciones y plazos definidos.' },
  { n: '04', title: 'Acompañamos la ejecución', desc: 'Respaldo legal y operativo hasta el cierre de cada operación.' },
]

const heroStats = [
  { n: '+12', l: 'Años de trayectoria' },
  { n: '4', l: 'Líneas de negocio' },
  { n: '100%', l: 'Respaldo legal' },
]

const bandStats = [
  { n: '+12', l: 'Años de experiencia' },
  { n: '+800', l: 'Clientes atendidos' },
  { n: '+2.500', l: 'Operaciones formalizadas' },
  { n: '4', l: 'Líneas de negocio' },
]

const valueProps = [
  {
    title: 'Condiciones claras y cumplimiento normativo.',
    desc: 'Respaldo legal en cada línea de negocio: prendas, hipotecas, contratos formales.',
    icon: 'balance' as const,
  },
  {
    title: 'Respuesta ágil en originación y desembolso.',
    desc: 'Procesos diseñados para reducir tiempos de espera sin sacrificar rigor.',
    icon: 'bolt' as const,
  },
  {
    title: 'Asesoría especializada según cada caso.',
    desc: 'Equipo multidisciplinario: finanzas, derecho, comercio exterior y contabilidad.',
    icon: 'users' as const,
  },
]

function go(name: string) {
  router.push({ name })
}

function scrollToServicios() {
  document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-[#0D1F3C] relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-5 bg-gradient-to-l from-[#B8973A] to-transparent" />

      <div class="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div class="hero-anim">
          <span class="inline-block text-[#D4AF5A] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            GRUPO VANTOR S.A.S.
          </span>
          <h1 class="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style="font-family: Manrope, sans-serif">
            Soluciones que impulsan su patrimonio y operación.
          </h1>
          <p class="text-white/65 text-lg leading-relaxed mb-10 max-w-xl">
            Integramos servicios financieros, inmobiliarios, logísticos y corporativos para acompañar el crecimiento de empresas y personas.
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              type="button"
              class="anim-btn bg-[#B8973A] hover:bg-[#D4AF5A] text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
              @click="go('contacto')"
            >
              Solicitar asesoría
            </button>
            <button
              type="button"
              class="anim-btn border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
              @click="scrollToServicios"
            >
              Conocer nuestras soluciones
            </button>
          </div>
        </div>

        <!-- Hero art panel -->
        <div class="hidden lg:block hero-anim-panel">
          <div class="border border-white/10 rounded-lg p-8 bg-white/5 backdrop-blur-sm">
            <div class="text-[#D4AF5A] text-xs font-bold tracking-[0.18em] uppercase mb-2">PORTAFOLIO DE SERVICIOS</div>
            <div class="text-white/60 text-sm mb-8">Financiero · Inmobiliario · Logístico · Corporativo</div>
            <div class="grid grid-cols-3 gap-6">
              <div v-for="{ n, l } in heroStats" :key="l" class="text-center">
                <div class="text-3xl font-bold text-white mb-1" style="font-family: Manrope, sans-serif">{{ n }}</div>
                <div class="text-white/45 text-xs leading-tight">{{ l }}</div>
              </div>
            </div>
            <div class="border-t border-white/10 mt-8 pt-6 flex flex-col gap-2.5">
              <div v-for="attr in ['Respaldo especializado', 'Procesos ágiles', 'Condiciones claras']" :key="attr" class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-[#D4AF5A] flex-shrink-0" />
                <span class="text-white/60 text-sm">{{ attr }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile attributes strip -->
      <div class="lg:hidden border-t border-white/10 max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 gap-4">
        <div v-for="{ n, l } in heroStats" :key="l" class="text-center">
          <div class="text-2xl font-bold text-white" style="font-family: Manrope, sans-serif">{{ n }}</div>
          <div class="text-white/45 text-[11px]">{{ l }}</div>
        </div>
      </div>
    </section>

    <!-- Stats band -->
    <section class="bg-[#F4F6F9] border-b border-[#E0E6EF]">
      <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <Reveal v-for="({ n, l }, i) in bandStats" :key="l" :delay="i">
          <div class="text-3xl font-bold text-[#0D1F3C] mb-1" style="font-family: Manrope, sans-serif">{{ n }}</div>
          <div class="text-[#6B7A90] text-sm">{{ l }}</div>
        </Reveal>
      </div>
    </section>

    <!-- Services -->
    <section id="servicios" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <Reveal class="text-center mb-16">
          <span class="text-[#B8973A] text-xs font-bold tracking-[0.18em] uppercase">Portafolio de Servicios</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-[#0D1F3C] mt-3 mb-4" style="font-family: Manrope, sans-serif">
            Un grupo económico, cuatro soluciones estratégicas
          </h2>
          <p class="text-[#6B7A90] max-w-xl mx-auto">
            Servicios integrados para decisiones financieras, patrimoniales y operativas.
          </p>
        </Reveal>

        <div class="max-w-4xl mx-auto divide-y divide-[#E0E6EF] border-y border-[#E0E6EF]">
          <Reveal v-for="(line, i) in portfolioLines" :key="line.id" :delay="i">
            <article
              class="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-8 cursor-pointer"
              @click="go(line.page)"
            >
              <div
                class="w-14 h-14 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                :style="{ backgroundColor: line.accent }"
              >
                <PortfolioIcon :name="line.icon" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[10px] font-bold tracking-widest text-[#6B7A90] uppercase mb-1.5">
                  {{ line.tag }}
                </div>
                <h3
                  class="text-[#0D1F3C] font-bold text-xl mb-2 group-hover:text-[#B8973A] transition-colors"
                  style="font-family: Manrope, sans-serif"
                >
                  {{ line.title }}
                </h3>
                <p class="text-[#6B7A90] text-sm leading-relaxed max-w-xl">{{ line.shortDesc }}</p>
              </div>
              <button
                type="button"
                class="self-start sm:self-center text-[#0D1F3C] text-sm font-semibold group-hover:text-[#B8973A] transition-colors flex items-center gap-1.5 flex-shrink-0"
                @click.stop="go(line.page)"
              >
                Conocer
                <svg viewBox="0 0 16 16" fill="none" class="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Value proposition -->
    <section class="py-24 bg-[#F4F6F9]">
      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative">
          <div class="rounded-lg overflow-hidden bg-[#0D1F3C] aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format"
              alt="Edificio corporativo moderno Bogotá"
              class="w-full h-full object-cover opacity-70 mix-blend-luminosity"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-[#0D1F3C]/80 to-transparent" />
            <div class="absolute bottom-8 left-8">
              <div class="text-[#D4AF5A] text-xs font-bold tracking-[0.18em] uppercase mb-1">Grupo Vantor</div>
              <div class="text-white text-xl font-bold" style="font-family: Manrope, sans-serif">Respaldo en cada decisión</div>
            </div>
          </div>
        </div>

        <div>
          <span class="text-[#B8973A] text-xs font-bold tracking-[0.18em] uppercase">Por qué Grupo Vantor</span>
          <h2 class="text-3xl font-bold text-[#0D1F3C] mt-3 mb-8" style="font-family: Manrope, sans-serif">
            Decisiones mejor respaldadas.
          </h2>

          <div class="space-y-6">
            <Reveal
              v-for="({ title, desc, icon }, i) in valueProps"
              :key="title"
              :delay="i"
              class="flex gap-4"
            >
              <div class="w-10 h-10 rounded-full bg-[#0D1F3C]/8 flex items-center justify-center flex-shrink-0">
                <svg
                  v-if="icon === 'balance'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5 text-[#0D1F3C]"
                >
                  <path d="M12 3v18M5 8l7-3 7 3M5 8l3.5 7M19 8l-3.5 7M8.5 15h7" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 21h16" stroke-linecap="round" />
                </svg>
                <svg
                  v-else-if="icon === 'bolt'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5 text-[#0D1F3C]"
                >
                  <path d="M13 2L4 14h7l-1 8 10-14h-7l1-6z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5 text-[#0D1F3C]"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-[#0D1F3C] text-sm mb-1" style="font-family: Manrope, sans-serif">{{ title }}</div>
                <div class="text-[#6B7A90] text-sm leading-relaxed">{{ desc }}</div>
              </div>
            </Reveal>
          </div>

          <button
            type="button"
            class="anim-btn mt-10 bg-[#0D1F3C] hover:bg-[#162D55] text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
            @click="go('nosotros')"
          >
            Conozca Grupo Vantor
          </button>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <Reveal class="text-center mb-16">
          <span class="text-[#B8973A] text-xs font-bold tracking-[0.18em] uppercase">Proceso</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-[#0D1F3C] mt-3" style="font-family: Manrope, sans-serif">
            Acompañamiento de principio a fin
          </h2>
        </Reveal>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div class="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#E0E6EF] z-0" />
          <Reveal
            v-for="({ n, title, desc }, i) in steps"
            :key="n"
            :delay="i"
            class="relative z-10 text-center"
          >
            <div class="w-16 h-16 rounded-full border-2 border-[#0D1F3C] bg-white flex items-center justify-center mx-auto mb-6">
              <span class="text-[#0D1F3C] font-bold text-sm" style="font-family: Manrope, sans-serif">{{ n }}</span>
            </div>
            <h3 class="text-[#0D1F3C] font-bold text-sm mb-3" style="font-family: Manrope, sans-serif">{{ title }}</h3>
            <p class="text-[#6B7A90] text-sm leading-relaxed">{{ desc }}</p>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Business lines tabs -->
    <section class="py-24 bg-[#F4F6F9]">
      <div class="max-w-7xl mx-auto px-6">
        <Reveal class="text-center mb-12">
          <span class="text-[#B8973A] text-xs font-bold tracking-[0.18em] uppercase">Líneas de negocio</span>
          <h2 class="text-3xl font-bold text-[#0D1F3C] mt-3" style="font-family: Manrope, sans-serif">
            Soluciones por área de necesidad
          </h2>
        </Reveal>

        <div class="flex overflow-x-auto gap-1 border-b border-[#E0E6EF] mb-10 pb-0">
          <button
            v-for="line in portfolioLines"
            :key="line.page"
            type="button"
            :class="[
              'px-6 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors -mb-px',
              activeTab === line.page
                ? 'border-[#0D1F3C] text-[#0D1F3C]'
                : 'border-transparent text-[#6B7A90] hover:text-[#3D4A5C]',
            ]"
            @click="activeTab = line.page"
          >
            {{ line.label }}
          </button>
        </div>

        <div class="grid md:grid-cols-2 gap-10 items-start">
          <ul class="space-y-4">
            <li v-for="item in activeLine.tabItems" :key="item" class="flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-[#0D1F3C] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 12 12" fill="none" class="w-3 h-3">
                  <path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span class="text-[#3D4A5C] text-sm leading-relaxed">{{ item }}</span>
            </li>
          </ul>
          <div class="bg-white rounded-lg border border-[#E0E6EF] p-8">
            <div class="text-[#B8973A] text-xs font-bold tracking-widest uppercase mb-3">¿Le interesa esta área?</div>
            <p class="text-[#3D4A5C] text-sm leading-relaxed mb-6">
              Cuéntenos su caso y un asesor especializado se pondrá en contacto en menos de 24 horas.
            </p>
            <button
              type="button"
              class="anim-btn w-full bg-[#0D1F3C] hover:bg-[#162D55] text-white font-semibold py-3 rounded transition-colors text-sm"
              @click="go('contacto')"
            >
              {{ activeLine.ctaLabel }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-[#0D1F3C] relative overflow-hidden py-24">
      <div class="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots2" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots2)" />
        </svg>
      </div>
      <Reveal class="relative max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-5" style="font-family: Manrope, sans-serif">
          Conversemos sobre la mejor solución para su negocio.
        </h2>
        <p class="text-white/60 text-lg mb-10">
          Cuéntenos su necesidad financiera, inmobiliaria, logística o corporativa. Un asesor se pondrá en contacto con usted.
        </p>
        <button
          type="button"
          class="anim-btn bg-[#B8973A] hover:bg-[#D4AF5A] text-white font-bold px-10 py-4 rounded transition-colors text-sm"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
        <p class="text-white/35 text-sm mt-6">Respuesta inicial en menos de 24 horas.</p>
      </Reveal>
    </section>
  </div>
</template>
