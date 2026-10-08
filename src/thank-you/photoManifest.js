import manifest from './photoManifest.json' with { type: 'json' }

export const PHOTO_FORMATS = manifest.formats
export const PHOTOS = manifest.photos

export function photoFileName(photo, width, format) {
  return `${photo.name}-${width}w.${format}`
}
