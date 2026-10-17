import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Mic,
  PencilLine,
  RotateCcw,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { currency, prepareExpense, validAmount, type Expense } from "./record";

const initialRecord: Expense = {
  amount: 80,
  concept: "Reparación de bomba",
  category: "Mantenimiento",
};
const ExampleContext = createContext({
  record: initialRecord,
  confirmed: false,
  confirm: (_record: Expense) => {},
});
export function ExampleProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState(initialRecord);
  const [confirmed, setConfirmed] = useState(false);
  return (
    <ExampleContext.Provider
      value={{
        record,
        confirmed,
        confirm: (value) => {
          setRecord(value);
          setConfirmed(true);
        },
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
}
export const useExample = () => useContext(ExampleContext);

export function RecordDemo() {
  const [mode, setMode] = useState<"text" | "guided">("text");
  const [text, setText] = useState(
    "Hoy pagué ochenta soles por reparar la bomba",
  );
  const [review, setReview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [amount, setAmount] = useState("80");
  const [concept, setConcept] = useState("Reparación de bomba");
  const [category, setCategory] = useState("Mantenimiento");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const { confirm } = useExample();
  const startReview = () => {
    setError("");
    setNotice("");
    setSaved(false);
    setReview(true);
    requestAnimationFrame(() => heading.current?.focus());
  };
  return (
    <section id="registro" className="registration section">
      <div className="container registration-grid">
        <div className="registration-copy reveal">
          <span className="eyebrow">
            <span />
            Registra · revisa · confirma
          </span>
          <h2>
            Cuéntalo a tu manera.
            <br />
            <span>Decide qué guardar.</span>
          </h2>
          <p>
            Un gasto no debería convertirse en una tarea complicada. Escribe lo
            que pasó o completa unos pasos. Revisa el resultado antes de
            confirmarlo.
          </p>
          <blockquote>
            “Hoy pagué ochenta soles
            <br />
            por reparar la bomba”.
          </blockquote>
          <div className="voice-note">
            <Mic size={21} />
            <p>
              Registra por texto o con pasos guiados. Puedes escuchar los avisos
              desde la vista Fácil, según las voces disponibles en tu navegador.
            </p>
          </div>
          <p className="privacy-example">
            <ShieldCheck size={15} /> Tus registros permanecen durante esta
            visita y se eliminan al recargar. No se envían a una cuenta.
          </p>
        </div>
        <div className="record-demo reveal">
          <div className="record-demo-top">
            <span>PREPARA TU REGISTRO</span>
            <span className="demo-label">Registro guiado</span>
          </div>
          {!review && !saved && (
            <>
              <div
                className="record-modes"
                role="group"
                aria-label="Forma de preparar un registro"
              >
                <button
                  type="button"
                  aria-pressed={mode === "text"}
                  onClick={() => {
                    setMode("text");
                    setError("");
                  }}
                >
                  <PencilLine size={18} />
                  Por texto
                </button>
                <button
                  type="button"
                  aria-pressed={mode === "guided"}
                  onClick={() => {
                    setMode("guided");
                    setError("");
                  }}
                >
                  <ClipboardCheck size={18} />
                  Paso a paso
                </button>
              </div>
              {mode === "text" ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const prepared = prepareExpense(text);
                    if (!prepared) {
                      setError(
                        "No encontramos un monto válido. Prueba “80 soles” o usa Paso a paso. Nada se guardó.",
                      );
                      return;
                    }
                    setAmount(String(prepared.amount));
                    setConcept(prepared.concept);
                    setCategory(prepared.category);
                    startReview();
                  }}
                >
                  <label htmlFor="expense-text">
                    ¿Qué gasto quieres registrar?
                  </label>
                  <textarea
                    id="expense-text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    rows={4}
                    maxLength={240}
                    aria-describedby="text-example-help"
                  />
                  <p id="text-example-help" className="record-help">
                    Escribe un monto en números, como “80 soles”. Revisa y
                    corrige los datos antes de confirmar.
                  </p>
                  {error && (
                    <p role="alert" className="record-error">
                      {error}
                    </p>
                  )}
                  <button type="submit" className="button dark">
                    Preparar registro <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!validAmount(amount) || !concept.trim()) {
                      setError(
                        "Escribe un monto mayor que cero y una descripción. Nada se guardó.",
                      );
                      return;
                    }
                    startReview();
                  }}
                >
                  <ExpenseFields
                    amount={amount}
                    setAmount={setAmount}
                    concept={concept}
                    setConcept={setConcept}
                    category={category}
                    setCategory={setCategory}
                  />
                  {error && (
                    <p role="alert" className="record-error">
                      {error}
                    </p>
                  )}
                  <button type="submit" className="button dark">
                    Revisar antes de guardar <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </>
          )}
          {review && !saved && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const value = validAmount(amount);
                if (!value || !concept.trim()) {
                  setError(
                    "Revisa el monto y la descripción. Usa de S/ 0.01 a S/ 1 000 000, con hasta dos decimales. Nada se guardó.",
                  );
                  return;
                }
                confirm({ amount: value, concept: concept.trim(), category });
                setReview(false);
                setSaved(true);
                requestAnimationFrame(() => successHeading.current?.focus());
                setNotice(
                  "Registro confirmado durante esta visita. Puedes verlo en Fácil y Estándar; se elimina al recargar.",
                );
              }}
            >
              <span className="record-stage">
                02 / TÚ TIENES LA ÚLTIMA PALABRA
              </span>
              <h3 ref={heading} tabIndex={-1}>
                ¿Está correcto?
              </h3>
              <p className="record-help">
                Puedes corregir cualquiera de estos datos antes de confirmar.
              </p>
              <ExpenseFields
                amount={amount}
                setAmount={setAmount}
                concept={concept}
                setConcept={setConcept}
                category={category}
                setCategory={setCategory}
              />
              {error && (
                <p role="alert" className="record-error">
                  {error}
                </p>
              )}
              <div className="record-confirm">
                <button type="submit" className="button dark">
                  <Check size={18} />
                  Confirmar registro
                </button>
                <button
                  type="button"
                  className="button subtle"
                  onClick={() => {
                    setReview(false);
                    setError("");
                    requestAnimationFrame(() =>
                      document
                        .getElementById(
                          mode === "text" ? "expense-text" : "expense-amount",
                        )
                        ?.focus(),
                    );
                  }}
                >
                  Volver sin guardar
                </button>
              </div>
            </form>
          )}
          {saved && (
            <div className="record-success">
              <span>
                <Check size={32} />
              </span>
              <h3 ref={successHeading} tabIndex={-1}>
                Lo revisaste.
                <br />
                Quedó claro.
              </h3>
              <strong>{currency(validAmount(amount) || 80)}</strong>
              <p>
                {concept} · {category}
                <br />
                Disponible durante esta visita.
              </p>
              <a className="button dark" href="#facil">
                Verlo en Fácil y Estándar <ArrowRight size={18} />
              </a>
              <button
                className="button subtle"
                type="button"
                onClick={() => {
                  setSaved(false);
                  setReview(false);
                  setNotice("");
                }}
              >
                <RotateCcw size={16} />
                Registrar otro gasto
              </button>
            </div>
          )}
          <p className="record-notice" role={notice ? "status" : undefined}>
            {notice}
          </p>
          <div className="record-safety">
            <UserRoundCheck size={17} />
            <span>Tú confirmas. AgroSmart te acompaña.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpenseFields({
  amount,
  setAmount,
  concept,
  setConcept,
  category,
  setCategory,
}: {
  amount: string;
  setAmount: (v: string) => void;
  concept: string;
  setConcept: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
}) {
  return (
    <div className="expense-fields">
      <label htmlFor="expense-amount">Monto en soles</label>
      <input
        id="expense-amount"
        inputMode="decimal"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        maxLength={12}
      />
      <label htmlFor="expense-concept">¿En qué lo usaste?</label>
      <input
        id="expense-concept"
        value={concept}
        onChange={(event) => setConcept(event.target.value)}
        maxLength={120}
      />
      <label htmlFor="expense-category">Tipo de gasto</label>
      <select
        id="expense-category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {[
          "Agua",
          "Energía",
          "Materiales",
          "Mantenimiento",
          "Trabajo",
          "Otros",
        ].map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </div>
  );
}

