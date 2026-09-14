export function normalizeName(value) {
  return value.toLocaleLowerCase('en').replace(/\s+/g, '')
}

export function matchingGuests(guests, query) {
  const normalizedQuery = normalizeName(query)
  const matches = normalizedQuery
    ? guests.filter((guest) => {
      const parts = guest.name.split(/\s+/)
      if (parts.some((part) => normalizeName(part).includes(normalizedQuery))) return true
      return query.trim().includes(' ') && normalizeName(guest.name).includes(normalizedQuery)
    })
    : guests

  return [...matches].sort((a, b) => a.name.localeCompare(b.name, 'en'))
}
