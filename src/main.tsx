import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,
  Leaf,
  Droplets,
  ScanLine,
  ClipboardList,
  ChartNoAxesCombined,
  ShieldCheck,
  BellRing,
  Check,
  Volume2,
  Map,
  CircleAlert,
  Sprout,
  Play,
  Layers,
  MoveUpRight,
} from "lucide-react";
import { modules, steps, faqs, demo, capabilities } from "./content";
import { appDestination } from "./config";
import {
  MotionProvider,
  HeroExperience,
  ScrollProgress,
  useMotion,
} from "./motion";
import {
  ExampleProvider,
  RecordDemo,
  SharedExpense,
  SupportSection,
  useExample,
} from "./registration";
import { currency } from "./record";
import "./styles.css";
import "./experience.css";

const icons: Record<string, typeof Leaf> = {
  scan: ScanLine,
  water: Droplets,
  list: ClipboardList,
  chart: ChartNoAxesCombined,
  shield: ShieldCheck,
  bell: BellRing,
  check: Check,
};
const links = [
  ["La solución", "#solucion"],
  ["Cómo funciona", "#como-funciona"],
  ["AgroSmart Fácil", "#facil"],
  ["Preguntas", "#preguntas"],
];
const appUrl = appDestination(import.meta.env.VITE_APP_URL);
const AppAccess = React.createContext<
  (event: React.MouseEvent<HTMLElement>) => void
>(() => {});
function AppLink({ className = "" }: { className?: string }) {
  const openMissing = React.useContext(AppAccess);
  return appUrl ? (
    <a className={`button ${className}`} href={appUrl}>
      Entrar a AgroSmart <ArrowUpRight size={18} />
    </a>
  ) : (
    <button
      type="button"
      className={`button ${className}`}
      onClick={openMissing}
    >
      Entrar a AgroSmart <ArrowUpRight size={18} />
    </button>
  );
}

function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M6 7c19-3 29 4 26 16C18 27 8 21 6 7Z" fill="currentColor" />
        <path
          d="M7 31 28 12M8 37h25"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span>
        Agro<span className="word-light">Smart</span>
      </span>
    </span>
  );
}

function Icon({
  name,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name] || Leaf;
  return <Component aria-hidden="true" {...props} />;
}
function Tag({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span className={`eyebrow${light ? " light" : ""}`}>
      <span />
      {children}
    </span>
  );
}

function HeroMedia() {
  const { enabled } = useMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = video.current!;
    let visible = false;
    let disposed = false;
    let failed = false;
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    const sync = async () => {
      if (disposed) return;
      if (
        !enabled ||
        connection?.saveData ||
        !visible ||
        document.hidden ||
        failed
      ) {
        element.pause();
        return;
      }
      if (!element.getAttribute("src")) {
        element.src = "/media/arandanos-hero.mp4";
        element.load();
      }
      try {
        await element.play();
        if (disposed || !visible || document.hidden) element.pause();
      } catch {
        element.pause(); /* Autoplay bloqueado: el póster permanece visible. */
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        void sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    const update = () => {
      void sync();
    };
    const error = () => {
      failed = true;
      setPlaying(false);
    };
    document.addEventListener("visibilitychange", update);
    // Algunos navegadores requieren la primera interacción de la visita.
    document.addEventListener("pointerdown", update, { passive: true });
    document.addEventListener("keydown", update);
    connection?.addEventListener("change", update);
    element.addEventListener("error", error);
    return () => {
      disposed = true;
      observer.disconnect();
      element.pause();
      document.removeEventListener("visibilitychange", update);
      document.removeEventListener("pointerdown", update);
      document.removeEventListener("keydown", update);
      connection?.removeEventListener("change", update);
      element.removeEventListener("error", error);
    };
  }, [enabled]);
  return (
    <>
      <img
        className="hero-poster"
        src="/media/arandanos-poster.webp"
        width="1280"
        height="720"
        alt="Arándanos maduros entre las hojas, durante una cosecha"
        fetchPriority="high"
      />
      <video
        ref={video}
        className={`hero-video${playing ? " is-playing" : ""}`}
        poster="/media/arandanos-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="hero-shade" />
    </>
  );
}

function FieldMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`field-map ${compact ? "compact" : ""}`}>
      <svg
        viewBox="0 0 620 360"
        role="img"
        aria-label="Esquema ilustrativo de tres sectores del campo. Sector C requiere revisión."
      >
        <defs>
          <pattern
            id={compact ? "rows-mini" : "rows"}
            width="15"
            height="15"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-22)"
          >
            <path d="M0 0v15" stroke="#bad19c" strokeWidth="7" />
          </pattern>
        </defs>
        <rect width="620" height="360" fill="#e9e9d9" />
        <path
          d="M-20 30 220 0l140 45 280-20v350H-20Z"
          fill={compact ? "url(#rows-mini)" : "url(#rows)"}
        />
        <path
          d="m-20 225 200-45 90 40 100-30 270-100M275-10l-10 150 85 95 25 150"
          stroke="#faf9e9"
          strokeWidth="18"
          fill="none"
        />
        <path
          d="m45 40 185-20-9 124-169 36Z"
          fill="#538745"
          fillOpacity=".5"
          stroke="#fff"
          strokeWidth="3"
        />
        <path
          d="m303 35 240 12 15 64-188 60-66-45Z"
          fill="#779f39"
          fillOpacity=".5"
          stroke="#fff"
          strokeWidth="3"
        />
        <path
          d="m395 230 173-73 22 147-182 31Z"
          fill="#b8853b"
          fillOpacity=".65"
          stroke="#fff"
          strokeWidth="3"
        />
        <g fontFamily="Inter, sans-serif" fontSize="17" fontWeight="600">
          <rect x="83" y="83" width="108" height="35" rx="17" fill="#fff" />
          <text x="137" y="106" fill="#143d2b" textAnchor="middle">
            Sector A
          </text>
          <rect x="360" y="77" width="108" height="35" rx="17" fill="#fff" />
          <text x="414" y="100" fill="#143d2b" textAnchor="middle">
            Sector B
          </text>
          <rect
            x="432"
            y="250"
            width="108"
            height="35"
            rx="17"
            fill="#143d2b"
          />
          <text x="486" y="273" fill="#fff" textAnchor="middle">
            Sector C
          </text>
        </g>
        <circle cx="492" cy="224" r="14" fill="#fff" />
        <text
          x="492"
          y="230"
          fontFamily="sans-serif"
          textAnchor="middle"
          fontWeight="bold"
          fill="#92400e"
        >
          !
        </text>
      </svg>
      <span className="map-caption">
        <Layers size={13} /> Esquema de parcelas · datos ilustrativos
      </span>
    </div>
  );
}

