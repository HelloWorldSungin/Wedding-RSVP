# Wedding E-Invite - Product Requirements Document

## 1. Executive Summary

The Wedding E-Invite is an animated electronic wedding invitation landing page for Sungin & Diane's wedding on September 19, 2026. Inspired by Paperless Post's elegant envelope animation, this single-page web application delivers a delightful, interactive experience when guests receive the wedding invitation link.

The core experience features a realistic envelope that opens on tap/click, revealing a beautifully designed invitation card that slides out and rotates into view. The card displays engagement photos, wedding details, and provides quick access to essential links including the RSVP form (Google Forms), wedding website, gift registry, and venue directions.

**MVP Goal:** Create a polished, responsive e-invite landing page with smooth envelope animation that works beautifully on all devices and can be easily shared via text, email, or social media.

---

## 2. Mission

**Mission Statement:** Deliver a memorable, elegant digital invitation experience that captures the excitement of opening a physical wedding invitation while providing convenient access to all wedding-related information.

**Core Principles:**
1. **Elegance First** - Every interaction should feel refined and special
2. **Mobile-First Design** - Most guests will view on phones; optimize for touch
3. **Performance** - Animations must be smooth (60fps) and page load fast (<3s)
4. **Accessibility** - Readable text, sufficient contrast, works without animation if needed
5. **Simplicity** - One clear purpose: delight guests and provide wedding info

---

## 3. Target Users

### Primary Persona: Wedding Guest
- **Demographics:** Friends and family of Sungin & Diane, ages 20-70
- **Technical Comfort:** Varies widely; must work for tech-savvy and non-tech-savvy users
- **Primary Device:** Mobile phone (70%), with tablet and desktop as secondary
- **Context:** Receiving invitation link via text message, email, or social media

### Key User Needs
- Quick, intuitive interaction (tap to open)
- Clear wedding details (date, time, location)
- Easy access to RSVP form
- Works reliably on their device
- Shareable with others in household

### Pain Points to Address
- Small text on mobile devices
- Slow-loading pages on cellular networks
- Confusing navigation or too many clicks
- Animations that don't work on older devices

---

## 4. MVP Scope

### In Scope

**Core Functionality**
- ✅ Animated envelope that opens on click/tap
- ✅ Invitation card slides out and rotates 90° clockwise
- ✅ Display 3 engagement photos in elegant layout
- ✅ Show wedding details (names, date, time, venue, address)
- ✅ Replay animation button
- ✅ 4 action buttons: RSVP Form, Wedding Website, Gift Registry, Directions

**Design & UX**
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Elegant typography (serif + script fonts)
- ✅ Cream/beige color palette matching Paperless Post aesthetic
- ✅ Smooth 60fps animations
- ✅ Touch-friendly tap targets (minimum 44px)

**Technical**
- ✅ React 18 + Vite frontend
- ✅ Tailwind CSS styling
- ✅ Framer Motion animations
- ✅ Environment variables for configurable links
- ✅ Static site (no backend required)

**Deployment**
- ✅ Production build optimization
- ✅ Vercel deployment
- ✅ Meta tags for link previews (Open Graph)

### Out of Scope

**Features Deferred**
- ❌ Guest RSVP tracking (using Google Forms instead)
- ❌ Guest authentication or unique invite codes
- ❌ Admin dashboard
- ❌ Multiple language support
- ❌ Background music/audio
- ❌ Photo gallery beyond the 3 card photos
- ❌ Countdown timer
- ❌ Guestbook or comments

**Technical Deferred**
- ❌ Backend API
- ❌ Database
- ❌ Analytics tracking
- ❌ A/B testing
- ❌ Custom domain setup (can be added post-MVP)

---

## 5. User Stories

### Primary User Stories

**US-1: View Invitation**
> As a wedding guest, I want to tap on the envelope to see it open, so that I experience the joy of opening a real invitation.

*Example:* Guest receives text with link, opens in browser, sees closed envelope, taps it, watches envelope flap open and card rise out with smooth animation.

**US-2: See Wedding Details**
> As a wedding guest, I want to clearly see the wedding date, time, and location, so that I can save the date and plan my attendance.

*Example:* After animation completes, guest sees: "Saturday, September 19, 2026 • 4:00 PM PDT • Hart & Main • 24217 Main St, Santa Clarita, CA 91321"

