export const modules = [
  {
    id: "monitor",
    title: "Consulta",
    subtitle: "Entiende cómo va tu día.",
    description:
      "Consulta qué está funcionando, qué terminó y qué necesita atención. Primero un mensaje claro; el detalle, cuando lo necesites.",
    icon: "scan",
    label: "Estado de la operación",
    value: "Necesita revisión",
    detail: "Sector C · actualización: 10:42.",
    note: "Distingue el último estado recibido de lo que aún no está confirmado. Una lectura aislada no explica por sí sola una falla.",
  },
  {
    id: "control",
    title: "Supervisa",
    subtitle: "Reglas claras. Control con límites.",
    description:
      "Con infraestructura compatible y configuración validada, autoriza reglas y supervisa operaciones. Recibe un aviso cuando algo se sale de esos límites.",
    icon: "water",
    label: "Estado confirmado por el controlador",
    value: "Operación detenida",
    detail: "Reinicio sin autorizar · revisar antes de continuar.",
    note: "Una orden enviada no prueba que el equipo haya actuado. La verificación y las protecciones dependen también del controlador y de la instalación local.",
  },
  {
    id: "gestion",
    title: "Organiza",
    subtitle: "Cada trabajo tiene su lugar.",
    description:
      "Consulta materiales, registra entradas y consumos, asigna trabajos y organiza el mantenimiento. Conserva quién hizo una actividad y qué resultado tuvo.",
    icon: "list",
    label: "Trabajo del Sector C",
    value: "Revisión asignada",
    detail: "Colaborador autorizado · inspección del filtro.",
    note: "Tú decides quién puede ayudarte y en qué tareas. Las acciones deben quedar identificadas; recibir apoyo es opcional.",
  },
  {
    id: "economia",
    title: "Gastos",
    subtitle: "Comprende lo que registras.",
    description:
      "Revisa los gastos de agua, energía, materiales, mantenimiento y trabajo. Identifica qué información está completa y qué falta por registrar.",
    icon: "chart",
    label: "Mantenimiento",
    value: "S/ 80,00",
    detail: "Reparación de bomba · otros gastos pendientes de registrar.",
    note: "Los gastos registrados muestran el uso de tus recursos. Para evaluar resultados económicos, reúne los ingresos y costos de la campaña.",
  },
] as const;
export const steps = [
  {
    verb: "Registra",
    title: "Tus palabras, un registro claro.",
    text: "“Hoy pagué ochenta soles por reparar la bomba”. Preparas un gasto de S/ 80,00 en mantenimiento. Revisas lo que entendió, corriges si hace falta y confirmas antes de guardar.",
    module: "Registro sencillo",
    status: "Revisar antes de confirmar",
    icon: "list",
  },
  {
    verb: "Supervisa",
    title: "Sabes qué está autorizado.",
    text: "Revisas una operación del Sector C con una regla ya autorizada. La vista distingue el permiso de operar del último estado recibido del controlador.",
    module: "Operación supervisada",
    status: "Regla autorizada · estado recibido",
    icon: "water",
  },
  {
    verb: "Comprende",
    title: "Un problema, explicado.",
    text: "Ante una baja de caudal, la protección local configurada actúa. El aviso distingue una detención confirmada por el controlador de una verificación todavía pendiente. Enviar una orden no basta para confirmar su ejecución.",
    module: "Protección y aviso",
    status: "Detención confirmada",
    icon: "shield",
  },
  {
    verb: "Decide",
    title: "El siguiente paso está claro.",
    text: "El aviso explica qué pasó: el caudal está por debajo de la referencia. También qué hacer: mantener detenida la operación y pedir revisar el filtro. La causa todavía no está confirmada.",
    module: "Ayuda contextual",
    status: "Causa pendiente de revisión",
    icon: "bell",
  },
  {
    verb: "Asigna",
    title: "Ayuda, con tu autorización.",
    text: "Asignas la inspección a un colaborador previamente autorizado para tareas de campo. Tú eliges ese permiso. El permiso debe definir qué puede consultar y hacer cada persona.",
    module: "Trabajos y permisos",
    status: "Revisión asignada",
    icon: "list",
  },
  {
    verb: "Revisa",
    title: "Puedes reconstruir lo ocurrido.",
    text: "Consultas el trabajo realizado, quién lo registró y el gasto de mantenimiento de S/ 80,00 del registro. Los otros gastos siguen pendientes. Reiniciar requiere condiciones seguras y una nueva autorización.",
    module: "Historial comprensible",
    status: "Trabajo revisado · gasto registrado",
    icon: "check",
  },
] as const;
export const faqs = [
  [
    "¿Necesito saber de tecnología?",
    "AgroSmart Fácil utiliza lenguaje cotidiano, botones grandes y recorridos de pocos pasos. Puedes consultar cada aviso y avanzar a tu ritmo, con mayor detalle en Estándar cuando lo necesites.",
  ],
  [
    "¿Tengo que comprar sensores para empezar?",
    "Puedes comenzar con organización, trabajos y registros. El monitoreo automático y la automatización requieren dispositivos e infraestructura compatibles.",
  ],
  [
    "¿Puedo registrar información sin utilizar mi voz?",
    "Sí. Usa texto o formularios guiados para preparar y revisar tus registros. La lectura de avisos es opcional y depende de las voces disponibles en tu navegador; no necesitas activar un micrófono.",
  ],
  [
    "¿Puede ayudarme una persona de confianza?",
    "Sí, cuando tú lo autorices. Tú decides qué puede consultar o hacer un familiar, técnico o colaborador. Las acciones quedan identificadas. La ayuda es opcional y no sustituye tu decisión.",
  ],
  [
    "¿Qué ocurre si pierdo conexión?",
    "El control remoto requiere conexión. El controlador y las protecciones locales deben mantener la seguridad del equipo. Los registros que preparas en esta página duran durante tu visita y se eliminan al recargar; no se guardan en una cuenta.",
  ],
  [
    "¿Cómo ingreso a la aplicación?",
    "Usa “Entrar a AgroSmart”. Si el acceso no está habilitado desde esta página, el aviso te permite seguir explorando sus funciones. El ingreso a tu cuenta se realiza en la aplicación.",
  ],
  [
    "¿Puede poner en marcha cualquier bomba?",
    "No. Se necesita infraestructura compatible, configuración validada, autorización y protecciones locales. Una orden enviada no equivale a un funcionamiento comprobado. Esta página no controla equipos.",
  ],
] as const;
export const demo = {
  sector: "Sector C",
  crop: "Arándano",
  flow: "12 L/min",
  reference: "20 L/min",
  alert:
    "El caudal está por debajo del valor de referencia. La causa todavía no está confirmada.",
  next: "Pide al responsable revisar el filtro antes de autorizar el reinicio.",
  speech:
    "Aviso del Sector C. El caudal está por debajo del valor de referencia. La operación está detenida por la protección local configurada. La causa todavía no está confirmada. Pide al responsable revisar el filtro antes de autorizar el reinicio.",
};
export const capabilities: Record<string, string[]> = {
  monitor: [
    "Operaciones, equipos y pendientes",
    "Última actualización y datos por confirmar",
  ],
  control: [
    "Agua, equipos y reglas autorizadas",
    "Verificación del estado y avisos ante excepciones",
  ],
  gestion: [
    "Materiales disponibles, entradas y consumos",
    "Trabajos, responsables y mantenimiento",
  ],
  economia: [
    "Agua, energía, materiales, mantenimiento y trabajo",
    "Gastos registrados e información pendiente",
  ],
};