export function SharedExpense() {
  const { record, confirmed } = useExample();
  return (
    <div className="shared-expense">
      <span>
        {confirmed ? "Registro confirmado por ti" : "Gasto de mantenimiento"}
      </span>
      <strong>{currency(record.amount)}</strong>
      <p>
        {record.concept} · {record.category}
      </p>
      <small>
        Otros gastos por registrar. No es un cálculo de rentabilidad.
      </small>
    </div>
  );
}

export function SupportSection() {
  const [role, setRole] = useState("Colaborador");
  return (
    <section className="support-section section">
      <div className="container support-grid">
        <div className="reveal">
          <span className="eyebrow">
            <span />
            Apoyo sin perder autonomía
          </span>
          <h2>
            Tú eliges
            <br />
            <span>quién te ayuda.</span>
          </h2>
          <p>
            Un familiar, un técnico o un colaborador puede acompañarte cuando lo
            decidas. Los permisos definen qué puede consultar o hacer cada
            persona, con las acciones identificadas.
          </p>
          <p>La ayuda es una opción. La decisión sigue siendo tuya.</p>
        </div>
        <div className="permission-demo reveal">
          <span className="demo-label">Permisos por rol</span>
          <h3>Una tarea, un permiso claro.</h3>
          <div
            className="permission-roles"
            role="group"
            aria-label="Persona de apoyo"
          >
            {["Familiar", "Técnico", "Colaborador"].map((value) => (
              <button
                type="button"
                aria-pressed={role === value}
                onClick={() => setRole(value)}
                key={value}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="permission-detail" key={role}>
            <UserRoundCheck size={30} />
            <div>
              <strong>{role} · alcance del apoyo</strong>
              <p>
                {role === "Familiar"
                  ? "Puede ayudarte a revisar los registros que decidas compartir."
                  : role === "Técnico"
                    ? "Puede registrar una revisión del equipo cuando lo autorices."
                    : "Puede consultar su tarea y registrar el resultado del trabajo."}
              </p>
            </div>
          </div>
          <p className="permission-limit">
            <ShieldCheck size={17} />
            El permiso de apoyo no autoriza poner equipos en marcha.
          </p>
        </div>
      </div>
    </section>
  );
}
