import test from 'node:test'
import assert from 'node:assert/strict'
import seating from '../data/seating.json' with { type: 'json' }
import { matchingGuests } from './search.js'

test('the empty search returns the full first-name alphabetical directory', () => {
  const result = matchingGuests(seating, '')
  assert.equal(result.length, seating.length)
  assert.deepEqual(result.map((guest) => guest.name), [...result.map((guest) => guest.name)].sort((a, b) => a.localeCompare(b, 'en')))
})

test('partial names ignore case and spaces without dropping other matches', () => {
  const kimMatches = matchingGuests(seating, ' KIM ')
  assert.ok(kimMatches.length > 1)
  assert.ok(kimMatches.every((guest) => guest.name.toLowerCase().includes('kim')))
  assert.deepEqual(matchingGuests(seating, 'young sik'), [{ name: 'YoungSik Kim', table: 1 }])
  assert.deepEqual(matchingGuests(seating, 'YoUnGsIk'), [{ name: 'YoungSik Kim', table: 1 }])
})

test('no match returns an empty list', () => {
  assert.deepEqual(matchingGuests(seating, 'not a guest'), [])
})
