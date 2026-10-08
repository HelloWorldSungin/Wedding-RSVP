# Wedding Invitation Design System

## 1. Atmosphere & Identity

The invitation is quiet and formal, with warm paper, charcoal lettering, and generous space. The seating page carries the same identity while prioritizing fast reading at the venue. Its signature is a centered serif heading above a simple alphabetical directory, with each table number easy to spot. The supplied printed chart informs the tone, not the web layout.

The thank-you page opens on the venue's breeze-block screen wall. A window in the wall turns away block by block to reveal the first photo, with a concrete plaque that says thank you. Below the wall, the couple's note and the remaining photos sit on the invitation's paper and ink.

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
| Concrete | `--color-concrete` | `#ECE7DE` | Thank-you wall blocks and plaque |
| Wall shadow | `--color-wall-shadow` | `#9C8F80` | Thank-you shadow seen through the block openings |
| Thank-you muted ink | `--color-thanks-muted` | `#56636A` | Thank-you date line |

The invitation's envelope tokens remain in `src/index.css`. The seating page uses paper, ink, muted ink, and hairline rules, with no status colors or decorative gold needed for a guest lookup. The thank-you page declares its own tokens in `src/thank-you/thank-you.css` and does not load `src/index.css`; its block is one SVG data URI in concrete, with a `#B9AE9C` joint line at 55% opacity around each opening.

## 3. Typography

| Role | Face | Size | Line height | Usage |
| --- | --- | --- | --- | --- |
| Script | Great Vibes | Existing responsive scale | 1.2 | Invitation |
| Display | Playfair Display, Georgia, serif | `clamp(2.5rem, 6vw, 4rem)` | 1.14 | Seating title |
| Name | Playfair Display, Georgia, serif | `1.125rem` to `1.25rem` | 1.4 | Guest names |
| Table | Lato, sans-serif | `1.125rem` to `1.25rem` | 1.4 | Table assignment |
| Body | Lato, sans-serif | `1rem` | 1.5 | Instructions and input |
| Small label | Lato, sans-serif | `0.875rem` | 1.4 | Search label and letter groups |
| Plaque title | Playfair Display, Georgia, serif | `min(16cqw, 64px)` of the plaque | 1 | Thank-you heading |
| Plaque line | Lato 300, sans-serif | `max(14px, min(6.5cqw, 20px))` | 1.35 | Thank-you supporting line |
| Note | Playfair Display, Georgia, serif | `1.1875rem`, `1.3125rem` from 760px | 1.65 | Thank-you note, balanced wrap |
| Signature | Great Vibes | `2.75rem`, `3.25rem` from 760px | 1.1 | Thank-you names |

The three existing font families are retained because the invitation uses each for a distinct purpose. The seating bundle only needs Playfair Display and Lato glyphs; its page does not render script text. The thank-you page self-hosts only the Latin subsets it renders (Playfair Display 400, Lato 300 and 400, Great Vibes 400) from Fontsource instead of the Google Fonts import, and preloads the plaque's two faces so its first paint is not a fallback font.

## 4. Spacing & Layout

The base unit is `4px`; page spacing uses 16, 24, 32, 48, and 64px steps. The seating column is at most 704px wide. Mobile gutters are 24px, increasing to 32px on wider screens. The page is a single vertical stack. The search field precedes results; letter headings and separators preserve scanability when the complete list is visible.

The thank-you wall fills the first screen (`100svh`, at least 560px). Its geometry lives in `src/thank-you/wallLayout.js`: block sizes and positions are whole pixels, the 6 by 9 block window and the 6 by 4 block plaque sit on the block grid with at least one row of wall above and below, and the wall face ends on a whole row. Below 320px viewport width, the plaque grows to 6 by 6 blocks so its text and button fit. Narrow screens stack the window above the plaque; screens at least 760px wide and wider than 1.15:1 put them side by side, one block apart. Below the wall, the note column is at most 34rem and centered. The gallery is at most 1080px wide with 16px gutters (32px from 760px): on phones photo 2 runs full width above photos 3 and 4, and from 760px all three sit in a row. Columns are sized so the 2:3 photos and the 9:16 guest photo share one height, and the guest photo is never cropped.

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

### Breeze-block wall

- **Structure:** tiled wall face; a plaque with the `Thank you` heading, the supporting line, and a round `Continue` button; a window of 54 blocks over photo 1.
- **States:** closed until photo 1 loads or fails to load, opening, open. A tap on the wall while it opens skips to open; `Open the wall again` in the footer replays it.
- **Accessibility:** the blocks are hidden from assistive technology; `Continue` is 44px and moves focus to the note; replay returns focus to `Continue`.
- **Motion:** see section 6.

### Note and photos

- **Structure:** date, the couple's note, sign-off, and names; then photos 2 to 4 as AVIF with a WebP fallback, lazy-loaded, each with descriptive alt text.
- **Motion:** none.

## 6. Motion & Interaction

Search updates immediately as the guest types. Its clear control returns to the full directory. The only transition is a `150ms` ink or opacity change for focus/hover/press feedback; `prefers-reduced-motion: reduce` removes it. The existing invitation animation retains its own easing tokens and behavior. The seating route never loads it.

The thank-you wall is that page's one motion moment. Beginning 1.1s after photo 1 loads or fails to load, each window block turns edge-on like a louver (`perspective(420px) rotateY(88deg)`, 720ms, `cubic-bezier(0.65, 0, 0.35, 1)`, fading over the last 35%) in a wave from the window's centre, 150ms later per block of distance. Photo 1 settles from 1.08 to 1 over 2.6s with the card-reveal easing. Only transform and opacity animate, through Framer Motion variants that run on the compositor. With reduced motion the blocks fade together in 240ms, the photo does not zoom, and `Continue` jumps to the note instead of scrolling smoothly.

## 7. Depth & Surface

The seating page uses a **borders-only** strategy: a restrained rule around the input and hairline separators between directory rows. No cards or drop shadows. The existing invitation's card and envelope shadows are unchanged. The thank-you page has no shadows either: depth comes from the wall's openings over the darker wall shadow and the plaque's inset hairline.

## 8. Accessibility Constraints & Accepted Debt

Target WCAG 2.2 AA for the new seating page: readable contrast, visible keyboard focus, labeled input, semantic grouping, no automatic focus, and touch-friendly clear control. The search is a convenience; the complete alphabetical list remains available without typing.

No accepted debt for the seating page. Source transcription accuracy is verified separately before publication.

The thank-you page targets the same WCAG 2.2 AA bar: its opening finishes in under 4 seconds and can be skipped, reduced motion is honored, every control is reachable by keyboard with visible focus, and every photo has descriptive alt text. No accepted debt.
