<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import PortfolioIcon from './PortfolioIcon.vue'
import { portfolioLines, isPortfolioPage } from '../data/portfolio'
import { CONTACT_EMAIL } from '../config/contact'
import { ORG_PHONE } from '../seo/site'

const PHONE_HREF = `tel:${ORG_PHONE.replace(/\s+/g, '')}`
const MAIL_HREF = `mailto:${CONTACT_EMAIL}`
const OFFICE_HOURS = 'Lun - Vie: 8:00 a.m. - 5:00 p.m. Hora Colombia'

const route = useRoute()
const router = useRouter()

const mobileOpen = ref(false)
const portfolioOpen = ref(false)
const mobilePortfolioOpen = ref(false)
const portfolioRef = ref<HTMLDivElement | null>(null)
const mobilePortfolioRef = ref<HTMLDivElement | null>(null)
const mobileMenuRef = ref<HTMLDivElement | null>(null)
const mobileToggleRef = ref<HTMLButtonElement | null>(null)

const currentName = computed(() => String(route.name ?? ''))
const portfolioActive = computed(() => isPortfolioPage(currentName.value))

const flatLinks = [
  { label: 'Inicio', name: 'inicio' },
  { label: 'Nosotros', name: 'nosotros' },
  { label: 'Contacto', name: 'contacto' },
] as const

function closeMenus() {
  portfolioOpen.value = false
  mobilePortfolioOpen.value = false
  mobileOpen.value = false
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
  if (!mobileOpen.value) mobilePortfolioOpen.value = false
}

function go(name: string) {
  router.push({ name })
  closeMenus()
}

function linkClass(active: boolean) {
  return active
    ? 'text-navy bg-surface font-semibold'
    : 'text-grafito hover:text-navy hover:bg-surface'
}

const portfolioTriggerClass = computed(() => {
  if (portfolioActive.value) return 'text-navy bg-surface font-semibold'
  if (portfolioOpen.value) return 'text-navy bg-surface'
  return 'text-grafito hover:text-navy hover:bg-surface'
})

const portfolioTriggerRef = ref<HTMLButtonElement | null>(null)

function portfolioItems() {
  return Array.from(portfolioRef.value?.querySelectorAll<HTMLElement>('.portfolio-mega__item') ?? [])
}

async function openPortfolioAndFocus(which: 'first' | 'last') {
  portfolioOpen.value = true
  await nextTick()
  const items = portfolioItems()
  items[which === 'first' ? 0 : items.length - 1]?.focus()
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    openPortfolioAndFocus('first')
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    openPortfolioAndFocus('last')
  }
}

function onMenuKeydown(e: KeyboardEvent) {
  const items = portfolioItems()
  const idx = items.indexOf(document.activeElement as HTMLElement)
  if (idx === -1) return
  let next = -1
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % items.length
  else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + items.length) % items.length
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = items.length - 1
  if (next === -1) return
  e.preventDefault()
  items[next]?.focus()
}

function onPortfolioFocusOut(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  if (next && portfolioRef.value && !portfolioRef.value.contains(next)) portfolioOpen.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (portfolioOpen.value && portfolioRef.value?.contains(document.activeElement)) {
      portfolioTriggerRef.value?.focus()
    }
    if (mobileOpen.value && mobileMenuRef.value?.contains(document.activeElement)) {
      mobileToggleRef.value?.focus()
    }
    portfolioOpen.value = false
    mobilePortfolioOpen.value = false
    mobileOpen.value = false
  }
}

function onPointer(e: MouseEvent) {
  if (portfolioRef.value && !portfolioRef.value.contains(e.target as Node)) {
    portfolioOpen.value = false
  }
  if (mobilePortfolioRef.value && !mobilePortfolioRef.value.contains(e.target as Node)) {
    mobilePortfolioOpen.value = false
  }
}

watch([portfolioOpen, mobileOpen], ([pOpen, mOpen]) => {
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', onPointer)
  if (!pOpen && !mOpen) return
  document.addEventListener('keydown', onKey)
  document.addEventListener('mousedown', onPointer)
})

