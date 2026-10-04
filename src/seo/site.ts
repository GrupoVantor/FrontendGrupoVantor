import { officeLocation } from '../config/officeLocation.ts'

/** Production origin (no trailing slash). */
export const SITE_URL = 'https://grupovantor.co'

export const SITE_NAME = 'Grupo Vantor'
export const LEGAL_NAME = 'Grupo Vantor S.A.S.'
export const ORG_EMAIL = 'contacto@grupovantor.co'
export const ORG_PHONE = '+57 302 668 7703'
export const ORG_LOCALITY = officeLocation.address.split(',')[0].trim()

/** Square brand mark (favicon / apple-touch-icon / schema logo). */
export const LOGO_PATH = '/favicon.png'
/** Fallback share image until a 1200×630 banner exists. */
export const DEFAULT_SOCIAL_IMAGE_PATH = '/logo_con_letras.png'

export type RouteSeo = {
  path: string
  name: string
  title: string
  description: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export const routeSeo: RouteSeo[] = [
  {
    path: '/',
    name: 'inicio',
    title: 'Grupo Vantor S.A.S. | Factoring, créditos, inmobiliaria y logística en Colombia',
    description:
      'Grupo Vantor S.A.S.: factoring, créditos con garantía hipotecaria y prendaria, asesoría inmobiliaria, carga consolidada LCL y outsourcing contable en Colombia.',
    changefreq: 'weekly',
    priority: 1,
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    title: 'Quiénes somos | Grupo Vantor S.A.S.',
    description:
      'Conozca Grupo Vantor S.A.S., grupo empresarial colombiano que integra servicios financieros, inmobiliarios, logísticos y corporativos para empresas y personas.',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/financiero',
    name: 'financiero',
    title: 'Factoring y créditos con garantía hipotecaria y prendaria | Grupo Vantor',
    description:
      'Liquidez para su empresa con factoring de facturas vigentes y créditos con garantía hipotecaria o prendaria sobre vehículos en Colombia. Asesoría Grupo Vantor.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/inmobiliario',
    name: 'inmobiliario',
    title: 'Servicios inmobiliarios: corretaje, avalúos y contratos | Grupo Vantor',
    description:
      'Asesoría inmobiliaria en Colombia: compra, venta y arriendo de inmuebles, avalúos comerciales y contratos con respaldo legal. Servicios de Grupo Vantor S.A.S.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/logistico',
    name: 'logistico',
    title: 'Carga consolidada LCL para mipymes e importadores | Grupo Vantor',
    description:
      'Consolidación de carga LCL para mipymes y microimportadores en Colombia: menor costo de flete, rutas periódicas y gestión documental aduanera con Grupo Vantor.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/corporativo',
    name: 'corporativo',
    title: 'Outsourcing contable, tributario y de nómina | Grupo Vantor',
    description:
      'Outsourcing contable, gestión tributaria y administración de nómina para empresas en Colombia, con seguimiento de obligaciones y normativa. Grupo Vantor S.A.S.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/contacto',
    name: 'contacto',
    title: 'Contacto | Grupo Vantor S.A.S.',
    description:
      'Contacte a Grupo Vantor S.A.S. en Bogotá: escríbanos a contacto@grupovantor.co o llame al +57 302 668 7703. Atención de lunes a viernes de 8:00 a.m. a 5:00 p.m.',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/politica-de-datos',
    name: 'politica-datos',
    title: 'Autorización de tratamiento de datos personales | Grupo Vantor S.A.S.',
    description:
      'Autorización y política de tratamiento de datos personales de Grupo Vantor S.A.S., conforme a la Ley 1581 de 2012 y la normativa colombiana de protección de datos.',
    changefreq: 'yearly',
    priority: 0.3,
  },
]

export const NOT_FOUND_ROUTE_NAME = 'not-found'
/** Path rendered by scripts/prerender.mjs into dist/404.html; must not match a real route. */
export const NOT_FOUND_PRERENDER_PATH = '/404'
export const ROBOTS_NOINDEX = 'noindex, follow'

/** Not part of routeSeo so it never reaches sitemap.xml. */
export const notFoundSeo = {
  title: 'Página no encontrada | Grupo Vantor S.A.S.',
  description:
    'La página que busca no existe o fue movida. Explore los servicios financieros, inmobiliarios, logísticos y corporativos de Grupo Vantor S.A.S.',
}

export function seoForPath(path: string): RouteSeo {
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path
  return routeSeo.find((route) => route.path === normalized) ?? routeSeo[0]
}

export function seoForName(name: string): RouteSeo | undefined {
  return routeSeo.find((route) => route.name === name)
}

export function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}

export function buildSitemapXml(lastmod: string): string {
  const urls = routeSeo
    .map(
      (route) =>
        `  <url>\n    <loc>${canonicalUrl(route.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildStructuredData(): object {
  const orgId = `${SITE_URL}/#organization`
  const address = {
    '@type': 'PostalAddress',
    addressLocality: ORG_LOCALITY,
    addressCountry: 'CO',
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: LEGAL_NAME,
        legalName: LEGAL_NAME,
        alternateName: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: absoluteUrl(LOGO_PATH),
        image: absoluteUrl(DEFAULT_SOCIAL_IMAGE_PATH),
        email: ORG_EMAIL,
        telephone: ORG_PHONE,
        address,
        areaServed: { '@type': 'Country', name: 'Colombia' },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: ORG_EMAIL,
          telephone: ORG_PHONE,
          areaServed: 'CO',
          availableLanguage: 'es',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: LEGAL_NAME,
        url: `${SITE_URL}/`,
        inLanguage: 'es-CO',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: LEGAL_NAME,
        url: `${SITE_URL}/`,
        image: absoluteUrl(DEFAULT_SOCIAL_IMAGE_PATH),
        email: ORG_EMAIL,
        telephone: ORG_PHONE,
        address,
        parentOrganization: { '@id': orgId },
        areaServed: { '@type': 'Country', name: 'Colombia' },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        knowsAbout: [
          'Factoring',
          'Créditos con garantía hipotecaria',
          'Créditos con garantía prendaria',
          'Corretaje inmobiliario',
          'Avalúos comerciales',
          'Consolidación de carga LCL',
          'Outsourcing contable',
          'Gestión tributaria',
          'Administración de nómina',
        ],
      },
    ],
  }
}