**US-3: Access RSVP Form**
> As a wedding guest, I want to quickly access the RSVP form, so that I can confirm my attendance.

*Example:* Guest taps "RSVP" button, Google Form opens in new tab with RSVP questions.

**US-4: Get Directions**
> As a wedding guest, I want to get directions to the venue, so that I can plan my travel.

*Example:* Guest taps "Directions" button, Google Maps opens with Hart & Main as destination.

**US-5: View on Phone**
> As a mobile user, I want the invitation to look beautiful on my phone, so that I have a premium experience regardless of device.

*Example:* Guest opens link on iPhone, envelope and card are perfectly sized, text is readable, buttons are easy to tap.

**US-6: Replay Animation**
> As an impressed guest, I want to replay the envelope animation, so that I can enjoy it again or show others.

*Example:* Guest taps "Replay" button, card slides back into envelope, envelope closes, then animation replays from beginning.

**US-7: Access Registry**
> As a wedding guest, I want to access the gift registry, so that I can purchase a gift the couple wants.

*Example:* Guest taps "Registry" button, registry website opens in new tab.

**US-8: View Wedding Website**
> As a wedding guest, I want to access the full wedding website, so that I can see more details about the event.

*Example:* Guest taps "Wedding Website" button, main wedding website opens in new tab.

---

## 6. Core Architecture & Patterns

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Static Web App                        │
│  ┌─────────────────────────────────────────────────┐    │
│  │                   App.jsx                        │    │
│  │         (Animation State Controller)             │    │
│  │  ┌─────────────┐    ┌─────────────────────┐     │    │
│  │  │  Envelope   │───▶│    InviteCard       │     │    │
│  │  │  Component  │    │  ┌───────┬────────┐ │     │    │
│  │  └─────────────┘    │  │Photos │Details │ │     │    │
│  │                     │  └───────┴────────┘ │     │    │
│  │                     │  ┌────────────────┐ │     │    │
│  │                     │  │ ActionButtons  │ │     │    │
│  │                     │  └────────────────┘ │     │    │
│  │                     └─────────────────────┘     │    │
│  └─────────────────────────────────────────────────┘    │
│                           │                              │
│                    Framer Motion                         │
│                  (Animation Engine)                      │
└─────────────────────────────────────────────────────────┘
                           │
                    Vercel (CDN)
                           │
              ┌────────────┴────────────┐
              ▼            ▼            ▼
           Mobile       Tablet      Desktop
