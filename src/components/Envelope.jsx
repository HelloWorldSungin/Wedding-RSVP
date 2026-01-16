import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';

// Import envelope images
import envelopeClosed from '../../picture/Envelope-Closed.png';
import envelopeHalfway from '../../picture/Envelope-Half-way-opened.png';
import envelopeOpened from '../../picture/Envelope-Opened.png';

/**
 * Envelope component with frame-based opening animation
 * Uses 3 pre-rendered images: Closed → Half-way → Opened
 */
function Envelope({ state, onClick, onFlapOpened, envelopeVariants }) {
  const isClosed = state === ANIMATION_STATES.CLOSED;
  const [currentFrame, setCurrentFrame] = useState(0); // 0: closed, 1: halfway, 2: opened

  // Handle frame animation when state changes to OPENING
  useEffect(() => {
    if (state === ANIMATION_STATES.OPENING) {
      // Frame 1: halfway (after 100ms)
      const timer1 = setTimeout(() => setCurrentFrame(1), 100);
      // Frame 2: opened (after 400ms)
      const timer2 = setTimeout(() => setCurrentFrame(2), 400);
      // Delay card rising by 0.5 second after envelope is fully open
      const timer3 = setTimeout(() => onFlapOpened(), 900);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else if (state === ANIMATION_STATES.CLOSED) {
      setCurrentFrame(0);
    }
  }, [state, onFlapOpened]);

  const getEnvelopeAnimationState = () => {
    if (state === ANIMATION_STATES.CLOSED || state === ANIMATION_STATES.OPENING) {
      return 'closed';
    }
    return 'open';
  };

  const frames = [envelopeClosed, envelopeHalfway, envelopeOpened];

  return (
    <motion.div
      className="relative w-full aspect-[3/2] cursor-pointer"
      onClick={isClosed ? onClick : undefined}
      whileHover={isClosed ? { scale: 1.02 } : {}}
      whileTap={isClosed ? { scale: 0.98 } : {}}
      variants={envelopeVariants}
      animate={getEnvelopeAnimationState()}
    >
      {/* Stack all frames, only show current one */}
      {frames.map((frame, index) => (
        <motion.img
          key={index}
          src={frame}
          alt={`Envelope frame ${index}`}
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: index === 0 ? 1 : 0 }}
          animate={{ opacity: index === currentFrame ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      ))}
    </motion.div>
  );
}

export default Envelope;
