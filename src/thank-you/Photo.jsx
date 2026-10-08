// A photo as AVIF with a WebP fallback, sized by the browser from `sizes`.
function Photo({ photo, sizes, loading = 'lazy', fetchPriority, onLoad, onError }) {
  return (
    <picture>
      <source type="image/avif" sizes={sizes} srcSet={photo.avifSrcSet} />
      <img
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={onLoad}
        onError={onError}
        sizes={sizes}
        srcSet={photo.webpSrcSet}
        src={photo.src}
      />
    </picture>
  )
}

export default Photo
