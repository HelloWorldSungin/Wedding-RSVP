import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import EnvelopeFlap from './EnvelopeFlap';

/**
 * Envelope component with opening animation
 * Contains the flap and body of the envelope
 */
function Envelope({ state, onClick, onFlapOpened }) {
  const isClosed = state === ANIMATION_STATES.CLOSED;
  const isAnimating = state !== ANIMATION_STATES.CLOSED && state !== ANIMATION_STATES.OPEN;

  return (
    <motion.div
      className="relative w-full aspect-[4/3] cursor-pointer"
      onClick={isClosed ? onClick : undefined}
      whileHover={isClosed ? { scale: 1.02 } : {}}
      whileTap={isClosed ? { scale: 0.98 } : {}}
      style={{ perspective: '1000px' }}
    >
      {/* Envelope Body */}
      <div
        className="absolute inset-0 bg-envelope rounded-lg shadow-envelope overflow-hidden"
        style={{
          boxShadow: 'var(--shadow-envelope)',
        }}
      >
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />

        {/* Envelope fold lines */}
        <div className="absolute left-0 top-1/2 w-full h-px bg-charcoal/5 -rotate-12 origin-left" />
        <div className="absolute right-0 top-1/2 w-full h-px bg-charcoal/5 rotate-12 origin-right" />
      </div>

      {/* Envelope Flap */}
      <EnvelopeFlap
        state={state}
        onAnimationComplete={onFlapOpened}
      />

      {/* Bottom fold (triangle) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '150px solid transparent',
          borderRight: '150px solid transparent',
          borderBottom: '100px solid var(--color-envelope)',
          filter: 'brightness(0.97)',
        }}
      />
    </motion.div>
  );
}

export default Envelope;
