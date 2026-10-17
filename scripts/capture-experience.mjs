import { chromium, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] || "http://127.0.0.1:5173";
mkdirSync("docs/capturas", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  reducedMotion: "no-preference",
  recordVideo: {
    dir: "test-results/recordings",
    size: { width: 1440, height: 1100 },
  },
});
const page = await context.newPage();
const settle = () =>
  page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter(
          (animation) => animation.effect?.getTiming().iterations !== Infinity,
        )
        .map((animation) => animation.finished.catch(() => {})),
    ),
  );
await page.goto(base);
await page.evaluate(() => document.fonts.ready);
await settle();
await page.screenshot({ path: "docs/capturas/v2-portada.png" });
const box = await page.locator(".hero-depth").boundingBox();
await page.mouse.move(box.x + 20, box.y + 80);
await page.mouse.move(box.x + box.width - 20, box.y + box.height * 0.35, {
  steps: 32,
});
await settle();
await page.getByRole("button", { name: "Un aviso", exact: true }).click();
await settle();
await page.getByRole("button", { name: "Mis recursos", exact: true }).click();
await settle();
await page.getByRole("button", { name: "Mi día", exact: true }).click();
await settle();
await page.getByRole("button", { name: "Repetir entrada" }).click();
await settle();
const video = page.video();
await context.close();
await video.saveAs("docs/capturas/animacion.webm");

const review = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await review.goto(base);
await review.evaluate(() => document.fonts.ready);
for (const [selector, name] of [
  ["#registro", "v2-registro"],
  ["#facil", "v2-facil"],
  ["#como-funciona", "v2-historia"],
]) {
  await review.locator(selector).scrollIntoViewIfNeeded();
  await expect(review.locator("header")).toHaveClass(/scrolled/);
  await review
    .locator(selector)
    .screenshot({ path: `docs/capturas/${name}.png` });
}
await review.goto(base);
await review.evaluate(() => document.fonts.ready);
await review.evaluate(() => {
  document.documentElement.style.zoom = "2";
});
console.log(
  "H1 sin recorte al ampliar:",
  await review.locator("h1").evaluate((el) => el.scrollWidth <= el.clientWidth),
);
await review.screenshot({ path: "docs/capturas/v2-zoom.png" });
await review.evaluate(() => {
  document.documentElement.style.zoom = "1";
});
await review.setViewportSize({ width: 360, height: 800 });
await review.goto(base);
await review.evaluate(() => document.fonts.ready);
await review
  .locator("#inicio")
  .screenshot({ path: "docs/capturas/v2-movil.png" });
await browser.close();
console.log(
  "Capturas y grabación de la experiencia actualizadas en docs/capturas.",
);
