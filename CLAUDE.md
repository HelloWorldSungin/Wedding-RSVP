# Wedding E-Invite

Animated electronic wedding invitation with envelope opening animation for Sungin & Diane's wedding on September 19, 2026 at Hart & Main, Santa Clarita CA.

## Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, Framer Motion 11
- **Fonts**: Google Fonts (Great Vibes, Playfair Display, Lato)
- **Deployment**: Vercel (static site)
- **Backend**: N/A (static frontend only)
- **Database**: N/A (no data persistence)

## Project Structure

```
wedding-invite/
├── src/
│   ├── components/
│   │   ├── Envelope.jsx         # Envelope with open/close animation
│   │   ├── EnvelopeFlap.jsx     # Top flap with 3D rotation
│   │   ├── InviteCard.jsx       # Main card container
│   │   ├── PhotoStack.jsx       # 3 photos vertical layout
│   │   ├── WeddingDetails.jsx   # Names, date, venue text
│   │   ├── ActionButtons.jsx    # 4 link buttons (RSVP, Website, Registry, Directions)
│   │   └── ReplayButton.jsx     # Reset animation button
│   ├── assets/
│   │   └── photos/              # Engagement photos
│   ├── hooks/
│   │   └── useAnimationState.js # Animation state machine
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + fonts
├── public/
│   ├── favicon.ico
│   └── og-image.jpg             # Social sharing preview
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                         # Link URLs (RSVP, registry, etc.)
└── .claude/
    ├── PRD.md                   # Product requirements
    └── reference/               # Implementation guides
```

## Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## MCP Servers

**Context7 MCP** for up-to-date library documentation:
- Use `resolve-library-id` then `query-docs` for Framer Motion, Tailwind, React patterns

## Reference Documentation

| Document | When to Read |
|----------|--------------|
| `.claude/PRD.md` | Understanding requirements, features, animation specs, user stories |
| `.claude/reference/implementation-plan.md` | Phase-by-phase implementation guidance |

## Code Conventions

### React Components
- Functional components with hooks only
- Small, focused components with single responsibility
- Props for customization, avoid prop drilling
- Use `import.meta.env.VITE_*` for environment variables

### Tailwind CSS
- Mobile-first responsive design (sm, md, lg breakpoints)
- Custom theme colors: Cream (#FAF9F6), Beige (#F5F5DC), Charcoal (#36454F)
- Utility-first approach, avoid custom CSS when possible

### Framer Motion
- Use variants for animation definitions
- Animation state machine: `idle -> opening -> revealing -> complete`
- Custom easing for premium feel: `[0.16, 1, 0.3, 1]`
- Target 60fps animations using CSS transforms (GPU accelerated)

### Links & Security
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- All configurable URLs in `.env` file with `VITE_` prefix

## Environment Variables

```bash
# .env
VITE_RSVP_URL=https://forms.google.com/your-form-id
VITE_WEDDING_WEBSITE_URL=https://your-wedding-website.com
VITE_REGISTRY_URL=https://your-registry-url.com
VITE_DIRECTIONS_URL=https://maps.google.com/?q=Hart+and+Main+24217+Main+St+Santa+Clarita+CA
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Animation FPS | 60fps |
| Page Load (3G) | < 3 seconds |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| Image Size | < 100KB each |
