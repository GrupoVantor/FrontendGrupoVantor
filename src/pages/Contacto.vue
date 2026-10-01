<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Reveal from '../components/Reveal.vue'
// Mapa de oficina — descomentar cuando haya VITE_GOOGLE_MAPS_API_KEY / dirección definitiva
// import OfficeMap from '../components/OfficeMap.vue' // → src/components/OfficeMap.vue
import { officeLocation } from '../config/officeLocation'
import { CONTACT_EMAIL, POLITICA_DATOS_ROUTE, submitInquiry } from '../config/contact'

const router = useRouter()

const form = reactive({
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
})
const autorizacionDatos = ref(false)
const aceptaComercial = ref(false)
const sent = ref(false)
const sending = ref(false)
const error = ref('')
const autorizacionRef = ref<HTMLInputElement | null>(null)

const infoCards = [
  {
    label: 'Oficina Principal',
    value: officeLocation.address,
    icon: 'pin' as const,
  },
  {
    label: 'Teléfono',
    value: '+57 302 668 7703',
    icon: 'phone' as const,
  },
  {
    label: 'Correo Electrónico',
    value: CONTACT_EMAIL,
    icon: 'mail' as const,
  },
  {
    label: 'Horario de Atención',
    value: 'Lunes a viernes, 8:00 a.m. - 5:00 p.m. Hora Colombia',
    icon: 'clock' as const,
  },
]

function go(name: string) {
  router.push({ name })
}

async function handleSubmit() {
  error.value = ''
  if (!autorizacionDatos.value) {
    error.value = 'Debe autorizar el tratamiento de sus datos personales para enviar la solicitud.'
    nextTick(() => autorizacionRef.value?.focus())
    return
  }

  sending.value = true
  try {
    const result = await submitInquiry({
      ...form,
      autorizacionDatos: autorizacionDatos.value,
      aceptaComercial: aceptaComercial.value,
    })
    if (result.ok) {
      sent.value = true
      error.value = ''
      return
    }
    error.value =
      result.message ||
      `No pudimos enviar el mensaje. Escríbanos a ${CONTACT_EMAIL} o intente de nuevo.`
  } catch {
    error.value = `No pudimos enviar el mensaje. Escríbanos a ${CONTACT_EMAIL} o intente de nuevo.`
  } finally {
    sending.value = false
  }
}

function resetForm() {
  sent.value = false
  sending.value = false
  error.value = ''
  autorizacionDatos.value = false
  aceptaComercial.value = false
  form.nombre = ''
  form.empresa = ''
  form.email = ''
  form.telefono = ''
  form.servicio = ''
  form.mensaje = ''
}
</script>

