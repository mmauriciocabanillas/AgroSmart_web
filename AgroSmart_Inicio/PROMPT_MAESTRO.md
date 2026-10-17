# AgroSmart — Prompt maestro para iniciar la web de presentación

Preparado el 17 de octubre de 2026. Este archivo es autocontenido: puedes entregarlo entero a tu agente de desarrollo junto con la carpeta `referencias/`.

## Instrucción de ejecución

Actúa como diseñador de producto, director de arte, redactor y desarrollador frontend. Construye una web de presentación completa para AgroSmart con el contexto y los requisitos siguientes. Toma decisiones de implementación razonables y termina una primera versión funcional y revisable. No te limites a describir lo que harías. Si ya existe un proyecto, inspecciona su estructura y conserva su tecnología; si está vacío, inicia una implementación sencilla con React, TypeScript y Vite, usando versiones estables verificadas en su documentación oficial al ejecutar el proyecto. No agregues un backend para una landing si no es necesario.

Este encargo comprende la WEB PÚBLICA de AgroSmart: comunica el producto, demuestra su experiencia y dirige a una aplicación web existente o futura mediante una URL configurable. El contexto de la aplicación sirve para representarla correctamente; no exige implementar su backend, controlar bombas reales ni desarrollar un ERP entero en esta tarea.

Antes de implementar, revisa las cuatro imágenes adjuntas en `referencias/`. Son inspiración visual, no una plantilla comprada ni autorización para copiar una marca. No utilices el nombre Harvestiq, sus textos, sus logos o las capturas como imágenes de la página final. Diseña AgroSmart con identidad propia y composición equivalente en calidad.

## 1. Contexto definitivo del producto

AgroSmart es un Sistema Inteligente de Gestión y Automatización Agrícola para pequeños y medianos productores. Su cultivo piloto es el ARÁNDANO y su primer contexto es La Libertad, Perú. Su núcleo podrá adaptarse a otros cultivos con perfiles agronómicos específicos. No reutilices el antiguo enfoque en maíz.

El problema: información del fundo dispersa entre cuadernos, hojas de cálculo, servicios de clima, registros de campo y equipos separados. Esa desconexión dificulta detectar fallas, coordinar actividades, controlar recursos y entender los costos. La hipótesis de valor es conectar esos elementos para reducir pérdidas operativas, desperdicios y tiempo de supervisión. Los beneficios económicos aún deben medirse en pilotos.

La cadena funcional es OBSERVAR → ANALIZAR → DECIDIR → ACTUAR → VERIFICAR. La plataforma integra datos y operaciones; una agenda de riego es solo uno de sus resultados. Su propuesta comprende cinco pilares:

1. **Monitor:** mapa de parcelas y sectores; clima; imágenes Sentinel-2 e índices de vegetación; observaciones de campo; lecturas de sensores disponibles; anomalías e inspecciones.
2. **Control:** gestión del agua, disponibilidad y consumo; planificación; supervisión de bombas y válvulas; automatización autorizada mediante infraestructura compatible; verificación y alertas ante fallas.
3. **Gestión:** inventarios, fertilizantes e insumos, herramientas, equipos, mantenimiento, personal, responsables, tareas y aplicaciones agrícolas.
4. **Economía:** presupuesto y gastos por operación, sector y campaña; recursos utilizados; tratamientos, cosechas y registros para trazabilidad; resultados económicos solo cuando existan datos suficientes.
5. **Fácil:** experiencia integrada para adultos mayores y personas con poca experiencia digital. Misma cuenta, datos, servicios, funciones autorizadas y permisos que Estándar. Cambia la presentación y el acompañamiento, no crea otra aplicación ni otra base de datos.

Tres niveles de adopción: organización sin hardware obligatorio; monitoreo con sensores compatibles; automatización supervisada cuando haya equipos y protecciones adecuados. El productor puede comenzar con lo que ya tiene.

Los cuatro ejes de encaje del proyecto son: agua, suelo y resiliencia climática como foco; inclusión tecnológica y rentabilidad como dimensión transversal; consumo energético y mantenimiento como aportes a eficiencia de recursos; registros por sector, tratamientos y cosechas como aportes a trazabilidad. No afirmes que resolvemos por completo los cuatro ejes.

El equipo es Mathias, Alexander y Thays. Mathias lidera servicios, datos, reglas e integración; Alexander lidera frontend y las experiencias Estándar y Fácil, colaborando en la app; Thays trabaja flujos, validación de experiencia, diseño y comunicación. No inventes apellidos, fotografías, clientes o alianzas. La página no necesita una sección del equipo si no aporta a su objetivo.

