import test from "node:test";
import assert from "node:assert/strict";
import { prepareExpense, validAmount } from "../src/record.ts";

test("el ejemplo produce un borrador revisable, sin guardar", () => {
  assert.deepEqual(
    prepareExpense("Hoy pagué ochenta soles por reparar la bomba"),
    { amount: 80, concept: "Reparación de bomba", category: "Mantenimiento" },
  );
  assert.equal(
    prepareExpense("Pagué 95,50 soles por reparar la bomba").amount,
    95.5,
  );
});
test("un monto ambiguo, negativo o incompleto pide corrección", () => {
  for (const value of [
    "Pagué algo",
    "Pagué -80 soles",
    "Pagué 1,200 soles",
    "Pagué 80 por 2 filtros",
    "Pagué 0 soles",
    "Pagué ochenta y cinco soles",
    "Menos 80 soles",
  ])
    assert.equal(prepareExpense(value), null);
  for (const value of ["0", "-20", "10.999", "1000001", "", "80 soles"])
    assert.equal(validAmount(value), null);
});
