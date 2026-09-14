import { useState } from 'react'
import seating from '../data/seating.json'
import { matchingGuests } from './search.js'

function groupByInitial(guests) {
  const groups = new Map()
  for (const guest of guests) {
    const initial = guest.name[0].toLocaleUpperCase('en')
    if (!groups.has(initial)) groups.set(initial, [])
    groups.get(initial).push(guest)
  }
  return [...groups]
}

function TablesPage() {
  const [query, setQuery] = useState('')
  const guests = matchingGuests(seating, query)
  const groups = groupByInitial(guests)
  const isSearching = query.trim().length > 0

  return (
    <main className="tables-page">
      <div className="tables-shell">
        <header className="tables-header">
          <p className="tables-eyebrow">Sungin &amp; Diane <span aria-hidden="true">·</span> 09.19.26</p>
          <h1>Find your table</h1>
          <p className="tables-intro">Search for your name, or browse the guest list below.</p>
        </header>

        <div className="tables-search">
          <label htmlFor="guest-search">Search by name</label>
          <div className="tables-search-control">
            <input
              id="guest-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              spellCheck="false"
              placeholder="First or last name"
            />
            {query && <button type="button" onClick={() => setQuery('')}>Clear</button>}
          </div>
        </div>

        <section className="tables-results" aria-label="Guest table assignments">
          <p className="tables-results-count" aria-live="polite">
            {isSearching ? `${guests.length} ${guests.length === 1 ? 'match' : 'matches'}` : 'Guest list'}
          </p>
          {guests.length === 0 ? (
            <p className="tables-empty">Try your first or last name, or ask someone at the welcome table.</p>
          ) : (
            groups.map(([initial, members]) => (
              <div className="tables-group" key={initial}>
                <h2>{initial}</h2>
                <ul>
                  {members.map((guest) => (
                    <li className="tables-row" key={guest.name}>
                      <span className="tables-name">{guest.name}</span>
                      <span className="tables-number">Table {guest.table}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  )
}

export default TablesPage
