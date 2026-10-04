<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroBackdrop from '../components/HeroBackdrop.vue'
import Reveal from '../components/Reveal.vue'
import PortfolioIcon from '../components/PortfolioIcon.vue'
import { portfolioLines, type PortfolioPage } from '../data/portfolio'

const router = useRouter()
const activeTab = ref<PortfolioPage>('financiero')
const activeLine = computed(
  () => portfolioLines.find((line) => line.page === activeTab.value) ?? portfolioLines[0],
)
const activeIndex = computed(() => portfolioLines.findIndex((line) => line.page === activeTab.value))
/** Card chips from the line's detail blocks: the block tag when unique, otherwise its title. */
const activeHighlights = computed(() => {
  const blocks = activeLine.value.detailBlocks
  return blocks
    .map((block) => (blocks.filter((b) => b.tag === block.tag).length === 1 ? block.tag : block.title))
    .slice(0, 3)
})

/** One-line support copy for each `tabItems` entry, condensed from the line's detail blocks. */
const tabItemDescs: Record<PortfolioPage, string[]> = {
  financiero: [
    'Liquidez inmediata sin esperar los plazos de pago de sus clientes.',
    'Préstamos de capital sobre inmuebles, respaldados con hipoteca en primer grado.',
    'Préstamos sobre vehículos con inscripción de prenda como respaldo.',
    'Procesos diseñados para reducir tiempos de espera sin sacrificar rigor.',
  ],
  inmobiliario: [
    'Intermediación profesional con acompañamiento legal en cada etapa.',
    'Elaboración y revisión del contrato de arrendamiento con respaldo legal.',
    'Valoración comercial con perito certificado como soporte de sus operaciones.',
    'Revisión legal de títulos y contratos de compraventa y arrendamiento.',
  ],
  logistico: [
    'Agrupamiento de mercancías de microimportadores en un solo contenedor.',
    'Comparte el contenedor con otros importadores y reduce el flete por volumen.',
    'Acompañamiento completo en trámites aduaneros y documentación de importación.',
    'Consolidaciones programadas para reducir tiempos de tránsito desde el origen.',
  ],
  corporativo: [
    'Información contable organizada, actualizada y oportunamente procesada.',
    'Seguimiento permanente de las obligaciones tributarias y sus vencimientos.',
    'Gestión oportuna de la nómina, la seguridad social y las obligaciones laborales.',
    'Informes contables y financieros, reportes personalizados y soporte.',
  ],
}

const tabList = ref<HTMLElement | null>(null)
const tabButtons = ref<HTMLButtonElement[]>([])
const panelWrap = ref<HTMLElement | null>(null)
const slideDir = ref<'next' | 'prev'>('next')
/** Panel entrance animations only run after a user switch, never on first paint. */
const hasSwitched = ref(false)
const indicator = ref({ x: 0, w: 0 })
const indicatorReady = ref(false)
const indicatorAnimated = ref(false)

let resizeObserver: ResizeObserver | undefined
let heightTimer: ReturnType<typeof setTimeout> | undefined

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function measureIndicator() {
  const btn = tabButtons.value[activeIndex.value]
  if (!btn) return
  indicator.value = { x: btn.offsetLeft, w: btn.offsetWidth }
  indicatorReady.value = true
}

