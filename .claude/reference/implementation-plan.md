# Wedding E-Invite Implementation Plan

## Project Overview

Build an animated electronic wedding invitation (e-invite) landing page inspired by Paperless Post. The page features an envelope opening animation with a card that slides out and rotates, displaying wedding details and important links.

**Wedding Details:**
- Couple: Sungin & Diane
- Date: Saturday, September 19, 2026
- Time: 4:00 PM PDT
- Venue: Hart & Main
- Address: 24217 Main St, Santa Clarita, CA 91321

## Requirements Summary

### Core Features
1. **Envelope Animation**: Closed envelope → opens on click/tap → card slides out → rotates 90° clockwise
2. **Card Design**: Replicates Paperless Post layout (3 photos left, text right)
3. **Responsive Design**: Beautiful on mobile, tablet, and desktop
4. **Important Links**: Google Form (RSVP), Wedding Website, Registry, Directions/Map
5. **Cloud Deployment**: Deploy to Vercel for public access

### Design Specifications (from Paperless Post Reference)
- Cream/beige colored card with elegant typography
- 3 engagement photos stacked vertically on left side
- "SAVE the DATE" text arranged vertically on right
- Script font for names
- Card displayed at slight angle with shadow
- Replay animation button
- Envelope backdrop visible after animation

---

## Tech Stack

**Frontend Only** (no backend needed):
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (smooth animations)
- **Fonts**: Google Fonts (elegant serif + script fonts)
- **Deployment**: Vercel

---

## Development Tools & Workflow

### Frontend Design Skill (`/frontend-design`)
Use the `frontend-design` skill for creating distinctive, production-grade UI components:
- Invoke with `/frontend-design` when building visual components
- Generates creative, polished code that avoids generic AI aesthetics
- Ensures high design quality for the envelope, card, and button components
- Best used during Phase 2 (Core Components) and Phase 4 (Responsive Design)

**When to use:**
- Building the Envelope component with realistic appearance
- Creating the InviteCard layout with elegant styling
- Designing ActionButtons with premium hover states
- Polishing responsive layouts for visual impact

### Context7 MCP (`resolve-library-id` + `query-docs`)
Use Context7 to fetch up-to-date documentation and best practices:
- Query latest Framer Motion animation patterns
- Get current Tailwind CSS utility classes and responsive patterns
- Fetch React 18 best practices for state management
- Retrieve Vite configuration examples

**How to use:**
1. First call `resolve-library-id` with the library name (e.g., "framer-motion")
2. Then call `query-docs` with specific questions about implementation

**Key queries to make:**
- "Framer Motion animation variants and orchestration"
- "Tailwind CSS responsive design patterns"
- "React state machine patterns for animation"
- "Vite image optimization and asset handling"

---

## Project Structure

```
wedding-invite/
├── src/
│   ├── components/
│   │   ├── Envelope.jsx       # Envelope component with open animation
│   │   ├── InviteCard.jsx     # The wedding invitation card
│   │   ├── PhotoStack.jsx     # 3 photos stacked vertically
│   │   ├── WeddingDetails.jsx # Text: names, date, venue
│   │   └── ActionButtons.jsx  # Links to Form, Website, Registry, Map
│   ├── assets/
│   │   └── photos/            # Engagement photos (user provided)
│   ├── App.jsx                # Main app with animation orchestration
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind imports + custom fonts
├── public/
│   └── favicon.ico
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env                       # Links configuration
```

---

## Implementation Tasks

### Phase 1: Project Setup

#### Task 1.1: Initialize from Workshop Branch
- Checkout workshop branch
- Create new branch `feature/wedding-invite`
- Initialize Vite + React project in root
- Install dependencies: react, vite, tailwind, framer-motion