// EXPAND_AT must be >= spacer height minus collapsed header height, or the exposed
// spacer shows as a white strip under the collapsed bar (desktop 130-50, mobile 73-57).
const THRESHOLDS = {
  desktop: { collapseAt: 100, expandAt: 84 },
  mobile: { collapseAt: 40, expandAt: 20 },
} as const

const scrolled = ref(false)
const isDesktop = ref(false)
let scrollTicking = false
let desktopMql: MediaQueryList | null = null

function updateScrolled() {
  scrollTicking = false
  const y = window.scrollY
  const { collapseAt, expandAt } = isDesktop.value ? THRESHOLDS.desktop : THRESHOLDS.mobile
  if (!scrolled.value && y > collapseAt && !mobileOpen.value) {
    scrolled.value = true
  } else if (scrolled.value && y < expandAt) {
    scrolled.value = false
  }
}

function onScroll() {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(updateScrolled)
}

function onDesktopChange(e: MediaQueryListEvent) {
  isDesktop.value = e.matches
  if (e.matches) {
    mobileOpen.value = false
    mobilePortfolioOpen.value = false
  }
  updateScrolled()
}

function setScrollLock(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

watch(mobileOpen, (open) => {
  if (typeof document !== 'undefined') setScrollLock(open)
})

watch([portfolioOpen, mobileOpen], ([pOpen, mOpen]) => {
  if (!pOpen && !mOpen && typeof window !== 'undefined') updateScrolled()
})

watch(scrolled, (collapsed) => {
  if (collapsed) portfolioOpen.value = false
})

watch(
  () => route.fullPath,
  () => {
    closeMenus()
  },
)

onMounted(() => {
  desktopMql = window.matchMedia('(min-width: 64rem)')
  isDesktop.value = desktopMql.matches
  desktopMql.addEventListener('change', onDesktopChange)
  window.addEventListener('scroll', onScroll, { passive: true })
  updateScrolled()
})

onUnmounted(() => {
  setScrollLock(false)
  document.removeEventListener('keydown', onKey)
  document.removeEventListener('mousedown', onPointer)
  window.removeEventListener('scroll', onScroll)
  desktopMql?.removeEventListener('change', onDesktopChange)
})
</script>

<template>
  <!-- Spacer must equal the expanded header height so collapsing never shifts the page. -->
  <div aria-hidden="true" class="h-18.25 lg:h-32.5" />

  <!-- Main header -->
  <header class="fixed top-0 inset-x-0 z-50 bg-white border-b border-border shadow-sm">
    <div
      :class="['header-top', scrolled ? 'header-top--collapsed' : '']"
      :inert="scrolled && isDesktop"
      :aria-hidden="scrolled && isDesktop ? 'true' : undefined"
    >
    <div class="header-top__inner">
    <div
      :class="[
        'max-w-7xl mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center lg:h-20 transition-[height] duration-300 ease-out motion-reduce:transition-none',
        scrolled ? 'h-14' : 'h-18',
      ]"
    >
      <!-- Contact: phone icon on mobile, phone + email on desktop -->
      <div class="flex items-center justify-start min-w-0">
        <a
          :href="PHONE_HREF"
          class="lg:hidden p-2 -ml-2 text-navy hover:text-navy-mid transition-colors"
          :aria-label="`Llamar al ${ORG_PHONE}`"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-5 h-5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </a>

        <address
          class="hidden lg:flex flex-col gap-1 not-italic text-xs text-muted"
          :title="OFFICE_HOURS"
        >
          <a :href="PHONE_HREF" class="inline-flex items-center gap-2 hover:text-navy transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-3.5 h-3.5 shrink-0 text-gold" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {{ ORG_PHONE }}
          </a>
          <a :href="MAIL_HREF" class="inline-flex items-center gap-2 hover:text-navy transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-3.5 h-3.5 shrink-0 text-gold" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {{ CONTACT_EMAIL }}
          </a>
        </address>
      </div>

      <!-- Logo -->
      <RouterLink
        :to="{ name: 'inicio' }"
        class="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 rounded"
        aria-label="Grupo Vantor — Inicio"
        @click="closeMenus"
      >
        <BrandLogo
          variant="mark"
          :class="`lg:h-16 w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${scrolled ? 'h-9' : 'h-12'}`"
        />
      </RouterLink>

      <!-- CTA + mobile hamburger -->
      <div class="flex items-center justify-end gap-3">
        <button
          type="button"
          class="anim-btn hidden lg:inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2 rounded hover:bg-navy-mid transition-colors"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
        <button
          ref="mobileToggleRef"
          type="button"
          :class="['burger lg:hidden p-2 -mr-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30', mobileOpen ? 'burger--open' : '']"
          :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          @click="toggleMobile"
        >
          <span class="burger__box" aria-hidden="true">
            <span class="burger__bar burger__bar--top" />
            <span class="burger__bar burger__bar--mid" />
            <span class="burger__bar burger__bar--bot" />
          </span>
        </button>
      </div>
    </div>
    </div>
    </div>

    <!-- Desktop nav -->
    <div
      :class="[
        'hidden lg:block border-t transition-colors duration-300 motion-reduce:transition-none',
        scrolled ? 'border-transparent' : 'border-border',
      ]"
    >
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center h-12">
      <div
        :class="['nav-compact nav-compact--start', scrolled ? 'nav-compact--visible' : '']"
        :inert="!scrolled"
      >
        <RouterLink
          :to="{ name: 'inicio' }"
          class="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
          aria-label="Grupo Vantor — Inicio"
          @click="closeMenus"
        >
          <BrandLogo variant="mark" class="h-8 w-auto" />
        </RouterLink>
      </div>
      <nav class="flex items-center justify-center gap-1" aria-label="Principal">
        <RouterLink
          :to="{ name: 'inicio' }"
          :class="['px-4 py-2 text-sm font-medium rounded transition-colors', linkClass(currentName === 'inicio')]"
          @click="closeMenus"
        >
          Inicio
        </RouterLink>
        <RouterLink
          :to="{ name: 'nosotros' }"
          :class="['px-4 py-2 text-sm font-medium rounded transition-colors', linkClass(currentName === 'nosotros')]"
          @click="closeMenus"
        >
          Nosotros
        </RouterLink>

        <!-- Portafolio mega-menu -->
        <div
          ref="portfolioRef"
          class="relative"
          @focusout="onPortfolioFocusOut"
        >
          <button
            ref="portfolioTriggerRef"
            type="button"
            :aria-expanded="portfolioOpen"
            aria-haspopup="true"
            aria-controls="portfolio-mega"
            :class="[
              'inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30',
              portfolioTriggerClass,
            ]"
            @click="portfolioOpen = !portfolioOpen"
            @keydown="onTriggerKeydown"
          >
            Portafolio
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="['portfolio-trigger__chevron w-4 h-4', portfolioOpen ? 'portfolio-trigger__chevron--open' : '']"
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
            id="portfolio-mega"
            :class="['portfolio-mega', portfolioOpen ? 'portfolio-mega--open' : '']"
            :aria-hidden="!portfolioOpen"
          >
            <div class="portfolio-mega__panel">
              <span class="portfolio-mega__caret" aria-hidden="true" />
              <div class="portfolio-mega__grid relative grid grid-cols-2 auto-rows-fr" @keydown="onMenuKeydown">
                <span class="portfolio-mega__divider portfolio-mega__divider--h" aria-hidden="true" />
                <span class="portfolio-mega__divider portfolio-mega__divider--v" aria-hidden="true" />
                <RouterLink
                  v-for="(line, i) in portfolioLines"
                  :key="line.id"
                  :to="{ name: line.page }"
                  :tabindex="portfolioOpen ? 0 : -1"
                  :style="{ '--i': i }"
                  :class="[
                    'portfolio-mega__item block text-left p-5',
                    currentName === line.page ? 'portfolio-mega__item--current' : '',
                  ]"
                  @click="closeMenus"
                >
                  <div class="portfolio-mega__content flex items-start gap-3">
                    <span
                      class="portfolio-mega__badge shrink-0 mt-0.5 text-white p-2 rounded [&_svg]:w-5 [&_svg]:h-5"
                      :style="{ backgroundColor: line.accent }"
                    >
                      <PortfolioIcon :name="line.icon" class="w-5 h-5" />
                    </span>
                    <span class="min-w-0">
                      <span class="portfolio-mega__title flex items-center gap-1.5 text-sm font-semibold text-navy">
                        {{ line.label }}
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="portfolio-mega__arrow w-3.5 h-3.5 text-gold"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-3.71a.75.75 0 111.04-1.08l5.25 4.92a.75.75 0 010 1.08l-5.25 4.92a.75.75 0 11-1.04-1.08l3.96-3.71H3.75A.75.75 0 013 10z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                      <span class="portfolio-mega__desc block mt-1 text-xs text-muted leading-relaxed">
                        {{ line.shortDesc }}
                      </span>
                    </span>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <RouterLink
          :to="{ name: 'contacto' }"
          :class="['px-4 py-2 text-sm font-medium rounded transition-colors', linkClass(currentName === 'contacto')]"
          @click="closeMenus"
        >
          Contacto
        </RouterLink>
      </nav>
      <div
        :class="['nav-compact nav-compact--end', scrolled ? 'nav-compact--visible' : '']"
        :inert="!scrolled"
      >
        <button
          type="button"
          class="anim-btn inline-flex items-center gap-2 bg-navy text-white text-xs font-semibold px-4 py-1.5 rounded hover:bg-navy-mid transition-colors"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
      </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      id="mobile-menu"
      ref="mobileMenuRef"
      :class="['mobile-menu lg:hidden', mobileOpen ? 'mobile-menu--open' : '']"
      :inert="!mobileOpen"
      :aria-hidden="!mobileOpen"
    >
    <div class="mobile-menu__clip">
    <div class="mobile-menu__scroll border-t border-border bg-white px-6 py-4 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
      <nav class="flex flex-col gap-1" aria-label="Menú móvil">
        <RouterLink
          v-for="({ label, name }, i) in flatLinks.slice(0, 2)"
          :key="name"
          :to="{ name }"
          :style="{ '--i': i }"
          :class="[
            'mobile-menu__item text-left px-4 py-3 rounded text-sm font-medium transition-colors',
            currentName === name
              ? 'text-navy bg-surface font-semibold'
              : 'text-grafito active:bg-surface',
          ]"
          @click="closeMenus"
        >
          {{ label }}
        </RouterLink>

        <!-- Portafolio accordion -->
        <div ref="mobilePortfolioRef" class="mobile-menu__item" style="--i: 2">
          <button
            type="button"
            :aria-expanded="mobilePortfolioOpen"
            aria-controls="mobile-portfolio"
            :class="[
              'w-full flex items-center justify-between text-left px-4 py-3 rounded text-sm font-medium transition-colors',
              portfolioActive
                ? 'text-navy bg-surface font-semibold'
                : mobilePortfolioOpen
                  ? 'text-navy bg-surface'
                  : 'text-grafito active:bg-surface',
            ]"
            @click="mobilePortfolioOpen = !mobilePortfolioOpen"
          >
            Portafolio
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="['portfolio-trigger__chevron w-4 h-4', mobilePortfolioOpen ? 'portfolio-trigger__chevron--open' : '']"
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
            id="mobile-portfolio"
            :class="['portfolio-accordion', mobilePortfolioOpen ? 'portfolio-accordion--open' : '']"
            :aria-hidden="!mobilePortfolioOpen"
          >
            <div class="portfolio-accordion__inner">
              <div class="portfolio-accordion__list relative ml-4 mt-1 mb-2 pl-3 flex flex-col gap-0.5">
                <RouterLink
                  v-for="(line, j) in portfolioLines"
                  :key="line.id"
                  :to="{ name: line.page }"
                  :tabindex="mobilePortfolioOpen ? 0 : -1"
                  :style="{ '--j': j }"
                  :class="[
                    'portfolio-accordion__item text-left px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-3',
                    currentName === line.page
                      ? 'text-navy bg-surface font-semibold'
                      : 'text-grafito active:bg-surface',
                  ]"
                  @click="closeMenus"
                >
                  <span
                    class="portfolio-accordion__badge shrink-0 text-white p-1.5 rounded [&_svg]:w-4 [&_svg]:h-4"
                    :style="{ backgroundColor: line.accent }"
                  >
                    <PortfolioIcon :name="line.icon" class="w-4 h-4" />
                  </span>
                  <span class="portfolio-accordion__label">{{ line.label }}</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <RouterLink
          :to="{ name: 'contacto' }"
          style="--i: 3"
          :class="[
            'mobile-menu__item text-left px-4 py-3 rounded text-sm font-medium transition-colors',
            currentName === 'contacto'
              ? 'text-navy bg-surface font-semibold'
              : 'text-grafito active:bg-surface',
          ]"
          @click="closeMenus"
        >
          Contacto
        </RouterLink>

        <button
          type="button"
          class="mobile-menu__item anim-btn mt-3 w-full bg-navy text-white text-sm font-semibold px-5 py-3 rounded hover:bg-navy-mid transition-colors"
          style="--i: 4"
          @click="go('contacto')"
        >
          Solicitar asesoría
        </button>
      </nav>

      <address
        class="mobile-menu__item mt-4 pt-4 border-t border-border not-italic text-xs text-muted flex flex-col gap-2 px-4"
        style="--i: 5"
      >
        <a :href="PHONE_HREF" class="inline-flex items-center gap-2 hover:text-navy transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-3.5 h-3.5 shrink-0 text-gold" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          {{ ORG_PHONE }}
        </a>
        <a :href="MAIL_HREF" class="inline-flex items-center gap-2 hover:text-navy transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-3.5 h-3.5 shrink-0 text-gold" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          {{ CONTACT_EMAIL }}
        </a>
        <span class="inline-flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-3.5 h-3.5 shrink-0 text-gold" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ OFFICE_HOURS }}
        </span>
      </address>
    </div>
    </div>
    </div>
  </header>

  <div
    :class="['mobile-backdrop lg:hidden', mobileOpen ? 'mobile-backdrop--open' : '']"
    aria-hidden="true"
    @click="closeMenus"
  />
