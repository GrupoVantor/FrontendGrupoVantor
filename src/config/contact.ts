/** Destinatario del formulario de contacto (Grupo Vantor). */
export const CONTACT_EMAIL = 'contacto@grupovantor.co'

/** Ruta SPA de la autorización / política de tratamiento de datos personales. */
export const POLITICA_DATOS_ROUTE = 'politica-datos'

/** FormSubmit AJAX (sin API key). Primera vez: confirmar el correo en la bandeja del destinatario. Payload propio en `formSubmitPayload`. */
export const DEFAULT_CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export const serviceLabels: Record<string, string> = {
  financiero: 'Servicios Financieros',
  inmobiliario: 'Servicios Inmobiliarios',
  logistico: 'Logística & Comercio Exterior',
  corporativo: 'Servicios Corporativos',
}

export type ContactInquiry = {
  nombre: string
  empresa: string
  email: string
  telefono: string
  servicio: string
  mensaje: string
  autorizacionDatos: boolean
  aceptaComercial: boolean
}

export type SubmitResult = { ok: true } | { ok: false; message: string }

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const SEND_FAILED_MESSAGE = `No pudimos enviar el mensaje. Escríbanos a ${CONTACT_EMAIL} o intente de nuevo.`

const FORMSUBMIT_ACTIVATION_MESSAGE =
  `FormSubmit envió un correo de activación a ${CONTACT_EMAIL}. Abra ese mensaje y confirme el enlace una sola vez; después las consultas llegarán normalmente. Mientras tanto puede escribirnos a ${CONTACT_EMAIL}.`

function yesNo(value: boolean): 'Sí' | 'No' {
  return value ? 'Sí' : 'No'
}

export function serviceLabel(value: string): string {
  return serviceLabels[value] ?? value
}

/**
 * POST URL for the contact form.
 * Preferencia: VITE_CONTACT_FORM_ENDPOINT → VITE_CONTACT_ENDPOINT → Web3Forms → FormSubmit por defecto.
 */
export function contactFormEndpoint(): string {
  const preferred = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim()
  const legacy = import.meta.env.VITE_CONTACT_ENDPOINT?.trim()
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  if (preferred) return preferred
  if (legacy) return legacy
  if (accessKey) return WEB3FORMS_ENDPOINT
  return DEFAULT_CONTACT_FORM_ENDPOINT
}

export function web3formsAccessKey(): string | undefined {
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  return key || undefined
}

export function buildInquiryText(form: ContactInquiry): { subject: string; body: string } {
  const servicio = serviceLabel(form.servicio)
  const subject = `Consulta web: ${servicio} — ${form.nombre}`
  const body = [
    `Nombre: ${form.nombre}`,
    `Empresa: ${form.empresa || '—'}`,
    `Correo: ${form.email}`,
    `Teléfono: ${form.telefono || '—'}`,
    `Servicio: ${servicio}`,
    '',
    'Mensaje:',
    form.mensaje,
    '',
    `Autorización de tratamiento de datos personales: ${yesNo(form.autorizacionDatos)}`,
    `Acepta información comercial y publicitaria: ${yesNo(form.aceptaComercial)}`,
  ].join('\n')
  return { subject, body }
}

const FORMSUBMIT_AUTORESPONSE =
  'Gracias por contactar a Grupo Vantor S.A.S. Hemos recibido tu consulta y te responderemos pronto. Horario: Lun - Vie 8:00 a.m. - 5:00 p.m. Hora Colombia.'

function isFormSubmitEndpoint(endpoint: string): boolean {
  try {
    return new URL(endpoint).hostname.endsWith('formsubmit.co')
  } catch {
    return false
  }
}

function submittedAt(): string {
  return new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date())
}

/**
 * FormSubmit usa las claves como etiquetas del correo (orden = orden de inserción).
 * Las claves con "_" son opciones ocultas. `email` debe llamarse así para que funcione `_autoresponse`.
 */