<template>
  <div>
    <section class="bg-[#0D1F3C] py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-8">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-contacto" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contacto)" />
        </svg>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 hero-anim">
        <div class="text-white/40 text-xs mb-4 flex items-center gap-2">
          <button type="button" class="hover:text-white transition-colors" @click="go('inicio')">Inicio</button>
          <span>/</span>
          <span class="text-white font-medium">Contacto</span>
        </div>
        <h1 class="text-4xl font-bold text-white mb-4" style="font-family: Manrope, sans-serif">Contáctanos</h1>
        <p class="text-white/60 text-lg max-w-2xl">
          Cuéntanos qué necesitas y un asesor de Grupo Vantor se pondrá en contacto contigo.
        </p>
      </div>
    </section>

    <section class="py-20 bg-[#F4F6F9]">
      <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2 space-y-6">
          <Reveal v-for="({ label, value, icon }, i) in infoCards" :key="label" :delay="i">
            <div class="bg-white rounded-lg border border-[#E0E6EF] p-6 flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#0D1F3C] text-white flex items-center justify-center flex-shrink-0">
                <svg
                  v-if="icon === 'pin'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="12" cy="10" r="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else-if="icon === 'phone'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.12.96.37 1.9.73 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.36 1.85.61 2.81.73A2 2 0 0122 16.92z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else-if="icon === 'mail'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M22 6l-10 7L2 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <div class="text-[#6B7A90] text-xs font-bold tracking-widest uppercase mb-1">{{ label }}</div>
                <div class="text-[#0D1F3C] font-medium text-sm">{{ value }}</div>
              </div>
            </div>
          </Reveal>

          <!-- Mapa de oficina — descomentar cuando haya VITE_GOOGLE_MAPS_API_KEY / dirección definitiva -->
          <!--
          <Reveal :delay="4">
            <OfficeMap />
          </Reveal>
          -->
        </div>

        <Reveal class="lg:col-span-3" :delay="1">
          <div class="bg-white rounded-lg border border-[#E0E6EF] p-8 h-full">
            <div v-if="sent" class="h-full flex flex-col items-center justify-center text-center py-16">
              <div class="w-16 h-16 rounded-full bg-[#0D1F3C] flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" class="w-8 h-8">
                  <path d="M5 13l4 4L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-[#0D1F3C] mb-3" style="font-family: Manrope, sans-serif">¡Mensaje enviado!</h3>
              <p class="text-[#6B7A90] text-sm mb-8">Un asesor se pondrá en contacto contigo en menos de 24 horas.</p>
              <button
                type="button"
                class="text-[#0D1F3C] font-semibold text-sm underline underline-offset-4"
                @click="resetForm"
              >
                Enviar otro mensaje
              </button>
            </div>
            <template v-else>
              <h3 class="text-xl font-bold text-[#0D1F3C] mb-8" style="font-family: Manrope, sans-serif">Solicita tu Asesoría</h3>
              <form class="space-y-5" @submit.prevent="handleSubmit">
                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-xs font-bold text-[#3D4A5C] uppercase tracking-widest mb-2">Nombre completo *</label>
                    <input
                      v-model="form.nombre"
                      name="nombre"
                      required
                      placeholder="Carlos Rodríguez"
                      class="w-full border border-[#E0E6EF] rounded px-4 py-3 text-sm text-[#0D1F3C] placeholder-[#C0C8D4] focus:outline-none focus:border-[#0D1F3C] transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-[#3D4A5C] uppercase tracking-widest mb-2">Empresa (opcional)</label>
                    <input
                      v-model="form.empresa"
                      name="empresa"
                      placeholder="Mi Empresa S.A.S."
                      class="w-full border border-[#E0E6EF] rounded px-4 py-3 text-sm text-[#0D1F3C] placeholder-[#C0C8D4] focus:outline-none focus:border-[#0D1F3C] transition-colors"
                    />
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-xs font-bold text-[#3D4A5C] uppercase tracking-widest mb-2">Correo electrónico *</label>
                    <input
                      v-model="form.email"
                      name="email"
                      type="email"
                      required
                      placeholder="correo@empresa.com"
                      class="w-full border border-[#E0E6EF] rounded px-4 py-3 text-sm text-[#0D1F3C] placeholder-[#C0C8D4] focus:outline-none focus:border-[#0D1F3C] transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-[#3D4A5C] uppercase tracking-widest mb-2">Teléfono</label>
                    <input
                      v-model="form.telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      class="w-full border border-[#E0E6EF] rounded px-4 py-3 text-sm text-[#0D1F3C] placeholder-[#C0C8D4] focus:outline-none focus:border-[#0D1F3C] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#3D4A5C] uppercase tracking-widest mb-2">Servicio de interés *</label>
                  <select
                    v-model="form.servicio"
                    name="servicio"
                    required
                    class="w-full border border-[#E0E6EF] rounded px-4 py-3 text-sm text-[#0D1F3C] focus:outline-none focus:border-[#0D1F3C] transition-colors bg-white"
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="financiero">Servicios Financieros</option>
                    <option value="inmobiliario">Servicios Inmobiliarios</option>
                    <option value="logistico">Logística & Comercio Exterior</option>
                    <option value="corporativo">Servicios Corporativos</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[#3D4A5C] uppercase tracking-widest mb-2">Mensaje *</label>
                  <textarea
                    v-model="form.mensaje"
                    name="mensaje"
                    required
                    rows="5"
                    placeholder="Cuéntenos brevemente su necesidad o caso..."
                    class="w-full border border-[#E0E6EF] rounded px-4 py-3 text-sm text-[#0D1F3C] placeholder-[#C0C8D4] focus:outline-none focus:border-[#0D1F3C] transition-colors resize-none"
                  />
                </div>
                <section
                  class="rounded border border-[#E0E6EF] border-l-4 border-l-[#D4AF5A] bg-[#F4F6F9] overflow-hidden"
                  aria-labelledby="tratamiento-datos-titulo"
                >
                  <div class="px-4 pt-4 pb-3 bg-white">
                    <p class="text-[11px] font-bold tracking-widest uppercase text-[#D4AF5A] mb-1">
                      Protección de datos
                    </p>
                    <h4
                      id="tratamiento-datos-titulo"
                      class="text-xs font-bold text-[#0D1F3C] uppercase tracking-widest leading-relaxed"
                    >
                      Autorización de datos personales
                    </h4>
                    <p class="mt-2 text-sm text-[#3D4A5C] leading-relaxed">
                      Para enviar esta solicitud debe aceptar el tratamiento de sus datos personales. Consulte el
                      documento completo en
                      <RouterLink
                        :to="{ name: POLITICA_DATOS_ROUTE }"
                        class="font-semibold text-[#0D1F3C] underline underline-offset-4 hover:text-[#162D55]"
                      >
                        Autorización para el Tratamiento de Datos Personales
                      </RouterLink>.
                    </p>
                  </div>
                  <div class="px-4 py-3 space-y-3 border-t border-[#E0E6EF] bg-white">
                    <label class="flex items-start gap-3 cursor-pointer">
                      <input
                        ref="autorizacionRef"
                        v-model="autorizacionDatos"
                        type="checkbox"
                        name="autorizacionDatos"
                        aria-required="true"
                        :aria-invalid="Boolean(error) && !autorizacionDatos"
                        class="mt-1 h-4 w-4 shrink-0 accent-[#0D1F3C] rounded border-[#E0E6EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1F3C] focus-visible:ring-offset-2"
                      />
                      <span class="text-sm text-[#3D4A5C] leading-relaxed">
                        Acepto y autorizo el tratamiento de mis datos personales según la
                        <RouterLink
                          :to="{ name: POLITICA_DATOS_ROUTE }"
                          class="font-semibold text-[#0D1F3C] underline underline-offset-4 hover:text-[#162D55]"
                          @click.stop
                        >
                          Autorización para el Tratamiento de Datos Personales
                        </RouterLink>.
                      </span>
                    </label>
                    <label class="flex items-start gap-3 cursor-pointer">
                      <input
                        v-model="aceptaComercial"
                        type="checkbox"
                        name="aceptaComercial"
                        class="mt-1 h-4 w-4 shrink-0 accent-[#0D1F3C] rounded border-[#E0E6EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D1F3C] focus-visible:ring-offset-2"
                      />
                      <span class="text-sm text-[#3D4A5C] leading-relaxed">
                        Acepto recibir información comercial y publicitaria sobre los productos y servicios de GRUPO
                        VANTOR S.A.S.
                      </span>
                    </label>
                  </div>
                </section>
                <p
                  v-if="error"
                  class="text-sm text-[#8A2B2B] bg-[#FDF2F2] border border-[#F0D4D4] rounded px-4 py-3"
                  role="alert"
                >
                  {{ error }}
                </p>
                <button
                  type="submit"
                  :disabled="sending"
                  class="anim-btn w-full bg-[#0D1F3C] hover:bg-[#162D55] text-white font-semibold py-4 rounded transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#0D1F3C]"
                >
                  {{ sending ? 'Enviando…' : 'Enviar Mensaje' }}
                </button>
                <p class="text-center text-[#6B7A90] text-xs">Respuesta inicial en menos de 24 horas.</p>
              </form>
            </template>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
</template>
