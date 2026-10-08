// The four photos in the couple's chosen order. The web copies in ./photos are
// written from the untouched originals by scripts/optimize_thank_you_photos.py.

export const PHOTO_FORMATS = ['avif', 'webp']

export const PHOTOS = [
  {
    name: 'sneak-peak-1',
    width: 1365,
    height: 2048,
    widths: [400, 720, 1080],
    alt: 'Sungin and Diane under sunlit trees, holding a white bouquet',
  },
  {
    name: 'sneak-peak-2',
    width: 1365,
    height: 2048,
    widths: [400, 720, 1080],
    alt: 'Sungin and Diane at their candlelit reception table, in front of a white breeze-block wall',
  },
  {
    name: 'sneak-peak-3',
    width: 1365,
    height: 2048,
    widths: [400, 720, 1080],
    alt: 'Black-and-white photo of Sungin and Diane smiling at each other in backlit sun',
  },
  {
    name: 'winner-picture',
    width: 675,
    height: 1200,
    widths: [400, 675],
    alt: "A guest's photo from the reception: Sungin and Diane share a kiss on the cheek while another guest films on a phone",
  },
]

export function photoFileName(photo, width, format) {
  return `${photo.name}-${width}w.${format}`
}
