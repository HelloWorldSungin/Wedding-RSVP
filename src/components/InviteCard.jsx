import { motion } from 'framer-motion';
import { ANIMATION_STATES } from '../hooks/useAnimationState';
import PhotoStack from './PhotoStack';
import WeddingDetails from './WeddingDetails';
import ActionButtons from './ActionButtons';

/**
 * Main invitation card component
 * Rises from envelope and rotates into view
 */
function InviteCard({ state, onCardRisen, onCardRotated }) {
  const shouldRise = [
    ANIMATION_STATES.CARD_RISING,
    ANIMATION_STATES.CARD_ROTATING,
    ANIMATION_STATES.OPEN,
  ].includes(state);

  const shouldRotate = [
    ANIMATION_STATES.CARD_ROTATING,
    ANIMATION_STATES.OPEN,
  ].includes(state);

  const isFullyOpen = state === ANIMATION_STATES.OPEN;

  const cardVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      rotate: -5,
      scale: 0.9,
    },
    rising: {
      y: '-10%',
      opacity: 1,
      rotate: -5,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // ease-card-reveal
      },
    },
    open: {
      y: '-50%',
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

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[90%] bg-cream rounded-xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-card)',
        aspectRatio: '3/4',
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
      {/* Card Content */}
      <div className="h-full flex flex-col md:flex-row">
        {/* Left side - Photos */}
        <div className="md:w-2/5 p-4 md:p-6">
          <PhotoStack />
        </div>

        {/* Right side - Details */}
        <div className="md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
          <WeddingDetails />
          {isFullyOpen && <ActionButtons />}
        </div>
      </div>
    </motion.div>
  );
}

export default InviteCard;
