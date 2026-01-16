import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';

/**
 * Envelope flap with 3D rotation animation
 * Rotates open when envelope is clicked
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
        ease: [0.4, 0, 0.2, 1], // ease-envelope
      },
    },
  };

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-1/2 origin-top"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
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
      {/* Front of flap (visible when closed) */}
      <div
        className="absolute inset-0 bg-envelope-flap rounded-t-lg"
        style={{
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
        }}
      >
        {/* Seal decoration */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gold/30" />
        </div>
      </div>

      {/* Back of flap (visible when open) */}
      <div
        className="absolute inset-0 bg-envelope"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateX(180deg)',
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
          filter: 'brightness(0.95)',
        }}
      />
    </motion.div>
  );
}

export default EnvelopeFlap;
