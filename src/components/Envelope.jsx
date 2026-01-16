import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import EnvelopeFlap from './EnvelopeFlap';

/**
 * Envelope component with opening animation
 * Clean, realistic envelope design:
 * - Solid rectangular body
 * - V-shaped top flap (only visible fold)
 * - Beige inner lining revealed when flap opens
 */
function Envelope({ state, onClick, onFlapOpened, envelopeVariants }) {
  const isClosed = state === ANIMATION_STATES.CLOSED;

  const getEnvelopeAnimationState = () => {
    if (state === ANIMATION_STATES.CLOSED || state === ANIMATION_STATES.OPENING) {
      return 'closed';
    }
    return 'open';
  };

  return (
    <motion.div
      className="relative w-full aspect-[5/4] cursor-pointer"
      onClick={isClosed ? onClick : undefined}
      whileHover={isClosed ? { scale: 1.02 } : {}}
      whileTap={isClosed ? { scale: 0.98 } : {}}
      style={{ perspective: '1000px' }}
      variants={envelopeVariants}
      animate={getEnvelopeAnimationState()}
    >
      {/* Inner Lining - visible when flap opens */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          backgroundColor: 'var(--color-envelope-lining)',
        }}
      />

      {/* Main envelope body - clean rectangle */}
      <div
        className="absolute inset-0 rounded-sm overflow-hidden"
        style={{
          backgroundColor: '#FAFAFA',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Subtle gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 50%, #F5F5F5 100%)',
          }}
        />

        {/* Subtle shadow line where flap meets body */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '55%',
            background: 'linear-gradient(180deg, transparent 90%, rgba(0,0,0,0.03) 100%)',
          }}
        />
      </div>

      {/* V-flap (top) - the only visible fold */}
      <EnvelopeFlap
        state={state}
        onAnimationComplete={onFlapOpened}
      />
    </motion.div>
  );
}

export default Envelope;
