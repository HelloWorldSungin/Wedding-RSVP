#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.13"
# dependencies = ["reportlab", "pydantic>=2"]
# ///

# ─── How to run ───
# 1. Install uv (if needed): curl -LsSf https://astral.sh/uv/install.sh | sh
# 2. Run: uv run scripts/generate_seating_prints.py SOURCE_JPEG SEATING_JSON OUTPUT_DIR
# 3. Or use the bundled Codex Python runtime with the same three arguments.
# ──────────────────


"""Generate reproducible seating PDFs from the approved poster data."""

from __future__ import annotations

import sys
from collections import Counter
from pathlib import Path
from typing import ClassVar, Final

from pydantic import BaseModel, ConfigDict, TypeAdapter
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

URL: Final = "https://www.ori-story.com/tables"
MM: Final = 72 / 25.4
SAFE: Final = 13 * MM
QR_SIZE: Final = 70 * MM
EXPECTED_ARGC: Final = 4


class _InvalidSeatingDataError(Exception):
    pass


class _Seat(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(frozen=True)
    name: str
    table: int


def _load_seats(path: Path) -> list[_Seat]:
    seats = TypeAdapter(list[_Seat]).validate_json(path.read_bytes())
    if not seats or any(not seat.name.strip() or seat.table < 1 for seat in seats):
        raise _InvalidSeatingDataError
    return seats


def _clip_source_band(
    pdf: canvas.Canvas,
    source: ImageReader,
    page_size: tuple[float, float],
    pixel_band: tuple[int, int],
    *,
    at_top: bool,
) -> None:
    page_width, page_height = page_size
    top_pixel, bottom_pixel = pixel_band
    source_width, source_height = source.getSize()
    scale = (page_width - 2 * SAFE) / source_width
    band_height = (bottom_pixel - top_pixel) * scale
    y = page_height - SAFE - band_height if at_top else SAFE
    image_y = y - (source_height - bottom_pixel) * scale
    clip = pdf.beginPath()
    clip.rect(SAFE, y, source_width * scale, band_height)
    pdf.saveState()
    pdf.clipPath(clip, stroke=0, fill=0)
    _ = pdf.drawImage(
        source,
        SAFE,
        image_y,
        width=source_width * scale,
        height=source_height * scale,
    )
    pdf.restoreState()


def _draw_sign(source: ImageReader, path: Path, width: float, height: float) -> None:
    pdf = canvas.Canvas(str(path), pagesize=(width, height), pageCompression=1)
    pdf.setTitle("Wedding seating QR sign - proof")
    pdf.setAuthor("Diane and Sungin")

    _clip_source_band(pdf, source, (width, height), (0, 398), at_top=True)
    _clip_source_band(pdf, source, (width, height), (1750, 1918), at_top=False)

    qr = QrCodeWidget(
        URL,
        barLevel="H",
        barBorder=4,
        barWidth=QR_SIZE,
        barHeight=QR_SIZE,
    )
    drawing = Drawing(QR_SIZE, QR_SIZE)
    drawing.add(qr)
    qr_y = height * 0.39
    renderPDF.draw(drawing, pdf, (width - QR_SIZE) / 2, qr_y)

    pdf.setFillColor(colors.black)
    pdf.setFont("Times-Roman", 16)
    pdf.drawCentredString(width / 2, qr_y - 25, "Scan to find your table")
    pdf.setFont("Times-Roman", 10.5)
    pdf.drawCentredString(width / 2, qr_y - 45, "www.ori-story.com/tables")
    pdf.showPage()
    pdf.save()


def _draw_helper(seats: list[_Seat], path: Path) -> None:
    width, height = 612.0, 792.0
    pdf = canvas.Canvas(str(path), pagesize=(width, height), pageCompression=1)
    pdf.setTitle("Alphabetical seating helper list - proof")
    pdf.setFillColor(colors.black)
    pdf.setFont("Times-Roman", 22)
    pdf.drawCentredString(width / 2, height - 48, "Please Find Your Table")
    pdf.setFont("Times-Roman", 10)
    pdf.drawCentredString(
        width / 2,
        height - 66,
        "Alphabetical paper helper list - 9.19.26",
    )

    sorted_seats = sorted(seats, key=lambda seat: seat.name.casefold())
    rows_per_column = 35
    column_width = (width - 2 * SAFE) / 3
    row_pitch = 17.2
    for index, seat in enumerate(sorted_seats):
        column, row = divmod(index, rows_per_column)
        x = SAFE + column * column_width
        y = height - 98 - row * row_pitch
        pdf.setFont("Times-Roman", 9.5)
        pdf.drawString(x, y, seat.name)
        pdf.setFont("Times-Bold", 9.5)
        pdf.drawRightString(x + column_width - 13, y, str(seat.table))

    counts = Counter(seat.table for seat in seats)
    pdf.setFont("Times-Roman", 8)
    first = "  |  ".join(f"Table {table}: {counts[table]}" for table in range(1, 7))
    second = "  |  ".join(f"Table {table}: {counts[table]}" for table in range(7, 13))
    pdf.drawCentredString(width / 2, 52, f"{len(seats)} guests  |  {first}")
    pdf.drawCentredString(width / 2, 39, second)
    pdf.showPage()
    pdf.save()


def _main() -> None:
    if len(sys.argv) != EXPECTED_ARGC:
        _ = sys.stderr.write(
            "Usage: generate_seating_prints.py SOURCE_JPEG SEATING_JSON OUTPUT_DIR\n",
        )
        raise SystemExit(2)
    source_path, data_path, output_path = map(Path, sys.argv[1:])
    output_path.mkdir(parents=True, exist_ok=True)
    source = ImageReader(str(source_path))
    seats = _load_seats(data_path)
    _draw_sign(
        source,
        output_path / "seating-QR-sign-8x10in-PROOF.pdf",
        8 * 72,
        10 * 72,
    )
    _draw_sign(
        source,
        output_path / "seating-QR-sign-20x25cm-PROOF.pdf",
        200 * MM,
        250 * MM,
    )
    _draw_helper(seats, output_path / "alphabetical-seating-helper-PROOF.pdf")
    _ = sys.stdout.write(
        f"Built three PDF proofs for {len(seats)} guests in {output_path}\n",
    )


if __name__ == "__main__":
    _main()