```bash
git checkout origin/workshop -b feature/wedding-invite
npm create vite@latest . -- --template react
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Task 1.2: Configure Tailwind & Fonts
- Setup tailwind.config.js with custom colors (cream, beige)
- Add Google Fonts: Playfair Display (serif), Great Vibes (script)
- Configure responsive breakpoints

### Phase 2: Core Components

> **Note:** Use `/frontend-design` skill for all visual components in this phase.
> Use Context7 to query Framer Motion and Tailwind docs before implementation.

#### Task 2.1: Envelope Component
Create animated envelope with:
- Closed state: White/cream envelope with triangular flaps
- Open animation: Top flap lifts up (CSS 3D transform)
- Trigger: onClick/onTap

```jsx
// Key animation states:
// 1. Envelope closed (initial)
// 2. Top flap opens (rotateX)
// 3. Card rises up and out
```

#### Task 2.2: InviteCard Component
Create the wedding card with:
- Cream background with subtle shadow
- Layout: Photos (left 40%) | Text (right 60%)
- Slight rotation (~5°) for visual interest
- Responsive sizing

#### Task 2.3: PhotoStack Component
- 3 photos stacked vertically
- Equal spacing
- Subtle border/shadow
- Responsive image sizing

#### Task 2.4: WeddingDetails Component
- "SAVE the DATE" (vertical text, elegant serif)
- Names in script font
- Date and venue in clean sans-serif
- "Invitation to follow" note

#### Task 2.5: ActionButtons Component
- 4 action links with icons
- Google Form (RSVP)
- Wedding Website
- Gift Registry
- Directions/Map
- Styled as elegant buttons

### Phase 3: Animation Orchestration

> **Note:** Query Context7 for latest Framer Motion patterns:
> - `query-docs`: "Framer Motion animation variants orchestration stagger"
> - `query-docs`: "Framer Motion useAnimation hook sequence control"

#### Task 3.1: Animation Sequence (Framer Motion)
```jsx
// Timeline:
// 0.0s - Page loads, envelope visible
// 0.5s - User clicks envelope
// 0.5s-1.0s - Envelope flap opens (rotateX -180deg)
// 1.0s-1.5s - Card rises up from envelope
// 1.5s-2.5s - Card rotates 90° clockwise, moves to center
// 2.5s - Final position, replay button appears
```

#### Task 3.2: Replay Functionality
- "Replay" button appears after animation completes
- Resets to closed envelope state
- Smooth transition back

### Phase 4: Responsive Design

#### Task 4.1: Mobile Layout (< 768px)
- Full-width envelope/card
- Stacked layout if needed
- Touch-friendly tap targets
- Adjust photo sizes

#### Task 4.2: Tablet Layout (768px - 1024px)
- Centered layout
- Balanced sizing

#### Task 4.3: Desktop Layout (> 1024px)
- Centered with max-width
- Hover effects on buttons
- Larger visual impact

### Phase 5: Polish & Deployment

#### Task 5.1: Final Polish
- Loading state (brief)
- Smooth page transitions
- Meta tags for sharing (og:image, title, description)
- Favicon

#### Task 5.2: Deploy to Vercel
```bash
npm run build
npx vercel --prod
```

#### Task 5.3: Custom Domain (Optional)
- Configure custom domain in Vercel dashboard

---

## Files to Create/Modify

| File | Purpose |
|------|---------|
| `package.json` | Dependencies + scripts |
| `vite.config.js` | Vite configuration |
| `tailwind.config.js` | Tailwind with custom theme |
| `src/index.css` | Tailwind imports + fonts |
| `src/App.jsx` | Main app + animation state |
| `src/components/Envelope.jsx` | Envelope animation |
| `src/components/InviteCard.jsx` | Card container |
| `src/components/PhotoStack.jsx` | Photo display |
| `src/components/WeddingDetails.jsx` | Text content |
| `src/components/ActionButtons.jsx` | Link buttons |
| `CLAUDE.md` | Project instructions |

---

## Environment Variables

```env
# .env
VITE_GOOGLE_FORM_URL=<your-google-form-url>
VITE_WEDDING_WEBSITE_URL=<your-wedding-website>
VITE_REGISTRY_URL=<your-registry-url>
VITE_DIRECTIONS_URL=<google-maps-url>
```

---

## Verification Plan

### Manual Testing
1. **Animation Flow**: Page loads → envelope visible → click → animation plays → card displayed
2. **Replay**: Click replay → animation resets → can replay
3. **Responsive**: Test on mobile (375px), tablet (768px), desktop (1440px)
4. **Links**: All 4 buttons open correct URLs in new tabs
5. **Performance**: Animation smooth (60fps)

### Browser Testing
- Chrome (primary)
- Safari (iOS compatibility)
- Firefox

### Device Testing (using Chrome DevTools)
- iPhone SE (375px)
- iPhone 14 Pro (393px)
- iPad (768px)
- Desktop (1440px)

### Deployment Verification
1. Run `npm run build` - no errors
2. Deploy to Vercel - success
3. Test production URL on real devices

---

## Key Implementation Notes

### Animation Approach (Framer Motion)
```jsx
import { motion, AnimatePresence } from 'framer-motion';

// Use variants for complex sequences
const envelopeVariants = {
  closed: { rotateX: 0 },
  open: { rotateX: -180, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, rotate: 5 }
};
```

### Responsive Images
- Use `object-fit: cover` for consistent photo cropping
- Serve optimized images (consider webp format)
- Use srcset for different screen densities

### Typography
```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600&family=Lato:wght@300;400&display=swap');

/* Usage */
.script-font { font-family: 'Great Vibes', cursive; }
.serif-font { font-family: 'Playfair Display', serif; }
.sans-font { font-family: 'Lato', sans-serif; }
```

---

## Success Criteria

- [ ] Envelope opens with smooth animation on click
- [ ] Card slides out and rotates correctly
- [ ] All 3 photos display properly
- [ ] Wedding details readable and elegant
- [ ] All 4 action buttons work correctly
- [ ] Looks beautiful on mobile, tablet, desktop
- [ ] Animation replay works
- [ ] Successfully deployed to Vercel
- [ ] Page loads quickly (< 3s)
