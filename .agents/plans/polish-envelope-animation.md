# Feature: Polish Envelope Animation

The following plan should be complete, but it's important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils, types, and models. Import from the right files etc.

## Feature Description

Polish the envelope opening animation to create a premium, Paperless Post-inspired experience. This involves:
1. **Realistic 3D flap rotation** - The envelope flap opens with convincing 3D perspective, revealing the back of the flap
2. **Card slide-out with rotation** - The invitation card rises from inside the envelope and rotates into its final viewing position
3. **Smooth, choreographed transitions** - Each animation phase flows naturally into the next with premium easing
4. **Visual depth effects** - Shadows, z-index management, and subtle scale changes create depth

The animation should feel like opening a real physical invitation - elegant, delightful, and memorable.

## User Story

As a wedding guest
I want to experience a beautiful envelope opening animation
So that I feel the excitement and elegance of receiving a real wedding invitation

## Problem Statement

The current animation implementation has basic scaffolding but lacks:
- Convincing 3D perspective on the envelope flap (currently flat-feeling)
- Proper backface rendering for the flap (should show envelope interior when open)
- Natural card emergence timing (card should rise AFTER flap opens sufficiently)
- Premium easing curves that feel organic and delightful
- Shadow and depth effects that sell the 3D illusion
- Smooth envelope fade/scale as card takes focus

## Solution Statement

Refine the existing Framer Motion animation system with:
1. **Enhanced 3D transforms** - Use `perspective`, `transformStyle: preserve-3d`, and proper `rotateX` values
2. **Backface visibility management** - Show envelope interior when flap is open
3. **Choreographed timing** - Sequence animations with delays so flap opens before card rises
4. **Premium easing** - Use custom cubic-bezier curves that feel natural (`[0.16, 1, 0.3, 1]` for reveals, spring physics for bouncy elements)
5. **Shadow choreography** - Animate shadows to enhance depth perception
6. **Z-index layering** - Ensure proper stacking during all animation phases

## Feature Metadata

**Feature Type**: Enhancement
**Estimated Complexity**: Medium
**Primary Systems Affected**: `EnvelopeFlap.jsx`, `InviteCard.jsx`, `Envelope.jsx`, `useAnimationState.js`
**Dependencies**: Framer Motion 12.x (already installed)

---

## CONTEXT REFERENCES

### Relevant Codebase Files - IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

- `src/components/EnvelopeFlap.jsx` (all) - Why: Main flap animation to enhance, contains existing 3D transform setup
- `src/components/Envelope.jsx` (all) - Why: Parent container with perspective, needs shadow and fade enhancements
- `src/components/InviteCard.jsx` (all) - Why: Card reveal animation to refine, timing coordination
- `src/hooks/useAnimationState.js` (all) - Why: State machine controlling animation sequence
- `src/App.jsx` (all) - Why: Main orchestration, passes callbacks between components
- `src/index.css` (lines 1-57) - Why: Custom theme with easing functions and shadow definitions

### New Files to Create

None - this is a refinement of existing components

