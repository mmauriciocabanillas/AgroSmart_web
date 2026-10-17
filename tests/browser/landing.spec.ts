import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";

test("estructura, enlaces internos y recursos locales", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await expect(page).toHaveTitle("AgroSmart | Gestión agrícola hecha para ti");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")))) {
    expect(href).not.toBe("#");
    await expect(page.locator(href!)).toHaveCount(1);
  }
  expect(
    await page
      .locator(".hero-poster")
      .evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth === 1280,
      ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("todos los CTA sin destino abren diálogo y recuperan foco", async ({
  page,
}) => {
  await page.goto("/");
  for (const cta of await page
    .getByRole("button", { name: "Entrar a AgroSmart" })
    .all()) {
    await cta.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByText("La aplicación aún no tiene una dirección configurada.", {
        exact: false,
      }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(cta).toBeFocused();
  }
  await page
    .locator(".hero-buttons")
    .getByRole("button", { name: "Entrar a AgroSmart" })
    .click();
  await page
    .getByRole("link", { name: "Ver demostración", exact: true })
    .click();
  await expect(page.locator(".app-dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Estándar", exact: true }),
  ).toBeFocused();
});

test("destino configurado se comparte y navega en la misma pestaña", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5174");
  const links = page.getByRole("link", { name: "Entrar a AgroSmart" });
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute(
      "href",
      "https://example.com/agrosmart-app",
    );
    expect(await link.getAttribute("target")).toBeNull();
  }
  await page.route("https://example.com/agrosmart-app", (route) =>
    route.fulfill({ body: "Destino de prueba" }),
  );
  await links.first().click();
  await expect(page).toHaveURL("https://example.com/agrosmart-app");
});

test("módulos cambian contenido y funcionan por teclado", async ({ page }) => {
  await page.goto("/#solucion");
  await page.getByRole("tab", { name: "Consulta" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Supervisa" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Operación detenida");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "Gastos" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText("80.00");
  await page.getByRole("tab", { name: "Organiza", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Revisión asignada");
});

test("incidencia manual conserva límites de navegación", async ({ page }) => {
  await page.goto("/#como-funciona");
  await expect(
    page.getByRole("button", { name: "Paso anterior" }),
  ).toBeDisabled();
  for (let index = 0; index < 5; index++)
    await page.getByRole("button", { name: "Paso siguiente" }).click();
  await expect(
    page.getByRole("button", { name: "Paso siguiente" }),
  ).toBeDisabled();
  await expect(page.locator(".story-description")).toContainText("80.00");
  await page.getByRole("button", { name: /Registra/ }).click();
  await expect(page.locator(".story-description")).toContainText(
    "Tus palabras, un registro claro",
  );
});

test("Fácil conserva sector, valores y alerta; sus acciones revelan contenido", async ({
  page,
}) => {
  await page.goto("/#facil");
  const demo = page.locator(".easy-demo");
  for (const name of ["Estándar", "Fácil"]) {
    await page.getByRole("button", { name, exact: true }).click();
    for (const text of [
      "Sector C",
      "12 L/min",
      "20 L/min",
      "El caudal necesita revisión",
    ])
      await expect(demo).toContainText(text);
  }
  await page.getByRole("button", { name: "Ver mi campo" }).click();
  await expect(page.locator("#easy-action-panel")).toContainText(
    "Tu campo · Sector C",
  );
  await page.getByRole("button", { name: "Ver qué hacer" }).click();
  await expect(page.locator("#easy-action-panel")).toContainText(
    "Solo autoriza reiniciar con condiciones seguras",
  );
});

test("voz disponible se inicia solo por pulsación y sin micrófono", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        speak: (utterance: SpeechSynthesisUtterance) => {
          (window as any).__spoken = utterance.text;
        },
        cancel: () => {},
      },
    });
  });
  await page.goto("/#facil");
  expect(await page.evaluate(() => (window as any).__spoken)).toBeUndefined();
  await page.getByRole("button", { name: "Escuchar aviso" }).click();
  expect(await page.evaluate(() => (window as any).__spoken)).toContain(
    "Sector C",
  );
  await expect(page.locator(".speech-status")).toContainText("Escuchando");
});

