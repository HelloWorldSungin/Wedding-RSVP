import { useRef, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'framer-motion'
import BreezeWall from './BreezeWall.jsx'
import Gallery from './Gallery.jsx'
import Note from './Note.jsx'

function ThankYouPage() {
  const [run, setRun] = useState(0)
  const continueRef = useRef(null)
  const noteRef = useRef(null)
  const reduceMotion = useReducedMotion()

  function showNote() {
    noteRef.current.focus({ preventScroll: true })
    noteRef.current.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  function replay() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    continueRef.current?.focus({ preventScroll: true })
    setRun((count) => count + 1)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <main className="thanks-page">
          <BreezeWall run={run} continueRef={continueRef} onContinue={showNote} />
          <Note ref={noteRef} />
          <div className="thanks-band" aria-hidden="true" />
          <Gallery />
          <footer className="thanks-foot">
            <button type="button" className="thanks-replay" onClick={replay}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5" />
              </svg>
              Open the wall again
            </button>
          </footer>
        </main>
      </MotionConfig>
    </LazyMotion>
  )
}

export default ThankYouPage