```

### Directory Structure

```
wedding-invite/
├── src/
│   ├── components/
│   │   ├── Envelope.jsx         # Envelope with open/close animation
│   │   ├── EnvelopeFlap.jsx     # Top flap with 3D rotation
│   │   ├── InviteCard.jsx       # Main card container
│   │   ├── PhotoStack.jsx       # 3 photos vertical layout
│   │   ├── WeddingDetails.jsx   # Names, date, venue text
│   │   ├── ActionButtons.jsx    # 4 link buttons
│   │   └── ReplayButton.jsx     # Reset animation button
│   ├── assets/
│   │   └── photos/
│   │       ├── photo1.jpg       # Engagement photo 1
│   │       ├── photo2.jpg       # Engagement photo 2 (rings)
│   │       └── photo3.jpg       # Engagement photo 3
│   ├── hooks/
│   │   └── useAnimationState.js # Animation state machine
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + fonts
├── public/
│   ├── favicon.ico
│   └── og-image.jpg             # Social sharing preview image
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env                         # Link URLs
└── .env.example                 # Template for env vars
```

### Key Design Patterns

**1. State Machine for Animation**
```javascript
// Animation states: idle → opening → revealing → complete
const states = {
  IDLE: 'idle',           // Envelope closed, waiting for click
  OPENING: 'opening',     // Flap rotating open
  REVEALING: 'revealing', // Card sliding up and rotating
  COMPLETE: 'complete'    // Card displayed, replay available
};
```

**2. Component Composition**
- Small, focused components
- Props for customization
- Framer Motion variants for animations

**3. CSS-in-Tailwind**
- Utility-first styling
- Custom theme colors
- Responsive breakpoints (sm, md, lg)

**4. Environment-Based Configuration**
- All URLs in `.env` file
- Easy to update without code changes

---

## 7. Features

### Feature 1: Envelope Animation

**Purpose:** Create the "opening a real invitation" experience

**Behavior:**
1. Initial state: Closed envelope centered on screen
2. On click/tap: Top flap rotates up (3D transform, 0.5s)
3. Card begins rising from inside envelope
4. Envelope fades/scales down as card takes focus

**Technical Implementation:**
```jsx
// Envelope flap rotation
const flapVariants = {
  closed: { rotateX: 0 },
  open: {
    rotateX: -180,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};
```

### Feature 2: Card Reveal Animation

**Purpose:** Dramatic presentation of the invitation card

**Behavior:**
1. Card rises from envelope (translateY, 0.5s)
2. Card rotates 90° clockwise (rotate, 1s)
3. Card settles at slight angle (~5°) with shadow
4. Replay button fades in

**Technical Implementation:**
```jsx
const cardVariants = {
  hidden: { y: 200, opacity: 0, rotate: -90 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 5,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] // Custom easing
    }
  }
};
```

### Feature 3: Invitation Card Display

**Purpose:** Show wedding details in elegant layout

**Layout (Desktop):**
```
┌──────────────────────────────────────────┐
│  ┌──────────┐                            │
│  │  Photo 1 │    S A V E                 │
│  └──────────┘                            │
│  ┌──────────┐      the                   │
│  │  Photo 2 │                            │
│  └──────────┘    D A T E                 │
│  ┌──────────┐                            │
│  │  Photo 3 │    Sungin & Diane          │
│  └──────────┘    09.19.26                │
│                  HART & MAIN             │
│                  Invitation to follow     │
└──────────────────────────────────────────┘
```

**Layout (Mobile):**
- Photos stack horizontally or reduce to 2
- Text below photos
- Full-width buttons

### Feature 4: Action Buttons

**Purpose:** Quick access to wedding resources

**Buttons:**
| Button | Icon | Action |
|--------|------|--------|
| RSVP | ✉️ | Opens Google Form |
| Website | 🌐 | Opens wedding website |
| Registry | 🎁 | Opens gift registry |
| Directions | 📍 | Opens Google Maps |

**Styling:**
- Elegant, minimal design
- Hover/tap states
- Opens in new tab (`target="_blank"`)

### Feature 5: Replay Animation

**Purpose:** Allow guests to re-experience the animation

**Behavior:**
1. "Replay" button appears after animation completes
2. On click: Card animates back into envelope
3. Envelope closes
4. Brief pause, then auto-triggers open animation

---

## 8. Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool & dev server |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.x | Utility-first CSS |
| PostCSS | 8.x | CSS processing |
| Autoprefixer | 10.x | Browser compatibility |

### Animation
| Technology | Version | Purpose |
|------------|---------|---------|
| Framer Motion | 11.x | Animation library |

### Fonts (Google Fonts)
| Font | Style | Usage |
|------|-------|-------|
| Great Vibes | Script | Names |
| Playfair Display | Serif | "Save the Date" |
| Lato | Sans-serif | Details, buttons |

### Build & Deployment
| Technology | Purpose |
|------------|---------|
| Vite | Production bundling |
| Vercel | Hosting & CDN |

### Development Dependencies
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0"
  }
}
```

### AI Development Tools

**Frontend Design Skill (`/frontend-design`)**
- Use for creating distinctive, production-grade UI components
- Ensures high design quality that avoids generic AI aesthetics
- Apply when building: Envelope, InviteCard, ActionButtons, responsive layouts

**Context7 MCP (Documentation & Best Practices)**
- Fetch up-to-date documentation for all libraries
- Query patterns: `resolve-library-id` → `query-docs`
- Use for: Framer Motion animations, Tailwind patterns, React best practices, Vite configuration

**Key Context7 Queries:**
| Library | Query |
|---------|-------|
| Framer Motion | "animation variants orchestration stagger sequences" |
| Framer Motion | "useAnimation hook controlling animation sequence" |
| Tailwind CSS | "responsive design breakpoints mobile-first" |
| Tailwind CSS | "custom theme colors fonts configuration" |
| React | "state machine pattern animation states" |
| Vite | "image optimization static assets handling" |

---

## 9. Security & Configuration

### Configuration Management