test("voz ausente conserva alternativa textual", async ({ page }) => {
  await page.addInitScript(() => {
    delete (window as any).speechSynthesis;
  });
  await page.goto("/#facil");
  await page.getByRole("button", { name: "Escuchar aviso" }).click();
  await expect(page.locator(".speech-status")).toContainText(
    "Tu navegador no ofrece lectura de voz",
  );
  await page.getByText("Leer el aviso completo", { exact: true }).click();
  await expect(page.locator(".transcript")).toContainText(
    "Pide al responsable revisar el filtro",
  );
});

test("preguntas se expanden por teclado", async ({ page }) => {
  await page.goto("/#preguntas");
  for (const summary of await page.locator(".faq-list summary").all()) {
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(summary.locator("..")).toHaveAttribute("open", "");
    await page.keyboard.press("Enter");
    expect(await summary.locator("..").getAttribute("open")).toBeNull();
  }
});

for (const width of [320, 360, 768, 1024, 1440]) {
  test(`reflujo, contraste y semántica a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("#facil").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Ver qué hacer" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    if ([360, 1440].includes(width)) {
      mkdirSync("test-results/capturas", { recursive: true });
      await page.screenshot({
        path: `test-results/capturas/pagina-${width}.png`,
        fullPage: true,
      });
    }
  });
}

test("menú móvil con Escape, foco y enlaces", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Abrir menú" });
  await menuButton.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
  await menuButton.click();
  await page
    .getByRole("navigation", { name: "Navegación móvil" })
    .getByRole("link", { name: "AgroSmart Fácil" })
    .click();
  await expect(page.locator("#mobile-menu")).not.toBeVisible();
  await expect(page).toHaveURL(/#facil$/);
});

test("movimiento reducido y ahorro de datos evitan la descarga automática", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (req) => {
    if (req.url().endsWith(".mp4")) requests.push(req.url());
  });
  await page.goto("/");
  expect(await page.locator("video").getAttribute("src")).toBeNull();
  await expect(page.locator(".media-control")).toHaveCount(0);
  expect(requests).toEqual([]);
  await page.goto("about:blank");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", {
      value: {
        saveData: true,
        addEventListener() {},
        removeEventListener() {},
      },
    });
  });
  await page.goto("/");
  expect(await page.locator("video").getAttribute("src")).toBeNull();
  expect(requests).toEqual([]);
});

test("autoplay bloqueado conserva póster sin botones de video", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      return Promise.reject(new DOMException("Bloqueado", "NotAllowedError"));
    };
  });
  await page.goto("/");
  await expect(page.locator(".hero-poster")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Reproducir video|Pausar video/ }),
  ).toHaveCount(0);
  await expect
    .poll(() =>
      page.locator("video").evaluate((v: HTMLVideoElement) => v.paused),
    )
    .toBe(true);
  await expect(page.locator("video")).not.toHaveClass(/is-playing/);
});

test("video automático en bucle sin controles, pausa fuera de vista y reanuda al volver", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator("video");
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
  expect(
    await video.evaluate((v: HTMLVideoElement) => ({
      width: v.videoWidth,
      loop: v.loop,
      muted: v.muted,
      autoplay: v.autoplay,
      inline: v.playsInline,
      controls: v.controls,
    })),
  ).toEqual({
    width: 1280,
    loop: true,
    muted: true,
    autoplay: true,
    inline: true,
    controls: false,
  });
  await expect(page.locator(".media-control")).toHaveCount(0);
  await video.evaluate((v: HTMLVideoElement) => {
    v.currentTime = v.duration - 0.15;
  });
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime), {
      timeout: 7000,
    })
    .toBeLessThan(1);
  await page.locator("#facil").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
  await page.locator("#inicio").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
  await page.getByRole("button", { name: "Reducir animaciones" }).click();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
  await page.getByRole("button", { name: "Activar animaciones" }).click();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
});

test("zoom al 200% conserva lectura y acceso a las funciones", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.documentElement.style.zoom = "2";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Ver qué hacer" }).click();
  await expect(page.locator("#easy-action-panel")).toContainText(
    "Lo siguiente es revisar",
  );
});
