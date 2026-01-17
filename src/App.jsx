import { useAnimationState, ANIMATION_STATES } from './hooks/useAnimationState';
import Envelope from './components/Envelope';
import InviteCard from './components/InviteCard';
import DetailsSection from './components/DetailsSection';
import ReplayButton from './components/ReplayButton';

function App() {
  const {
    state,
    isOpen,
    isClosed,
    openEnvelope,
    onFlapOpened,
    onCardRisen,
    onCardRotated,
    replay,
  } = useAnimationState();

  // Envelope stays in place - no slide animation
  const envelopeVariants = {
    closed: {
      y: 0,
      scale: 1,
    },
    open: {
      y: 0,
      scale: 1,
    },
  };

  // Check if card should be visible - only after envelope is fully open
  const showCard = [
    ANIMATION_STATES.CARD_RISING,
    ANIMATION_STATES.CARD_ROTATING,
    ANIMATION_STATES.OPEN,
  ].includes(state);

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center p-4 md:p-8">
      {/* Spacer for centering when closed */}
      {isClosed && <div className="flex-1" />}

      {/* Envelope - shown when closed/opening */}
      {!showCard && (
        <div className="flex flex-col items-center">
          <div className="w-64 md:w-80">
            <Envelope
              state={state}
              onClick={openEnvelope}
              onFlapOpened={onFlapOpened}
              envelopeVariants={envelopeVariants}
            />
          </div>
          {/* Tap instruction - shown when envelope is closed */}
          {isClosed && (
            <p className="mt-3 text-charcoal/60 font-sans text-sm animate-pulse">
              Tap to open
            </p>
          )}
        </div>
      )}

      {/* Invite Card - appears after envelope opens */}
      {showCard && (
        <div className="w-full max-w-lg flex justify-center">
          <InviteCard
            state={state}
            onCardRisen={onCardRisen}
            onCardRotated={onCardRotated}
          />
        </div>
      )}

      {/* Spacer for centering when closed */}
      {isClosed && <div className="flex-1" />}

      {/* Details Section - appears after animation completes */}
      {isOpen && <DetailsSection />}

      {/* Replay Button - at the very bottom */}
      {isOpen && (
        <div className="mt-8 mb-8">
          <ReplayButton onClick={replay} />
        </div>
      )}
    </main>
  );
}

export default App;
