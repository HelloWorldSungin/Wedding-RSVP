import Photo from './Photo.jsx'
import { galleryPhotos } from './photos.js'

// Photo 2 leads full width on phones; photos 3 and 4 sit side by side at one
// height. Wider screens show all three in a row. Photo 4 is never cropped.
const LAYOUT = [
  { className: 'thanks-photo-wide', sizes: '(min-width: 1080px) 345px, (min-width: 760px) 31vw, calc(100vw - 32px)' },
  { className: 'thanks-photo-portrait', sizes: '(min-width: 1080px) 345px, (min-width: 760px) 31vw, 52vw' },
  { className: 'thanks-photo-guest', sizes: '(min-width: 1080px) 290px, (min-width: 760px) 26vw, 44vw' },
]

function Gallery() {
  return (
    <section className="thanks-gallery" aria-label="Photos from the wedding">
      {galleryPhotos.map((photo, index) => (
        <figure key={photo.name} className={LAYOUT[index].className}>
          <Photo photo={photo} sizes={LAYOUT[index].sizes} />
        </figure>
      ))}
    </section>
  )
}

export default Gallery
