---
name: web-performance-optimization
description: Optimiza el rendimiento de aplicaciones web, incluyendo velocidad de carga, Core Web Vitals, tamaño de bundles, estrategias de caché y rendimiento en tiempo de ejecución.
---

# Instrucciones para la Optimización de Rendimiento Web

Ayuda a los desarrolladores a optimizar el rendimiento de sus aplicaciones para mejorar la experiencia del usuario, el posicionamiento SEO y las tasas de conversión. Esta habilidad proporciona enfoques sistemáticos para medir, analizar y mejorar la velocidad de carga y los Core Web Vitals.

## Cuándo usar esta habilidad
*   Cuando el sitio o app carga lentamente.
*   Para optimizar Core Web Vitals (LCP, INP, CLS).
*   Para reducir el tamaño del bundle de JavaScript.
*   Para mejorar el "Time to Interactive" (TTI).
*   Para optimizar imágenes y assets.
*   Para implementar estrategias de caché.

---

## Metodología de 5 Pasos

### Paso 1: Medir el Rendimiento Actual
Establecer métricas base:
*   Realizar auditorías de **Lighthouse**.
*   Medir **Core Web Vitals** (LCP, INP, CLS).
*   Analizar tamaños de bundles y cascada de red.
*   Identificar cuellos de botella.

### Paso 2: Identificar Problemas
Analizar fallos específicos:
*   Bundles de JS excesivos.
*   Imágenes no optimizadas.
*   Recursos que bloquean el renderizado.
*   Tiempos de respuesta lentos del servidor.
*   Falta de cabeceras de caché.
*   Desplazamientos de diseño (Layout shifts).

### Paso 3: Priorizar Optimizaciones
Enfocarse en cambios de alto impacto:
*   Optimización de la ruta de renderizado crítica (Critical Path).
*   Code splitting y Lazy loading.
*   Optimización de imágenes.
*   Estrategias de caché y limpieza de scripts de terceros.

### Paso 4: Implementar Optimizaciones
Aplicar mejoras técnicas:
*   Optimizar assets (imágenes, fuentes, CSS, JS).
*   Implementar carga diferida.
*   Añadir cabeceras de caché.
*   Optimizar la ejecución en el hilo principal.

### Paso 5: Verificar Mejoras
Medir el impacto:
*   Repetir auditorías de Lighthouse.
*   Comparar métricas antes/después.
*   Monitorear métricas de usuarios reales (RUM).

---

## Ejemplos de Optimización

### 1. Optimización de Core Web Vitals
*   **LCP (Largest Contentful Paint)**: Optimizar la imagen del Hero. Uso de formatos modernos (AVIF/WebP), `fetchpriority="high"` y `loading="eager"`.
*   **INP (Interaction to Next Paint)**: Reducir tareas largas de JS, usar `defer` en scripts no críticos y aplicar code splitting.
*   **CLS (Cumulative Layout Shift)**: Especificar siempre dimensiones (`width`/`height`) en imágenes y reservar espacio para contenido dinámico con skeletons o `aspect-ratio`.

### 2. Reducción de Bundle JS
*   Reemplazar dependencias pesadas (ej. Moment.js por date-fns).
*   Importar librerías de forma selectiva (ej. `import uniq from 'lodash/uniq'`).
*   Implementar `dynamic imports` en Next.js.
*   Limpiar código muerto con Tree Shaking.

### 3. Estrategia de Imágenes
*   Conversión a WebP/AVIF.
*   Implementación de imágenes responsivas (`srcset` y `sizes`).
*   Uso del componente `next/image` para optimización automática.
*   Lazy loading nativo (`loading="lazy"`).

---

## Mejores Prácticas (Checklist)

### Imágenes
- [ ] Convertir a formatos modernos (WebP/AVIF).
- [ ] Implementar imágenes responsivas.
- [ ] Añadir lazy loading (excepto en el Hero).
- [ ] Especificar dimensiones fijas.
- [ ] Comprimir imágenes (< 200KB).

### JavaScript
- [ ] Tamaño del bundle < 200KB (gzipped).
- [ ] Implementar code splitting.
- [ ] Eliminar dependencias innecesarias.
- [ ] Usar `async` o `defer` en scripts externos.

### Caching & Core Web Vitals
- [ ] Configurar cabeceras de caché para assets estáticos.
- [ ] LCP < 2.5s.
- [ ] INP < 200ms.
- [ ] CLS < 0.1.

---

## Herramientas Recomendadas
*   **Medición**: Lighthouse, PageSpeed Insights, WebPageTest.
*   **Análisis**: webpack-bundle-analyzer, source-map-explorer.
*   **Optimización**: Sharp (imágenes), ImageOptim.
*   **Monitoreo**: Vercel Analytics, Sentry Performance.

## Habilidades Relacionadas
*   `react-best-practices`: Patrones de rendimiento en React.
*   `frontend-dev-guidelines`: Estándares de desarrollo.
*   `seo-audit`: Debido al impacto de Core Web Vitals en rankings.
