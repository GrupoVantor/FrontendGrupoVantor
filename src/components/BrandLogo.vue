<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'dark' | 'light'
    class?: string
    alt?: string
  }>(),
  {
    variant: 'dark',
    class: 'h-12 w-auto',
    alt: 'Grupo Vantor',
  },
)

const sources = {
  dark: '/logo_con_letras.png',
  light: '/logo_con_letras_claro.png',
} as const
</script>

<template>
  <span class="brand-logo">
    <img
      :src="sources[variant]"
      :alt="alt"
      :class="['brand-logo__img', 'object-contain', $props.class]"
    />
  </span>
</template>
