# AgroSmart · web de presentación

Web de presentación local: autonomía del productor, recursos cotidianos y presentación interactiva con profundidad 3D. React 19.3.1, TypeScript 7.0.2 y Vite 8.3.4. Node.js 24.x y pnpm 11.19.0 fijados en package.json. Se conserva solo pnpm-lock.yaml como lockfile.

## Abrir y desarrollar

Desde PowerShell:

```powershell
Set-Location 'C:\Users\ASUS\Documents\Siklerito\Proyectos Personales\Agrosmart'
pnpm install --frozen-lockfile
pnpm dev
```

Abre la URL Local que imprime Vite (normalmente http://127.0.0.1:5173/). Los medios y las fuentes se sirven desde el proyecto; no requieren servicios externos para la presentación.

## Configurar el acceso a la aplicación

Copia `.env.example` a `.env.local` y define una sola variable:

```dotenv
VITE_APP_URL=
```

Coloca la URL real HTTP/S cuando exista y reinicia Vite; para producción vuelve a compilar. Sin una URL válida, los tres CTA muestran un diálogo con el enlace «Conocer AgroSmart». Todos usan la misma configuración y abren el destino en la misma pestaña. No incluir tokens, credenciales ni datos personales en esta variable, que es pública en el frontend. No se agregan parámetros para Fácil.

## Generar la versión final

```powershell
pnpm build
pnpm preview
```

`dist/` contiene la web estática lista para alojar. `pnpm preview` permite comprobarla por HTTP (normalmente http://127.0.0.1:4173/). No abrir `dist/index.html` por doble clic: los módulos requieren servidor HTTP. La salida está preparada para la raíz de un sitio; para publicar en un subdirectorio, configurar `base` en Vite y revisar las rutas de medios.

## Qué incluye

- Hero con video local de arándanos en bucle automático, sin audio ni controles de reproducción. Póster alternativo si el navegador bloquea autoplay, hay ahorro de datos o el visitante reduce el movimiento. Pausa fuera de vista y reanuda al volver.
- Entrada animada por bloques, escena con profundidad y reacción al puntero, tres escenas seleccionables, repetición de entrada y control de movimiento. CSS y APIs nativas; sin motor 3D ni librerías nuevas.
- Situaciones cotidianas y capacidades por acción: Consulta, Supervisa, Organiza y Gastos. El arándano sigue como escenario piloto.
- Registro por texto o pasos: preparar, corregir y confirmar. La interpretación está acotada al ejemplo y montos numéricos, no es una integración de IA ni reconocimiento de voz.
- Historia manual de seis pasos: registrar, supervisar, comprender, decidir, asignar y revisar; sin comandos a equipos.
- AgroSmart Fácil destacado: vistas Estándar/Fácil con los mismos datos, acciones guiadas y lectura de voz tras una pulsación, con alternativa textual.
- Adopción progresiva, FAQ, navegación móvil y diálogo accesibles.
- Ejemplo de apoyo autorizado: permisos comprensibles para familiar, técnico o colaborador, sin enviar invitaciones ni compartir información.
- Todas las escenas son demostraciones locales. No hay backend, autenticación, sensores reales, analítica ni formularios de envío.

## Verificación

```powershell
pnpm test
pnpm test:e2e
pnpm build
```

Las pruebas de navegador usan una instalación local de Google Chrome mediante Playwright. Si Chrome no está instalado, instala Chromium con `npx playwright install chromium` y elimina `channel: 'chrome'` de `playwright.config.ts`. No es necesario ejecutar estas pruebas para usar la web.

El segundo servidor de pruebas (puerto 5174) usa temporalmente `https://example.com/agrosmart-app`, interceptado por la prueba. Ese dominio no es una dirección de AgroSmart ni una configuración de producción. El puerto 5173 puede reutilizar un servidor local existente de este proyecto.

Resultados y límites de verificación: `docs/VALIDACION.md`. Registro de recursos y licencias: `docs/FUENTES_Y_LICENCIAS.md`. El paquete original extraído se conserva en `AgroSmart_Inicio/` y sus capturas no se incluyen en la web.

El texto de reorientación más reciente se conserva en `docs/BRIEF_ACTUALIZADO.md`. Sustituye la narrativa del paquete inicial. La landing ya no presenta estadísticas, satélites ni trazabilidad como argumento. Los registros de esta página viven solo en memoria y se pierden al recargar; el monto confirmado se comparte entre las vistas Fácil y Estándar.

Para revisar la animación, abre la portada, explora “Mi día / Mis recursos / Un aviso” y mueve el puntero sobre la escena. “Repetir entrada” reproduce su llegada. “Reducir animaciones” desactiva los efectos y el video. Si el sistema solicita movimiento reducido, se respeta desde el inicio. El botón “Activar animaciones” permite elegir expresamente ver los efectos. La elección se conserva en localStorage; “Usar ajuste del sistema” la borra. “Ver entrada animada” también permite activar y reproducir la entrada. No se cambian ajustes de Windows.

Se incluyen capturas y una grabación real de la interfaz en `docs/capturas/`. Para regenerarlas con Vite en marcha: `node scripts/capture-experience.mjs`. Esta utilidad opcional usa Chrome y FFmpeg de Playwright (`npx playwright install ffmpeg`); no son dependencias de la web publicada.

## Archivos principales

- `src/main.tsx`: componentes e interacciones.
- `src/content.ts`: módulos, capacidades, preguntas y datos ficticios compartidos.
- `src/config.ts`: validación del destino de la aplicación.
- `src/styles.css`: tokens, composición, reflujo y movimiento.
- `src/experience.css`: profundidad 3D, transiciones y composición de la segunda versión.
- `src/motion.tsx`: preferencia de movimiento, escena interactiva y progreso de lectura.
- `src/registration.tsx`: registro revisable, datos compartidos en memoria y apoyo autorizado.
- `src/record.ts`: interpretación acotada y validación de montos de ejemplo.
- `public/media/`: video comprimido y póster realmente obtenidos.
- `public/licenses/`: textos de licencias de fuentes, iconos y React.

## Pendientes reales

1. Configurar la URL real de la aplicación cuando exista.
2. Elegir alojamiento y dominio antes de publicar. No se creó una cuenta ni un despliegue.
3. Al publicar, definir las URLs sociales absolutas y validar la tarjeta de enlace en la plataforma destino; no se inventó canonical ni dominio. Se incluye un PNG social original de 1200×630 y su fuente SVG, sin texto incrustado.
4. Validar con productores y adultos mayores: la revisión automática no sustituye una prueba de comprensión y uso con personas reales. La voz instalada y su pronunciación dependen del navegador y sistema.
5. Medir beneficios, disponibilidad de integraciones y operación sin conexión en la aplicación y en pilotos. Esta web no valida esas capacidades.

## Reproducir los medios (opcional)

No es necesario descargar nada para abrir esta versión: los recursos finales ya están incluidos. Para regenerarlos, guarda el MP4 oficial en `AgroSmart_Inicio/arandanos-original.mp4` y ejecuta:

```powershell
node scripts/prepare-media.mjs
```

El original se conserva localmente pero no se publica en `dist/`. El script usa FFmpeg como herramienta opcional de desarrollo; su binario tampoco se publica. El postinstall de ffmpeg-static está deshabilitado expresamente en pnpm-workspace.yaml porque el MP4 final ya existe. Para regenerarlo, define FFMPEG_BIN con la ruta absoluta a un FFmpeg ya instalado. No es necesario aprobar ni descargar FFmpeg para pnpm dev, pnpm build o Vercel. La procedencia, transformaciones y licencia están registradas en `docs/FUENTES_Y_LICENCIAS.md`.

## Vercel

Se incluye vercel.json con preset Vite, salida dist y comandos que ejecutan pnpm 11.19.0 explícitamente mediante npx. Así el despliegue no depende de la versión de pnpm preinstalada en el contenedor. Node.js queda fijado a 24.x en package.json.

Usa la raíz del repositorio como Root Directory. La instalación usa pnpm install --frozen-lockfile y el build pnpm build, a través del ejecutor versionado del manifiesto. Se verificaron localmente esos mismos comandos y la salida estática; un despliegue real en Vercel necesita sus propios logs de éxito.

VITE_APP_URL puede configurarse en las variables del proyecto en Vercel. Sin esa variable, los accesos continúan mostrando el diálogo de acceso.