## 2. Mensaje, voz y contenido principal

Idioma español de Perú; trato de tú, claro, cercano y respetuoso. El adulto mayor conserva conocimiento y autonomía: presenta la tecnología como apoyo a su experiencia. Evita infantilizar, usar estereotipos o sugerir incapacidad.

**Lema principal:** «Del cuaderno al campo conectado.»

**Frase de apoyo:** «Toda tu experiencia, en un sistema hecho para ti.»

**Descripción del hero:** «Organiza tu campo, supervisa tus recursos y automatiza equipos compatibles desde un solo lugar. AgroSmart acompaña a pequeños y medianos productores, con una experiencia sencilla también para adultos mayores.»

**Etiqueta superior:** «Gestión agrícola que va contigo».

**CTA principal:** «Ir a la aplicación» con flecha discreta.

**CTA secundario:** «Conocer AgroSmart» que baja a la explicación. Un acceso «Probar la vista Fácil» lleva a la demostración pública de interfaz incluida en la página.

**Cierre de página:** «Tu experiencia hace crecer el campo. AgroSmart te ayuda a conectarlo.» Botón «Ir a la aplicación» y texto «Empieza con lo que tienes. Crece a tu ritmo.»

No uses ahorro garantizado, inteligencia artificial omnisciente, predicción infalible, rendimiento asegurado, porcentajes inventados ni frases como «líder del mercado». No presentes como operativas capacidades que aún son propuesta o prototipo. Puede usarse «Diseñado para…», «Nuestra propuesta conecta…» y «Automatización con equipos compatibles». Incluye una nota breve de estado del proyecto: «Prototipo en desarrollo. Las integraciones disponibles dependen de la implementación y del equipo conectado.»

## 3. Dirección visual basada en las referencias

La referencia combina una gran escena agrícola a pantalla ancha con sombreado oscuro, títulos blancos y lima, tipografía sans serif, botones redondeados, mucho aire, secciones claras y cambios de escala. Recupera ese lenguaje con fotografías de arándanos y agricultura. Las turbinas de las referencias no deben ser el protagonista de AgroSmart porque no representan su producto.

Construye una composición editorial: hero inmersivo, bloques amplios, escenas de producto, una sección oscura de automatización y un cierre verde claro. No conviertas toda la página en una sucesión de tarjetas iguales. Evita estética de videojuego, hologramas, exceso de degradados, partículas, brillos y gráficos de ciencia ficción.

Tokens iniciales propuestos, aproximados a la referencia, no extraídos como valores originales:

| Token | Valor | Uso |
|---|---|---|
| verde-lima | #A3E635 | Acentos, botones principales con texto oscuro |
| verde-hoja | #65A30D | Decoración, indicadores acompañados de texto |
| verde-bosque | #143D2B | Encabezados, secciones oscuras, texto sobre lima |
| fondo-crema | #F8FAF3 | Fondo general |
| verde-niebla | #EAF4D9 | Sección Fácil y superficies suaves |
| blanco | #FFFFFF | Superficies y texto en áreas oscuras |
| texto | #17251B | Lectura principal |
| texto-secundario | #536153 | Descripciones sobre fondo claro |
| arándano | #4656A6 | Acento secundario puntual, no dominante |
| alerta | #92400E | Texto de advertencia con fondo claro apropiado |

Verifica el contraste de cada combinación antes de usarla; la paleta no garantiza accesibilidad por sí sola. Nunca uses texto lima pequeño sobre blanco.

Tipografía: Inter Tight para titulares e Inter para lectura, con fallback del sistema. Si no puedes descargar fuentes con licencia adecuada, usa fuentes del sistema y registra esa decisión. Titular de escritorio aproximadamente 64–88 px con ajuste fluido; móvil 38–48 px; cuerpo 18–20 px. Radio moderado de 20–28 px en contenedores grandes; botones en forma de píldora con etiqueta clara. Ancho de contenido aproximado de 1200–1280 px; márgenes móviles de 20–24 px y espaciado amplio entre secciones.

Crear wordmark «AgroSmart» con símbolo simple original de hoja/surco mediante SVG propio. No poner emoji como logo. No dibujar texto dentro de imágenes.

## 4. Arquitectura y recorrido de la landing

### A. Cabecera

Logo, enlaces «La solución», «Cómo funciona», «AgroSmart Fácil», «Preguntas» y CTA «Ir a la aplicación». Cabecera inicialmente sobre el hero, con fondo sólido o translúcido suficientemente opaco al desplazar. Navegación móvil accesible con cierre mediante Escape y retorno del foco. Acceso «Saltar al contenido».