function scrollActiveTabIntoView() {
  const list = tabList.value
  const btn = tabButtons.value[activeIndex.value]
  if (!list || !btn || list.scrollWidth <= list.clientWidth) return
  const left = btn.offsetLeft
  const right = left + btn.offsetWidth
  let target = list.scrollLeft
  if (left < list.scrollLeft) target = left - 16
  else if (right > list.scrollLeft + list.clientWidth) target = right - list.clientWidth + 16
  if (target !== list.scrollLeft) {
    list.scrollTo({ left: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

function selectTab(page: PortfolioPage, focus = false) {
  const next = portfolioLines.findIndex((line) => line.page === page)
  if (next === activeIndex.value) return
  slideDir.value = next > activeIndex.value ? 'next' : 'prev'
  hasSwitched.value = true
  activeTab.value = page
  nextTick(() => {
    measureIndicator()
    scrollActiveTabIntoView()
    if (focus) tabButtons.value[next]?.focus({ preventScroll: true })
  })
}

function onTabKeydown(event: KeyboardEvent) {
  const last = portfolioLines.length - 1
  let next: number
  switch (event.key) {
    case 'ArrowRight':
      next = activeIndex.value === last ? 0 : activeIndex.value + 1
      break
    case 'ArrowLeft':
      next = activeIndex.value === 0 ? last : activeIndex.value - 1
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = last
      break
    default:
      return
  }
  event.preventDefault()
  selectTab(portfolioLines[next].page, true)
}

function setTabRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabButtons.value[index] = el
}

function onPanelBeforeLeave() {
  const wrap = panelWrap.value
  if (!wrap || prefersReducedMotion()) return
  clearTimeout(heightTimer)
  wrap.style.height = `${wrap.offsetHeight}px`
}

function onPanelEnter(el: Element) {
  const wrap = panelWrap.value
  if (!wrap || prefersReducedMotion()) return
  const target = (el as HTMLElement).offsetHeight
  requestAnimationFrame(() => {
    wrap.style.height = `${target}px`
    heightTimer = setTimeout(() => {
      wrap.style.height = ''
    }, 400)
  })
}

onMounted(() => {
  measureIndicator()
  requestAnimationFrame(() => {
    indicatorAnimated.value = true
  })
  if (typeof ResizeObserver !== 'undefined' && tabList.value) {
    resizeObserver = new ResizeObserver(() => measureIndicator())
    resizeObserver.observe(tabList.value)
  }
  document.fonts?.ready.then(() => measureIndicator())
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  clearTimeout(heightTimer)
})

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
    <section class="bg-navy relative overflow-hidden">
      <HeroBackdrop />

      <div class="relative max-w-7xl mx-auto px-6 pt-12 pb-12 sm:py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div class="hero-anim">
          <h1 class="mb-5 lg:mb-6">
            <span class="block text-gold-light text-xs font-bold tracking-[0.2em] uppercase mb-4 lg:mb-6 leading-normal" style="font-family: var(--font-body)">GRUPO VANTOR S.A.S.</span> <span class="block text-[2rem] sm:text-4xl lg:text-5xl font-bold text-white leading-tight" style="font-family: Manrope, sans-serif">Soluciones que impulsan su patrimonio y operación.</span>
          </h1>
          <p class="text-white/65 text-base sm:text-lg leading-relaxed mb-8 lg:mb-10 max-w-xl">
            Integramos servicios financieros, inmobiliarios, logísticos y corporativos para acompañar el crecimiento de empresas y personas.
          </p>
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              class="anim-btn w-full sm:w-auto bg-gold hover:bg-gold-light text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
              @click="go('contacto')"
            >
              Solicitar asesoría
            </button>
            <button
              type="button"
              class="anim-btn w-full sm:w-auto border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
              @click="scrollToServicios"
            >
              Conocer nuestras soluciones
            </button>
          </div>
        </div>

        <!-- Hero art panel -->
        <div class="hidden lg:block hero-anim-panel hero-anim-panel--from-right">
          <div class="border border-white/10 rounded-lg p-8 bg-navy-mid/80 shadow-xl shadow-navy-dark/30">
            <div class="text-gold-light text-xs font-bold tracking-[0.18em] uppercase mb-2">PORTAFOLIO DE SERVICIOS</div>
            <div class="text-white/60 text-sm mb-8">Financiero · Inmobiliario · Logístico · Corporativo</div>
            <div class="grid grid-cols-3 gap-6">
              <div v-for="{ n, l } in heroStats" :key="l" class="text-center">
                <div class="text-3xl font-bold text-white mb-1" style="font-family: Manrope, sans-serif">{{ n }}</div>
                <div class="text-white/45 text-xs leading-tight">{{ l }}</div>
              </div>
            </div>
            <div class="border-t border-white/10 mt-8 pt-6 flex flex-col gap-2.5">
              <div v-for="attr in ['Respaldo especializado', 'Procesos ágiles', 'Condiciones claras']" :key="attr" class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 rounded-full bg-gold-light shrink-0" />
                <span class="text-white/60 text-sm">{{ attr }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile attributes strip -->
      <div class="relative lg:hidden border-t border-white/10 max-w-7xl mx-auto px-6 py-5 grid grid-cols-3 gap-4">
        <div v-for="{ n, l } in heroStats" :key="l" class="text-center">
          <div class="text-2xl font-bold text-white" style="font-family: Manrope, sans-serif">{{ n }}</div>
          <div class="text-white/45 text-[11px]">{{ l }}</div>
        </div>
      </div>
    </section>

    <!-- Stats band -->
    <section class="bg-surface border-b border-border">
      <div class="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <Reveal v-for="({ n, l }, i) in bandStats" :key="l" variant="zoom-in" :delay="i">
          <div class="text-3xl font-bold text-navy mb-1" style="font-family: Manrope, sans-serif">{{ n }}</div>
          <div class="text-muted text-sm">{{ l }}</div>
        </Reveal>
      </div>
    </section>

    <!-- Services -->
    <section id="servicios" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <Reveal variant="blur-in" class="text-center mb-16">
          <span class="text-gold text-xs font-bold tracking-[0.18em] uppercase">Portafolio de Servicios</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-navy mt-3 mb-4" style="font-family: Manrope, sans-serif">
            Un grupo económico, cuatro soluciones estratégicas
          </h2>
          <p class="text-muted max-w-xl mx-auto">
            Servicios integrados para decisiones financieras, patrimoniales y operativas.
          </p>
        </Reveal>

        <div class="max-w-4xl mx-auto divide-y divide-border border-y border-border">
          <Reveal v-for="(line, i) in portfolioLines" :key="line.id" variant="fade-left" :delay="i">
            <article
              class="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-8 cursor-pointer"
              @click="go(line.page)"
            >
              <div
                class="w-14 h-14 rounded-lg flex items-center justify-center text-white shrink-0"
                :style="{ backgroundColor: line.accent }"
              >
                <PortfolioIcon :name="line.icon" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[10px] font-bold tracking-widest text-muted uppercase mb-1.5">
                  {{ line.tag }}
                </div>
                <h3
                  class="text-navy font-bold text-xl mb-2 group-hover:text-gold transition-colors"
                  style="font-family: Manrope, sans-serif"
                >
                  {{ line.title }}
                </h3>
                <p class="text-muted text-sm leading-relaxed max-w-xl">{{ line.shortDesc }}</p>
              </div>
              <RouterLink
                :to="{ name: line.page }"
                :aria-label="`Conocer ${line.title}`"
                class="self-start sm:self-center text-navy text-sm font-semibold group-hover:text-gold transition-colors flex items-center gap-1.5 shrink-0"
                @click.stop
              >
                Conocer
                <svg viewBox="0 0 16 16" fill="none" class="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </RouterLink>
            </article>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Value proposition -->
    <section class="py-24 bg-surface">
      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal variant="clip-up">
          <div class="relative rounded-lg overflow-hidden bg-navy aspect-4/3 sm:aspect-video lg:aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format"
              alt="Edificio corporativo moderno en Bogotá"
              loading="lazy"
              width="800"
              height="600"
              class="w-full h-full object-cover opacity-70 mix-blend-luminosity"
            />
            <div class="absolute inset-0 bg-linear-to-tr from-navy/80 to-transparent" />
            <div class="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <div class="text-gold-light text-xs font-bold tracking-[0.18em] uppercase mb-1">Grupo Vantor</div>
              <div class="text-white text-xl font-bold" style="font-family: Manrope, sans-serif">Respaldo en cada decisión</div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal variant="fade-left">
            <span class="text-gold text-xs font-bold tracking-[0.18em] uppercase">Por qué Grupo Vantor</span>
            <h2 class="text-3xl font-bold text-navy mt-3 mb-8" style="font-family: Manrope, sans-serif">
              Decisiones mejor respaldadas.
            </h2>
          </Reveal>

          <div class="space-y-6">
            <Reveal
              v-for="({ title, desc, icon }, i) in valueProps"
              :key="title"
              variant="fade-left"
              :delay="i + 1"
              class="flex gap-4"
            >
              <div class="w-10 h-10 rounded-full bg-navy/8 flex items-center justify-center shrink-0">
                <svg
                  v-if="icon === 'balance'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5 text-navy"
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
                  class="w-5 h-5 text-navy"
                >
                  <path d="M13 2L4 14h7l-1 8 10-14h-7l1-6z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5 text-navy"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-navy text-sm mb-1" style="font-family: Manrope, sans-serif">{{ title }}</div>
                <div class="text-muted text-sm leading-relaxed">{{ desc }}</div>
              </div>
            </Reveal>
          </div>

          <button
            type="button"
            class="anim-btn mt-10 bg-navy hover:bg-navy-mid text-white font-semibold px-7 py-3.5 rounded transition-colors text-sm"
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
        <Reveal variant="fade-down" class="text-center mb-16">
          <span class="text-gold text-xs font-bold tracking-[0.18em] uppercase">Proceso</span>
          <h2 class="text-3xl lg:text-4xl font-bold text-navy mt-3" style="font-family: Manrope, sans-serif">
            Acompañamiento de principio a fin
          </h2>
        </Reveal>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div class="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border z-0" />
          <Reveal
            v-for="({ n, title, desc }, i) in steps"
            :key="n"
            variant="flip-up"
            :delay="i"
            class="relative z-10 text-center"
          >
            <div class="w-16 h-16 rounded-full border-2 border-navy bg-white flex items-center justify-center mx-auto mb-6">
              <span class="text-navy font-bold text-sm" style="font-family: Manrope, sans-serif">{{ n }}</span>
            </div>
            <h3 class="text-navy font-bold text-sm mb-3" style="font-family: Manrope, sans-serif">{{ title }}</h3>
            <p class="text-muted text-sm leading-relaxed">{{ desc }}</p>
          </Reveal>
        </div>
      </div>
    </section>

    <!-- Business lines tabs -->
    <section class="py-24 bg-surface">
      <div class="max-w-7xl mx-auto px-6">
        <Reveal variant="blur-in" class="text-center mb-12">
          <span class="text-gold text-xs font-bold tracking-[0.18em] uppercase">Líneas de negocio</span>
          <h2 class="text-3xl font-bold text-navy mt-3" style="font-family: Manrope, sans-serif">
            Soluciones por área de necesidad
          </h2>
        </Reveal>

        <div
          ref="tabList"
          role="tablist"
          aria-label="Líneas de negocio"
          class="tab-list relative flex justify-center-safe overflow-x-auto -mx-3 sm:mx-0 sm:gap-1 border-b border-border mb-8 md:mb-10"
          @keydown="onTabKeydown"
        >
          <button
            v-for="(line, i) in portfolioLines"
            :id="`home-tab-${line.page}`"
            :key="line.page"
            :ref="(el) => setTabRef(el, i)"
            type="button"
            role="tab"
            :aria-selected="activeTab === line.page"
            aria-controls="home-tab-panel"
            :tabindex="activeTab === line.page ? 0 : -1"
            :class="[
              'tab-btn flex-1 sm:flex-none min-h-11 px-1 sm:px-6 py-3 text-[13px] tracking-tight sm:text-sm sm:tracking-normal font-semibold whitespace-nowrap border-b-2 transition-colors duration-300',
              activeTab === line.page ? 'text-navy' : 'text-muted hover:text-grafito',
              activeTab === line.page && !indicatorReady ? 'border-gold' : 'border-transparent',
            ]"
            @click="selectTab(line.page)"
          >
            {{ line.label }}
          </button>
          <span
            aria-hidden="true"
            :class="['tab-indicator', indicatorReady ? 'opacity-100' : 'opacity-0', indicatorAnimated ? 'tab-indicator--animated' : '']"
            :style="{ width: `${indicator.w}px`, transform: `translateX(${indicator.x}px)` }"
          />
        </div>

        <Reveal variant="fade-up">
          <div ref="panelWrap" class="tab-panel-wrap">
            <Transition
              :name="`tab-slide-${slideDir}`"
              mode="out-in"
              @before-leave="onPanelBeforeLeave"
              @enter="onPanelEnter"
            >
              <div
                id="home-tab-panel"
                :key="activeTab"
                role="tabpanel"
                :aria-labelledby="`home-tab-${activeTab}`"
                tabindex="0"
                :class="['grid lg:grid-cols-2 gap-6 lg:gap-10 lg:items-stretch lg:min-h-104 xl:min-h-96 focus:outline-none', hasSwitched ? 'tab-panel--animate' : '']"
              >
                <ul class="flex flex-col bg-white rounded-lg border border-border divide-y divide-border">
                  <li
                    v-for="(item, i) in activeLine.tabItems"
                    :key="item"
                    class="tab-item flex items-center gap-4 px-5 py-4 sm:px-6 lg:flex-1"
                    :style="{ '--tab-i': i }"
                  >
                    <div class="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 12 12" fill="none" class="w-3.5 h-3.5" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <div class="min-w-0">
                      <div class="text-navy text-sm font-semibold leading-snug" style="font-family: Manrope, sans-serif">{{ item }}</div>
                      <p v-if="tabItemDescs[activeLine.page][i]" class="text-muted text-[13px] leading-relaxed mt-0.5">
                        {{ tabItemDescs[activeLine.page][i] }}
                      </p>
                    </div>
                  </li>
                </ul>
                <div
                  class="tab-card flex flex-col bg-white rounded-lg border border-border border-t-[3px] p-6 sm:p-8"
                  :style="{ borderTopColor: activeLine.accent, '--tab-accent': activeLine.accent }"
                >
                  <div class="flex items-center gap-4 mb-5">
                    <div
                      class="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0"
                      :style="{ backgroundColor: activeLine.accent }"
                    >
                      <PortfolioIcon :name="activeLine.icon" class="w-6 h-6" />
                    </div>
                    <div class="min-w-0">
                      <div class="text-gold text-[10px] font-bold tracking-widest uppercase mb-1">{{ activeLine.tag }}</div>
                      <h3 class="text-navy font-bold text-lg leading-snug" style="font-family: Manrope, sans-serif">
                        {{ activeLine.title }}
                      </h3>
                    </div>
                  </div>
                  <p class="text-grafito text-sm leading-relaxed mb-5">{{ activeLine.heroLead }}</p>
                  <ul class="flex flex-wrap gap-2 mb-6" aria-label="Aspectos destacados">
                    <li
                      v-for="highlight in activeHighlights"
                      :key="highlight"
                      class="tab-chip text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      {{ highlight }}
                    </li>
                  </ul>
                  <div class="mt-auto flex flex-col gap-3">
                    <RouterLink
                      :to="{ name: 'contacto', query: { servicio: activeLine.page } }"
                      class="anim-btn block w-full text-center bg-navy hover:bg-navy-mid text-white font-semibold py-3 rounded transition-colors text-sm"
                    >
                      {{ activeLine.ctaLabel }}
                    </RouterLink>
                    <RouterLink
                      :to="{ name: activeLine.page }"
                      class="group self-center text-navy hover:text-gold text-sm font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      Conocer {{ activeLine.title }}
                      <svg viewBox="0 0 16 16" fill="none" class="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </RouterLink>
                    <p class="text-muted text-xs text-center">Respuesta inicial en menos de 24 horas.</p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </Reveal>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-navy relative overflow-hidden py-24">
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
      <Reveal variant="zoom-out" class="relative max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-5" style="font-family: Manrope, sans-serif">
          Conversemos sobre la mejor solución para su negocio.
        </h2>
        <p class="text-white/60 text-lg mb-10">
          Cuéntenos su necesidad financiera, inmobiliaria, logística o corporativa. Un asesor se pondrá en contacto con usted.
        </p>
        <button
          type="button"
          class="anim-btn bg-gold hover:bg-gold-light text-white font-bold px-10 py-4 rounded transition-colors text-sm"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
        <p class="text-white/35 text-sm mt-6">Respuesta inicial en menos de 24 horas.</p>
      </Reveal>
    </section>
  </div>
</template>

<style scoped>
.tab-list {
  scrollbar-width: none;
}
.tab-list::-webkit-scrollbar {
  display: none;
}

.tab-indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: linear-gradient(90deg, var(--color-navy), var(--color-gold));
  pointer-events: none;
  will-change: transform, width;
}
.tab-indicator--animated {
  transition:
    transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
    width 350ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 200ms ease-out;
}

.tab-btn:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: -2px;
  border-radius: 4px;
}

.tab-panel-wrap {
  overflow-x: clip;
  transition: height 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.tab-slide-next-enter-active,
.tab-slide-prev-enter-active {
  transition:
    opacity 300ms ease-out,
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.tab-slide-next-leave-active,
.tab-slide-prev-leave-active {
  transition:
    opacity 180ms ease-in,
    transform 180ms ease-in;
}
.tab-slide-next-enter-from,
.tab-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
.tab-slide-next-leave-to,
.tab-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}

.tab-panel--animate .tab-item {
  animation: tab-item-in 340ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(60ms + var(--tab-i, 0) * 45ms);
}
.tab-chip {
  color: var(--tab-accent);
  background-color: color-mix(in srgb, var(--tab-accent) 9%, white);
  border: 1px solid color-mix(in srgb, var(--tab-accent) 22%, white);
}

.tab-panel--animate .tab-card {
  animation: tab-card-in 380ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;
}

@keyframes tab-item-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes tab-card-in {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tab-indicator--animated {
    transition: opacity 150ms linear;
  }
  .tab-panel-wrap {
    transition: none;
  }
  .tab-slide-next-enter-active,
  .tab-slide-prev-enter-active,
  .tab-slide-next-leave-active,
  .tab-slide-prev-leave-active {
    transition: opacity 150ms linear;
  }
  .tab-slide-next-enter-from,
  .tab-slide-prev-enter-from,
  .tab-slide-next-leave-to,
  .tab-slide-prev-leave-to {
    transform: none;
  }
  .tab-panel--animate .tab-item,
  .tab-panel--animate .tab-card {
    animation: none;
  }
}
</style>
