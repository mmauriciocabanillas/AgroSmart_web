import test from "node:test";
import assert from "node:assert/strict";
import { appDestination } from "../src/config.ts";

test("sin URL o con configuración no válida, ofrece demostración", () => {
  for (const value of [
    undefined,
    "",
    "   ",
    "no-es-url",
    "/login",
    "javascript:alert(1)",
    "ftp://example.com",
    "https://user:password@example.com",
  ]) {
    assert.equal(appDestination(value), null);
  }
});
test("acepta destino HTTP/S en la misma pestaña sin modificar el contrato", () => {
  assert.equal(
    appDestination("https://example.com/app"),
    "https://example.com/app",
  );
  assert.equal(
    appDestination(" http://localhost:3000/ "),
    "http://localhost:3000/",
  );
});