### B. Hero audiovisual

Una escena agrícola de gran formato, video real de arándanos o paisaje apropiado, capa oscura que garantice lectura, lema de gran tamaño, descripción y dos CTAs. En escritorio, una pequeña vista de producto puede apoyar la escena sin tapar el campo. En móvil, prioriza mensaje y CTA; no amontones ventanas flotantes. Mostrar «Pausar video» cuando se reproduzca.

### C. El problema y su relevancia

Título «Menos registros dispersos. Más claridad para tu campo.» Breve transición del cuaderno al registro compartido y de la falla tardía a una alerta contextual. Mostrar las dos cifras oficiales de la sección 8 con fuente, alcance y año visibles. No usar logos de organizaciones como si respaldaran AgroSmart.

### D. Un sistema conectado

Presentar Monitor, Control, Gestión y Economía en una composición con una escena central de la plataforma y detalles seleccionables. Fácil es transversal y tendrá una sección dedicada; no lo dibujes como base de datos separada. Cada selección debe cambiar contenido útil, no solo un color. En móvil puede ser un acordeón. No sacrifiques legibilidad por colocar todos los módulos en un mapa complejo.

Textos de ejemplo:

- Monitor: «Entiende qué necesita atención: clima, observaciones y lecturas disponibles en una misma vista.»
- Control: «Planifica y supervisa el agua. Automatiza con equipos compatibles y recibe avisos ante incidencias.»
- Gestión: «Conecta actividades, responsables, insumos y mantenimiento con lo que ocurre en tu campo.»
- Economía: «Conoce los gastos registrados por sector y campaña, y conserva el historial de tus operaciones.»

### E. Historia interactiva de valor

Sección «Un problema detectado. Una respuesta conectada.» Escenario explícitamente SIMULADO de baja de caudal durante una operación autorizada. Pasos navegables con botones «Anterior» y «Siguiente» o lista de pasos accesible: detectar lectura anómala; aplicar la protección local configurada; generar alerta; asignar revisión; registrar ejecución y costo conocido. El visitante debe entender la conexión entre módulos. No enviar comandos reales desde esta landing.

Usa datos ficticios mínimos, por ejemplo «Sector C», «Revisión asignada» y «Registro actualizado», siempre bajo la etiqueta «Ejemplo de funcionamiento». No muestres sensores como conectados, clima como actual ni gasto como medido si provienen de datos de demostración.

### F. AgroSmart Fácil, sección protagonista

Título «La tecnología cambia. Tu experiencia sigue al mando.» Texto: «AgroSmart Fácil está pensado también para adultos mayores: botones grandes, recorridos guiados, lenguaje claro y opciones de voz. La misma información y los mismos permisos, con una forma más sencilla de usarla.»

Mostrar dos vistas originales del mismo escenario. Toggle «Estándar / Fácil» cambia la representación y conserva el sector, la alerta y los valores de demostración. En Estándar hay un resumen organizado; en Fácil, tres acciones grandes como «Ver mi campo», «Escuchar aviso» y «Ver qué hacer». Una alerta debe contener problema y siguiente paso, además de icono y texto.

Si implementas «Escuchar aviso», usa lectura de texto del navegador tras una pulsación; verifica soporte y muestra alternativa de texto si falta. No pedir micrófono ni iniciar audio automáticamente. El dictado de voz es una capacidad prevista de la aplicación: no necesita implementarse en la landing. No confundas el selector de esta demostración con el modo persistente de la app externa.

### G. Adopción progresiva

Tres bloques legibles: «Organiza sin sensores», «Conecta lo que necesitas», «Automatiza con supervisión». No incluyas precios todavía: los importes de conversaciones anteriores eran hipótesis comerciales, no tarifas aprobadas. Sin checkout ni compra de hardware.

### H. Preguntas frecuentes

Respuestas breves y honestas:

- ¿Necesito sensores para empezar? El diseño permite comenzar con organización y registros; las mediciones automáticas requieren equipos compatibles.
- ¿Está pensado para adultos mayores? Sí, Fácil adapta la experiencia y conserva la información y los permisos.
- ¿Solo sirve para arándanos? Arándano es el cultivo piloto; ampliar cultivos exige perfiles técnicos propios.
- ¿Puede encender una bomba? La automatización requiere integración, autorización y protecciones locales; la landing solo demuestra el recorrido.
- ¿Funciona sin internet? Las capacidades sin conexión dependen de la implementación. No prometer control remoto sin conectividad; el equipo local debe aplicar sus reglas de seguridad.
- ¿Cuánto puedo ahorrar? El beneficio debe medirse por productor; todavía no hay un porcentaje de ahorro validado.

