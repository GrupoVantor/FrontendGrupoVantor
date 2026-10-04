<script setup lang="ts">
import { officeLocation } from '../config/officeLocation'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

function mapsOpenUrl() {
  const { lat, lng } = officeLocation
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

function embedSrc() {
  if (!apiKey) return null
  const { lat, lng, zoom } = officeLocation
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=${zoom}`
}

const src = embedSrc()
</script>

<template>
  <div>
    <div class="rounded-lg overflow-hidden h-60 bg-navy border border-border relative">
      <iframe
        v-if="src"
        :title="`Mapa — ${officeLocation.label}`"
        :src="src"
        class="w-full h-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      />
      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-8 h-8 text-white/50">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="text-white text-sm font-medium">{{ officeLocation.label }}</div>
        <p class="text-white/40 text-xs max-w-55">
          Mapa no disponible. Configura VITE_GOOGLE_MAPS_API_KEY para ver la ubicación.
        </p>
      </div>
    </div>
    <a
      :href="mapsOpenUrl()"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 inline-flex items-center gap-1.5 text-navy text-sm font-medium hover:text-navy-mid transition-colors"
    >
      Abrir en Google Maps
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
        <path d="M7 17L17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
  </div>
</template>