**Environment Variables (.env):**
```bash
# Wedding Information Links
VITE_RSVP_URL=https://forms.google.com/your-form-id
VITE_WEDDING_WEBSITE_URL=https://your-wedding-website.com
VITE_REGISTRY_URL=https://your-registry-url.com
VITE_DIRECTIONS_URL=https://maps.google.com/?q=Hart+and+Main+24217+Main+St+Santa+Clarita+CA

# Optional: Analytics (future)
# VITE_GA_ID=G-XXXXXXXXXX
```

**Accessing in React:**
```javascript
const RSVP_URL = import.meta.env.VITE_RSVP_URL;
```

### Security Scope

**In Scope:**
- ✅ All external links open in new tabs with `rel="noopener noreferrer"`
- ✅ No user input (no forms, no data collection)
- ✅ No cookies or local storage
- ✅ CSP headers via Vercel config
- ✅ HTTPS only (enforced by Vercel)

**Out of Scope:**
- ❌ Authentication (not needed)
- ❌ API security (no API)
- ❌ User data protection (no user data collected)

### Deployment Configuration

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 10. API Specification

*Not applicable - this is a static frontend application with no backend API.*

External services used:
- **Google Forms** - RSVP collection (external)
- **Google Maps** - Directions (external link)
- **Wedding Website** - Additional details (external link)
- **Registry** - Gift registry (external link)

---

## 11. Success Criteria

### MVP Success Definition
The MVP is successful when a guest can:
1. Open the link on any device
2. Experience the envelope animation
3. View wedding details clearly
4. Access all 4 action links
5. Replay the animation

### Functional Requirements
- ✅ Envelope opens on click/tap
- ✅ Card slides out and rotates smoothly
- ✅ All 3 photos display correctly
- ✅ Wedding details are readable
- ✅ All 4 buttons link to correct URLs
- ✅ Replay button works
- ✅ Page loads in under 3 seconds
- ✅ Works on iOS Safari, Android Chrome, Desktop Chrome

### Quality Indicators
| Metric | Target |
|--------|--------|
| Animation FPS | 60fps (no jank) |
| Page Load (3G) | < 3 seconds |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |
| Mobile Usability | 100% (Google) |

### User Experience Goals
- First-time visitors understand to tap the envelope
- Animation feels smooth and premium
- Text is readable without zooming
- Buttons are easy to tap on mobile
- Overall impression: elegant, special, memorable

---

## 12. Implementation Phases

### Phase 1: Project Setup & Foundation
**Goal:** Initialize project with all dependencies and basic structure

**Deliverables:**
- ✅ Checkout workshop branch, create feature branch
- ✅ Initialize Vite + React project
- ✅ Configure Tailwind CSS with custom theme
- ✅ Add Google Fonts
- ✅ Create component file structure
- ✅ Set up environment variables

**Validation:**
- `npm run dev` starts without errors
- Tailwind classes apply correctly
- Fonts load properly

### Phase 2: Core Components & Static Layout
**Goal:** Build all components with static content (no animation yet)

**Tools:** Use `/frontend-design` skill for all visual components. Query Context7 for Tailwind patterns.

**Deliverables:**
- ✅ Envelope component (closed state)
- ✅ InviteCard component with layout
- ✅ PhotoStack with 3 placeholder images
- ✅ WeddingDetails with all text
- ✅ ActionButtons with all 4 links
- ✅ Responsive layouts (mobile, tablet, desktop)

**Validation:**
- All components render correctly
- Layout matches Paperless Post reference
- Responsive breakpoints work
- Links open correctly in new tabs

### Phase 3: Animation Implementation
**Goal:** Add smooth envelope and card animations

**Tools:** Query Context7 for Framer Motion animation patterns, variants, and orchestration.

**Deliverables:**
- ✅ Envelope flap open animation
- ✅ Card rise and rotate animation
- ✅ Animation state machine (idle → opening → revealing → complete)
- ✅ Replay functionality
- ✅ Initial click prompt (visual cue to tap)

**Validation:**
- Animation plays smoothly at 60fps
- Animation sequence timing feels natural
- Replay resets and replays correctly
- Works on touch devices

### Phase 4: Polish & Deployment
**Goal:** Final polish and production deployment

**Deliverables:**
- ✅ Replace placeholder photos with real engagement photos
- ✅ Fine-tune animation timing/easing
- ✅ Add meta tags for social sharing (og:image, og:title)
- ✅ Favicon
- ✅ Production build optimization
- ✅ Deploy to Vercel
- ✅ Test on real devices

