<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { observeReveal } from '../composables/revealObserver'

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'blur-in'
  | 'flip-up'
  | 'clip-up'

const props = withDefaults(
  defineProps<{
    class?: string
    /** Stagger index for delayed entrance (0-based) */
    delay?: number
    as?: 'div' | 'section' | 'article' | 'li'
    variant?: RevealVariant
    /** Transition duration in ms (defaults per variant in CSS) */
    duration?: number
  }>(),
  {
    class: '',
    delay: 0,
    as: 'div',
    variant: 'fade-up',
    duration: undefined,
  },
)

const STAGGER_MS = 80
const SHOW_RATIO = 0.15

/** 'idle' = natural visible state (SSR, no-JS, reduced motion, on screen at mount and after an entrance finishes). */
const state = ref<'idle' | 'out' | 'in'>('idle')
const root = ref<HTMLElement | null>(null)
let stop: (() => void) | null = null
let settleTimer: ReturnType<typeof setTimeout> | undefined

const delayMs = computed(() => props.delay * STAGGER_MS)

const style = computed(() => {
  const s: Record<string, string> = {}
  if (props.delay > 0) s['--reveal-delay'] = `${delayMs.value}ms`
  if (props.duration) s['--reveal-duration'] = `${props.duration}ms`
  return Object.keys(s).length ? s : undefined
})

function show(node: HTMLElement) {
  state.value = 'in'
  clearTimeout(settleTimer)
  const duration =
    props.duration ?? (parseFloat(getComputedStyle(node).getPropertyValue('--reveal-duration')) || 700)
  settleTimer = setTimeout(() => {
    if (state.value === 'in') state.value = 'idle'
  }, duration + delayMs.value + 80)
}

onMounted(() => {
  const node = root.value
  if (!node || typeof IntersectionObserver === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Hidden state is only applied client-side, so prerendered HTML stays visible without JS.
  // The first observer callback decides: content already on screen stays idle (no flicker,
  // no replay); anything off screen is hidden instantly so it animates on first entry.
  let initial = true
  stop = observeReveal(node, (entry) => {
    if (initial) {
      initial = false
      if (entry.isIntersecting) return
    }
    if (!entry.isIntersecting) {
      clearTimeout(settleTimer)
      state.value = 'out'
      return
    }
    if (state.value !== 'out') return
    const viewport = entry.rootBounds?.height ?? window.innerHeight
    if (entry.intersectionRatio >= SHOW_RATIO || entry.intersectionRect.height >= viewport * 0.2) {
      show(node)
    }
  })
})

onUnmounted(() => {
  stop?.()
  clearTimeout(settleTimer)
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    :class="[
      'reveal',
      `reveal--${variant}`,
      state === 'out' ? 'reveal--out' : '',
      state === 'in' ? 'reveal--in' : '',
      $props.class,
    ]"
    :style="style"
  >
    <slot />
  </component>
</template>
