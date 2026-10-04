<script setup lang="ts">
withDefaults(defineProps<{ align?: 'right' | 'center' }>(), { align: 'right' })
</script>

<template>
  <div class="hero-backdrop" :class="`hero-backdrop--${align}`" aria-hidden="true">
    <div class="hero-backdrop__glow hero-backdrop__glow--navy" />
    <div class="hero-backdrop__glow hero-backdrop__glow--gold" />
    <div class="hero-backdrop__pattern" />
    <svg class="hero-backdrop__arcs" viewBox="0 0 600 600" fill="none" preserveAspectRatio="xMidYMid meet">
      <circle
        class="hero-backdrop__arc"
        cx="300"
        cy="300"
        r="298"
        stroke="currentColor"
        stroke-width="1"
        pathLength="1"
        transform="rotate(180 300 300)"
      />
      <circle
        class="hero-backdrop__arc-spin"
        cx="300"
        cy="300"
        r="230"
        stroke="currentColor"
        stroke-width="1"
        stroke-dasharray="2 10"
      />
      <circle
        class="hero-backdrop__arc hero-backdrop__arc--inner"
        cx="300"
        cy="300"
        r="160"
        stroke="currentColor"
        stroke-width="1"
        pathLength="1"
        transform="rotate(180 300 300)"
      />
    </svg>
    <div class="hero-backdrop__vignette" />
  </div>
</template>
