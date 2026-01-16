import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';

/**
 * Envelope flap with 3D rotation animation
 * Clean V-shaped flap that blends with envelope body when closed
 * Reveals beige inner lining when opened
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
        height: '52%',
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
      {/* Front of flap (visible when closed) - matches envelope body */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)',
        }}
      >
        {/* Very subtle fold shadow along edges */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            background: `
              linear-gradient(to bottom, transparent 85%, rgba(0,0,0,0.04) 100%)
            `,
          }}
        />
      </div>

      {/* Back of flap (visible when open) - beige inner lining */}
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateX(180deg)',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          backgroundColor: 'var(--color-envelope-lining)',
        }}
      />
    </motion.div>
  );
}

export default EnvelopeFlap;
