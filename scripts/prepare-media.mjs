import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import bundledFFmpeg from "ffmpeg-static";

const ffmpeg = process.env.FFMPEG_BIN || bundledFFmpeg;
if (!ffmpeg || !existsSync(ffmpeg)) {
  console.error(
    "El video final ya está incluido y no necesita regenerarse. Para procesar otro original, define FFMPEG_BIN con la ruta absoluta de tu ejecutable FFmpeg.",
  );
  process.exit(1);
}

mkdirSync("public/media", { recursive: true });
const input = "AgroSmart_Inicio/arandanos-original.mp4";
const commands = [
  [
    "-y",
    "-ss",
    "2",
    "-i",
    input,
    "-t",
    "10",
    "-an",
    "-vf",
    "scale=1280:720",
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "public/media/arandanos-hero.mp4",
  ],
  [
    "-y",
    "-ss",
    "4",
    "-i",
    input,
    "-frames:v",
    "1",
    "-vf",
    "scale=1280:720",
    "-quality",
    "82",
    "public/media/arandanos-poster.webp",
  ],
  [
    "-y",
    "-ss",
    "0",
    "-i",
    "public/media/arandanos-hero.mp4",
    "-vf",
    "fps=1/3,scale=426:240,tile=2x2",
    "-frames:v",
    "1",
    "AgroSmart_Inicio/revision-video.jpg",
  ],
  ["-v", "error", "-i", "public/media/arandanos-hero.mp4", "-f", "null", "-"],
];
for (const args of commands) {
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log("Video bytes:", statSync("public/media/arandanos-hero.mp4").size);
console.log(
  "Poster bytes:",
  statSync("public/media/arandanos-poster.webp").size,
);