</template>

<style scoped>
.header-top {
  display: grid;
  grid-template-rows: 1fr;
  transition:
    grid-template-rows 300ms ease,
    opacity 300ms ease,
    transform 300ms ease;
}

@media (min-width: 64rem) {
  .header-top__inner {
    min-height: 0;
    overflow: hidden;
  }

  .header-top--collapsed {
    grid-template-rows: 0fr;
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}

.nav-compact {
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 300ms ease,
    transform 300ms ease,
    visibility 0s linear 300ms;
}

.nav-compact--start {
  justify-content: flex-start;
  transform: translateX(-0.5rem);
}

.nav-compact--end {
  justify-content: flex-end;
  transform: translateX(0.5rem);
}

.nav-compact--visible {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition:
    opacity 300ms ease,
    transform 300ms ease,
    visibility 0s;
}

/* —— Portafolio mega-menu —— */
.portfolio-trigger__chevron {
  transition:
    transform 280ms cubic-bezier(0.34, 1.4, 0.64, 1),
    color 200ms ease;
}

.portfolio-trigger__chevron--open {
  transform: rotate(180deg);
  color: var(--color-gold);
}

/* padding-top leaves room for the caret between trigger and panel */
.portfolio-mega {
  position: absolute;
  left: 50%;
  top: 100%;
  z-index: 60;
  width: min(36rem, calc(100vw - 2rem));
  padding-top: 0.75rem;
  transform: translateX(-50%);
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0s linear 200ms;
}

.portfolio-mega--open {
  visibility: visible;
  transition: visibility 0s;
}

.portfolio-mega--open .portfolio-mega__panel {
  pointer-events: auto;
}

.portfolio-mega__panel {
  position: relative;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  box-shadow:
    0 22px 44px -16px rgb(13 31 60 / 0.28),
    0 6px 14px -6px rgb(13 31 60 / 0.1);
  transform-origin: 50% 0;
  opacity: 0;
  transform: translateY(-12px) scale(0.97, 0.9);
  clip-path: inset(-14px -32px 100% -32px round 0.75rem);
  transition:
    opacity 200ms ease-in,
    transform 200ms cubic-bezier(0.4, 0, 1, 1),
    clip-path 200ms cubic-bezier(0.4, 0, 1, 1);
}

.portfolio-mega--open .portfolio-mega__panel {
  opacity: 1;
  transform: none;
  clip-path: inset(-14px -32px -56px -32px round 0.75rem);
  transition:
    opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
    clip-path 550ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Upper half of a rotated square, overlapping the panel's top border by 1px. */
.portfolio-mega__caret {
  position: absolute;
  top: -6px;
  left: 50%;
  width: 12px;
  height: 12px;
  background: #fff;
  border-top: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-top-left-radius: 2px;
  transform: translateX(-50%) rotate(45deg);
  clip-path: polygon(0 0, 100% 0, 0 100%);
  z-index: 1;
}

.portfolio-mega__grid {
  border-radius: calc(0.75rem - 1px);
  overflow: hidden;
}

.portfolio-mega__divider {
  position: absolute;
  z-index: 1;
  background: var(--color-border);
  pointer-events: none;
}

.portfolio-mega__divider--h {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
}

.portfolio-mega__divider--v {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform-origin: 50% 0;
}

.portfolio-mega__item {
  background: #fff;
  outline: none;
  transition:
    background-color 200ms ease,
    box-shadow 200ms ease;
}

.portfolio-mega__item:hover,
.portfolio-mega__item:focus-visible,
.portfolio-mega__item--current {
  background: var(--color-surface);
}

.portfolio-mega__item:focus-visible {
  box-shadow: inset 0 0 0 2px rgb(13 31 60 / 0.25);
}

.portfolio-mega__badge {
  transition:
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 260ms ease;
}

.portfolio-mega__item:hover .portfolio-mega__badge,
.portfolio-mega__item:focus-visible .portfolio-mega__badge {
  transform: translateY(-2px) scale(1.06);
  box-shadow: 0 8px 16px -6px rgb(13 31 60 / 0.45);
}

.portfolio-mega__arrow {
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 200ms ease,
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-mega__item:hover .portfolio-mega__arrow,
.portfolio-mega__item:focus-visible .portfolio-mega__arrow {
  opacity: 1;
  transform: none;
}

/*
 * Entrance uses animations (fill backwards) so they replay on every open and hover
 * transitions never inherit the stagger delay.
 */
.portfolio-mega__item {
  --d: calc(150ms + var(--i, 0) * 100ms);
}

.portfolio-mega--open .portfolio-mega__divider--h {
  animation: portfolio-draw-x 520ms cubic-bezier(0.22, 1, 0.36, 1) 180ms backwards;
}

.portfolio-mega--open .portfolio-mega__divider--v {
  animation: portfolio-draw-y 520ms cubic-bezier(0.22, 1, 0.36, 1) 240ms backwards;
}

.portfolio-mega--open .portfolio-mega__badge {
  animation: portfolio-badge-pop 480ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) backwards;
}

.portfolio-mega--open .portfolio-mega__title {
  animation: portfolio-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d) + 60ms) backwards;
}

