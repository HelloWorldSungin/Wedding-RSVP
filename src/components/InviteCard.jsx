import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import PhotoStack from './PhotoStack';
import WeddingDetails from './WeddingDetails';

/**
 * Main invitation card component
 * Rises from envelope and rotates into view
 * Responsive: vertical layout on mobile, horizontal on desktop
 */
function InviteCard({ state, onCardRisen, onCardRotated }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldRise = [
    ANIMATION_STATES.CARD_RISING,
    ANIMATION_STATES.CARD_ROTATING,
    ANIMATION_STATES.OPEN,
  ].includes(state);

  const shouldRotate = [
    ANIMATION_STATES.CARD_ROTATING,
    ANIMATION_STATES.OPEN,
  ].includes(state);

  const isOpen = state === ANIMATION_STATES.OPEN;

  // Different animation values for mobile vs desktop
  const cardVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      rotate: -5,
      scale: 0.9,
    },
    rising: {
      y: isMobile ? '-5%' : '-10%',
      opacity: 1,
      rotate: -5,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    open: {
      y: isMobile ? 0 : '-50%',
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const getAnimationState = () => {
    if (!shouldRise) return 'hidden';
    if (!shouldRotate) return 'rising';
    return 'open';
  };

  // Mobile: relative positioning when open, Desktop: always absolute
  const positionClasses = isMobile && isOpen
    ? 'relative mx-auto'
    : 'absolute top-1/2 left-1/2 -translate-x-1/2';

  // Mobile: constrained width, Desktop: height-based sizing
  const sizeClasses = isMobile
    ? 'w-[92vw] max-w-[420px]'
    : 'h-[92vh] aspect-[1/2]';

  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${positionClasses} ${sizeClasses}`}
      style={{
        boxShadow: 'var(--shadow-card)',
        backgroundColor: '#F0EDE8',
      }}
      variants={cardVariants}
      initial="hidden"
      animate={getAnimationState()}
      onAnimationComplete={() => {
        if (state === ANIMATION_STATES.CARD_RISING) {
          onCardRisen();
        } else if (state === ANIMATION_STATES.CARD_ROTATING) {
          onCardRotated();
        }
      }}
    >
      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className={`h-full ${isMobile ? 'flex flex-col' : 'flex flex-row'}`}>
        {/* Photos section */}
        <div className={`p-3 md:p-4 ${isMobile ? 'h-[45vh]' : 'h-full w-[65%]'}`}>
          <PhotoStack />
        </div>

        {/* Details section */}
        <div className={`p-4 md:p-3 ${isMobile ? '' : 'h-full w-[35%]'}`}>
          <WeddingDetails />
        </div>
      </div>
    </motion.div>
  );
}

export default InviteCard;
