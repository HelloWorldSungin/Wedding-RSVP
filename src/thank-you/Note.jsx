// The couple's approved note. Focusable so "Continue" can move keyboard focus here.
function Note({ ref }) {
  return (
    <section ref={ref} id="note" className="thanks-note" tabIndex={-1}>
      <p className="thanks-note-date"><time dateTime="2026-09-19">September 19, 2026</time></p>
      <p className="thanks-note-body">We greatly appreciate your attendance and generosity!</p>
      <p className="thanks-note-signoff">With love,</p>
      <p className="thanks-note-names">Sungin &amp; Diane</p>
    </section>
  )
}

export default Note
