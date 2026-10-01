/** Page keys for the four business lines (matches router route names). */
export type PortfolioPage =
  | "financiero"
  | "inmobiliario"
  | "logistico"
  | "corporativo"

export type PortfolioIconId =
  | "financiero"
  | "inmobiliario"
  | "logistico"
  | "corporativo"

export interface PortfolioDetailBlock {
  tag: string
  title: string
  desc: string
  box: string
  boxLabel: string
}

export interface PortfolioLine {
  id: string
  page: PortfolioPage
  /** Short nav label */
  label: string
  /** Full service title */
  title: string
  tag: string
  shortDesc: string
  /** Hero lead on detail pages */
  heroLead: string
  accent: string
  icon: PortfolioIconId
  /** Overview bullets (Home) */
  items: string[]
  /** Expanded tab bullets on Home */
  tabItems: string[]
  detailBlocks: PortfolioDetailBlock[]
  ctaLabel: string
}

export const portfolioLines: PortfolioLine[] = [
  {
    id: "financiero",
    page: "financiero",
    label: "Financiero",
    title: "Servicios Financieros",
    tag: "Fintech / Crédito",
    shortDesc:
      "Liquidez y crédito con respaldo en activos. Factoring, préstamos prendarios e hipotecarios.",
    heroLead:
      "Soluciones de liquidez y crédito diseñadas para empresas y personas con activos que respalden la operación.",
    accent: "#1A4A8A",
    icon: "financiero",
    items: [
      "Factoring de facturas vigentes",
      "Créditos con garantía hipotecaria",
      "Créditos con garantía prendaria",
    ],
    tabItems: [
      "Factoring o compra de facturas vigentes",
      "Préstamos hipotecarios",
      "Préstamos sobre vehículos (garantía prendaria)",
      "Análisis de cartera y originación ágil",
    ],
    detailBlocks: [
      {
        tag: "Liquidez inmediata",
        title: "Factoring",
        desc: "Compra de facturas vigentes para dar liquidez inmediata a empresas, sin esperar los plazos de pago de sus clientes.",
        box: "Tu empresa cede la factura vigente, Grupo Vantor te desembolsa el valor descontado y gestiona el cobro directamente con el pagador al vencimiento.",
        boxLabel: "Cómo funciona:",
      },
      {
        tag: "Garantía hipotecaria",
        title: "Créditos con Garantía Hipotecaria",
        desc: "Préstamos de capital sobre inmuebles, respaldados con hipoteca en primer grado.",
        box: "Inmueble sin hipoteca previa (primer grado), avalúo comercial actualizado y estudio de títulos.",
        boxLabel: "Requisitos clave:",
      },
      {
        tag: "Garantía prendaria",
        title: "Créditos con Garantía Prendaria",
        desc: "Préstamos sobre vehículos, que requieren inscripción de prenda como respaldo de la operación.",
        box: "Vehículo libre de gravámenes o con saldo menor al valor del crédito, documentos al día e inscripción de prenda ante el organismo de tránsito.",
        boxLabel: "Requisitos clave:",
      },
    ],
    ctaLabel: "Solicitar Asesoría Financiera",
  },
  {
    id: "inmobiliario",
    page: "inmobiliario",
    label: "Inmobiliario",
    title: "Servicios Inmobiliarios",
    tag: "Asesoría patrimonial",
    shortDesc:
      "Compra, venta, arriendo y valoración de inmuebles con respaldo legal en cada operación.",
    heroLead:
      "Asesoría integral para la compra, venta, arriendo y valoración de bienes inmuebles.",
    accent: "#1E6B4F",
    icon: "inmobiliario",
    items: [
      "Corretaje inmobiliario",
      "Avalúos comerciales",
      "Contratos de compraventa y arriendo",
    ],
    tabItems: [
      "Asesoria en Compra y venta de inmuebles residenciales y comerciales",
      "Asesoria en Arrendamiento con contrato formal",
      "Valoración comercial y avalúos",
      "Revisión legal de contratos",
    ],
    detailBlocks: [
      {
        tag: "Intermediación",
        title: "Corretaje",
        desc: "Intermediación profesional en procesos de compra, venta y arrendamiento de inmuebles con acompañamiento legal en cada etapa.",
        box: "Compra y venta residencial · Compra y venta comercial · Arrendamiento con contrato formal",
        boxLabel: "Incluye:",
      },
      {
        tag: "Valoración",
        title: "Avalúos",
        desc: "Valoración comercial de inmuebles como soporte para operaciones financieras y patrimoniales con perito certificado.",
        box: "Avalúo comercial actualizado · Soporte para créditos hipotecarios · Informe con sustento técnico",
        boxLabel: "Incluye:",
      },
      {
        tag: "Documentación",
        title: "Estructuración de Contratos",
        desc: "Elaboración y revisión de contratos de compraventa y arrendamiento con respaldo legal.",
        box: "Revisión legal de títulos · Contratos de compraventa · Contratos de arrendamiento",
        boxLabel: "Incluye:",
      },
    ],
    ctaLabel: "Solicitar Asesoría Inmobiliaria",
  },
  {
    id: "logistico",
    page: "logistico",
    label: "Logística",
    title: "Logística & Comercio Exterior",
    tag: "Carga internacional",
    shortDesc:
      "Consolidación de carga LCL y acompañamiento de importaciones para microimportadores.",
    heroLead:
      "Soluciones de consolidación de carga para optimizar costos y tiempos de importación.",
    accent: "#7A4A1A",
    icon: "logistico",
    items: [
      "Consolidación de carga (LCL)",
      "Gestión documental aduanera",
      "Rutas periódicas optimizadas",
    ],
    tabItems: [
      "Consolidación de carga (LCL)",
      "Reducción de costos de flete por volumen",
      "Trámites aduaneros y documentación",
      "Rutas periódicas desde Asia y Europa",
    ],
    detailBlocks: [
      {
        tag: "Carga consolidada",
        title: "Consolidación de Carga (LCL)",
        desc: "Agrupamiento de mercancías de microimportadores en un solo contenedor, reduciendo costos de flete y facilitando el acceso a comercio exterior.",
        box: "1. Recepción de mercancía en bodega de origen · 2. Consolidación en contenedor compartido · 3. Gestión documental y aduanera · 4. Entrega en destino",
        boxLabel: "Proceso:",
      },
      {
        tag: "Beneficio",
        title: "Menor costo por unidad",
        desc: "Comparte el contenedor con otros importadores y reduce el flete por volumen de carga.",
        box: "Ideal para mipymes que no llenan un contenedor completo (FCL).",
        boxLabel: "Para quién:",
      },
      {
        tag: "Beneficio",
        title: "Gestión documental",
        desc: "Acompañamiento completo en trámites aduaneros y documentación de importación.",
        box: "Trámites aduaneros, documentación de importación y seguimiento hasta destino.",
        boxLabel: "Qué cubre:",
      },
      {
        tag: "Beneficio",
        title: "Tiempos optimizados",
        desc: "Rutas y consolidaciones periódicas para reducir tiempos de tránsito desde el origen.",
        box: "Rutas periódicas desde cualquier destino con consolidaciones programadas.",
        boxLabel: "Operación:",
      },
    ],
    ctaLabel: "Solicitar Cotización",
  },
  {
    id: "corporativo",
    page: "corporativo",
    label: "Corporativo",
    title: "Servicios Corporativos",
    tag: "Contable, tributario y nómina",
    shortDesc:
      "Gestión integral de contabilidad, tributación y nómina, con acompañamiento permanente para el cumplimiento normativo.",
    heroLead:
      "Grupo Vantor te acompaña para facilitar el cumplimiento de las obligaciones contables, tributarias y laborales aplicables a tu empresa, conforme a la normativa vigente.",
    accent: "#4A1A7A",
    icon: "corporativo",
    items: [
      "Outsourcing contable",
      "Gestión tributaria",
      "Administración de nómina",
      "Acompañamiento y control",
    ],
    tabItems: [
      "Outsourcing contable",
      "Gestión tributaria",
      "Administración de nómina",
      "Acompañamiento y control",
    ],
    detailBlocks: [
      {
        tag: "Contabilidad",
        title: "Outsourcing Contable",
        desc: "Gestión integral de la contabilidad, gestión tributaria y administración de nómina de tu empresa, manteniendo la información contable organizada, actualizada y oportunamente procesada, con seguimiento permanente de las obligaciones y cumplimiento de la normativa vigente.",
        box: "Ciclo contable mensual oportuno · Registro y clasificación de operaciones · Conciliaciones y revisión de cuentas · Estados financieros mensuales · Cierres contables y reportes financieros.",
        boxLabel: "Incluye:",
      },
      {
        tag: "Tributario",
        title: "Gestión Tributaria",
        desc: "Seguimiento permanente de las obligaciones tributarias y sus vencimientos, con el propósito de facilitar el cumplimiento oportuno de las responsabilidades aplicables a la empresa.",
        box: "Seguimiento del calendario tributario · Preparación y presentación de declaraciones aplicables · Control de vencimientos · Seguimiento de responsabilidades ante las entidades tributarias.",
        boxLabel: "Incluye:",
      },
      {
        tag: "Nómina",
        title: "Administración de Nómina",
        desc: "Gestión oportuna de la nómina y de las obligaciones laborales y de seguridad social asociadas, de acuerdo con la normativa aplicable.",
        box: "Liquidación de nómina · Seguridad social y parafiscales · Prestaciones sociales · Comprobantes de nómina · Reportes periódicos.",
        boxLabel: "Incluye:",
      },
      {
        tag: "Acompañamiento",
        title: "Acompañamiento y Control",
        desc: "Un servicio pensado para que puedas concentrarte en tu negocio mientras cuentas con información contable organizada y seguimiento profesional de tus principales obligaciones.",
        box: "Informes contables y financieros · Reportes personalizados · Soporte",
        boxLabel: "Incluye:",
      },
    ],
    ctaLabel: "Solicitar Asesoría Corporativa",
  },
]

const portfolioPageSet = new Set<string>(portfolioLines.map((line) => line.page))

export function isPortfolioPage(page: string): page is PortfolioPage {
  return portfolioPageSet.has(page)
}

export function getPortfolioByPage(page: string): PortfolioLine | undefined {
  return portfolioLines.find((line) => line.page === page)
}
