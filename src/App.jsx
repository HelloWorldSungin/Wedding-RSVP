import { useAnimationState, ANIMATION_STATES } from './hooks/useAnimationState';
import Envelope from './components/Envelope';
import InviteCard from './components/InviteCard';
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
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 md:p-8">
      {/* Animation Container */}
      <div className="relative w-full max-w-md md:max-w-lg perspective-1000">
        {/* Envelope */}
        <Envelope
          state={state}
          onClick={openEnvelope}
          onFlapOpened={onFlapOpened}
        />

        {/* Invite Card - rises from envelope */}
        <InviteCard
          state={state}
          onCardRisen={onCardRisen}
          onCardRotated={onCardRotated}
        />
      </div>

      {/* Replay Button - appears after animation completes */}
      {isOpen && <ReplayButton onClick={replay} />}

      {/* Tap instruction - shown when envelope is closed */}
      {isClosed && (
        <p className="mt-8 text-charcoal/60 font-sans text-sm animate-pulse">
          Tap to open
        </p>
      )}
    </main>
  );
}

export default App;
