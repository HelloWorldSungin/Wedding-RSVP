// Geometry for the breeze-block wall. Every value is a whole CSS pixel and every
// edge falls on the block grid, so the tiled wall face and the window blocks line up.

export const WINDOW = { columns: 6, rows: 9 }
const PLAQUE = { columns: 6, rows: 4 }
const WIDE_MIN_WIDTH = 760
const WIDE_MIN_ASPECT = 1.15

// The window waits this long before opening, then its blocks turn away in a
// wave from the centre: the farther a block is from it, the later it turns.
export const OPEN_START_MS = 1100
export const OPEN_SPREAD_MS = 150

export function wallLayout(width, height) {
  const wide = width >= WIDE_MIN_WIDTH && width / height > WIDE_MIN_ASPECT
  return wide ? wideLayout(width, height) : narrowLayout(width, height)
}

// Phones and portrait screens: the window one block below the top, the plaque
// one block below the window, and at least one row of wall under the plaque.
function narrowLayout(width, height) {
  const size = Math.floor(Math.min(width / 8, height / 16))
  const x = Math.round((width - WINDOW.columns * size) / 2)
  return withPixels(size, height, { x, y: size }, { x, y: 11 * size })
}

// Landscape screens: the window and the plaque side by side, centred together
// with one block between them.
function wideLayout(width, height) {
  const size = Math.floor(Math.min(96, height / 11, width / 14))
  const x = Math.round((width - (WINDOW.columns + 1 + PLAQUE.columns) * size) / 2)
  const y = Math.floor((Math.floor(height / size) - WINDOW.rows) / 2) * size
  return withPixels(size, height, { x, y }, { x: x + (WINDOW.columns + 1) * size, y: y + 2 * size })
}

// The wall face stops at the last whole row of blocks, so it never ends mid-block.
function withPixels(size, height, windowOrigin, plaqueOrigin) {
  const box = (origin, { columns, rows }) => ({ ...origin, width: columns * size, height: rows * size })
  return {
    size,
    faceHeight: Math.floor(height / size) * size,
    window: box(windowOrigin, WINDOW),
    plaque: box(plaqueOrigin, PLAQUE),
  }
}

// One entry per window block, in reading order, with its opening delay.
export function windowBlocks() {
  const centreX = WINDOW.columns / 2
  const centreY = WINDOW.rows / 2
  const blocks = []
  for (let row = 0; row < WINDOW.rows; row++) {
    for (let column = 0; column < WINDOW.columns; column++) {
      const distance = Math.hypot(column + 0.5 - centreX, row + 0.5 - centreY)
      blocks.push({ row, column, delay: Math.round(OPEN_START_MS + distance * OPEN_SPREAD_MS) })
    }
  }
  return blocks
}
