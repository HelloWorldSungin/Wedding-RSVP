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

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center p-4 md:p-8">
      {/* Spacer for centering when closed */}
      {isClosed && <div className="flex-1" />}

      {/* Animation Container */}
      <div
        className="relative w-full max-w-lg md:max-w-none perspective-1000 flex flex-col items-center"
        style={{
          minHeight: isClosed ? '50vh' : isOpen ? '95vh' : '50vh',
        }}
      >
        {/* Envelope - hidden when fully open on mobile */}
        <div className={`w-full max-w-lg ${isOpen ? 'hidden md:block' : ''}`}>
          <Envelope
            state={state}
            onClick={openEnvelope}
            onFlapOpened={onFlapOpened}
          />
        </div>

        {/* Invite Card - rises from envelope */}
        <InviteCard
          state={state}
          onCardRisen={onCardRisen}
          onCardRotated={onCardRotated}
        />
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
