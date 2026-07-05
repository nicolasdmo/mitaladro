# Radar LatAm — Necesidades del público → diseño de MVP

Sitio de análisis visual sobre **qué necesidades de entretenimiento y de resolución
de problemas** tiene el público en **Latinoamérica**, pensado para descubrir **cómo
diseñar un producto mínimo viable (MVP)**.

Presenta los datos de forma gráfica y ordenada: KPIs, gráficos de barras, columnas,
área temporal, mapa de burbujas de oportunidades, tablas comparativas con puntajes,
bullet points de insights y un playbook accionable.

## Ver el sitio

Es un sitio estático **sin dependencias**. Abrí `index.html` en cualquier navegador
(doble clic) o servilo:

```bash
python3 -m http.server 8000   # luego abrí http://localhost:8000
```

Funciona en modo claro y oscuro (respeta la preferencia del sistema y tiene toggle ◐).

## Estructura

```
index.html         Estructura y secciones del sitio
assets/data.js     ← DATASET EDITABLE (todos los números y textos viven acá)
assets/charts.js   Motor de gráficos (SVG hecho a mano, tooltips, temas)
assets/styles.css  Estilos + paleta validada (light/dark)
```

## Editar los datos

Todo el contenido —cifras, insights, fuentes, puntajes— está en **`assets/data.js`**.
Cambiá los valores ahí y el sitio se actualiza solo. Cada bloque tiene comentarios.

Los bloques marcados como **"ESTIMACIÓN DEL ANÁLISIS"** (prioridad de sectores, mapa
y ranking de oportunidades) son síntesis para priorizar, no datos crudos: ajustalos
a tu criterio.

## Sobre las fuentes de datos

Las cifras provienen de **reportes públicos** (Google Year in Search 2025, eMarketer,
AMI, IDB, market research y prensa especializada), citados en la sección *Fuentes* del
sitio.

> **No hay conexión a una API de Google Trends en tiempo real.** Google no ofrece una
> API pública estable de Trends (la alpha 2025 es de acceso restringido; librerías no
> oficiales tipo `pytrends` se bloquean desde servidores). Si conseguís acceso a una
> API de tendencias (SerpApi, DataForSEO, Glimpse, etc.), reemplazá los valores en
> `assets/data.js`.
