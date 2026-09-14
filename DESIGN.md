# Wedding Invitation Design System

## 1. Atmosphere & Identity

The invitation is quiet and formal, with warm paper, charcoal lettering, and generous space. The seating page carries the same identity while prioritizing fast reading at the venue. Its signature is a centered serif heading above a simple alphabetical directory, with each table number easy to spot. The supplied printed chart informs the tone, not the web layout.

## 2. Color

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Paper | `--color-cream` | `#FAF9F6` | Page background |
| Warm surface | `--color-beige` | `#F5F5DC` | Existing invitation accents |
| Ink | `--color-charcoal` | `#36454F` | Main text and interactive focus |
| Metallic accent | `--color-gold` | `#D4AF37` | Existing invitation decoration |
| Deep metallic accent | `--color-gold-dark` | `#B8962E` | Existing invitation states |
| Seating rule | `--color-seating-rule` | `#D9D5CA` | Directory separators and input edge |
| Seating muted ink | `--color-seating-muted` | `#56636A` | Supporting text that retains readable contrast |

The invitation's envelope tokens remain in `src/index.css`. The seating page uses paper, ink, muted ink, and hairline rules, with no status colors or decorative gold needed for a guest lookup.

## 3. Typography

| Role | Face | Size | Line height | Usage |
| --- | --- | --- | --- | --- |
| Script | Great Vibes | Existing responsive scale | 1.2 | Invitation only |
| Display | Playfair Display, Georgia, serif | `clamp(2.5rem, 6vw, 4rem)` | 1.14 | Seating title |
| Name | Playfair Display, Georgia, serif | `1.125rem` to `1.25rem` | 1.4 | Guest names |
| Table | Lato, sans-serif | `1.125rem` to `1.25rem` | 1.4 | Table assignment |
| Body | Lato, sans-serif | `1rem` | 1.5 | Instructions and input |
| Small label | Lato, sans-serif | `0.875rem` | 1.4 | Search label and letter groups |

The three existing font families are retained because the invitation uses each for a distinct purpose. The seating bundle only needs Playfair Display and Lato glyphs; its page does not render script text.

## 4. Spacing & Layout

The base unit is `4px`; page spacing uses 16, 24, 32, 48, and 64px steps. The seating column is at most 704px wide. Mobile gutters are 24px, increasing to 32px on wider screens. The page is a single vertical stack. The search field precedes results; letter headings and separators preserve scanability when the complete list is visible.

## 5. Components

### Search field and clear control

- **Structure:** visible `<label>`, native search input, conditional `Clear` button.
- **States:** empty, typing, match, no match, keyboard focus, clear.
- **Accessibility:** label association, visible focus ring, at least 44px touch height, no autofocus.
- **Motion:** only short color and opacity feedback, disabled for reduced motion.

### Letter group and assignment row

- **Structure:** heading for first initial, list of guest rows; each row contains a name and a large `Table N` assignment.
- **States:** full directory and filtered directory; no selected result state, so every matching guest remains visible.
- **Accessibility:** semantic headings and lists; names and table numbers remain legible at 375px and zoomed widths.
- **Motion:** none. Filtering should feel immediate and avoid moving a guest's result during a search.

## 6. Motion & Interaction

Search updates immediately as the guest types. Its clear control returns to the full directory. The only transition is a `150ms` ink or opacity change for focus/hover/press feedback; `prefers-reduced-motion: reduce` removes it. The existing invitation animation retains its own easing tokens and behavior. The seating route never loads it.

## 7. Depth & Surface

The seating page uses a **borders-only** strategy: a restrained rule around the input and hairline separators between directory rows. No cards or drop shadows. The existing invitation's card and envelope shadows are unchanged.

## 8. Accessibility Constraints & Accepted Debt

Target WCAG 2.2 AA for the new seating page: readable contrast, visible keyboard focus, labeled input, semantic grouping, no automatic focus, and touch-friendly clear control. The search is a convenience; the complete alphabetical list remains available without typing.

No accepted debt for the seating page. Source transcription accuracy is verified separately before publication.
