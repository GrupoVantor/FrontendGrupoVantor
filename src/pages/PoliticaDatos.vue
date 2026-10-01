<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function go(name: string) {
  router.push({ name })
}
</script>

<template>
  <div>
    <section class="bg-[#0D1F3C] py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-8">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-politica-datos" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-politica-datos)" />
        </svg>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 hero-anim">
        <div class="text-white/40 text-xs mb-4 flex items-center gap-2">
          <button type="button" class="hover:text-white transition-colors" @click="go('inicio')">Inicio</button>
          <span>/</span>
          <span class="text-white font-medium">Política de Datos</span>
        </div>
        <p class="text-[#D4AF5A] text-xs font-bold tracking-widest uppercase mb-3">Documento de autorización</p>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 max-w-3xl" style="font-family: Manrope, sans-serif">
          Autorización para el Tratamiento de Datos Personales
        </h1>
        <p class="text-white/60 text-lg max-w-2xl">
          Información sobre el tratamiento de datos personales por GRUPO VANTOR S.A.S., conforme a la normativa
          colombiana de protección de datos.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-20 bg-[#F4F6F9]">
      <div class="max-w-3xl mx-auto px-6">
        <article class="bg-white rounded-lg border border-[#E0E6EF] border-l-4 border-l-[#D4AF5A] p-8 md:p-10">
          <h2 class="text-xs font-bold text-[#0D1F3C] uppercase tracking-widest mb-6" style="font-family: Manrope, sans-serif">
            AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES
          </h2>
          <div class="space-y-5 text-sm md:text-base text-[#3D4A5C] leading-relaxed">
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
        </article>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            class="anim-btn bg-[#0D1F3C] hover:bg-[#162D55] text-white font-semibold px-6 py-3 rounded transition-colors text-sm"
            @click="go('contacto')"
          >
            Volver a Contacto
          </button>
          <button
            type="button"
            class="text-[#0D1F3C] font-semibold text-sm underline underline-offset-4 hover:text-[#162D55]"
            @click="go('inicio')"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