### I. Cierre y pie

CTA final, navegación y créditos de medios/fuentes. No añadir testimonios, socios, certificaciones o cifras de clientes ficticios. No agregar formularios que simulen envío. Si no se dispone de contacto real, omite ese formulario. No inventes correo, WhatsApp, dominios, enlaces sociales o páginas legales.

## 5. Movimiento y audiovisual

Usar movimiento con propósito y de forma ligera:

- Aparición inicial del titular por bloques, 500–800 ms, una sola vez.
- Revelado de secciones por opacidad y desplazamiento vertical de 16–24 px, 400–650 ms, con IntersectionObserver.
- Hover/focus de botones, 160–220 ms; desplazamiento máximo de 2 px.
- Cambio de vistas Estándar/Fácil, 200–300 ms, sin perder foco o contenido.
- Historia de automatización con avance MANUAL, sin carrusel que obligue a perseguir texto.
- Sin scroll secuestrado, cursores personalizados, fondos que sigan al mouse o parallax obligatorio.
- Con `prefers-reduced-motion: reduce`, desactivar movimiento decorativo y video automático; conservar todas las funciones.

Video: archivos locales, `muted`, `loop`, `playsInline`, sin música. Usar póster local visible antes de cargar. Reproducir automáticamente solo si el navegador lo permite y el usuario no solicita menos movimiento ni ahorro de datos; pausar fuera de vista o cuando la pestaña no sea visible. Si `play()` falla, conservar el póster y ofrecer un botón de reproducción. Respetar la pausa elegida por el visitante.

El recurso seleccionado está descrito en `RECURSOS_Y_FUENTES.md`. Su descarga desde el entorno de preparación no se pudo completar. Descárgalo desde su ficha oficial o ejecuta `descargar_video.py` en un entorno con acceso; no ocultes un bloqueo como descarga exitosa. No hagas hotlink permanente a un video externo. Si no se puede obtener, deja la primera versión con una imagen agrícola local y documenta el pendiente; no pongas un fondo negro ni un video ajeno al tema para aparentar cumplimiento.

Objetivo orientativo: versión de 8–12 segundos, 1280×720, H.264, sin audio, `faststart`, idealmente menos de 4 MB, y póster WebP. Una versión comprimida debe generarse y comprobarse antes de incorporarla. No afirmes que el material fue grabado en Perú o en una finca cliente.

## 6. Acceso a la aplicación

Una sola configuración para todos los CTAs, por ejemplo `VITE_APP_URL`, documentada en `.env.example`, sin inventar el dominio. Si la variable contiene una URL http/https válida, los botones enlazan a ella en la misma pestaña de forma predecible. No adjuntar credenciales, tokens ni datos personales en la URL. No agregar `mode=easy` si la aplicación no tiene ese contrato implementado.

Si falta URL, los CTAs abren un diálogo accesible: «La aplicación aún no tiene una dirección configurada. Mientras tanto, puedes conocer la vista de demostración.» Botones «Ver demostración» y «Cerrar». No usar `href="#"`, enlaces rotos ni una pantalla de login falsa. Centralizar el comportamiento para que cabecera, hero y cierre coincidan.

No añadir un formulario de acceso ni una base de usuarios a esta landing. La autenticación pertenece a la app destino. En pruebas con URL ausente y con una URL de ejemplo, comprobar ambas ramas sin presentar la URL de prueba como real.

## 7. Accesibilidad, rendimiento y detalle técnico

HTML semántico; un H1; jerarquía de títulos coherente; navegación por teclado; foco visible; contraste de al menos 4.5:1 en texto normal y 3:1 en texto grande. Verificar también controles y estados. Tamaño táctil de al menos 48×48 px; en la vista Fácil, preferir 56–64 px. No depender del color para indicar una alerta. Respetar zoom al 200%, reflujo, lecturas con tecnologías de asistencia y ancho móvil de 320 px.

Diseño comprobado a 360, 768, 1024 y 1440 px, además de ausencia de desbordamiento a 320 px. En móvil, nada esencial depende de hover. Módulos y demos utilizables por teclado con estado seleccionado comunicado mediante semántica apropiada.