.portfolio-mega--open .portfolio-mega__desc {
  animation: portfolio-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d) + 140ms) backwards;
}

@keyframes portfolio-draw-x {
  from {
    transform: scaleX(0);
  }
}

@keyframes portfolio-draw-y {
  from {
    transform: scaleY(0);
  }
}

@keyframes portfolio-badge-pop {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes portfolio-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

/* —— Mobile menu —— */
.burger__box {
  position: relative;
  display: block;
  width: 1.25rem;
  height: 0.875rem;
}

/* Closing: bars un-rotate first, then spread apart. */
.burger__bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--color-navy);
  transition:
    rotate 200ms cubic-bezier(0.22, 1, 0.36, 1),
    translate 180ms cubic-bezier(0.22, 1, 0.36, 1) 160ms,
    opacity 120ms ease 160ms,
    scale 180ms ease 160ms;
}

.burger__bar--top {
  top: 0;
}

.burger__bar--mid {
  top: 6px;
}

.burger__bar--bot {
  top: 12px;
}

/* Opening: bars meet in the middle first, then rotate into an X. */
.burger--open .burger__bar {
  transition:
    translate 180ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 120ms ease,
    scale 160ms ease,
    rotate 320ms cubic-bezier(0.34, 1.56, 0.64, 1) 160ms;
}

