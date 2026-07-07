/* =============================================================================
   DATASET EDITABLE — Necesidades de entretenimiento y solución de problemas
   Región: Latinoamérica
   -----------------------------------------------------------------------------
   Cada bloque alimenta un gráfico o sección del sitio. Editá los valores acá y
   el sitio se actualiza solo. Cada dato lleva su fuente en `data.fuentes`.
   Los bloques marcados con  ESTIMACIÓN DEL ANÁLISIS  son síntesis propia (no un
   dato crudo de una fuente): sirven para priorizar, ajustalos a tu criterio.
   ============================================================================ */

window.DATA = {
  meta: {
    region: "Latinoamérica",
    vertical: "Amplio / exploratorio",
    actualizado: "Julio 2026",
    fuentesNota:
      "Compilado de reportes públicos (Google Year in Search, eMarketer, AMI, " +
      "IDB, market research y prensa especializada). No proviene de una API de " +
      "Google Trends en tiempo real: reemplazá estos valores cuando tengas datos propios.",
  },

  /* --------- KPIs de portada (stat tiles) --------- */
  kpis: [
    { valor: "139M", sub: "suscriptores de streaming proyectados a 2027", delta: "+51% vs 2023", tono: "good" },
    { valor: "US$24,7 MM", sub: "mercado de streaming LatAm en 2033", delta: "CAGR 9,0%", tono: "good" },
    { valor: "200M+", sub: "adultos sin acceso pleno a banca", delta: "mercado sin atender", tono: "warning" },
    { valor: "61%", sub: "del capital de riesgo fue a fintech (2025)", delta: "+82% inversión Q3 YoY", tono: "good" },
    { valor: "33%", sub: "del día online — el más alto del mundo", delta: "redes como eje", tono: "neutral" },
    { valor: "88%", sub: "mira video en streaming desde el celular", delta: "mobile-first", tono: "neutral" },
  ],

  /* --------- Tiempo de consumo: LatAm vs Global (horas/día) --------- */
  tiempoConsumo: {
    unidad: "horas/día",
    series: ["Latinoamérica", "Promedio global"],
    filas: [
      { label: "Escuchar música", latam: 2.08, global: 1.42 },
      { label: "Noticias online", latam: 1.78, global: 0.98 },
    ],
    nota: "LatAm sobre-indexa fuerte en música y noticias digitales frente al promedio global.",
  },

  /* --------- Crecimiento de suscriptores de streaming (millones) --------- */
  streamingCrecimiento: {
    unidad: "millones de suscriptores",
    puntos: [
      { anio: 2023, valor: 92, real: true },
      { anio: 2024, valor: 102, real: false },
      { anio: 2025, valor: 113, real: false },
      { anio: 2026, valor: 126, real: false },
      { anio: 2027, valor: 139, real: true },
    ],
    nota: "Extremos 2023 (92M) y 2027 (139M) son datos reportados; los años intermedios son interpolación de la tendencia.",
  },

  /* --------- Penetración de videojuegos por país (% de población) --------- */
  gamingPais: {
    unidad: "% que juega videojuegos",
    filas: [
      { label: "Brasil", valor: 83 },
      { label: "México", valor: 78 },
      { label: "Perú", valor: 76 },
      { label: "Argentina", valor: 76 },
    ],
    nota: "54% de los jugadores usa el smartphone como plataforma principal.",
  },

  /* --------- Uso de dispositivos por actividad (% de usuarios) --------- */
  dispositivos: {
    unidad: "% de usuarios",
    filas: [
      { label: "Smart TV para CTV", valor: 94 },
      { label: "Celular para video streaming", valor: 88 },
      { label: "Celular para podcasts", valor: 87 },
      { label: "Celular para gaming", valor: 54 },
    ],
    nota: "El celular domina casi todo el consumo; la Smart TV manda solo en TV conectada (CTV).",
  },

  /* --------- Consumo de entretenimiento: insights cualitativos --------- */
  entretenimientoInsights: [
    "Los géneros más vistos: <strong>telenovelas, fútbol y realities</strong> — emoción, identidad y comunidad.",
    "El <strong>video corto</strong> explota: las interacciones con Instagram Reels crecieron <strong>+669%</strong> en perfiles de la región.",
    "Streaming de audio es el segmento de más rápido crecimiento (<strong>CAGR 14,9%</strong> 2025–2033).",
    "La Gen Z (15–24) pasa <strong>48+ horas/mes</strong> en redes sociales; el promedio regional es ~23 h/mes.",
    "El podcast se consume <strong>87% desde el celular</strong>, con noticias como categoría líder.",
  ],

  /* --------- Necesidades de solución de problemas: sectores con brecha --------- */
  brechasSectores: {
    unidad: "prioridad de oportunidad (0–100)  ·  ESTIMACIÓN DEL ANÁLISIS",
    filas: [
      { label: "Inclusión financiera", valor: 95 },
      { label: "Pagos digitales / wallets", valor: 88 },
      { label: "Educación (EdTech)", valor: 74 },
      { label: "Salud (HealthTech)", valor: 70 },
      { label: "Seguros (InsurTech)", valor: 66 },
      { label: "Comercio / delivery", valor: 61 },
    ],
    nota: "Las mayores oportunidades están donde hay mayor déficit: inclusión financiera, seguros, salud y educación.",
  },

  /* --------- Cambio en medios de pago (participación %) --------- */
  pagos: {
    unidad: "% de participación",
    series: ["Ecommerce", "En tienda física"],
    filas: [
      { label: "Pagos digitales", ecommerce: 48, tienda: 30 },
      { label: "Efectivo", ecommerce: 12, tienda: 25 },
    ],
    nota: "El efectivo en tienda cayó al 25% y sigue bajando; wallets, transferencias A2A y BNPL empujan el cambio.",
  },

  /* --------- Problemas cotidianos: insights --------- */
  problemasInsights: [
    "<strong>+200 millones de adultos</strong> sin acceso pleno a banca: el mayor mercado sin atender de la región.",
    "El fintech capturó el <strong>61% del capital de riesgo</strong> en 2025; Q3 2025 sumó US$572M (<strong>+82% interanual</strong>).",
    "En Colombia, el <strong>90% de las fintech</strong> señala la burocracia bancaria como su principal freno.",
    "Usar IA en tareas operativas reporta <strong>44% de ahorro</strong> de costos y <strong>56% más velocidad</strong> de procesamiento.",
    "Búsquedas de <strong>“cómo ganar dinero”</strong> y emprendimiento digital: demanda enorme de soluciones prácticas de ingresos.",
    "Los usuarios adoptan la <strong>búsqueda conversacional con IA</strong>: cambia cómo la gente busca soluciones.",
  ],

  /* --------- Mapa de oportunidades (burbujas) --------- */
  /*  ESTIMACIÓN DEL ANÁLISIS: puntajes 0–100. x=demanda, y=facilidad de entrada,
      tamaño=potencial de monetización.  Ajustá según tu tesis.               */
  oportunidades: {
    ejeX: "Demanda / tamaño de mercado",
    ejeY: "Facilidad de entrada (poca competencia / baja barrera)",
    tamano: "Potencial de monetización",
    items: [
      { nombre: "Fintech inclusión",       demanda: 95, facilidad: 35, monetizacion: 90 },
      { nombre: "Wallets / BNPL",           demanda: 88, facilidad: 40, monetizacion: 82 },
      { nombre: "Video corto / creadores",  demanda: 90, facilidad: 78, monetizacion: 55 },
      { nombre: "Gaming mobile",            demanda: 82, facilidad: 55, monetizacion: 70 },
      { nombre: "EdTech práctica",          demanda: 74, facilidad: 68, monetizacion: 60 },
      { nombre: "HealthTech",               demanda: 70, facilidad: 45, monetizacion: 68 },
      { nombre: "Herramientas IA",          demanda: 80, facilidad: 72, monetizacion: 64 },
      { nombre: "Delivery / comercio",      demanda: 61, facilidad: 30, monetizacion: 58 },
    ],
    nota: "Cuadrante ideal: arriba a la derecha (alta demanda + baja barrera). Burbuja grande = mejor monetización.",
  },

  /* --------- Tabla de scoring de oportunidades --------- */
  /*  ESTIMACIÓN DEL ANÁLISIS. El puntaje se recalcula en vivo según lo que el
      usuario prioriza en el buscador interactivo. categoria: entretenimiento |
      problema | ambos.  mvp: por dónde arrancar.                               */
  scoring: [
    { nombre: "Video corto / creadores", demanda: 90, monetizacion: 55, competencia: 70, dificultad: 30, categoria: "entretenimiento", mvp: "Una app/canal de nicho con una plantilla de contenido repetible y un formato de 15s demostrable; monetizás con marcas o suscripción." },
    { nombre: "Fintech inclusión",       demanda: 95, monetizacion: 90, competencia: 75, dificultad: 80, categoria: "problema", mvp: "Empezá por un dolor puntual (cobrar, ahorrar, prestar) en un país, con wallet + un flujo de pago. Requiere cumplimiento normativo." },
    { nombre: "Herramientas IA",         demanda: 80, monetizacion: 64, competencia: 60, dificultad: 55, categoria: "ambos", mvp: "Una herramienta que resuelva UNA tarea concreta (redactar, resumir, automatizar) con IA; cobrás por uso o suscripción baja." },
    { nombre: "Wallets / BNPL",          demanda: 88, monetizacion: 82, competencia: 78, dificultad: 65, categoria: "problema", mvp: "Integrá 'pagá después' o transferencias A2A en un vertical específico (ej. un rubro de comercios), no como wallet genérica." },
    { nombre: "Gaming mobile",           demanda: 82, monetizacion: 70, competencia: 72, dificultad: 60, categoria: "entretenimiento", mvp: "Un juego hiper-casual mobile con loop corto y localización real (idioma, cultura, métodos de pago locales)." },
    { nombre: "EdTech práctica",         demanda: 74, monetizacion: 60, competencia: 55, dificultad: 45, categoria: "problema", mvp: "Micro-cursos de una habilidad con salida laboral clara ('cómo ganar dinero con X'), formato corto y certificación." },
    { nombre: "HealthTech",              demanda: 70, monetizacion: 68, competencia: 50, dificultad: 70, categoria: "problema", mvp: "Telemedicina o seguimiento de una condición puntual; empezá con agendamiento + seguimiento antes que diagnóstico." },
    { nombre: "Delivery / comercio",     demanda: 61, monetizacion: 58, competencia: 85, dificultad: 55, categoria: "problema", mvp: "No compitas con los grandes: enfocá un nicho (barrio, rubro, comunidad) con logística simple y relación directa." },
  ],

  /* --------- Playbook de MVP --------- */
  playbook: [
    { n: 1, titulo: "Mobile-first, sin excepción", texto: "El 88% consume desde el celular. Diseñá para pantallas chicas, conexiones inestables y equipos de gama media antes que para desktop." },
    { n: 2, titulo: "Entretenimiento + utilidad", texto: "Los ganadores mezclan enganche (video corto, comunidad) con una solución real (pagar, aprender, ganar dinero). Combiná ambas necesidades." },
    { n: 3, titulo: "Distribución por video corto", texto: "Reels, TikTok y Shorts son el canal de adquisición más barato de la región. Diseñá el producto para ser demostrable en 15 segundos." },
    { n: 4, titulo: "Resolvé fricción de pago", texto: "Integrá wallets, transferencias A2A y BNPL desde el día uno. El efectivo cae y +200M de personas están sub-bancarizadas." },
    { n: 5, titulo: "Empezá por un país, no por 'LatAm'", texto: "Brasil, México y Colombia lideran inversión y adopción. Validá en un mercado, con su moneda e idioma, antes de expandir." },
    { n: 6, titulo: "IA como palanca de costos", texto: "44% de ahorro y 56% más velocidad en operaciones. Usá IA para hacer viable un MVP con equipo chico." },
    { n: 7, titulo: "Medí retención, no descargas", texto: "Con Gen Z pasando 48h+/mes en apps, la batalla es por el hábito. El norte del MVP es el retorno semanal, no la instalación." },
  ],

  /* --------- Fuentes --------- */
  fuentes: [
    { t: "Google — Year in Search 2025 (Argentina / es-419)", u: "https://trends.withgoogle.com/es-419/year-in-search/2025/ar/" },
    { t: "eMarketer — The Future of Digital 2025: Latin America", u: "https://www.emarketer.com/content/future-of-digital-2025-latin-america" },
    { t: "AMI — Online Media Consumption for Latin America 2025", u: "https://americasmi.com/insights/online-media-consumption-latam/" },
    { t: "Market Data Forecast — LatAm Media Streaming Market", u: "https://www.marketdataforecast.com/market-reports/latin-america-media-streaming-market" },
    { t: "IDB — Fintech Ecosystem in LatAm & Caribbean (3,000+ startups)", u: "https://www.iadb.org/en/news/study-fintech-ecosystem-latin-america-and-caribbean-exceeds-3000-startups" },
    { t: "TechCrunch — Latin America fintech to watch in 2025", u: "https://techcrunch.com/2024/11/24/latin-america-fintech-will-be-a-market-to-watch-in-2025/" },
    { t: "NextStars — Latin American Startup Ecosystem 2025", u: "https://nextstars.io/2025/11/17/latin-american-startup-ecosystem-2025-trends-and-opportunities/" },
    { t: "Think with Google — Tendencias de marketing LatAm 2026", u: "https://business.google.com/es-all/think/consumer-insights/tendencias-marketing-digital-latinoamerica-2026/" },
  ],
};
