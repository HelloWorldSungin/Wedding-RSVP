#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = ["pillow>=12"]
# ///

# ─── How to run ───
# 1. Install uv (if needed): curl -LsSf https://astral.sh/uv/install.sh | sh
# 2. Run: uv run scripts/optimize_thank_you_photos.py SOURCE_DIR OUTPUT_DIR
#    SOURCE_DIR holds the four selected JPEGs; OUTPUT_DIR is src/thank-you/photos.
# ──────────────────


"""Write the thank-you page's web copies of the four selected photos.

The originals are only read. Each copy is resized, converted to sRGB and saved
as AVIF and WebP with no EXIF, XMP or ICC data, so nothing but pixels reaches
the public repository.
"""

from __future__ import annotations

import io
import json
import sys
from pathlib import Path
from typing import Final

from PIL import Image, ImageCms, ImageOps

MANIFEST: Final = Path(__file__).parents[1] / "src/thank-you/photoManifest.json"
AVIF_QUALITY: Final = 50
WEBP_QUALITY: Final = 72
METADATA_KEYS: Final = ("exif", "xmp", "XML:com.adobe.xmp", "icc_profile")


def to_srgb(image: Image.Image) -> Image.Image:
    image = ImageOps.exif_transpose(image)
    icc = image.info.get("icc_profile")
    if icc:
        source = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        image = ImageCms.profileToProfile(image, source, ImageCms.createProfile("sRGB"), outputMode="RGB")
    return image.convert("RGB")


def resized(image: Image.Image, width: int) -> Image.Image:
    if width > image.width:
        raise ValueError(f"{width}px is wider than the {image.width}px original")
    height = round(image.height * width / image.width)
    copy = image.resize((width, height), Image.Resampling.LANCZOS)
    copy.info = {}
    return copy


def save(image: Image.Image, path: Path) -> None:
    if path.suffix == ".avif":
        image.save(path, "AVIF", quality=AVIF_QUALITY, speed=4)
    else:
        image.save(path, "WEBP", quality=WEBP_QUALITY, method=6)
    with Image.open(path) as written:
        leaked = [key for key in METADATA_KEYS if written.info.get(key)]
        if leaked:
            raise RuntimeError(f"{path.name} kept metadata: {', '.join(leaked)}")


def main(source_dir: Path, output_dir: Path) -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    output_dir.mkdir(parents=True, exist_ok=True)
    for photo in manifest["photos"]:
        name = photo["name"]
        with Image.open(source_dir / f"{name}.jpg") as original:
            image = to_srgb(original)
        for width in photo["widths"]:
            copy = resized(image, width)
            for image_format in manifest["formats"]:
                path = output_dir / f"{name}-{width}w.{image_format}"
                save(copy, path)
                print(f"{path}  {path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: optimize_thank_you_photos.py SOURCE_DIR OUTPUT_DIR")
    main(Path(sys.argv[1]), Path(sys.argv[2]))