Separar contenido y configuración del código visual cuando sea útil; componentes con responsabilidad clara; CSS con tokens. No importar librerías de animación pesadas para efectos que CSS y APIs nativas resuelven. No añadir mapas, sensores, IA o APIs agrícolas reales solo para decorar la landing. Todas las demos son locales y reversibles.

Imágenes dimensionadas, WebP/AVIF cuando sea práctico, lazy loading fuera del hero, reserva de espacio para evitar saltos, carga diferida del video. No hacer que el contenido dependa de una animación para aparecer. No descargar medios pesados en conexiones con ahorro de datos.

SEO: título «AgroSmart | Gestión agrícola hecha para ti», descripción fiel a la propuesta, idioma es-PE, favicon original y metadatos sociales con recurso propio. No inventar canonical ni dominio de producción. Sin cookies analíticas de terceros ni captura de datos personales en esta primera versión.

## 8. Estadísticas autorizadas para el contenido

Son contexto del problema, NO resultados de AgroSmart. Consulta y enlaces verificados el 17 de octubre de 2026.

1. **72 %** — «de las extracciones de agua dulce a escala mundial correspondieron a la agricultura en 2023». Fuente: FAO, indicador ODS 6.4.2. Mostrar alcance mundial y año junto al dato. https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/642-water-stress/
2. **94,3 %** — «de las unidades agropecuarias estuvieron destinadas a la agricultura familiar en Perú en 2025, según el INEI». Fuente: resultados ENA 2025 divulgados por INEI. Conservar el universo y definición de la fuente; no convertirlo en porcentaje de productores de arándano ni tamaño de mercado de AgroSmart. https://www.gob.pe/institucion/inei/noticias/1408597-mujeres-conducen-el-31-2-de-las-unidades-agropecuarias

Enlazar cada fuente desde su cifra. Evitar animar los porcentajes desde cero: su lectura inmediata importa más que el efecto. No agregar «30 % de ahorro», «miles de clientes» o «24/7 garantizado». En una demo, etiquetar cualquier otra cantidad como dato ilustrativo.

## 9. Límites que preservan la coherencia del proyecto

El NDVI observa vegetación y puede orientar inspecciones; no determina por sí solo falta de agua, enfermedad o fertilizante. No identifica pH, conductividad, humedad continua ni la necesidad exacta de riego a partir de una imagen. Clima, suelo o sustrato, cultivo, sensores y parámetros técnicos tienen fuentes distintas y deben revisarse. Arándano en suelo y en sustrato requieren modelos adecuados al sistema productivo.

Un comando enviado no prueba que una bomba funcione. Automatizar sectores exige válvulas o maniobras compatibles, no solo encender una bomba compartida. Las protecciones físicas y la lógica local no deben depender del navegador. No incluir una promesa de control físico disponible en cualquier instalación.

AgroSmart no tiene rentabilidad probada, instalaciones industriales certificadas ni beneficios económicos validados. Evitar presentar como éxitos comerciales los objetivos del prototipo. No añadir Make, WhatsApp u otros canales como requisito: las alertas de la aplicación son el canal previsto.

## 10. Entregables y criterio de finalización

Entregar código completo de la landing, recursos realmente obtenidos, instrucciones para ejecutar y generar la versión final, `.env.example` para la URL de la app y un registro de fuentes/licencias. Incluir una breve lista de pendientes reales, si los hay. No sustituir los entregables por una explicación o un plan.

Verificar compilación y tipos con las herramientas del proyecto. Comprobar enlaces internos, menú móvil, CTAs con y sin configuración, FAQ, selector de módulos, historia de incidencia, cambio de vista Fácil y lectura de voz disponible/no disponible. Comprobar video con reproducción bloqueada y con movimiento reducido. Si hay navegador de pruebas autorizado, inspeccionar escritorio y móvil y corregir fallos observados. No afirmar verificaciones que no se ejecutaron.

Aplicar tres pasadas de revisión antes de terminar: (1) producto y contenido, corrigiendo la reducción a una agenda de riego y cualquier afirmación no sustentada; (2) diseño y accesibilidad, corrigiendo contraste, orden, tamaño, navegación y movimiento; (3) funcionamiento y rendimiento, corrigiendo CTAs, recursos rotos y errores técnicos. Terminar cuando no queden defectos conocidos que impidan una primera versión revisable; las hipótesis comerciales pendientes deben documentarse, no declararse resueltas.

Al finalizar, explicar brevemente qué se construyó, cómo abrirlo, dónde configurar la aplicación y qué validaciones se realizaron. La autorización de publicación depende del entorno y de las instrucciones del propietario; no crear cuentas, comprar recursos o inventar destinos.
