# Validación de la segunda versión

Fecha: 17 de octubre de 2026. Windows, Node.js 24.15.0, npm 11.12.1 y Chrome local con Playwright 1.64.1. Se verificó la web local y su salida de producción; no hay despliegue externo.

## Producto y contenido

Se aplicó el texto de reorientación conservado en `BRIEF_ACTUALIZADO.md`: autonomía del productor y gestión de agua, equipos, materiales, trabajos y gastos. Fácil guía el diseño; Estándar agrega densidad sin crear otra cuenta, información ni permisos. Arándano es el escenario piloto.

Se retiraron de la landing las estadísticas y el protagonismo de satélites, indicadores agronómicos e historial de producción. No aparecen diagnósticos de plantas, QR, certificaciones, competidores, testimonios ni promesas de rentabilidad. Las capacidades futuras se explican como propuesta.

Las operaciones, horas, gastos y permisos son ilustrativos. Se distinguen órdenes, estados recibidos, datos confirmados y causa todavía desconocida. No se envían comandos, se invita a personas ni se comparten datos fuera de la página. El registro se confirma solo en memoria, se refleja en portada, Gastos, historia y Fácil/Estándar, y se reinicia al recargar.

## Diseño y movimiento

- Entrada escalonada del titular y composición de planos en perspectiva. Escena 3D con CSS, reacción limitada al puntero y tres vistas que cambian contenido mediante botones accesibles. No hay motor WebGL ni nueva librería de animación.
- Entrada repetible, cambios de escena, transiciones de módulos, pasos de historia, revelado editorial y progreso de lectura. Sin desplazamiento secuestrado ni carrusel automático.
- La entrada termina y quedan movimientos ambientales suaves en el terreno y la nota decorativa; se suspenden fuera de vista. El video silencioso se reproduce en bucle automáticamente sin botones de play o pausa.
- Control manual para reducir animaciones y respeto desde el primer render a la preferencia del sistema. Ahora una elección explícita permite activar efectos aunque el sistema pida movimiento reducido: se corrigió el bloqueo del botón y las reglas CSS globales que impedían esa elección. La preferencia se conserva localmente y se puede restablecer al sistema.
- Inspección de capturas de escritorio y móvil, registro y ampliación. Se corrigió una nota flotante para que no cubriera el enlace de la escena. La ampliación al 200 % mantiene el H1 sin recorte.
- Capturas y grabación real de las transiciones: `docs/capturas/`. La captura usa FFmpeg de Playwright como herramienta de QA, no como recurso de la landing.

## Comprobaciones ejecutadas

`pnpm build`: comprobación de tipos y compilación aprobadas. Salida en `dist/`.

`pnpm test`: 4 pruebas aprobadas: destino HTTP/S válido y ausente/no válido; preparación del ejemplo; rechazo de montos negativos, ambiguos o no válidos.

`pnpm test:e2e`: 26 pruebas aprobadas. Además, se repitió la prueba específica de registro después de conectar su valor a portada y Gastos.

- Escena 3D por clic y teclado, repetición, mantenimiento del foco, inclinación con puntero y apagado de movimiento.
- Preferencia del sistema desde el inicio; activación explícita posible, con animaciones CSS verificadas incluso bajo movimiento reducido; persistencia tras recargar y restablecimiento al sistema.
- Registro por texto y pasos; revisión, corrección, confirmación, errores y cancelación. Un monto cambiado se conserva en Fácil y Estándar, y se refleja en portada y Gastos. Recargar restaura el ejemplo. Sin solicitudes POST.
- Selección ilustrativa de apoyo autorizado y límites claros del permiso.
- Exclusiones de contenido y auditoría del formulario en revisión.
- Enlaces internos, H1, recursos y ausencia de errores del navegador.
- Los tres accesos sin URL abren un diálogo; Escape, retorno del foco y acceso a la demo funcionan. Con URL de prueba, todos usan la misma dirección en la misma pestaña; el destino fue interceptado en la prueba y no es un dominio real de AgroSmart.
- Módulos por teclado/clic y seis pasos de historia con límites de navegación.
- Fácil/Estándar conserva sector, alerta y datos. Acciones de campo y revisión despliegan contenido.
- Voz tras pulsación con API simulada y alternativa textual al faltar soporte. No se solicita micrófono ni se implementa dictado.
- FAQ por teclado y menú móvil con Escape, enlaces y foco.
- Anchos 320, 360, 768, 1024 y 1440 px: sin desbordamiento, incluso con acciones desplegadas. Axe WCAG A/AA y WCAG 2.1 AA: cero infracciones detectadas en esos cinco anchos. También se auditó el menú abierto y el registro en revisión.
- Ampliación CSS al 200 % en viewport de 1440 px, con acceso a las acciones. Se usan container queries para adaptar la composición; no se afirma haber probado el zoom físico en todos los navegadores.
- Video real: autoplay, loop, muted, playsInline y ausencia de controles comprobados. Se probó el cruce del final del video y su vuelta al inicio, pausa fuera de vista y reanudación automática. Autoplay bloqueado conserva el póster sin botones. Movimiento reducido sin activación explícita o ahorro de datos evita descargarlo.

Se comprobó también la salida de producción por HTTP local: carga correcta, escena seleccionable, registro corregido/confirmado y datos compartidos en Estándar, sin errores de recursos ni JavaScript.

## Recursos y rendimiento

Sin cambios en dependencias de ejecución. La profundidad usa transformaciones CSS; el puntero y el progreso usan requestAnimationFrame solo ante eventos, sin un bucle permanente de renderizado.

JS de producción: aproximadamente 281 KB (87,2 KB gzip). CSS: aproximadamente 60 KB (12,7 KB gzip). Fuentes locales latinas de 44,87 KB y 48,25 KB. Se conserva el video de 2,92 MB, 10,01 segundos, H.264 faststart sin audio, y póster WebP de 84 KB. No se incorporaron peticiones a servicios externos para demos o interpretación del texto.

No se ejecutó Lighthouse, una auditoría manual con lector de pantalla ni una medición en teléfonos/redes físicas. La auditoría automática no sustituye pruebas de comprensión con adultos mayores.

## Límites y pendientes

Configurar la URL real de la aplicación y elegir alojamiento/dominio. La interpretación por texto es deliberadamente acotada al ejemplo y montos numéricos; los casos ambiguos piden corrección o pasos guiados, no se presentan como IA general. El dictado se comunica como previsto para la app. La calidad real de la lectura de voz depende de las voces instaladas y no fue evaluada auditivamente.

Pruebas con productores y adultos mayores, beneficios económicos, autorización real, recuperación de registros sin conexión e integración con controladores pertenecen a la implementación y a pilotos. Esta landing no los valida ni los promete como operativos.

## Corrección de instalación y preparación para Vercel

Se sustituyó el valor de texto inválido de allowBuilds por ffmpeg-static: false: el binario no se necesita para ejecutar ni compilar la web y el MP4 final está incluido. Se retiró package-lock.json, conservando pnpm-lock.yaml. Se fijaron pnpm 11.19.0 y Node 24.x, con comandos versionados de instalación/build en vercel.json.

Verificaciones de esta corrección: pnpm install --frozen-lockfile completó con código 0 sin ERR_PNPM_IGNORED_BUILDS; las 4 pruebas de lógica y 26 de navegador pasaron. Se verificó además la instalación con el ejecutor npx fijado en vercel.json. No se ha publicado un despliegue ni se han modificado preferencias del sistema.
