import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  CircleAlert,
  ClipboardList,
  Droplets,
  Leaf,
  Package,
  Accessibility,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useExample } from "./registration";
import { currency } from "./record";

const MotionContext = createContext({
  enabled: false,
  reduced: false,
  overridden: false,
  toggle: () => {},
  activate: () => {},
  reset: () => {},
});
export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [preference, setPreference] = useState<"auto" | "on" | "off">(() => {
    try {
      const stored = localStorage.getItem("agrosmart-motion");
      return stored === "on" || stored === "off" ? stored : "auto";
    } catch {
      return "auto";
    }
  });
  const enabled = preference === "on" || (preference === "auto" && !reduced);
  const choose = (value: "auto" | "on" | "off") => {
    setPreference(value);
    try {
      if (value === "auto") localStorage.removeItem("agrosmart-motion");
      else localStorage.setItem("agrosmart-motion", value);
    } catch {
      /* La elección sigue funcionando en esta visita. */
    }
  };
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <MotionContext.Provider
      value={{
        enabled,
        reduced,
        overridden: preference !== "auto",
        toggle: () => choose(enabled ? "off" : "on"),
        activate: () => choose("on"),
        reset: () => choose("auto"),
      }}
    >
      <div className="experience-shell" data-motion={enabled ? "on" : "off"}>
        {children}
      </div>
    </MotionContext.Provider>
  );
}

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - innerHeight;
        bar.current?.style.setProperty(
          "--progress",
          String(distance > 0 ? scrollY / distance : 0),
        );
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}

export function TiltSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const { enabled } = useMotion();
  const reset = () => {
    cancelAnimationFrame(frame.current);
    surface.current?.style.setProperty("--tilt-x", "0deg");
    surface.current?.style.setProperty("--tilt-y", "0deg");
  };
  useEffect(() => {
    if (!enabled) reset();
    return () => cancelAnimationFrame(frame.current);
  }, [enabled]);
  return (
    <div
      ref={surface}
      className={`tilt-surface ${className}`}
      onPointerMove={(event) => {
        if (
          !enabled ||
          event.pointerType !== "mouse" ||
          !matchMedia("(hover:hover) and (pointer:fine)").matches
        )
          return;
        const box = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width - 0.5) * 8;
        const y = ((event.clientY - box.top) / box.height - 0.5) * -6;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          surface.current?.style.setProperty("--tilt-x", `${y}deg`);
          surface.current?.style.setProperty("--tilt-y", `${x}deg`);
        });
      }}
      onPointerLeave={reset}
      onFocus={reset}
    >
      {children}
    </div>
  );
}

const scenes = [
  {
    title: "Tu día, más claro.",
    subtitle: "Lo importante, primero.",
    label: "Mi día",
    icon: ClipboardList,
  },
  {
    title: "Cada recurso cuenta.",
    subtitle: "Consulta lo disponible y lo pendiente.",
    label: "Mis recursos",
    icon: Package,
  },
  {
    title: "Sabes qué hacer.",
    subtitle: "Un aviso que explica el siguiente paso.",
    label: "Un aviso",
    icon: CircleAlert,
  },
];

export function HeroExperience() {
  const { record } = useExample();
  const [scene, setScene] = useState(0);
  const [entry, setEntry] = useState(0);
  const [visible, setVisible] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const { enabled, reduced, overridden, toggle, activate, reset } = useMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([item]) => setVisible(item.isIntersecting),
      { threshold: 0.1 },
    );
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  const current = scenes[scene];
  return (
    <div className="hero-experience" ref={stage} data-visible={visible}>
      <div className="experience-caption">
        <span className="entry-leaf">
          <Leaf size={19} />
        </span>
        <span>Una forma más sencilla de llevar tu campo</span>
      </div>
      <TiltSurface className="hero-depth">
        <div className="depth-deck" key={entry}>
          <div className="depth-land" aria-hidden="true">
            <div className="land-path" />
            <div className="land-rows" />
            <div className="land-crop">
              <Leaf />
            </div>
          </div>
          <div className="depth-shadow" aria-hidden="true" />
          <div className="depth-window">
            <div className="scene-window-top">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>AgroSmart Fácil</span>
              <span className="scene-example">Vista Fácil</span>
            </div>
            <div
              className="scene-content"
              key={scene}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="scene-kicker">SECTOR C · ARÁNDANO</span>
              <strong className="scene-title">{current.title}</strong>
              <p>{current.subtitle}</p>
              {scene === 0 && (
                <div className="scene-items">
                  <div>
                    <span className="scene-item-icon">
                      <ClipboardList />
                    </span>
                    <span>
                      Trabajo pendiente<strong>Revisar el filtro</strong>
                    </span>
                    <span className="scene-chip">Asignado</span>
                  </div>
                  <div>
                    <span className="scene-item-icon">
                      <Wrench />
                    </span>
                    <span>
                      Gasto de {record.category.toLowerCase()}
                      <strong>{currency(record.amount)}</strong>
                    </span>
                    <span className="scene-chip neutral">Vista Fácil</span>
                  </div>
                  <div className="scene-plain">
                    <ShieldCheck size={17} />
                    <span>Tú decides quién puede ayudarte.</span>
                  </div>
                </div>
              )}
              {scene === 1 && (
                <div className="scene-items">
                  <div>
                    <span className="scene-item-icon">
                      <Package />
                    </span>
                    <span>
                      Materiales<strong>Entradas y consumos</strong>
                    </span>
                  </div>
                  <div>
                    <span className="scene-item-icon">
                      <Droplets />
                    </span>
                    <span>
                      Agua y equipos<strong>Operación por revisar</strong>
                    </span>
                  </div>
                  <div className="scene-plain">
                    <ClipboardList size={17} />
                    <span>Información de inventario por completar.</span>
                  </div>
                </div>
              )}
              {scene === 2 && (
                <div className="scene-alert">
                  <CircleAlert size={23} />
                  <div>
                    <strong>La operación está detenida.</strong>
                    <p>Estado: operación detenida. La causa sigue pendiente.</p>
                    <span>Lo siguiente: pedir revisar el filtro.</span>
                  </div>
                </div>
              )}
              <div className="scene-update">
                <span>Datos ilustrativos · 10:42</span>
                <a href="#facil">
                  Abrir vista guiada <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
          <div className="depth-note">
            <span className="depth-note-icon">
              <CheckMark />
            </span>
            <span>
              Tu experiencia.<strong>Tu decisión.</strong>
            </span>
          </div>
        </div>
      </TiltSurface>
      <div
        className="scene-selector"
        role="group"
        aria-label="Explorar la presentación 3D"
      >
        {scenes.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={index === scene}
            onClick={() => setScene(index)}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>
      <div className="motion-controls">
        <button type="button" onClick={toggle} aria-pressed={!enabled}>
          {enabled ? <Accessibility size={14} /> : <Sparkles size={14} />}{" "}
          {enabled ? "Reducir animaciones" : "Activar animaciones"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!enabled) activate();
            setEntry((value) => value + 1);
          }}
        >
          <RotateCcw size={13} />
          {enabled ? "Repetir entrada" : "Ver entrada animada"}
        </button>
        {overridden ? (
          <button type="button" onClick={reset}>
            Usar ajuste del sistema
          </button>
        ) : (
          reduced && (
            <span className="motion-explanation">
              Movimiento reducido del sistema. Puedes activar los efectos si lo
              deseas.
            </span>
          )
        )}
      </div>
    </div>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
