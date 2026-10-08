import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { PHOTOS, PHOTO_FORMATS, photoFileName } from './photoManifest.js'

const photosDir = new URL('./photos/', import.meta.url)
const expected = PHOTOS.flatMap((photo) =>
  photo.widths.flatMap((width) => PHOTO_FORMATS.map((format) => photoFileName(photo, width, format))))

function webpChunks(bytes) {
  assert.equal(bytes.toString('latin1', 0, 4), 'RIFF')
  assert.equal(bytes.toString('latin1', 8, 12), 'WEBP')
  const chunks = []
  for (let offset = 12; offset + 8 <= bytes.length;) {
    chunks.push(bytes.toString('latin1', offset, offset + 4))
    offset += 8 + bytes.readUInt32LE(offset + 4) + (bytes.readUInt32LE(offset + 4) % 2)
  }
  return chunks
}

// Item types declared in an AVIF's meta box (Exif and mime/XMP items carry metadata).
function avifItemTypes(bytes) {
  const types = []
  const walk = (start, end) => {
    for (let offset = start; offset + 8 <= end;) {
      const size = bytes.readUInt32BE(offset)
      const type = bytes.toString('latin1', offset + 4, offset + 8)
      const boxEnd = size === 0 ? end : offset + size
      if (type === 'meta') walk(offset + 12, boxEnd)
      if (type === 'iinf') walk(offset + 12 + (bytes[offset + 8] === 0 ? 2 : 4), boxEnd)
      if (type === 'infe') {
        const typeAt = offset + 12 + (bytes[offset + 8] === 3 ? 4 : 2) + 2
        types.push(bytes.toString('latin1', typeAt, typeAt + 4))
      }
      if (type === 'colr') types.push(`colr:${bytes.toString('latin1', offset + 8, offset + 12)}`)
      if (type === 'iprp' || type === 'ipco') walk(offset + 8, boxEnd)
      offset = boxEnd
    }
  }
  walk(0, bytes.length)
  return types
}

test('every photo has each web size in AVIF and WebP, and nothing else is committed', () => {
  const files = readdirSync(photosDir).filter((file) => !file.startsWith('.')).sort()
  assert.deepEqual(files, [...expected].sort())
})

test('the web copies carry no EXIF, XMP or embedded colour profile', () => {
  for (const file of expected) {
    const bytes = readFileSync(new URL(file, photosDir))
    if (file.endsWith('.webp')) {
      const chunks = webpChunks(bytes)
      for (const chunk of ['EXIF', 'XMP ', 'ICCP']) assert.ok(!chunks.includes(chunk), `${file} has ${chunk}`)
    } else {
      const types = avifItemTypes(bytes)
      assert.ok(types.includes('av01'), `${file} has no AV1 image item`)
      for (const type of ['Exif', 'mime', 'colr:prof', 'colr:rICC']) assert.ok(!types.includes(type), `${file} has ${type}`)
    }
  }
})