.burger--open .burger__bar--top {
  translate: 0 6px;
  rotate: 45deg;
}

.burger--open .burger__bar--mid {
  opacity: 0;
  scale: 0.2 1;
}

.burger--open .burger__bar--bot {
  translate: 0 -6px;
  rotate: -45deg;
}

.mobile-menu {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transform: translateY(-8px);
  visibility: hidden;
  transition:
    grid-template-rows 220ms cubic-bezier(0.4, 0, 1, 1),
    opacity 200ms ease-in,
    transform 220ms cubic-bezier(0.4, 0, 1, 1),
    visibility 0s linear 220ms;
}

.mobile-menu--open {
  grid-template-rows: 1fr;
  opacity: 1;
  transform: none;
  visibility: visible;
  transition:
    grid-template-rows 440ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 300ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 440ms cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s;
}

.mobile-menu__clip {
  min-height: 0;
  overflow: hidden;
}

.mobile-menu--open .mobile-menu__item {
  animation: menu-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(120ms + var(--i, 0) * 65ms);
}

.mobile-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgb(8 22 41 / 0.4);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 220ms ease,
    visibility 0s linear 220ms;
}

.mobile-backdrop--open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition:
    opacity 380ms cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s;
}

/* Scoped selectors outrank Tailwind's lg:hidden, so hide explicitly on desktop. */
@media (min-width: 64rem) {
  .mobile-menu,
  .mobile-backdrop {
    display: none;
  }
}