function formSubmitPayload(form: ContactInquiry): Record<string, string> {
  const { subject } = buildInquiryText(form)
  const payload: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    _replyto: form.email,
    _autoresponse: FORMSUBMIT_AUTORESPONSE,
    Nombre: form.nombre,
    email: form.email,
    Teléfono: form.telefono || 'No indicado',
    Empresa: form.empresa || 'No indicada',
    'Servicio de interés': serviceLabel(form.servicio),
    Mensaje: form.mensaje,
    'Autorización tratamiento de datos': form.autorizacionDatos
      ? 'Sí, acepta (Ley 1581 de 2012)'
      : 'No',
    'Acepta comunicaciones comerciales': yesNo(form.aceptaComercial),
    'Fecha de envío': submittedAt(),
  }
  if (typeof window !== 'undefined') {
    payload['Página'] = `${window.location.origin}${window.location.pathname}`
  }
  return payload
}

function inquiryPayload(endpoint: string, form: ContactInquiry): Record<string, string> {
  if (isFormSubmitEndpoint(endpoint)) return formSubmitPayload(form)

  const { subject, body } = buildInquiryText(form)
  const payload: Record<string, string> = {
    nombre: form.nombre,
    name: form.nombre,
    from_name: form.nombre,
    empresa: form.empresa,
    email: form.email,
    replyto: form.email,
    _replyto: form.email,
    telefono: form.telefono,
    servicio: form.servicio,
    servicioLabel: serviceLabel(form.servicio),
    mensaje: form.mensaje,
    message: body,
    autorizacionDatos: yesNo(form.autorizacionDatos),
    aceptaComercial: yesNo(form.aceptaComercial),
    _subject: subject,
    subject,
  }

  const accessKey = web3formsAccessKey()
  if (accessKey) payload.access_key = accessKey

  return payload
}

function successFlag(value: unknown): boolean | null {
  if (value === true || value === 'true') return true
  if (value === false || value === 'false') return false
  return null
}

function providerMessage(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined
  const record = data as { message?: unknown; error?: unknown }
  if (typeof record.message === 'string' && record.message.trim()) return record.message.trim()
  if (typeof record.error === 'string' && record.error.trim()) return record.error.trim()
  return undefined
}

function looksLikeFormSubmitActivation(message: string): boolean {
  const lower = message.toLowerCase()
  return (
    lower.includes('activation') ||
    lower.includes('activate form') ||
    lower.includes('activate your form') ||
    (lower.includes('confirm') && lower.includes('email'))
  )
}

function toUserFacingError(raw: string | undefined, fallback: string): string {
  if (!raw) return fallback
  if (looksLikeFormSubmitActivation(raw)) return FORMSUBMIT_ACTIVATION_MESSAGE
  // Never surface raw English provider exceptions to the visitor.
  if (/[áéíóúñ¿¡]/i.test(raw) || raw === SEND_FAILED_MESSAGE || raw === FORMSUBMIT_ACTIVATION_MESSAGE) {
    return raw
  }
  return fallback
}

async function postInquiry(endpoint: string, form: ContactInquiry): Promise<void> {
  const payload = inquiryPayload(endpoint, form)
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  const rawMessage = providerMessage(data)
  const flag = data && typeof data === 'object' && 'success' in data
    ? successFlag((data as { success: unknown }).success)
    : null

  if (!res.ok || flag === false) {
    throw new Error(toUserFacingError(rawMessage, SEND_FAILED_MESSAGE))
  }

  if (rawMessage && looksLikeFormSubmitActivation(rawMessage)) {
    throw new Error(FORMSUBMIT_ACTIVATION_MESSAGE)
  }
}

/** POST al endpoint configurado (FormSubmit por defecto). Sin mailto: si falla el envío. */
export async function submitInquiry(form: ContactInquiry): Promise<SubmitResult> {
  if (!form.autorizacionDatos) {
    return {
      ok: false,
      message: 'Debe autorizar el tratamiento de sus datos personales para enviar la solicitud.',
    }
  }

  const endpoint = contactFormEndpoint()

  try {
    await postInquiry(endpoint, form)
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : SEND_FAILED_MESSAGE
    return { ok: false, message: toUserFacingError(message, SEND_FAILED_MESSAGE) }
  }
}
