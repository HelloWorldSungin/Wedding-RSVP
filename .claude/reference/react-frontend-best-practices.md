# React Frontend Best Practices Reference

A concise reference guide for building modern React applications with Vite, Tailwind CSS, and Framer Motion.

> **Updated via Context7 MCP** - Latest patterns from official documentation (January 2025)

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Component Design](#2-component-design)
3. [State Management](#3-state-management)
4. [Framer Motion Animations](#4-framer-motion-animations)
5. [Styling with Tailwind](#5-styling-with-tailwind)
6. [Vite Configuration](#6-vite-configuration)
7. [Performance](#7-performance)
8. [Hooks Patterns](#8-hooks-patterns)
9. [Accessibility](#9-accessibility)
10. [Anti-Patterns](#10-anti-patterns)

---

## 1. Project Structure

### Component-Based Structure (For Single-Page Apps)

```
src/
├── components/
│   ├── Envelope.jsx           # Envelope with open animation
│   ├── EnvelopeFlap.jsx       # Top flap with 3D rotation
│   ├── InviteCard.jsx         # Main card container
│   ├── PhotoStack.jsx         # Photos vertical layout
│   ├── WeddingDetails.jsx     # Names, date, venue text
│   ├── ActionButtons.jsx      # Link buttons
│   └── ReplayButton.jsx       # Reset animation button
├── hooks/
│   └── useAnimationState.js   # Animation state machine
├── assets/
│   └── photos/                # Images
├── App.jsx                    # Main app component
├── main.jsx                   # React entry point
└── index.css                  # Tailwind + fonts
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `InviteCard.jsx` |
| Hooks | camelCase, `use` prefix | `useAnimationState.js` |
| Utilities | camelCase | `formatDate.js` |
| Constants | SCREAMING_SNAKE_CASE | `ANIMATION_DURATION` |

---

## 2. Component Design

### Functional Components

```jsx
// Simple component with props
function PhotoStack({ photos, className = '' }) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Photo ${index + 1}`}
          className="rounded-lg shadow-md object-cover"
        />
      ))}
    </div>
  );
}

// With default props
function ActionButton({ href, children, icon, variant = 'primary' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  );
}
```

### Component Composition

```jsx
// Compound components pattern
function Card({ children, className }) {
  return (
    <div className={`bg-cream rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
}

Card.Photos = function CardPhotos({ children }) {
  return <div className="w-2/5 p-4">{children}</div>;
};

Card.Details = function CardDetails({ children }) {
  return <div className="w-3/5 p-6">{children}</div>;
};

// Usage
<Card className="rotate-5">
  <Card.Photos>
    <PhotoStack photos={photos} />
  </Card.Photos>
  <Card.Details>
    <WeddingDetails />
  </Card.Details>
</Card>
```

### Props Design

```jsx
// Accept className for styling flexibility
function Envelope({ children, isOpen, onClick, className = '' }) {
  return (
    <div
      className={`envelope ${isOpen ? 'open' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Forward refs for animation targets
const InviteCard = forwardRef(function InviteCard({ children }, ref) {
  return (
    <div ref={ref} className="invite-card">
      {children}
    </div>
  );
});
```

---

## 3. State Management

### Animation State Machine

```jsx
// State machine pattern for complex animations
const STATES = {
  IDLE: 'idle',           // Envelope closed
  OPENING: 'opening',     // Flap rotating open
  REVEALING: 'revealing', // Card sliding out
  COMPLETE: 'complete'    // Animation finished
};

function useAnimationState() {
  const [state, setState] = useState(STATES.IDLE);

  const handlers = {
    start: () => setState(STATES.OPENING),
    onFlapOpen: () => setState(STATES.REVEALING),
    onCardRevealed: () => setState(STATES.COMPLETE),
    reset: () => setState(STATES.IDLE),
  };

  return { state, ...handlers };
}

// Usage
function App() {
  const { state, start, onFlapOpen, onCardRevealed, reset } = useAnimationState();

  return (
    <div>
      <Envelope
        isOpen={state !== STATES.IDLE}
        onClick={state === STATES.IDLE ? start : undefined}
        onFlapAnimationComplete={onFlapOpen}
      />
      {state !== STATES.IDLE && (
        <InviteCard onAnimationComplete={onCardRevealed} />
      )}
      {state === STATES.COMPLETE && (
        <ReplayButton onClick={reset} />
      )}
    </div>
  );
}
```

### useState Best Practices

```jsx
// Group related state
const [animation, setAnimation] = useState({
  isOpen: false,
  stage: 'idle',
  progress: 0
});

// Functional updates for state based on previous value
setAnimation(prev => ({ ...prev, isOpen: true }));

// Initialize expensive state lazily
const [photos, setPhotos] = useState(() => loadPhotos());
```

---

## 4. Framer Motion Animations

> **Source:** Context7 query of Motion/Framer Motion official documentation

### Basic Animation

```jsx
import { motion } from 'framer-motion';

// Simple animate prop
<motion.div
  animate={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Animation Variants (Recommended for Complex Sequences)

```jsx
// Define variants for reusable animations
const envelopeFlapVariants = {
  closed: {
    rotateX: 0,
    transformOrigin: 'top center'
  },
  open: {
    rotateX: -180,
    transformOrigin: 'top center',
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

const cardVariants = {
  hidden: {
    y: 200,
    opacity: 0,
    rotate: -90
  },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 5,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] // Custom cubic bezier
    }
  }
};

// Usage with variants
function EnvelopeFlap({ isOpen, onAnimationComplete }) {
  return (
    <motion.div
      className="envelope-flap"
      variants={envelopeFlapVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      onAnimationComplete={onAnimationComplete}
      style={{ perspective: 1000 }}
    />
  );
}
```

### Staggered Children Animations

```jsx
import { motion, stagger } from 'framer-motion';

// Parent controls children timing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // Delay between each child
      delayChildren: 0.3         // Initial delay before first child
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function ActionButtons({ links }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {links.map((link, i) => (
        <motion.a
          key={i}
          href={link.url}
          variants={itemVariants}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
```

### useAnimate Hook for Imperative Control

```jsx
import { useAnimate } from 'framer-motion';

function EnvelopeAnimation() {
  const [scope, animate] = useAnimate();

  const playSequence = async () => {
    // Sequential animations
    await animate('.envelope-flap', { rotateX: -180 }, { duration: 0.5 });
    await animate('.invite-card', { y: 0, opacity: 1 }, { duration: 0.8 });
    await animate('.invite-card', { rotate: 5 }, { duration: 0.5 });
  };

  return (
    <div ref={scope} onClick={playSequence}>
      <div className="envelope-flap" />
      <div className="invite-card" style={{ opacity: 0, y: 100 }} />
    </div>
  );
}
```

### stagger() Function for Multiple Elements

```jsx
import { animate, stagger } from 'framer-motion';

// Stagger with options
animate(
  '.button',
  { opacity: 1, y: 0 },
  {
    delay: stagger(0.1, {
      startDelay: 0.5,    // Wait before starting
      from: 'center'      // Start from center outward
    })
  }
);

// Available 'from' options: 'first', 'center', 'last', or numeric index
```

### Custom Data with Variants

```jsx
// Pass custom data to dynamic variant functions
const photoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.2 }  // Each photo delays based on index
  })
};

function PhotoStack({ photos }) {
  return (
    <motion.div initial="hidden" animate="visible">
      {photos.map((photo, index) => (
        <motion.img
          key={index}
          src={photo}
          custom={index}  // Pass index to variant
          variants={photoVariants}
        />
      ))}
    </motion.div>
  );
}
```

### 3D Transforms

```jsx
// For envelope flap 3D rotation
<motion.div
  style={{
    perspective: 1000,           // Enable 3D space
    transformStyle: 'preserve-3d'
  }}
>
  <motion.div
    animate={{ rotateX: isOpen ? -180 : 0 }}
    style={{ transformOrigin: 'top center' }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
  />
</motion.div>

// Custom transform order with transformTemplate
<motion.div
  style={{ x: 0, rotate: 180 }}
  transformTemplate={
    ({ x, rotate }) => `rotate(${rotate}deg) translateX(${x}px)`
  }
/>
```

### AnimatePresence for Exit Animations

```jsx
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showCard, setShowCard] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showCard ? (
        <motion.div
          key="envelope"
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <Envelope onClick={() => setShowCard(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <InviteCard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 5. Styling with Tailwind

> **Source:** Context7 query of Tailwind CSS v3 documentation

### Custom Theme Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Custom breakpoints
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    },
    extend: {
      // Custom colors for wedding theme
      colors: {
        'cream': '#FAF9F6',
        'beige': '#F5F5DC',
        'charcoal': '#36454F',
        'gold': '#D4AF37',
      },
      // Custom fonts
      fontFamily: {
        'script': ['Great Vibes', 'cursive'],
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      // Custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
      },
      // Custom rotation for card tilt
      rotate: {
        '5': '5deg',
      },
    },
  },
  plugins: [],
};
```

### Custom Keyframe Animations

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
    },
  },
};

// Usage in JSX
<div className="animate-fade-in-up">Content</div>
<div className="animate-pulse-soft">Tap to open</div>
```

### CSS File Setup

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600&family=Lato:wght@300;400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cream text-charcoal font-sans;
  }
}

@layer components {
  .btn {
    @apply px-6 py-3 rounded-full font-medium transition-all duration-300;
    @apply hover:scale-105 active:scale-95;
  }

  .btn-primary {
    @apply bg-charcoal text-cream hover:bg-charcoal/90;
  }

  .btn-outline {
    @apply border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream;
  }
}
```

### Responsive Design (Mobile-First)

```jsx
// Mobile-first approach
<div className="
  p-4 md:p-6 lg:p-8
  text-base md:text-lg
  grid grid-cols-1 md:grid-cols-2
  gap-4 md:gap-6
">
  {/* Content */}
</div>

// Responsive card layout
<div className="
  w-full max-w-sm md:max-w-md lg:max-w-lg
  mx-auto
  rotate-0 md:rotate-5
">
  <InviteCard />
</div>

// Breakpoints: sm(480px) md(768px) lg(1024px) xl(1440px)
```

### Hover and Interactive States

```jsx
// Hover effects
<button className="
  bg-charcoal text-cream
  hover:bg-charcoal/80
  hover:scale-105
  hover:-translate-y-1
  transition-all duration-300
">
  RSVP
</button>

// Active/pressed state
<button className="active:scale-95 active:bg-charcoal/70">
  Click me
</button>

// Focus states for accessibility
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-gold
  focus:ring-offset-2
">
  Focus me
</button>
```

---

## 6. Vite Configuration

> **Source:** Context7 query of Vite official documentation

### Basic Setup with React

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
```

### Environment Variables

```bash
# .env
VITE_RSVP_URL=https://forms.google.com/your-form-id
VITE_WEDDING_WEBSITE_URL=https://your-wedding-website.com
VITE_REGISTRY_URL=https://your-registry-url.com
VITE_DIRECTIONS_URL=https://maps.google.com/?q=...

# .env.production (overrides for production)
VITE_APP_TITLE=Sungin & Diane Wedding
```

```jsx
// Accessing in React
const rsvpUrl = import.meta.env.VITE_RSVP_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;

function ActionButtons() {
  return (
    <a href={import.meta.env.VITE_RSVP_URL}>RSVP</a>
  );
}
```

### Static Assets

```jsx
// Images in src/assets (processed by Vite)
import photo1 from './assets/photos/photo1.jpg';
<img src={photo1} alt="Engagement photo" />

// Images in public folder (copied as-is)
<img src="/og-image.jpg" alt="Preview" />

// Dynamic imports
const photos = import.meta.glob('./assets/photos/*.jpg', { eager: true });
```

### Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
});
```

---

## 7. Performance

### React.memo for Animation Components

```jsx
// Memoize components that don't need to re-render
const PhotoStack = memo(function PhotoStack({ photos }) {
  return (
    <div className="photo-stack">
      {photos.map((photo, i) => (
        <img key={i} src={photo} alt="" />
      ))}
    </div>
  );
});

// Custom comparison for props
const WeddingDetails = memo(function WeddingDetails({ date, venue }) {
  return (
    <div>
      <p>{date}</p>
      <p>{venue}</p>
    </div>
  );
}, (prev, next) => {
  return prev.date === next.date && prev.venue === next.venue;
});
```

### useCallback for Event Handlers

```jsx
function App() {
  // Stable function reference for child components
  const handleEnvelopeClick = useCallback(() => {
    startAnimation();
  }, []);

  const handleReplay = useCallback(() => {
    resetAnimation();
  }, []);

  return (
    <>
      <Envelope onClick={handleEnvelopeClick} />
      <ReplayButton onClick={handleReplay} />
    </>
  );
}
```

### Image Optimization

```jsx
// Lazy load images below the fold
<img
  src={photo}
  alt=""
  loading="lazy"
  decoding="async"
/>

// Specify dimensions to prevent layout shift
<img
  src={photo}
  alt=""
  width={300}
  height={400}
  className="object-cover"
/>

// Use WebP with fallback
<picture>
  <source srcSet={photoWebp} type="image/webp" />
  <img src={photoJpg} alt="" />
</picture>
```

### Animation Performance

```jsx
// Use transform instead of top/left (GPU accelerated)
// GOOD
<motion.div animate={{ x: 100, y: 50 }} />

// AVOID
<motion.div animate={{ left: 100, top: 50 }} />

// Use will-change for complex animations
<motion.div
  style={{ willChange: 'transform, opacity' }}
  animate={{ scale: 1.1 }}
/>
```

---

## 8. Hooks Patterns

### Custom Animation State Hook

```javascript
// hooks/useAnimationState.js
import { useState, useCallback } from 'react';

const STATES = {
  IDLE: 'idle',
  OPENING: 'opening',
  REVEALING: 'revealing',
  COMPLETE: 'complete'
};

export function useAnimationState() {
  const [state, setState] = useState(STATES.IDLE);

  const start = useCallback(() => setState(STATES.OPENING), []);
  const onFlapOpen = useCallback(() => setState(STATES.REVEALING), []);
  const onCardRevealed = useCallback(() => setState(STATES.COMPLETE), []);
  const reset = useCallback(() => setState(STATES.IDLE), []);

  return {
    state,
    isIdle: state === STATES.IDLE,
    isAnimating: state === STATES.OPENING || state === STATES.REVEALING,
    isComplete: state === STATES.COMPLETE,
    start,
    onFlapOpen,
    onCardRevealed,
    reset,
  };
}
```

### useMediaQuery Hook

```javascript
// hooks/useMediaQuery.js
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Usage
function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

### useEffect Patterns

```jsx
// Event listeners with cleanup
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') resetAnimation();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [resetAnimation]);

// Preload images
useEffect(() => {
  photos.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, [photos]);
```

---

## 9. Accessibility

### Semantic HTML

```jsx
<main className="min-h-screen flex items-center justify-center">
  <article className="invite-card">
    <header>
      <h1 className="font-script text-4xl">Sungin & Diane</h1>
    </header>
    <section>
      <h2 className="sr-only">Wedding Details</h2>
      <p>Saturday, September 19, 2026</p>
    </section>
    <nav aria-label="Wedding links">
      <a href={rsvpUrl}>RSVP</a>
    </nav>
  </article>
</main>
```

### Interactive Elements

```jsx
// Clickable envelope with keyboard support
function Envelope({ onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Open wedding invitation"
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
    >
      {/* Envelope content */}
    </div>
  );
}
```

### Reduced Motion Support

```jsx
// Respect user's motion preferences
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

<motion.div
  animate={isOpen ? 'open' : 'closed'}
  variants={prefersReducedMotion ? reducedVariants : fullVariants}
/>

// Or disable animations entirely
<motion.div
  animate={{ opacity: 1 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
/>
```

### Screen Reader Announcements

```jsx
// Live region for animation status
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {isComplete && 'Wedding invitation opened. View details below.'}
</div>
```

---

## 10. Anti-Patterns

### Common Mistakes

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Animating layout properties | Poor performance | Use transform (x, y, scale, rotate) |
| Missing key prop | Animation glitches | Use stable unique IDs |
| Inline objects in animate | Re-renders | Use variants or useMemo |
| Giant components | Hard to maintain | Split into smaller pieces |
| Forgetting cleanup | Memory leaks | Always return cleanup in useEffect |

### Code Examples

```jsx
// BAD: Inline animation object (creates new object every render)
<motion.div animate={{ x: 100, opacity: 1 }} />

// GOOD: Use variants or define outside component
const variants = { visible: { x: 100, opacity: 1 } };
<motion.div variants={variants} animate="visible" />

// BAD: Animating width/height (triggers layout)
<motion.div animate={{ width: 300 }} />

// GOOD: Animate transform (GPU accelerated)
<motion.div animate={{ scaleX: 1.5 }} />

// BAD: Missing cleanup
useEffect(() => {
  window.addEventListener('resize', handler);
}, []);

// GOOD: With cleanup
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

---

## Quick Reference

### Framer Motion Imports

```jsx
import {
  motion,           // Animated components
  AnimatePresence,  // Exit animations
  useAnimate,       // Imperative control
  useInView,        // Viewport detection
  stagger           // Staggered delays
} from 'framer-motion';
```

### Common Animation Values

```jsx
// Easing presets
transition: { ease: 'easeInOut' }  // Built-in
transition: { ease: [0.16, 1, 0.3, 1] }  // Custom bezier

// Duration
transition: { duration: 0.5 }  // 500ms

// Delay
transition: { delay: 0.2 }  // 200ms delay

// Spring physics
transition: { type: 'spring', stiffness: 300, damping: 30 }
```

---

## Resources

- [Motion Documentation](https://motion.dev/docs/react-quick-start)
- [React Documentation](https://react.dev/)
- [Tailwind CSS v3](https://v3.tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
