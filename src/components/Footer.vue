<script setup lang="ts">
import BrandLogo from './BrandLogo.vue'
import { officeLocation } from '../config/officeLocation'
import { portfolioLines } from '../data/portfolio'
import { POLITICA_DATOS_ROUTE } from '../config/contact'
</script>

<template>
  <footer class="bg-navy-dark text-white">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="mb-5 group inline-flex">
            <BrandLogo variant="light" class="h-16 w-auto" />
          </div>
          <p class="text-white/55 text-sm leading-relaxed">
            Portafolio integrado de soluciones financieras, inmobiliarias, logísticas y corporativas para empresas y personas naturales en Colombia.
          </p>
        </div>

        <!-- Portafolio -->
        <div>
          <h4 class="text-white text-xs font-bold tracking-widest uppercase mb-5">Portafolio</h4>
          <nav class="flex flex-col gap-3">
            <RouterLink
              v-for="line in portfolioLines"
              :key="line.id"
              :to="{ name: line.page }"
              class="text-white/55 text-sm text-left hover:text-gold-light transition-colors"
            >
              {{ line.label }}
            </RouterLink>
          </nav>
        </div>

        <!-- Empresa -->
        <div>
          <h4 class="text-white text-xs font-bold tracking-widest uppercase mb-5">Empresa</h4>
          <nav class="flex flex-col gap-3">
            <RouterLink :to="{ name: 'nosotros' }" class="text-white/55 text-sm text-left hover:text-gold-light transition-colors">Quiénes Somos</RouterLink>
            <RouterLink :to="{ name: 'contacto' }" class="text-white/55 text-sm text-left hover:text-gold-light transition-colors">Contacto</RouterLink>
            <button type="button" class="text-white/55 text-sm text-left hover:text-gold-light transition-colors">Trabaja con Nosotros</button>
            <RouterLink :to="{ name: POLITICA_DATOS_ROUTE }" class="text-white/55 text-sm text-left hover:text-gold-light transition-colors">Política de Privacidad</RouterLink>
          </nav>
        </div>

        <!-- Contacto -->
        <div>
          <h4 class="text-white text-xs font-bold tracking-widest uppercase mb-5">Contacto</h4>
          <div class="flex flex-col gap-3 text-sm text-white/55">
            <p>{{ officeLocation.address }}</p>
            <a href="mailto:contacto@grupovantor.co" class="hover:text-gold-light transition-colors">contacto@grupovantor.co</a>
            <a href="tel:+573026687703" class="hover:text-gold-light transition-colors">+573026687703</a>
            <p>Lun - Vie: 8:00 a.m. - 5:00 p.m. Hora Colombia</p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/35">
        <span>© 2026 Grupo Vantor S.A.S. Todos los derechos reservados.</span>
        <span>Vigilado — Cumplimiento normativo colombiano</span>
      </div>
    </div>
  </footer>
</template>
