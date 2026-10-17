# Recursos y fuentes

Verificados el 17 de octubre de 2026.

## Referencias del usuario

Las cuatro imágenes se incluyen para interpretación visual. No se ha verificado una licencia para reutilizar el diseño comercial mostrado ni sus logos. El prompt exige una composición original de AgroSmart y no incorporar esas capturas a la web publicada.

## Video seleccionado

- Título: Blueberry Picking.
- Ficha: https://www.pexels.com/video/blueberry-picking-855230/
- Autor/cuenta indicada: Pixabay.
- Contenido: manos cosechando arándanos; material ilustrativo, no una finca vinculada a AgroSmart.
- Ficha consultada: 1920×1080, formato 16:9, duración aproximada 16 segundos; licencia marcada como gratuita y el resultado de búsqueda de la ficha indica CC0.
- Enlace del archivo obtenido al seguir el botón oficial de descarga: https://videos.pexels.com/video-files/855230/855230-hd_1920_1080_30fps.mp4
- Estado: la descarga de bytes fue bloqueada con HTTP 403 desde el entorno de preparación. No se incluye un MP4 ni un póster descargado y no se ha hecho una revisión fotograma a fotograma.
- Licencia general de Pexels: https://www.pexels.com/license/
- Explicación oficial sobre contenido marcado CC0: https://www.pexels.com/creative-commons-images/

La página general de licencia permite descargar, editar y usar medios en webs, con restricciones como no insinuar respaldo por las personas o marcas mostradas. Conservar la procedencia y revisar la licencia de la ficha al descargar. No usar el video como logo o marca. El uso previsto es un recurso audiovisual dentro de la web, no un producto de stock para revender.

Puedes intentar la descarga desde la ficha o ejecutar:

```bash
python3 descargar_video.py
```

El script solo crea `assets/arandanos-original.mp4` si recibe un MP4 válido; muestra el error si no puede obtenerlo. No sortea bloqueos ni necesita cuenta. El original debe comprimirse antes de publicarse. Con ffmpeg disponible, desde esta carpeta:

```bash
ffmpeg -i assets/arandanos-original.mp4 -t 10 -an -vf scale=1280:-2 -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p -movflags +faststart assets/arandanos-hero.mp4
ffmpeg -ss 2 -i assets/arandanos-original.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 75 assets/arandanos-poster.webp
```

Esos comandos son instrucciones para ejecutar cuando exista el original; no se ejecutaron al preparar el paquete. Revisa composición, calidad, tamaño final y continuidad del bucle. Si el recorte no encaja como hero, usar el video en la sección sobre el cultivo y seleccionar después una toma panorámica apropiada con licencia verificada.

## Estadísticas para la landing

| Cifra | Texto fiel al alcance | Fuente |
|---|---|---|
| 72 % | Proporción de las extracciones mundiales de agua dulce correspondiente a agricultura en 2023 | FAO, portal ODS 6.4.2 |
| 94,3 % | Unidades agropecuarias destinadas a agricultura familiar en Perú en 2025, según resultados divulgados por INEI | INEI, ENA 2025 |

FAO: https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/642-water-stress/

INEI: https://www.gob.pe/institucion/inei/noticias/1408597-mujeres-conducen-el-31-2-de-las-unidades-agropecuarias

La cifra de FAO se pudo leer directamente en la página del indicador. La cifra del INEI se verificó mediante el texto de la publicación oficial recuperado por el buscador; la apertura directa del portal devolvió HTTP 418 en este entorno. Conservar esa distinción en el registro de verificación.

Estas cifras dimensionan el contexto. No prueban que AgroSmart genere ahorro, que toda agricultura familiar cultive arándano ni que ese universo pueda pagar el producto. Publicar los enlaces junto a los datos. No inventar estadísticas comerciales.

## Documentación técnica inicial

- React: https://react.dev/
- Vite: https://vite.dev/guide/
- MDN, reproducción automática: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- MDN, movimiento reducido: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

Son enlaces de consulta para la implementación, no una selección de versiones fijadas. El agente debe revisar la documentación vigente y el proyecto existente antes de elegir dependencias.