### Relevant Documentation - YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [Framer Motion Transforms](https://motion.dev/docs/react-motion-component) - Transform ordering with `transformTemplate`
- [Framer Motion Transitions](https://motion.dev/docs/react-transitions) - Easing functions, spring animations
- [CSS 3D Envelope Animation](https://codewebstack.com/3d-envelope-animation-using-html-css/) - Reference for envelope animation patterns
- [CSS Greeting Card Animation](https://tammyritterskamp.com/how-to-make-css-greeting-card/) - Perspective, backface-visibility techniques

### Patterns to Follow

**Existing Animation State Machine** (from `useAnimationState.js`):
```javascript
// States: CLOSED -> OPENING -> CARD_RISING -> CARD_ROTATING -> OPEN
// Each state triggers the next via onAnimationComplete callbacks
```

**Existing Easing Convention** (from `index.css`):
```css
--ease-envelope: cubic-bezier(0.4, 0, 0.2, 1);     /* Standard easing */
--ease-card-reveal: cubic-bezier(0.16, 1, 0.3, 1); /* Premium reveal */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bouncy */
```

**Framer Motion Variants Pattern** (from `EnvelopeFlap.jsx`):
```javascript
const flapVariants = {
  closed: { rotateX: 0, zIndex: 10 },
  open: {
    rotateX: -180,
    zIndex: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};
```

**Component Callback Pattern** (from `App.jsx`):
```javascript
// Components call callbacks when their animation completes
<Envelope onFlapOpened={onFlapOpened} />
<InviteCard onCardRisen={onCardRisen} onCardRotated={onCardRotated} />
```

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation - Enhance 3D Perspective Setup

Establish proper 3D rendering context with perspective and transform-style properties on all relevant containers.

**Tasks:**
- Add `perspective: 1000px` to envelope container (already exists, verify)
- Ensure `transformStyle: preserve-3d` is properly applied
- Set up proper transform origins for flap and card

### Phase 2: Enhance Envelope Flap Animation

Create a convincing 3D flap opening with proper backface rendering.

**Tasks:**
- Refine flap rotation angles (0° to -175° for natural open position)
- Add backface-visibility to show envelope interior
- Add subtle shadow animation as flap opens
- Adjust timing for premium feel (0.6s with custom easing)

### Phase 3: Refine Card Rise Animation

Make the card emergence feel natural - rising from within the envelope.

**Tasks:**
- Adjust starting position to be "inside" envelope
- Add subtle scale animation (0.85 -> 1.0)
- Coordinate timing so card starts rising after flap is ~60% open
- Add shadow that grows as card rises

### Phase 4: Polish Card Rotation

The card should rotate smoothly into its final viewing position.

**Tasks:**
- Refine rotation from -5° (tucked) to 2° (slight elegant tilt)
- Adjust final position to be centered and prominent
- Add spring physics for a subtle settle effect
- Ensure proper z-index layering throughout

### Phase 5: Envelope Fade/Scale Choreography

As the card takes focus, the envelope should gracefully recede.

**Tasks:**
- Add subtle scale-down of envelope (1.0 -> 0.95)
- Reduce envelope opacity slightly (1.0 -> 0.6)
- Coordinate timing with card reveal

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### Task 1: UPDATE `src/components/Envelope.jsx` - Enhance 3D Container

- **IMPLEMENT**: Add proper 3D perspective container with animated opacity/scale
- **PATTERN**: Use existing `motion.div` pattern with variants
- **IMPORTS**: Already has `motion` from framer-motion
- **CHANGES**:
  1. Add `transformStyle: 'preserve-3d'` to envelope body
  2. Create variants for envelope state transitions (visible -> faded)
  3. Animate envelope opacity/scale as card emerges
  4. Add animated shadow that responds to state

```jsx
// Key changes to make:
const envelopeVariants = {
  closed: {
    scale: 1,
    opacity: 1,
    filter: 'drop-shadow(0 10px 30px rgba(54, 69, 79, 0.2))'
  },
  opening: {
    scale: 1,
    opacity: 1,
    filter: 'drop-shadow(0 15px 40px rgba(54, 69, 79, 0.25))'
  },
  revealed: {
    scale: 0.95,
    opacity: 0.6,
    filter: 'drop-shadow(0 5px 20px rgba(54, 69, 79, 0.15))',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};
```

- **GOTCHA**: Don't break existing onClick handler for closed state
- **VALIDATE**: `npm run dev` - Envelope should still respond to clicks

### Task 2: UPDATE `src/components/EnvelopeFlap.jsx` - Realistic 3D Flap

- **IMPLEMENT**: Enhance flap rotation with proper 3D rendering and shadow
- **PATTERN**: Mirror existing variants pattern with enhanced properties
- **IMPORTS**: No new imports needed
- **CHANGES**:
  1. Move `perspective` to parent, keep `transformStyle: preserve-3d` on flap
  2. Adjust rotation from -180° to -175° (more natural stop)
  3. Add animated shadow under flap
  4. Enhance backface visibility setup
  5. Use premium easing: `[0.4, 0.0, 0.2, 1]`

```jsx
// Key variant refinements:
const flapVariants = {
  closed: {
    rotateX: 0,
    zIndex: 10,
    boxShadow: '0 2px 8px rgba(54, 69, 79, 0.1)',
  },
  open: {
    rotateX: -175, // Slightly less than 180 for natural stop
    zIndex: 0,
    boxShadow: '0 -5px 20px rgba(54, 69, 79, 0.2)', // Shadow flips
    transition: {
      duration: 0.7,
      ease: [0.4, 0.0, 0.2, 1], // Smooth deceleration
    },
  },
};
```

- **GOTCHA**: Ensure `onAnimationComplete` still fires correctly for state transitions
- **VALIDATE**: `npm run dev` - Flap should open with convincing 3D rotation

### Task 3: UPDATE `src/components/InviteCard.jsx` - Premium Card Reveal

- **IMPLEMENT**: Enhance card rise and rotation with premium timing
- **PATTERN**: Extend existing `cardVariants` with refined values
- **IMPORTS**: No new imports needed
- **CHANGES**:
  1. Adjust `hidden` state to position card inside envelope (y: 80%)
  2. Add scale animation (0.85 -> 1.0) for emergence feel
  3. Refine rising animation timing (delay start until flap is open)
  4. Add shadow animation that grows with card
  5. Adjust final rotation to subtle 2° tilt
  6. Add spring settle effect for final position

```jsx
// Key variant refinements:
const cardVariants = {
  hidden: {
    y: '80%',        // Start "inside" envelope
    opacity: 0,
    rotate: -8,      // More tucked angle
    scale: 0.85,     // Smaller when hidden
    boxShadow: '0 5px 15px rgba(54, 69, 79, 0.1)',
  },
  rising: {
    y: '-5%',
    opacity: 1,
    rotate: -5,
    scale: 0.92,
    boxShadow: '0 15px 35px rgba(54, 69, 79, 0.2)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3, // Wait for flap to open
    },
  },
  open: {
    y: '-45%',       // Final centered position
    opacity: 1,
    rotate: 2,       // Subtle elegant tilt
    scale: 1,
    boxShadow: '0 25px 50px rgba(54, 69, 79, 0.25)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

- **GOTCHA**: Maintain callbacks `onCardRisen` and `onCardRotated` for state machine
- **VALIDATE**: `npm run dev` - Card should rise and rotate smoothly after flap opens

### Task 4: UPDATE `src/hooks/useAnimationState.js` - Optional Timing Refinement

- **IMPLEMENT**: Review state machine for timing optimization (may not need changes)
- **PATTERN**: Existing callback pattern
- **CHANGES**: Only if needed - the current state machine may work well
- **VALIDATION FOCUS**: Ensure smooth transitions between all states
- **VALIDATE**: Full animation sequence plays smoothly: tap -> flap opens -> card rises -> card rotates -> complete

### Task 5: UPDATE `src/App.jsx` - Coordinate Animation Props

- **IMPLEMENT**: Pass animation state to Envelope for opacity/scale animation
- **PATTERN**: Existing prop passing pattern
- **CHANGES**:
  1. Pass `state` to Envelope component for visibility variants
  2. Ensure proper z-index ordering in render

```jsx
// Update Envelope props:
<Envelope
  state={state}
  onClick={openEnvelope}
  onFlapOpened={onFlapOpened}
/>
```

- **GOTCHA**: Don't break existing animation callbacks
- **VALIDATE**: `npm run dev` - Full animation sequence works end-to-end

### Task 6: POLISH - Fine-tune Timing and Easing

- **IMPLEMENT**: Test and adjust all timing values for premium feel
- **FOCUS AREAS**:
  1. Flap open duration (target: 0.6-0.8s)
  2. Card rise delay (target: 0.2-0.4s after flap starts)
  3. Card rise duration (target: 0.7-0.9s)
  4. Card rotation duration (target: 0.5-0.7s)
  5. Envelope fade timing (target: sync with card rise)
- **VALIDATE**: `npm run dev` - Animation feels premium, no jank, 60fps smooth

### Task 7: POLISH - Shadow and Depth Effects

- **IMPLEMENT**: Ensure shadows animate naturally throughout sequence
- **FOCUS AREAS**:
  1. Envelope shadow deepens slightly when flap opens
  2. Card shadow grows as it rises
  3. Envelope shadow recedes as card takes focus
  4. No shadow "popping" - all transitions smooth
- **VALIDATE**: Visual inspection - shadows feel natural and add depth

### Task 8: TEST - Browser and Device Compatibility

- **IMPLEMENT**: Test animation on multiple browsers and viewport sizes
- **TEST TARGETS**:
  1. Chrome Desktop (primary)
  2. Safari Desktop (webkit differences)
  3. Chrome DevTools mobile emulation (iPhone SE, iPhone 14)
  4. Responsive breakpoints (375px, 768px, 1024px)
- **VALIDATE**: Animation works consistently across all test targets

---

## TESTING STRATEGY

### Manual Visual Testing

Since this is animation work, visual inspection is the primary testing method:

1. **Full Sequence Test**: Tap envelope, watch complete animation, verify smooth flow
2. **Replay Test**: Use replay button, verify animation resets and replays correctly
3. **Timing Feel Test**: Does it feel premium? Natural? Delightful?
4. **Performance Test**: Open Chrome DevTools Performance tab, record animation, verify 60fps

### Responsive Testing

Use Chrome DevTools device emulation:
- iPhone SE (375px width)
- iPhone 14 Pro (393px width)
- iPad (768px width)
- Desktop (1440px width)

### Edge Cases

- **Rapid clicking**: Tap envelope multiple times quickly - should not break
- **Mid-animation replay**: Can't replay until animation completes (current behavior is correct)
- **Reduced motion**: Test with `prefers-reduced-motion` enabled - animations should be minimal

---

## VALIDATION COMMANDS

### Level 1: Syntax & Style

```bash
# Run ESLint
npm run lint
```

### Level 2: Build Verification

```bash
# Verify build succeeds
npm run build
```

### Level 3: Development Server

```bash
# Start dev server and visually test
npm run dev
```

### Level 4: Manual Validation Checklist

1. [ ] Envelope displays correctly on load (closed state)
2. [ ] Tap shows visual feedback (scale on hover/tap)
3. [ ] "Tap to open" text visible when closed
4. [ ] Flap opens with convincing 3D rotation (~0.7s)
5. [ ] Flap shows backside (envelope interior color) when open
6. [ ] Card begins rising after flap is ~60% open
7. [ ] Card rises smoothly with growing shadow
8. [ ] Card rotates to final position with subtle tilt
9. [ ] Envelope fades/scales as card takes prominence
10. [ ] Replay button appears after animation completes
11. [ ] Replay resets and replays full animation
12. [ ] Animation is smooth (60fps, no jank)
13. [ ] Works on mobile viewport (375px)
14. [ ] Works on tablet viewport (768px)
15. [ ] Works on desktop viewport (1440px)

### Level 5: Performance Validation

1. Open Chrome DevTools > Performance tab
2. Start recording
3. Trigger animation
4. Stop recording
5. Verify:
   - Frame rate stays near 60fps
   - No long tasks (>50ms)
   - No layout thrashing

---

## ACCEPTANCE CRITERIA

- [ ] Envelope flap opens with convincing 3D perspective rotation
- [ ] Card emerges from "inside" envelope with natural timing
- [ ] Card rotates smoothly to final elegant position
- [ ] All transitions use premium easing (no linear/jerky motion)
- [ ] Shadows animate to enhance depth perception
- [ ] Envelope recedes as card takes focus
- [ ] Animation sequence flows naturally (no jarring transitions)
- [ ] Animation performs at 60fps (no jank)
- [ ] Replay functionality works correctly
- [ ] Responsive design maintained (mobile, tablet, desktop)
- [ ] ESLint passes with no errors
- [ ] Build succeeds with no errors

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Manual testing confirms premium animation feel
- [ ] Responsive testing passed on all viewport sizes
- [ ] Performance testing confirms 60fps
- [ ] Code follows project conventions and patterns
- [ ] No regressions in existing functionality

---

## NOTES

### Design Decisions

1. **Rotation Angles**:
   - Flap: 0° -> -175° (not full -180° to avoid gimbal lock and look more natural)
   - Card: -8° (tucked) -> 2° (subtle tilt) - Paperless Post style

2. **Timing Philosophy**:
   - Overlap animations slightly for flow (card starts before flap fully open)
   - Use ease-out curves for reveals (fast start, slow finish = premium feel)
   - Total sequence: ~2.5 seconds from tap to complete

3. **Easing Choices**:
   - Flap: `[0.4, 0, 0.2, 1]` - Standard ease-out, natural deceleration
   - Card reveal: `[0.16, 1, 0.3, 1]` - Premium reveal, very smooth deceleration
   - Consider spring for final settle if it enhances feel

4. **Z-Index Strategy**:
   - Envelope body: base layer
   - Card: starts below flap, ends above envelope
   - Flap: high z-index when closed, low when open

### Performance Considerations

- All animations use CSS transforms (GPU accelerated)
- Avoid animating layout properties (width, height, top, left)
- Keep shadow animations subtle (expensive to compute)
- Use `will-change` sparingly if needed for performance

### References

- [Paperless Post Inspiration](https://www.paperlesspost.com/go/7DLxQppszWbP73FvENZ5v)
- [3D Envelope CSS Tutorial](https://codewebstack.com/3d-envelope-animation-using-html-css/)
- [CSS Greeting Card Tutorial](https://tammyritterskamp.com/how-to-make-css-greeting-card/)
