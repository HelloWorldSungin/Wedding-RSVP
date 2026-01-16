import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import PhotoStack from './PhotoStack';
import WeddingDetails from './WeddingDetails';

/**
 * Main invitation card component
 * Rises from envelope and rotates into view
 * Responsive: vertical layout on mobile, horizontal on desktop
 * Card stays above envelope (higher z-index) throughout animation
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

  // Card animation variants
  // Card starts inside envelope, rises up while envelope slides down
  const cardVariants = {
    hidden: {
      y: 80, // Start lower, inside envelope area
      opacity: 0,
      rotate: -3,
      scale: 0.85,
    },
    rising: {
      y: 20, // Rise up
      opacity: 1,
      rotate: -3,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    open: {
      y: 0, // Final settled position
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

  // Mobile: constrained width, Desktop: constrained width with auto height
  const sizeClasses = isMobile
    ? 'w-[92vw] max-w-[420px]'
    : 'w-full max-w-lg';

  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${sizeClasses}`}
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
      <div className={`${isMobile ? 'flex flex-col' : 'flex flex-row'}`}>
        {/* Photos section */}
        <div className={`p-3 md:p-4 ${isMobile ? 'h-[45vh]' : 'w-[65%]'}`}>
          <PhotoStack />
        </div>

        {/* Details section */}
        <div className={`p-4 md:p-3 ${isMobile ? '' : 'w-[35%] py-6'}`}>
          <WeddingDetails />
        </div>
      </div>
    </motion.div>
  );
}

export default InviteCard;
