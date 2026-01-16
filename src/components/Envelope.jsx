import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import EnvelopeFlap from './EnvelopeFlap';

/**
 * Envelope component with opening animation
 * Realistic envelope matching the Paperless Post reference (Image #8)
 * - V-shaped top flap dominates the upper portion
 * - Side flaps visible in lower portion
 * - Small bottom flap
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

      {/* Main envelope body */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          backgroundColor: '#F9F9F9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      />

      {/* Left side flap - starts from bottom-left, points to center */}
      <div
        className="absolute left-0 bottom-0"
        style={{
          width: '55%',
          height: '75%',
          clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 33%)',
          background: 'linear-gradient(135deg, #F0F0F0 0%, #F6F6F6 50%, #FAFAFA 100%)',
        }}
      />

      {/* Right side flap - starts from bottom-right, points to center */}
      <div
        className="absolute right-0 bottom-0"
        style={{
          width: '55%',
          height: '75%',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 33%)',
          background: 'linear-gradient(-135deg, #F0F0F0 0%, #F6F6F6 50%, #FAFAFA 100%)',
        }}
      />

      {/* Bottom flap - subtle triangle pointing up */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '28%',
          clipPath: 'polygon(0 100%, 50% 20%, 100% 100%)',
          background: '#F5F5F5',
        }}
      />

      {/* V-flap (top) - rendered last to be on top */}
      <EnvelopeFlap
        state={state}
        onAnimationComplete={onFlapOpened}
      />
    </motion.div>
  );
}

export default Envelope;