**Validation:**
- Production URL loads correctly
- Social preview shows correctly when shared
- Performance meets targets (Lighthouse > 90)
- Tested on: iPhone, Android, iPad, Desktop

---

## 13. Future Considerations

### Post-MVP Enhancements
- **Custom Domain:** Connect a memorable domain (e.g., sunginanddiane.com)
- **Multiple Languages:** Korean translation for family members
- **RSVP Tracking:** Embed form or build custom RSVP with database
- **Photo Gallery:** Additional engagement/couple photos
- **Countdown Timer:** Days until wedding

### Integration Opportunities
- **Google Analytics:** Track visits and button clicks
- **Calendar Integration:** "Add to Calendar" button
- **Social Sharing:** Share buttons for WhatsApp, Facebook, etc.

### Advanced Features (v2)
- **Guest Personalization:** Unique links with guest names
- **Seating Chart:** Interactive table assignments
- **Live Updates:** Real-time event schedule changes
- **Thank You Page:** Post-wedding gratitude message

---

## 14. Risks & Mitigations

### Risk 1: Animation Performance on Old Devices
**Impact:** High - Poor animation could ruin the experience
**Likelihood:** Medium
**Mitigation:**
- Test on older devices during development
- Use CSS transforms (GPU accelerated)
- Provide fallback: skip animation if device can't handle it
- Keep animation simple (no particle effects)

### Risk 2: Large Photo File Sizes
**Impact:** Medium - Slow load times on mobile networks
**Likelihood:** High
**Mitigation:**
- Compress images (target < 100KB each)
- Use WebP format with JPEG fallback
- Lazy load photos after envelope animation
- Set explicit dimensions to prevent layout shift

### Risk 3: Browser Compatibility Issues
**Impact:** Medium - Some guests may have older browsers
**Likelihood:** Medium
**Mitigation:**
- Test on Safari (iOS), Chrome (Android), Firefox, Edge
- Use Autoprefixer for CSS compatibility
- Framer Motion has good browser support
- Provide graceful degradation

### Risk 4: Environment Variable Misconfiguration
**Impact:** Medium - Broken links to RSVP/registry
**Likelihood:** Low
**Mitigation:**
- Create `.env.example` template
- Validate URLs before deployment
- Test all links in production after deploy

### Risk 5: Link Sharing Preview Not Working
**Impact:** Low - Less appealing when shared
**Likelihood:** Medium
**Mitigation:**
- Add comprehensive Open Graph meta tags
- Create attractive og:image (preview of the card)
- Test with Facebook Debugger and Twitter Card Validator

---

## 15. Appendix

### Wedding Details Reference
| Field | Value |
|-------|-------|
| Couple | Sungin & Diane |
| Date | Saturday, September 19, 2026 |
| Time | 4:00 PM PDT |
| Venue | Hart & Main |
| Address | 24217 Main St, Santa Clarita, CA 91321 |

### Design Reference
- **Inspiration:** [Paperless Post Example](https://www.paperlesspost.com/go/7DLxQppszWbP73FvENZ5v)
- **Color Palette:** Cream (#FAF9F6), Beige (#F5F5DC), Charcoal (#36454F)
- **Typography:** Great Vibes (script), Playfair Display (serif), Lato (sans)

### Repository Structure
Based on workshop branch: `origin/workshop`
- Claude commands in `.claude/commands/`
- Reference docs in `.claude/reference/`
- PRD in `.claude/PRD.md`

### Key Dependencies
| Package | Documentation |
|---------|--------------|
| Framer Motion | https://www.framer.com/motion/ |
| Tailwind CSS | https://tailwindcss.com/docs |
| Vite | https://vitejs.dev/guide/ |
| React | https://react.dev/ |

### AI Development Tools
| Tool | Purpose | When to Use |
|------|---------|-------------|
| `/frontend-design` skill | Production-grade UI design | Building visual components (Phase 2) |
| Context7 MCP | Up-to-date library documentation | Before implementing any library feature |
| Context7: `resolve-library-id` | Find library ID for queries | First step before querying docs |
| Context7: `query-docs` | Get specific implementation patterns | Animation, styling, configuration tasks |
