import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';

/**
 * Envelope flap with 3D rotation animation
 * Prominent V-shaped flap that rotates open when envelope is clicked
 * Shows beige inner lining when opened
 */
function EnvelopeFlap({ state, onAnimationComplete }) {
  const shouldOpen = state !== ANIMATION_STATES.CLOSED;

  const flapVariants = {
    closed: {
      rotateX: 0,
      zIndex: 10,
    },
    open: {
      rotateX: -180,
      zIndex: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 origin-top"
      style={{
        height: '60%', // Prominent flap extending past middle
        transformStyle: 'preserve-3d',
      }}
      variants={flapVariants}
      initial="closed"
      animate={shouldOpen ? 'open' : 'closed'}
      onAnimationComplete={() => {
        if (shouldOpen && state === ANIMATION_STATES.OPENING) {
          onAnimationComplete();
        }
      }}
    >
      {/* Front of flap (visible when closed) - V-shaped with gradient */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          background: 'linear-gradient(180deg, #F5F5F5 0%, #FAFAFA 40%, #F8F8F8 100%)',
        }}
      >
        {/* Subtle shadow along the V-fold edges */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            background: `
              linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.03) 50%, transparent 55%),
              linear-gradient(-135deg, transparent 45%, rgba(0,0,0,0.03) 50%, transparent 55%)
            `,
          }}
        />

        {/* Edge highlight on left */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
          }}
        />

        {/* Edge highlight on right */}
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
          }}
        />
      </div>

      {/* Back of flap (visible when open) - shows inner lining color */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateX(180deg)',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          backgroundColor: 'var(--color-envelope-lining)',
        }}
      >
        {/* Inner lining texture */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 50%)',
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          }}
        />
      </div>
    </motion.div>
  );
}

export default EnvelopeFlap;
