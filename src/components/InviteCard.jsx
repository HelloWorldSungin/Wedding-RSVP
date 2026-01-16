import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import PhotoStack from './PhotoStack';
import WeddingDetails from './WeddingDetails';

/**
 * Main invitation card component
 * Rises from envelope and rotates into view
 * Same horizontal layout on both mobile and desktop, scaled to fit viewport
 */
function InviteCard({ state, onCardRisen, onCardRotated }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // Scale factor based on screen width
  // Mobile: larger scale to fill ~50% of viewport height
  const getCardScale = () => {
    if (windowWidth < 480) return 0.75;  // Small phones - larger to fill viewport
    if (windowWidth < 768) return 0.8;   // Larger phones
    return 0.7;  // Desktop/tablet
  };

  const cardScale = getCardScale();

  return (
    <div
      className="flex justify-center"
      style={{
        // Scale the container to match the visual size of the scaled card
        transform: `scale(${cardScale})`,
        transformOrigin: 'top center',
        // Negative margin to compensate for the scale shrinking the space
        marginBottom: `-${(1 - cardScale) * 100}%`,
      }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden w-full max-w-xl"
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
        {/* Same horizontal layout for both mobile and desktop */}
        <div className="flex flex-row">
          {/* Photos section - bigger padding for border effect */}
          <div className="p-5 w-[65%]">
            <PhotoStack />
          </div>

          {/* Details section */}
          <div className="p-5 w-[35%] py-8">
            <WeddingDetails />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default InviteCard;