function OperationOverview({ moduleId }: { moduleId: string }) {
  if (moduleId === "economia")
    return (
      <div className="operation-overview">
        <SharedExpense />
        <p>Agua, energía y materiales: pendientes de registrar.</p>
      </div>
    );
  const rows =
    moduleId === "control"
      ? [
          ["Regla del Sector C", "Autorizada previamente"],
          ["Último estado recibido · 10:42", "Detención confirmada"],
          ["Reinicio", "Sin autorizar"],
        ]
      : moduleId === "gestion"
        ? [
            ["Trabajo", "Inspeccionar filtro"],
            ["Persona autorizada", "Colaborador de campo"],
            ["Materiales utilizados", "Pendiente de registrar"],
          ]
        : [
            ["Necesita atención", "Revisión del Sector C"],
            ["Trabajo asignado", "Inspeccionar filtro"],
            ["Todavía por confirmar", "La causa del bajo caudal"],
          ];
  return (
    <div className="operation-overview">
      <span className="overview-example">
        Datos ilustrativos · sin conexión a equipos
      </span>
      {rows.map(([label, value], index) => (
        <div className="overview-row" key={label}>
          <span className="overview-symbol">
            <Icon
              name={index === 0 ? "bell" : index === 1 ? "list" : "shield"}
              size={19}
            />
          </span>
          <span>
            {label}
            <strong>{value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

function Platform() {
  const [selected, setSelected] = useState(0);
  const current = modules[selected];
  const { record } = useExample();
  return (
    <section id="solucion" className="section solution">
      <div className="container">
        <div className="section-heading reveal">
          <Tag>Consulta · registra · organiza · supervisa · actúa</Tag>
          <h2>
            Lo cotidiano, más sencillo.
            <br />
            <span>El control sigue siendo tuyo.</span>
          </h2>
          <p>
            Organiza agua, equipos, materiales, trabajos y gastos con una
            gestión que puedes comprender y manejar, sin convertirte en experto
            en tecnología.
          </p>
        </div>
        <div
          className="module-tabs reveal"
          role="tablist"
          aria-label="Módulos de AgroSmart"
        >
          {modules.map((module, index) => (
            <button
              key={module.id}
              type="button"
              role="tab"
              id={`tab-${module.id}`}
              aria-controls="module-panel"
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % modules.length;
                else if (event.key === "ArrowLeft")
                  next = (index + modules.length - 1) % modules.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = modules.length - 1;
                else return;
                event.preventDefault();
                setSelected(next);
                document.getElementById(`tab-${modules[next].id}`)?.focus();
              }}
            >
              <Icon name={module.icon} size={20} />
              {module.title}
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <div
          className="platform-layout reveal"
          id="module-panel"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          tabIndex={0}
        >
          <div className="platform-copy">
            <span className="module-number">
              0{selected + 1} / LA PLATAFORMA
            </span>
            <h3>{current.subtitle}</h3>
            <p>{current.description}</p>
            <ul className="module-capabilities">
              {capabilities[current.id].map((text) => (
                <li key={text}>
                  <Check size={15} />
                  {text}
                </li>
              ))}
            </ul>
            <div className="context-note">
              <Icon name={current.icon} size={23} />
              <p>{current.note}</p>
            </div>
            <a href="#facil" className="text-link">
              Y una forma Fácil de usarlo <ArrowRight size={18} />
            </a>
          </div>
          <div className="dashboard">
            <div className="dash-top">
              <Logo />
              <span>Gestión de recursos</span>
            </div>
            <div className="dash-body" key={current.id}>
              <div className="dash-title">
                <div>
                  <span className="micro">TUS RECURSOS / SECTOR C</span>
                  <h4>Todo en su lugar.</h4>
                </div>
                <span className="demo-label">Mi campo</span>
              </div>
              <OperationOverview moduleId={current.id} />
              <div className="dash-metrics">
                <div>
                  <span>
                    {current.id === "economia"
                      ? record.category
                      : current.label}
                  </span>
                  <strong>
                    {current.id === "economia"
                      ? currency(record.amount)
                      : current.value}
                  </strong>
                </div>
                <div>
                  <span>Seguimiento del Sector C</span>
                  <p>
                    {current.id === "economia"
                      ? `${record.concept} · otros gastos por registrar.`
                      : current.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="integration-line">
          <Check size={17} /> Fácil atraviesa toda la plataforma: misma cuenta,
          información y permisos.
        </p>
      </div>
    </section>
  );
}

function Story() {
  const [step, setStep] = useState(0);
  const { record, confirmed } = useExample();
  const current = steps[step];
  const explanation =
    step === 0 && confirmed
      ? `En tu registro confirmaste ${currency(record.amount)} por ${record.concept.toLowerCase()}. Revisaste el tipo de gasto y el monto antes de guardar. Esos mismos datos aparecen en Fácil y Estándar.`
      : step === 5
        ? `Consultas el trabajo realizado, quién lo registró y el gasto de ${record.category.toLowerCase()} de ${currency(record.amount)} del registro. Los otros gastos siguen pendientes. Reiniciar requiere condiciones seguras y una nueva autorización.`
        : current.text;
  return (
    <section id="como-funciona" className="story section">
      <div className="container">
        <div className="story-intro reveal">
          <div>
            <Tag light>Una situación completa</Tag>
            <h2>
              De un gasto a una decisión.
              <br />
              <span>Entiende cada paso.</span>
            </h2>
          </div>
          <p>
            El valor está en unir las piezas.
            <br />
            Conoce el recorrido a tu ritmo.
          </p>
        </div>
        <div className="story-steps" role="group" aria-label="Pasos de gestión">
          {steps.map((s, index) => (
            <button
              key={s.verb}
              type="button"
              onClick={() => setStep(index)}
              aria-pressed={step === index}
            >
              <span className="step-number">0{index + 1}</span>
              <span>{s.verb}</span>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div className="story-scene">
          <div
            key={step}
            className="incident-visual story-visual-step"
            style={
              {
                "--story-progress": (step + 1) / steps.length,
              } as React.CSSProperties
            }
          >
            <span className="demo-label">
              Sector C · gestión de una incidencia
            </span>
            <div className="flow-diagram" aria-hidden="true">
              <div className="flow-ring">
                <Icon name={current.icon} size={48} />
              </div>
              <div className="flow-line" />
              <div className="flow-sector">
                <Sprout size={26} />
                <span>Sector C</span>
              </div>
            </div>
            <div className="incident-status">
              <span className="status-dot" />
              {current.status}
            </div>
            <span className="incident-module">{current.module}</span>
          </div>
          <div
            className="story-description"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="micro">
              PASO {step + 1} DE {steps.length}
            </span>
            <h3>{current.title}</h3>
            <p>{explanation}</p>
            {step === 0 && (
              <a className="text-link story-try" href="#registro">
                Preparar un registro <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        </div>
        <div className="story-bottom">
          <p>
            <ShieldCheck size={17} /> La seguridad depende de protecciones
            físicas y lógica local.
          </p>
          <div className="step-controls">
            <button
              className="icon-button"
              aria-label="Paso anterior"
              type="button"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft size={20} />
            </button>
            <span>
              {step + 1} / {steps.length}
            </span>
            <button
              className="icon-button"
              aria-label="Paso siguiente"
              type="button"
              disabled={step === steps.length - 1}
              onClick={() => setStep((s) => s + 1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EasyDemo() {
  const [easy, setEasy] = useState(true);
  const [action, setAction] = useState<"field" | "next" | null>(null);
  const [speechStatus, setSpeechStatus] = useState("");
  useEffect(
    () => () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    [],
  );
  function speak() {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setSpeechStatus(
        "Tu navegador no ofrece lectura de voz. Puedes leer el aviso completo debajo.",
      );
      return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(demo.speech);
    speech.lang = "es-PE";
    speech.rate = 0.9;
    speech.onend = () =>
      setSpeechStatus(
        "Lectura finalizada. El aviso permanece disponible en texto.",
      );
    speech.onerror = () =>
      setSpeechStatus(
        "No se pudo reproducir la voz. Puedes leer el aviso completo debajo.",
      );
    try {
      window.speechSynthesis.speak(speech);
      setSpeechStatus("Escuchando aviso…");
    } catch {
      setSpeechStatus(
        "No se pudo reproducir la voz. Puedes leer el aviso completo debajo.",
      );
    }
  }
  return (
    <section id="facil" className="easy-section section">
      <div className="container easy-layout">
        <div className="easy-copy reveal">
          <Tag>AgroSmart Fácil</Tag>
          <h2>
            La tecnología cambia.
            <br />
            <span>
              Tu experiencia
              <br className="desktop-break" /> sigue al mando.
            </span>
          </h2>
          <p>
            AgroSmart Fácil reúne lenguaje cotidiano, botones grandes y pocos
            pasos por tarea. Pensado especialmente para adultos mayores, sin
            excluir a quienes prefieren una experiencia sencilla.
          </p>
          <p>
            Estándar ofrece más detalle. Cambia la presentación, conservando la
            cuenta, el fundo, los sectores, los permisos, las operaciones y el
            historial.
          </p>
          <ul className="easy-features">
            <li>
              <Check />
              Tú decides. La tecnología te acompaña.
            </li>
            <li>
              <Check />
              Un aviso claro y un siguiente paso.
            </li>
            <li>
              <Check />
              Toda tu experiencia cuenta.
            </li>
          </ul>
          <p className="easy-invitation">
            Elige tu vista <ArrowRight size={19} />
          </p>
          <small>
            Elige la vista que te resulte más cómoda. El cambio conserva el
            contexto y los datos.
            <br />
            Escucha los avisos con la lectura de voz disponible en tu navegador.
          </small>
        </div>
        <div className="easy-demo-wrap reveal">
          <div
            className="view-toggle"
            role="group"
            aria-label="Vista de AgroSmart"
          >
            <button
              type="button"
              aria-pressed={!easy}
              onClick={() => {
                setEasy(false);
                setAction(null);
              }}
            >
              Estándar
            </button>
            <button
              type="button"
              aria-pressed={easy}
              onClick={() => {
                setEasy(true);
                setAction(null);
              }}
            >
              <Leaf size={17} />
              Fácil
            </button>
          </div>
          <div className={`easy-demo ${easy ? "simple" : "standard"}`}>
            <div className="easy-demo-header">
              <Logo />
              <span className="demo-label">Mi campo</span>
            </div>
            <div className="demo-body">
              <div className="demo-greeting">
                <span>
                  {easy ? "TU CAMPO, A TU MANERA" : "RESUMEN DEL CAMPO"}
                </span>
                <h3>
                  {easy ? "Vamos paso a paso." : "Una vista de tu operación."}
                </h3>
                <p>
                  {demo.sector} <span>·</span> {demo.crop}
                </p>
              </div>
              <div className="demo-alert">
                <CircleAlert size={25} />
                <div>
                  <strong>El caudal necesita revisión</strong>
                  <p>{demo.alert}</p>
                  <p>
                    <b>Siguiente paso:</b> {demo.next}
                  </p>
                </div>
              </div>
              <details className="technical-readings" open={!easy}>
                <summary>Ver datos de la operación</summary>
                <div className="reading">
                  <span>
                    Caudal registrado<strong>{demo.flow}</strong>
                  </span>
                  <span>
                    Valor de referencia<strong>{demo.reference}</strong>
                  </span>
                </div>
              </details>
              <p className="protection">
                <ShieldCheck size={17} /> Estado registrado: operación detenida
                · 10:42.
              </p>
              <SharedExpense />
              {easy ? (
                <div className="easy-actions">
                  <button
                    type="button"
                    aria-expanded={action === "field"}
                    aria-controls="easy-action-panel"
                    onClick={() =>
                      setAction(action === "field" ? null : "field")
                    }
                  >
                    <Map />
                    <span>Ver mi campo</span>
                    <ArrowUpRight size={20} />
                  </button>
                  <button type="button" onClick={speak}>
                    <Volume2 />
                    <span>Escuchar aviso</span>
                    <Play size={17} />
                  </button>
                  <button
                    type="button"
                    aria-expanded={action === "next"}
                    aria-controls="easy-action-panel"
                    onClick={() => setAction(action === "next" ? null : "next")}
                  >
                    <ClipboardList />
                    <span>Ver qué hacer</span>
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              ) : (
                <div className="standard-actions">
                  <div>
                    <ClipboardList size={20} />
                    <span>
                      Trabajo pendiente<strong>Inspeccionar filtro</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="button dark"
                    aria-controls="easy-action-panel"
                    aria-expanded={action === "next"}
                    onClick={() => setAction(action === "next" ? null : "next")}
                  >
                    Ver detalle <ArrowUpRight size={18} />
                  </button>
                </div>
              )}
              <div id="easy-action-panel">
                {action === "field" && (
                  <div className="action-panel">
                    <h4>Tu campo · {demo.sector}</h4>
                    <FieldMap compact />
                    <p>
                      El Sector C necesita revisión. Consulta los sectores y el
                      trabajo pendiente.
                    </p>
                  </div>
                )}
                {action === "next" && (
                  <div className="action-panel">
                    <h4>Lo siguiente es revisar.</h4>
                    <ol>
                      <li>Mantén detenida la operación.</li>
                      <li>
                        Pide al responsable inspeccionar el filtro y el sistema.
                      </li>
                      <li>
                        Registra la revisión. Solo autoriza reiniciar con
                        condiciones seguras.
                      </li>
                    </ol>
                    <p>Este panel no envía órdenes a equipos.</p>
                  </div>
                )}
              </div>
              <p role="status" className="speech-status">
                {speechStatus}
              </p>
              <details className="transcript">
                <summary>Leer el aviso completo</summary>
                <p>{demo.speech}</p>
              </details>
            </div>
          </div>
          <p className="demo-footnote">
            <ShieldCheck size={14} /> Misma cuenta. Mismos datos. Mismos
            permisos. Datos ilustrativos, sin conexión a equipos.
          </p>
        </div>
      </div>
    </section>
  );
}

function App() {
  const appDialog = useRef<HTMLDialogElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  const closeMenu = () => {
    menuDialog.current?.close();
    setMenuOpen(false);
  };
  const openApp = (event: React.MouseEvent<HTMLElement>) => {
    opener.current = event.currentTarget;
    if (appDialog.current) {
      appDialog.current.returnValue = "";
      appDialog.current.showModal();
    }
  };
  return (
    <AppAccess.Provider value={openApp}>
      <>
        <ScrollProgress />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <header className={`site-header${scrolled ? " scrolled" : ""}`}>
          <div className="header-inner">
            <a
              className="brand-link"
              href="#inicio"
              aria-label="AgroSmart, inicio"
            >
              <Logo />
            </a>
            <nav className="desktop-nav" aria-label="Navegación principal">
              {links.map(([name, href]) => (
                <a key={href} href={href}>
                  {name}
                </a>
              ))}
            </nav>
            <div className="header-actions">
              <AppLink className="lime" />
              <button
                className="menu-button icon-button"
                ref={menuButton}
                type="button"
                aria-label="Abrir menú"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => {
                  menuDialog.current?.showModal();
                  setMenuOpen(true);
                }}
              >
                <Menu />
              </button>
            </div>
          </div>
        </header>
        <dialog
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Menú de navegación"
          ref={menuDialog}
          onClose={() => {
            setMenuOpen(false);
            menuButton.current?.focus();
          }}
        >
          <div className="menu-top">
            <Logo />
            <button
              type="button"
              className="icon-button"
              aria-label="Cerrar menú"
              onClick={closeMenu}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Navegación móvil">
            {links.map(([name, href]) => (
              <a key={href} href={href} onClick={closeMenu}>
                {name}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <p>Tu experiencia. Tus recursos. Tus decisiones.</p>
        </dialog>
        <main id="contenido">
          <section id="inicio" className="hero">
            <HeroMedia />
            <div className="container hero-content hero-grid">
              <div className="hero-copy">
                <Tag light>Tecnología que puedes comprender y manejar</Tag>
                <h1>
                  <span className="hero-line">Tu experiencia</span>
                  <span className="hero-line">en el campo.</span>
                  <span className="hero-line accent">Tus recursos</span>
                  <span className="hero-line accent">bajo control.</span>
                </h1>
                <p>
                  Organiza tus trabajos y gastos, supervisa tus equipos y recibe
                  avisos claros desde una plataforma pensada para acompañarte,
                  paso a paso.
                </p>
                <div className="hero-buttons">
                  <AppLink className="lime" />
                  <a href="#como-funciona" className="button glass">
                    Conocer cómo funciona <ArrowDownIcon />
                  </a>
                </div>
                <a href="#facil" className="hero-easy">
                  Pensado especialmente para adultos mayores.
                  <span>
                    Descubre AgroSmart Fácil <ArrowUpRight size={17} />
                  </span>
                </a>
              </div>
              <HeroExperience />
            </div>
            <div className="hero-bottom container">
              <span>
                <Sprout size={17} /> Cultivo piloto: arándano
              </span>
              <span>Desde La Libertad, Perú</span>
              <a href="#contexto" aria-label="Continuar a la explicación">
                <ChevronDown size={22} />
              </a>
            </div>
          </section>
          <section id="contexto" className="context section">
            <div className="container">
              <div className="context-grid reveal">
                <div>
                  <Tag>Tu gestión, más sencilla</Tag>
                  <h2>
                    Ya conoces tu campo.
                    <br />
                    <span>Que llevarlo sea más sencillo.</span>
                  </h2>
                </div>
                <div className="context-description">
                  <p>
                    Gastos difíciles de reconstruir, trabajos que se cruzan e
                    información repartida entre apuntes y conversaciones.
                  </p>
                  <p>
                    AgroSmart te ayuda a organizar tus recursos y saber qué
                    hacer cuando algo necesita atención.
                  </p>
                </div>
              </div>
              <div className="situations reveal">
                <div>
                  <span>01</span>
                  <p>“¿En qué se fue ese gasto?”</p>
                  <strong>Registros que puedes revisar.</strong>
                </div>
                <div>
                  <span>02</span>
                  <p>“¿Quién quedó en hacer ese trabajo?”</p>
                  <strong>Tareas y responsables claros.</strong>
                </div>
                <div>
                  <span>03</span>
                  <p>“¿Qué pasó con el equipo?”</p>
                  <strong>Un estado y un siguiente paso.</strong>
                </div>
              </div>
              <p className="context-footnote">
                Arándano es nuestro cultivo piloto en La Libertad, Perú. La
                gestión parte de tus necesidades y los recursos de tu campo.
              </p>
            </div>
          </section>
          <Platform />
          <RecordDemo />
          <Story />
          <EasyDemo />
          <SupportSection />
          <section className="adoption section">
            <div className="container">
              <div className="adoption-heading reveal">
                <div>
                  <Tag>Un camino, a tu ritmo</Tag>
                  <h2>
                    Empieza con lo que tienes.
                    <br />
                    <span>Conecta lo que sigue.</span>
                  </h2>
                </div>
                <p>
                  Sin hardware obligatorio para empezar.
                  <br />
                  Cada paso responde a tu campo.
                </p>
              </div>
              <div className="adoption-grid reveal">
                {[
                  {
                    icon: ClipboardList,
                    title: "Organiza sin sensores",
                    text: "Reúne tus registros, actividades, insumos y gastos. Dale un lugar a la información que ya tienes.",
                    label: "Tu experiencia es el punto de partida",
                  },
                  {
                    icon: ScanLine,
                    title: "Conecta lo que necesitas",
                    text: "Incorpora lecturas de sensores compatibles y observaciones para entender mejor qué necesita atención.",
                    label: "Más contexto para decidir",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Automatiza con supervisión",
                    text: "Integra equipos compatibles, autorizaciones y protecciones locales. Verifica lo que sucede en el campo.",
                    label: "Tecnología con condiciones claras",
                  },
                ].map((item, i) => (
                  <article key={item.title}>
                    <div className="adoption-icon">
                      <item.icon size={28} />
                      <span>0{i + 1}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span className="adoption-label">{item.label}</span>
                  </article>
                ))}
              </div>
              <p className="resource-note">
                Trabajos, agua, equipos, materiales y gastos en un contexto
                compartido. Tú mantienes el control de tu gestión. El
                seguimiento de energía, mantenimiento y gastos busca ayudarte a
                comprender tus recursos. La evaluación de resultados económicos
                requiere ingresos y costos completos de cada campaña.
              </p>
            </div>
          </section>
          <section id="preguntas" className="faq-section section">
            <div className="container faq-layout">
              <div className="reveal">
                <Tag>Con las cosas claras</Tag>
                <h2>
                  Antes de
                  <br />
                  <span>dar el paso.</span>
                </h2>
                <p>
                  Resuelve tus dudas.
                  <br />
                  Avanza con claridad.
                </p>
                <Sprout className="faq-sprout" size={90} strokeWidth={1} />
              </div>
              <div className="faq-list reveal">
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <span className="faq-plus" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          <section className="closing">
            <div className="container closing-inner reveal">
              <span className="closing-leaf" aria-hidden="true">
                <Leaf size={130} strokeWidth={0.8} />
              </span>
              <Tag>El siguiente paso es tuyo</Tag>
              <h2>
                Tu experiencia guía el campo.
                <br />
                <span>AgroSmart te ayuda a llevar el control.</span>
              </h2>
              <AppLink className="dark" />
              <p>Empieza con lo que tienes. Crece a tu ritmo.</p>
            </div>
          </section>
        </main>
        <footer>
          <div className="container">
            <div className="footer-top">
              <a
                href="#inicio"
                className="brand-link"
                aria-label="AgroSmart, volver al inicio"
              >
                <Logo />
              </a>
              <p>Gestión agrícola hecha para ti.</p>
              <a href="#inicio" className="back-top">
                Volver arriba <MoveUpRight size={17} />
              </a>
            </div>
            <div className="footer-bottom">
              <p>
                Gestión de recursos y operaciones agrícolas. La automatización
                requiere infraestructura compatible, autorización y protecciones
                locales.
              </p>
              <nav aria-label="Enlaces del pie">
                {links.map(([name, href]) => (
                  <a key={href} href={href}>
                    {name}
                  </a>
                ))}
              </nav>
            </div>
            <details className="credits">
              <summary>Fuentes y créditos</summary>
              <p>
                Video y póster:{" "}
                <a href="https://www.pexels.com/video/blueberry-picking-855230/">
                  Blueberry Picking, Pixabay / Pexels
                </a>
                . Video de archivo utilizado con licencia de Pexels.{" "}
                <a href="https://www.pexels.com/license/">Licencia Pexels</a>.
              </p>

              <p>
                Tipografías Inter e Inter Tight (SIL Open Font License). Iconos
                Lucide (ISC). Identidad, esquemas y vistas de producto
                originales para esta presentación.
              </p>
            </details>
          </div>
        </footer>
        <dialog
          ref={appDialog}
          className="app-dialog"
          aria-labelledby="app-dialog-title"
          aria-describedby="app-dialog-description"
          onClose={() => {
            if (appDialog.current?.returnValue === "explore")
              document
                .querySelector<HTMLElement>("#facil button")
                ?.focus({ preventScroll: true });
            else opener.current?.focus();
          }}
        >
          <div className="dialog-icon">
            <Sprout size={29} />
          </div>
          <h2 id="app-dialog-title">
            El campo conectado
            <br />
            empieza aquí.
          </h2>
          <p id="app-dialog-description">
            El acceso a la aplicación no está habilitado desde esta página.
            Puedes conocer las funciones de AgroSmart y elegir la experiencia
            que prefieres.
          </p>
          <a
            className="button dark"
            href="#facil"
            onClick={() => appDialog.current?.close("explore")}
          >
            Conocer AgroSmart <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            className="button subtle"
            onClick={() => appDialog.current?.close()}
          >
            Cerrar
          </button>
        </dialog>
      </>
    </AppAccess.Provider>
  );
}
function ArrowDownIcon() {
  return <ChevronDown size={18} aria-hidden="true" />;
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionProvider>
      <ExampleProvider>
        <App />
      </ExampleProvider>
    </MotionProvider>
  </React.StrictMode>,
);
