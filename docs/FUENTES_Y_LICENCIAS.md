# Fuentes y licencias · 17 de octubre de 2026

Actualización de la segunda versión: se conserva el video y las licencias. La narrativa vigente procede de `BRIEF_ACTUALIZADO.md`. Las dos estadísticas del apartado histórico siguiente fueron retiradas de la landing para priorizar autonomía y situaciones cotidianas. No se incorporaron librerías de animación, servicios de IA, imágenes ni recursos externos nuevos.

## Brief y referencias

Se leyó completo `AgroSmart_Inicio/PROMPT_MAESTRO.md`, además de `RECURSOS_Y_FUENTES.md`, `LEEME.md` y el script de descarga. Se revisaron visualmente las cuatro imágenes de `referencias/`. Solo se usaron para interpretar composición, escala, color y dirección editorial. No se reutilizó el nombre, logo, texto ni capturas de la marca de referencia en `public/` o `dist/`.

Los archivos del paquete son material del encargo. Sus afirmaciones se contrastaron con las fuentes indicadas cuando se usan como datos públicos. Las demostraciones se distinguen de capacidades operativas y no se incorporaron instrucciones para acciones externas ajenas al encargo.

## Medios obtenidos

- Obra: **Blueberry Picking**, cuenta Pixabay, Pexels.
- Ficha oficial consultada: https://www.pexels.com/video/blueberry-picking-855230/
- Archivo oficial descargado con éxito por HTTPS, sin cuenta ni métodos para sortear bloqueos: https://videos.pexels.com/video-files/855230/855230-hd_1920_1080_30fps.mp4
- Original: 1920×1080, H.264, 29,97 fps, duración 16,08 s; descarga de 9.108.362 bytes.
- Ficha marcada Free. Condiciones consultadas: https://www.pexels.com/license/ . Se registra la licencia Pexels; no se afirma CC0 solo por un fragmento de búsqueda.
- Uso: recurso audiovisual ilustrativo. No se atribuye a una finca peruana ni a un cliente o aliado del proyecto. No implica respaldo de las personas mostradas.
- Derivados locales: `public/media/arandanos-hero.mp4` (2.924.049 bytes, 1280×720, H.264, sin audio, faststart, 10,01 s) y `arandanos-poster.webp` (84.310 bytes, 1280×720).
- Transformación: tramo del original desde segundo 2, recortado a 10 s, escalado y comprimido con CRF 28; póster en segundo 4 del original. FFmpeg 6.1.1 vía `ffmpeg-static` 5.3.0 como herramienta de desarrollo.
- Comprobación: decodificación completa del MP4 comprimido sin errores, dimensiones y peso comprobados, fotogramas muestreados inspeccionados y reproducción real en Chrome. El bucle tiene un corte natural entre dos momentos de la cosecha; no se presenta como una toma panorámica ni un bucle perfectamente continuo.
- No hay hotlink permanente: video, póster y fuentes se sirven localmente.

El estado de descarga bloqueada del paquete de preparación era histórico. En esta implementación sí se obtuvieron los bytes y se verificó el archivo final.

## Cifras oficiales verificadas en la primera versión, retiradas de la landing actual

**72 % — Mundo, 2023.** Agricultura como proporción de extracciones totales de agua dulce. Verificado por lectura directa del texto del indicador FAO ODS 6.4.2: https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/642-water-stress/

**94,3 % — Perú, 2025.** Unidades agropecuarias destinadas a agricultura familiar. Verificado en el texto indexado de la noticia oficial del INEI sobre ENA 2025. La apertura directa del portal no se completó en la herramienta de consulta; no se afirma lectura directa de esa página. La noticia define el grupo como unidades de menos de 10 hectáreas y sin trabajador permanente. https://www.gob.pe/institucion/inei/noticias/1408597-mujeres-conducen-el-31-2-de-las-unidades-agropecuarias

Estas fuentes se conservan como registro del trabajo anterior. Sus porcentajes ya no aparecen en la web. No son resultados de AgroSmart, ahorro probado ni un cálculo de mercado de arándanos. Las fuentes no son patrocinadores.

## Tipografías, iconos y código

- Inter e Inter Tight, distribución `@fontsource-variable` 5.3.0: SIL Open Font License 1.1. Se usan archivos WOFF2 latinos locales y `font-display: swap`. Procedencia: https://fontsource.org/fonts/inter y https://fontsource.org/fonts/inter-tight . Licencias completas conservadas en `public/licenses/` y distribuidas junto a los archivos.
- Lucide React 0.577.0: licencia ISC y avisos incluidos en su `LICENSE`, conservados completos en `public/licenses/Lucide-LICENSE.txt`. https://lucide.dev/license
- React y React DOM 19.3.1: MIT. Licencias completas en `public/licenses/`.
- Wordmark, favicon, recurso social SVG, esquema de parcelas y vistas de producto: composición propia de esta implementación. No se incluyó una licencia general para el proyecto sin decisión del propietario.
- FFmpeg: herramienta local de desarrollo, no distribuida con `dist/`. El paquete y binario permanecen entre dependencias de desarrollo.

## Documentación técnica consultada

- https://react.dev/versions — documentación oficial de React, familia estable 19.3; npm resolvió 19.3.1.
- https://vite.dev/guide/ — guía oficial; versión estable instalada 8.3.4, fijada en pnpm-lock.yaml.
- Dependencias y versiones exactas reproducibles en `pnpm-lock.yaml`. Gestor fijado a pnpm 11.19.0 y Node 24.x.
- API web estándar: reproducción de HTMLMediaElement, IntersectionObserver, MediaQueryList, dialog y SpeechSynthesis. Se verificaron sus ramas de comportamiento con pruebas de navegador.
