"""Descarga el recurso seleccionado desde su URL oficial publicada por Pexels."""

from pathlib import Path
import sys
import urllib.error
import urllib.request


SOURCE = "https://videos.pexels.com/video-files/855230/855230-hd_1920_1080_30fps.mp4"
TARGET = Path(__file__).resolve().parent / "assets" / "arandanos-original.mp4"
MAX_BYTES = 100 * 1024 * 1024


def main():
    if TARGET.exists():
        print(f"El archivo ya existe; no se sobrescribe: {TARGET}")
        return 0
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    partial = TARGET.with_suffix(".mp4.part")
    try:
        request = urllib.request.Request(SOURCE)
        with urllib.request.urlopen(request, timeout=30) as response:
            first = response.read(4096)
            if len(first) < 12 or first[4:8] != b"ftyp":
                raise ValueError("La respuesta no contiene un MP4 reconocible.")
            total = len(first)
            with partial.open("wb") as output:
                output.write(first)
                while True:
                    chunk = response.read(1024 * 1024)
                    if not chunk:
                        break
                    total += len(chunk)
                    if total > MAX_BYTES:
                        raise ValueError("El recurso supera el límite de 100 MiB.")
                    output.write(chunk)
        partial.replace(TARGET)
        print(f"Descargado: {TARGET} ({total:,} bytes). Comprime y revisa antes de publicar.")
        return 0
    except (urllib.error.URLError, TimeoutError, OSError, ValueError) as error:
        partial.unlink(missing_ok=True)
        print(f"No se pudo descargar el video: {error}", file=sys.stderr)
        print("Descarga manual: https://www.pexels.com/video/blueberry-picking-855230/", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
