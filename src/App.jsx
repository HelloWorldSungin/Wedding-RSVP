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

  // Check if card should be visible
  const showCard = state !== ANIMATION_STATES.CLOSED;

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center p-4 md:p-8">
      {/* Spacer for centering when closed */}
      {isClosed && <div className="flex-1" />}

      {/* Animation Container - holds both envelope and card */}
      <div
        className="relative w-full max-w-lg perspective-1000"
        style={{
          minHeight: isClosed ? '50vh' : '95vh',
          overflow: 'visible',
        }}
      >
        {/* Envelope - always visible, behind card */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ zIndex: 1 }}
        >
          <Envelope
            state={state}
            onClick={openEnvelope}
            onFlapOpened={onFlapOpened}
            envelopeVariants={envelopeVariants}
          />
        </div>

        {/* Invite Card - rises from envelope, overlays it */}
        {showCard && (
          <div
            className="absolute top-0 left-0 right-0 flex justify-center"
            style={{ zIndex: 10 }}
          >
            <InviteCard
              state={state}
              onCardRisen={onCardRisen}
              onCardRotated={onCardRotated}
            />
          </div>
        )}
      </div>

      {/* Tap instruction - shown when envelope is closed */}
      {isClosed && (
        <p className="mt-8 text-charcoal/60 font-sans text-sm animate-pulse">
          Tap to open
        </p>
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
