<script setup lang="ts">
import { useRouter } from 'vue-router'
import HeroBackdrop from '../components/HeroBackdrop.vue'
import Reveal from '../components/Reveal.vue'

const router = useRouter()

function go(name: string) {
  router.push({ name })
}
</script>

<template>
  <div>
    <section class="bg-navy py-14 sm:py-20 relative overflow-hidden">
      <HeroBackdrop />
      <div class="relative max-w-7xl mx-auto px-6 hero-anim hero-anim--blur">
        <div class="text-white/40 text-xs mb-4 flex items-center gap-2">
          <RouterLink :to="{ name: 'inicio' }" class="hover:text-white transition-colors">Inicio</RouterLink>
          <span>/</span>
          <span class="text-white font-medium">Política de Datos</span>
        </div>
        <p class="text-gold-light text-xs font-bold tracking-widest uppercase mb-3">Documento de autorización</p>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl" style="font-family: Manrope, sans-serif">
          Autorización para el Tratamiento de Datos Personales
        </h1>
        <p class="text-white/60 text-lg max-w-2xl">
          Información sobre el tratamiento de datos personales por GRUPO VANTOR S.A.S., conforme a la normativa
          colombiana de protección de datos.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-surface">
      <div class="max-w-3xl mx-auto px-6">
        <Reveal as="article" class="bg-white rounded-lg border border-border border-l-4 border-l-gold-light p-8 md:p-10">
          <h2 class="text-xs font-bold text-navy uppercase tracking-widest mb-6" style="font-family: Manrope, sans-serif">
            AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
          </h2>
          <div class="space-y-5 text-sm md:text-base text-grafito leading-relaxed">
            <p>
              En cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas que regulan la
              protección de datos personales en Colombia, autorizo de manera previa, expresa, informada y
              voluntaria a GRUPO VANTOR S.A.S., en calidad de responsable del tratamiento de datos personales,
              para recolectar, almacenar, utilizar, actualizar, consultar y, cuando corresponda, compartir mis
              datos personales, con las finalidades relacionadas con la prestación de sus servicios, gestión
              comercial, atención de solicitudes, contacto, envío de información sobre productos y servicios,
              elaboración de cotizaciones y demás actividades propias de su objeto social.
            </p>
            <p>
              Declaro que he sido informado(a) sobre mis derechos como titular de los datos personales, entre
              ellos: conocer, actualizar y rectificar mis datos; solicitar prueba de la autorización otorgada;
              conocer el uso que se ha dado a mis datos; presentar consultas y reclamos; solicitar la
              supresión de mis datos cuando sea procedente; y revocar la autorización en los casos permitidos
              por la ley.
            </p>
            <p>
              Para ejercer estos derechos, podré comunicarme con GRUPO VANTOR S.A.S. a través de los canales
              de atención y contacto dispuestos en su página web.
            </p>
            <p>
              Declaro que la información suministrada es veraz, completa y actualizada, y manifiesto que
              conozco y acepto la Política de Tratamiento de Datos Personales de GRUPO VANTOR S.A.S.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-right" class="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            class="anim-btn bg-navy hover:bg-navy-mid text-white font-semibold px-6 py-3 rounded transition-colors text-sm"
            @click="go('contacto')"
          >
            Volver a Contacto
          </button>
          <button
            type="button"
            class="text-navy font-semibold text-sm underline underline-offset-4 hover:text-navy-mid"
            @click="go('inicio')"
          >
            Ir al inicio
          </button>
        </Reveal>
      </div>
    </section>
  </div>
</template>
