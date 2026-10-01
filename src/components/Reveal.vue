<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

withDefaults(
  defineProps<{
    class?: string
    /** Stagger index for delayed entrance (0-based) */
    delay?: number
    as?: 'div' | 'section' | 'article' | 'li'
  }>(),
  {
    class: '',
    delay: 0,
    as: 'div',
  },
)

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const node = root.value
  if (!node) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )

  observer.observe(node)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    :class="['reveal', visible ? 'reveal--in' : '', $props.class]"
    :style="delay > 0 ? { transitionDelay: `${delay * 80}ms` } : undefined"
  >
    <slot />
  </component>
</template>
