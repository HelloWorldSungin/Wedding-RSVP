import test from 'node:test'
import assert from 'node:assert/strict'
import { OPEN_START_MS, WINDOW, wallLayout, windowBlocks } from './wallLayout.js'

const VIEWPORTS = [
  [200, 560], [280, 560], [319, 560], [320, 568], [360, 640], [375, 667], [390, 844], [430, 932], [700, 560],
  [768, 1024], [1024, 768], [820, 600], [1280, 800], [1440, 900], [1920, 1080], [2560, 1440],
]

test('a phone gets a centred 2:3 window above the plaque', () => {
  const { size, faceHeight, window, plaque } = wallLayout(390, 844)
  assert.equal(size, 48)
  assert.equal(faceHeight, 816)
  assert.deepEqual(window, { x: 51, y: 48, width: 288, height: 432 })
  assert.deepEqual(plaque, { x: 51, y: 528, width: 288, height: 192 })
})

test('a zoomed viewport gives the plaque room for its copy and control', () => {
  const { plaque } = wallLayout(200, 560)
  assert.deepEqual(plaque, { x: 25, y: 275, width: 150, height: 150 })
})

test('a landscape screen puts the plaque beside the window, centred together', () => {
  const { size, window, plaque } = wallLayout(1440, 900)
  assert.equal(size, 81)
  assert.equal(plaque.x, window.x + 7 * size)
  assert.equal(plaque.y, window.y + 2 * size)
  const left = window.x
  const right = 1440 - (plaque.x + plaque.width)
  assert.ok(Math.abs(left - right) <= 1)
})

test('portrait tablets stay stacked and landscape tablets go side by side', () => {
  const portrait = wallLayout(768, 1024)
  assert.ok(portrait.plaque.y > portrait.window.y + portrait.window.height)
  const landscape = wallLayout(1024, 768)
  assert.ok(landscape.plaque.x > landscape.window.x + landscape.window.width)
})

test('every layout fits the wall face in whole pixels, on the block grid', () => {
  for (const [width, height] of VIEWPORTS) {
    const { size, faceHeight, window, plaque } = wallLayout(width, height)
    const label = `${width}x${height}`
    assert.equal(faceHeight % size, 0, label)
    assert.ok(faceHeight <= height && height - faceHeight < size, label)
    for (const box of [window, plaque]) {
      assert.ok(Object.values(box).every(Number.isInteger), label)
      assert.ok(box.x >= 0 && box.x + box.width <= width, label)
      assert.equal(box.y % size, 0, label)
      assert.ok(box.y >= size && box.y + box.height + size <= faceHeight, `${label} needs a row of wall above and below`)
    }
    assert.equal(window.width, WINDOW.columns * size, label)
    assert.equal(window.height, WINDOW.rows * size, label)
    assert.equal((plaque.x - window.x) % size, 0, label)
    assert.equal((plaque.y - window.y) % size, 0, label)
    const overlaps = plaque.x < window.x + window.width && window.x < plaque.x + plaque.width
      && plaque.y < window.y + window.height && window.y < plaque.y + plaque.height
    assert.equal(overlaps, false, label)
  }
})

test('the window opens from its centre outwards, symmetrically', () => {
  const blocks = windowBlocks()
  assert.equal(blocks.length, WINDOW.columns * WINDOW.rows)
  const delayAt = (row, column) => blocks.find((block) => block.row === row && block.column === column).delay
  const delays = blocks.map((block) => block.delay)
  assert.ok(Math.min(...delays) > OPEN_START_MS)
  assert.equal(Math.min(...delays), delayAt(4, 2))
  assert.equal(Math.max(...delays), delayAt(0, 0))
  for (const { row, column, delay } of blocks) {
    assert.equal(delay, delayAt(WINDOW.rows - 1 - row, WINDOW.columns - 1 - column))
  }
})
