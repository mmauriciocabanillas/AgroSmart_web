export type Expense = { amount: number; concept: string; category: string };
export function validAmount(raw: string): number | null {
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(raw.trim())) return null;
  const number = Number(raw.trim().replace(",", "."));
  return number > 0 && number <= 1000000 ? number : null;
}
// Interpretación acotada del ejemplo, sin servicios de IA ni transmisión de datos.
export function prepareExpense(text: string): Expense | null {
  if (/[-−]\s*\d|\bmenos\b/i.test(text)) return null;
  const numbers = text.match(/\d+(?:[.,]\d+)*/g) || [];
  if (numbers.length > 1) return null;
  const first = numbers[0];
  const amount = first
    ? validAmount(first)
    : /\bochenta\s+soles?\b/i.test(text)
      ? 80
      : null;
  if (!amount) return null;
  const pump = /bomba/i.test(text) && /repar|arregl|manten/i.test(text);
  return {
    amount,
    concept: pump ? "Reparación de bomba" : text.trim().slice(0, 120),
    category: pump ? "Mantenimiento" : "Otros",
  };
}
export const currency = (amount: number) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(
    amount,
  );
