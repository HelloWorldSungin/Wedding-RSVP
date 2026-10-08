import { useLayoutEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import Photo from './Photo.jsx'
import { wallPhoto } from './photos.js'
import { wallLayout, windowBlocks } from './wallLayout.js'

const MotionDiv = m.div

// Keep in sync with the hero preload in thank-you.html so the preload is reused.
const WALL_PHOTO_SIZES = '(min-width: 760px) 576px, 75vw'

const BLOCKS = windowBlocks()
const LAST_BLOCK = BLOCKS.reduce((last, block) => (block.delay > last.delay ? block : last))

const EASE_LOUVER = [0.65, 0, 0.35, 1]
const EASE_REVEAL = [0.16, 1, 0.3, 1]

// Each window block turns edge-on like a louver, fading only at the end of its turn.
const blockVariants = {
  closed: { transform: 'perspective(420px) rotateY(0deg)', opacity: 1 },
  opening: (delayMs) => ({
    transform: 'perspective(420px) rotateY(88deg)',
    opacity: [1, 1, 0],
    transition: {
      delay: delayMs / 1000,
      duration: 0.72,
      ease: EASE_LOUVER,
      opacity: { delay: delayMs / 1000, duration: 0.72, times: [0, 0.65, 1], ease: 'linear' },
    },
  }),
}

// Reduced motion: the window's blocks simply fade together.
const reducedBlockVariants = {
  closed: { opacity: 1 },
  opening: { opacity: 0, transition: { delay: 0.3, duration: 0.24, ease: 'linear' } },
}

// The settle is written as keyframes so that switching to `still` (a plain value)
// counts as a change and jumps to rest; Framer leaves an equal target running.
const photoVariants = {
  closed: { transform: 'scale(1.08)' },
  settling: {
    transform: ['scale(1.08)', 'scale(1)'],
    transition: { delay: 0.9, duration: 2.6, ease: EASE_REVEAL },
  },
  still: { transform: 'scale(1)', transition: { duration: 0 } },
}

function boxStyle({ x, y, width, height }) {
  return { left: x, top: y, width, height }
}

function faceStyle({ size, faceHeight, window }) {
  return { height: faceHeight, '--block': `${size}px`, '--wall-x': `${window.x}px` }
}

// The window onto photo 1. It stays closed until the photo has loaded, then opens
// once; a tap while it opens skips to the end. Remount it to play it again.
function WallOpening({ layout }) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState('closed')
  const [skipped, setSkipped] = useState(false)

  const start = () => setPhase((current) => (current === 'closed' ? 'opening' : current))

  function skip() {
    if (phase !== 'opening') return
    setSkipped(true)
    setPhase('open')
  }

  function finishOpening(variant) {
    if (variant === 'opening') setPhase('open')
  }

  let photoState = 'settling'
  if (reduceMotion || skipped) photoState = 'still'
  else if (phase === 'closed') photoState = 'closed'

  return (
    <div className={phase === 'opening' ? 'thanks-opening thanks-opening--playing' : 'thanks-opening'} onClick={skip}>
      <div className="thanks-window" style={boxStyle(layout.window)}>
        <MotionDiv
          className="thanks-window-photo"
          variants={photoVariants}
          initial={reduceMotion ? 'still' : 'closed'}
          animate={photoState}
        >
          <Photo
            photo={wallPhoto}
            sizes={WALL_PHOTO_SIZES}
            loading="eager"
            fetchPriority="high"
            onLoad={start}
            onError={start}
          />
        </MotionDiv>
        {phase !== 'open' && (
          <div className="thanks-window-blocks" aria-hidden="true">
            {BLOCKS.map((block) => (
              <MotionDiv
                key={`${block.row}-${block.column}`}
                className="thanks-block"
                custom={block.delay}
                variants={reduceMotion ? reducedBlockVariants : blockVariants}
                initial="closed"
                animate={phase}
                onAnimationComplete={block === LAST_BLOCK ? finishOpening : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// The opening screen: the venue's breeze-block wall with a plaque and a window
// that opens onto the first photo.
function BreezeWall({ run, continueRef, onContinue }) {
  const wallRef = useRef(null)
  const [size, setSize] = useState(null)

  // Measure before the first paint so the wall never shows unpositioned.
  useLayoutEffect(() => {
    const wall = wallRef.current
    const measure = () => {
      const width = wall.clientWidth
      const height = wall.clientHeight
      setSize((current) => (current?.width === width && current?.height === height ? current : { width, height }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wall)
    return () => observer.disconnect()
  }, [])

  const layout = size && wallLayout(size.width, size.height)

  return (
    <section ref={wallRef} className="thanks-wall" aria-labelledby="thanks-title">
      {layout && (
        <>
          <div className="thanks-wall-face" style={faceStyle(layout)} />
          <div className="thanks-plaque" style={boxStyle(layout.plaque)}>
            <h1 id="thanks-title">Thank you</h1>
            <p>for celebrating with us</p>
            <button ref={continueRef} type="button" className="thanks-continue" aria-label="Continue to the note" onClick={onContinue}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 9l7 7 7-7" />
              </svg>
            </button>
          </div>
          <WallOpening key={run} layout={layout} />
        </>
      )}
    </section>
  )
}

export default BreezeWall
