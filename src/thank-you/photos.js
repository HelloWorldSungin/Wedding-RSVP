import { PHOTOS, photoFileName } from './photoManifest.js'

const urls = import.meta.glob('./photos/*.{avif,webp}', { eager: true, query: '?url', import: 'default' })

function urlFor(photo, width, format) {
  const url = urls[`./photos/${photoFileName(photo, width, format)}`]
  if (!url) throw new Error(`Missing thank-you photo ${photoFileName(photo, width, format)}`)
  return url
}

function srcSet(photo, format) {
  return photo.widths.map((width) => `${urlFor(photo, width, format)} ${width}w`).join(', ')
}

export const [wallPhoto, ...galleryPhotos] = PHOTOS.map((photo) => ({
  ...photo,
  avifSrcSet: srcSet(photo, 'avif'),
  webpSrcSet: srcSet(photo, 'webp'),
  src: urlFor(photo, photo.widths[1], 'webp'),
}))