.portfolio-accordion {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-accordion--open {
  grid-template-rows: 1fr;
  transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-accordion__inner {
  min-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 180ms ease;
}

.portfolio-accordion--open .portfolio-accordion__inner {
  opacity: 1;
  transition: opacity 260ms ease;
}

.portfolio-accordion__list::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.25rem;
  bottom: 0.25rem;
  width: 2px;
  border-radius: 1px;
  background: var(--color-border);
  transform: scaleY(0);
  transform-origin: 50% 0;
  transition: transform 200ms ease;
}

.portfolio-accordion--open .portfolio-accordion__list::before {
  transform: scaleY(1);
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1) 60ms;
}

.portfolio-accordion--open .portfolio-accordion__item {
  animation: menu-slide 380ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(80ms + var(--j, 0) * 60ms);
}

.portfolio-accordion--open .portfolio-accordion__badge {
  animation: portfolio-badge-pop 440ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  animation-delay: calc(120ms + var(--j, 0) * 60ms);
}

@keyframes menu-rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@keyframes menu-slide {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .burger__bar,
  .burger--open .burger__bar {
    transition: opacity 150ms ease;
  }

  .mobile-menu,
  .mobile-menu--open {
    transform: none;
  }

  .mobile-menu {
    transition:
      opacity 200ms ease,
      visibility 0s linear 200ms;
  }

  .mobile-menu--open {
    transition:
      opacity 200ms ease,
      visibility 0s;
  }

  .portfolio-accordion,
  .portfolio-accordion--open {
    transition: none;
  }

  .portfolio-accordion__list::before {
    transform: none;
    transition: none;
  }

  .mobile-menu--open .mobile-menu__item,
  .portfolio-accordion--open .portfolio-accordion__item,
  .portfolio-accordion--open .portfolio-accordion__badge {
    animation: none;
  }

  .header-top,
  .nav-compact,
  .nav-compact--visible,
  .portfolio-trigger__chevron,
  .portfolio-mega__badge,
  .portfolio-mega__arrow {
    transition: none;
  }

  .portfolio-mega__panel,
  .portfolio-mega--open .portfolio-mega__panel {
    transform: none;
    clip-path: none;
    transition: opacity 200ms ease;
  }

  .portfolio-mega--open .portfolio-mega__divider,
  .portfolio-mega--open .portfolio-mega__badge,
  .portfolio-mega--open .portfolio-mega__title,
  .portfolio-mega--open .portfolio-mega__desc {
    animation: none;
  }

  .portfolio-mega__item:hover .portfolio-mega__badge,
  .portfolio-mega__item:focus-visible .portfolio-mega__badge,
  .portfolio-mega__arrow {
    transform: none;
  }
}
</style>
