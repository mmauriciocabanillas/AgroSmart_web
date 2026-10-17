import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("entrada y escena 3D se exploran con clic y teclado sin navegar", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "on",
  );
  const deck = page.locator(".depth-deck");
  await expect(deck).toBeVisible();
  await expect(page.locator(".scene-title")).toHaveText("Tu día, más claro.");
  await page.getByRole("button", { name: "Mis recursos", exact: true }).click();
  await expect(page.locator(".scene-content")).toContainText(
    "Información de inventario por completar",
  );
  await page.getByRole("button", { name: "Un aviso", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".scene-alert")).toContainText(
    "La causa sigue pendiente",
  );
  await expect(
    page.getByRole("button", { name: "Un aviso", exact: true }),
  ).toBeFocused();
  const url = page.url();
  await page.getByRole("button", { name: "Repetir entrada" }).click();
  expect(page.url()).toBe(url);
  await expect(page.locator(".scene-title")).toHaveText("Sabes qué hacer.");
});

test("el puntero genera profundidad y reducir movimiento la desactiva", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const surface = page.locator(".hero-depth");
  const box = (await surface.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3);
  await expect
    .poll(() => surface.evaluate((el) => el.style.getPropertyValue("--tilt-y")))
    .not.toBe("");
  await page.getByRole("button", { name: "Reducir animaciones" }).click();
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(
    page.getByRole("button", { name: "Ver entrada animada" }),
  ).toBeEnabled();
  expect(
    await page
      .locator(".depth-deck")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  await page.getByRole("button", { name: "Un aviso", exact: true }).click();
  await expect(page.locator(".scene-alert")).toBeVisible();
  await page.getByRole("button", { name: "Activar animaciones" }).click();
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "on",
  );
});

test("el sistema reduce el movimiento y el visitante puede activar los efectos", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "off",
  );
  await expect(
    page.getByRole("button", { name: "Activar animaciones" }),
  ).toBeEnabled();
  expect(
    await page
      .locator(".depth-deck")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".depth-deck")
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  await page.getByRole("button", { name: "Activar animaciones" }).click();
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "on",
  );
  expect(
    await page
      .locator(".depth-deck")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("deck-arrival");
  expect(
    await page
      .locator(".depth-land")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("land-drift");
  await page.reload();
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "on",
  );
  await page.getByRole("button", { name: "Usar ajuste del sistema" }).click();
  await expect(page.locator(".experience-shell")).toHaveAttribute(
    "data-motion",
    "off",
  );
  expect(
    await page.evaluate(() => localStorage.getItem("agrosmart-motion")),
  ).toBeNull();
});

test("registro se revisa y corrige antes de compartirlo entre Fácil y Estándar", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") requests.push(request.url());
  });
  await page.goto("/#registro");
  await page
    .getByRole("button", { name: "Preparar registro", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "¿Está correcto?" }),
  ).toBeFocused();
  await expect(page.getByLabel("Monto en soles")).toHaveValue("80");
  await page.getByLabel("Monto en soles").fill("95.50");
  await page
    .getByLabel("¿En qué lo usaste?")
    .fill("Revisión y reparación de bomba");
  await page.getByRole("button", { name: "Confirmar en la demo" }).click();
  await expect(page.locator(".record-notice")).toContainText(
    "Registro confirmado solo en esta demostración",
  );
  await expect(page.locator(".record-success h3")).toBeFocused();
  const demo = page.locator(".easy-demo");
  for (const name of ["Estándar", "Fácil"]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(demo.locator(".shared-expense")).toContainText("95.50");
    await expect(demo.locator(".shared-expense")).toContainText(
      "Revisión y reparación de bomba",
    );
  }
  expect(requests).toEqual([]);
  await expect(page.locator(".hero-experience")).toContainText("95.50");
  await page.getByRole("tab", { name: "Gastos", exact: true }).click();
  await expect(page.locator(".dash-metrics")).toContainText("95.50");
  await page.reload();
  await expect(demo.locator(".shared-expense")).toContainText("80.00");
  await expect(demo.locator(".shared-expense")).toContainText(
    "Gasto ilustrativo",
  );
});

test("errores de registro explican cómo continuar; pasos guiados permiten recuperarse", async ({
  page,
}) => {
  await page.goto("/#registro");
  await page.getByLabel("¿Qué gasto quieres registrar?").fill("No sé el monto");
  await page
    .getByRole("button", { name: "Preparar registro", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText(
    "No encontramos un monto válido",
  );
  await page.getByRole("button", { name: "Paso a paso", exact: true }).click();
  await page.getByLabel("Monto en soles").fill("-1");
  await page.getByRole("button", { name: "Revisar antes de guardar" }).click();
  await expect(page.getByRole("alert")).toContainText("Nada se guardó");
  await page.getByLabel("Monto en soles").fill("80");
  await page.getByRole("button", { name: "Revisar antes de guardar" }).click();
  await page.getByRole("button", { name: "Volver sin guardar" }).click();
  await expect(page.locator(".easy-demo .shared-expense")).toContainText(
    "Gasto ilustrativo",
  );
});

test("apoyo autorizado cambia el alcance de ejemplo sin invitar ni compartir", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Técnico", exact: true }).click();
  await expect(page.locator(".permission-detail")).toContainText(
    "registrar una revisión",
  );
  await page.getByRole("button", { name: "Familiar", exact: true }).click();
  await expect(page.locator(".permission-detail")).toContainText(
    "registros que decidas compartir",
  );
  await expect(page.locator(".permission-limit")).toContainText(
    "no autoriza poner equipos en marcha",
  );
});

test("nueva narrativa y formulario revisado conservan accesibilidad", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Tu experiencia");
  const forbidden =
    /sat[eé]lit|Sentinel|NDVI|plagas|enfermedad|fenolog|trazabilidad|\bQR\b|SPACEAG/i;
  expect(await page.locator("main").innerText()).not.toMatch(forbidden);
  await page
    .getByRole("button", { name: "Preparar registro", exact: true })
    .click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
