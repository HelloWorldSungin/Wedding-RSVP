import { useState, useCallback } from 'react';

/**
 * Animation states for the wedding invite
 * CLOSED -> OPENING -> CARD_RISING -> CARD_ROTATING -> OPEN
 */
export const ANIMATION_STATES = {
  CLOSED: 'closed',
  OPENING: 'opening',
  CARD_RISING: 'cardRising',
  CARD_ROTATING: 'cardRotating',
  OPEN: 'open',
};

/**
 * Custom hook to manage the envelope animation state machine
 * @returns {Object} Animation state and control functions
 */
export function useAnimationState() {
  const [state, setState] = useState(ANIMATION_STATES.CLOSED);

  const openEnvelope = useCallback(() => {
    if (state === ANIMATION_STATES.CLOSED) {
      setState(ANIMATION_STATES.OPENING);
    }
  }, [state]);

  const onFlapOpened = useCallback(() => {
    if (state === ANIMATION_STATES.OPENING) {
      setState(ANIMATION_STATES.CARD_RISING);
    }
  }, [state]);

  const onCardRisen = useCallback(() => {
    if (state === ANIMATION_STATES.CARD_RISING) {
      setState(ANIMATION_STATES.CARD_ROTATING);
    }
  }, [state]);

  const onCardRotated = useCallback(() => {
    if (state === ANIMATION_STATES.CARD_ROTATING) {
      setState(ANIMATION_STATES.OPEN);
    }
  }, [state]);

  const replay = useCallback(() => {
    setState(ANIMATION_STATES.CLOSED);
  }, []);

  return {
    state,
    isOpen: state === ANIMATION_STATES.OPEN,
    isClosed: state === ANIMATION_STATES.CLOSED,
    openEnvelope,
    onFlapOpened,
    onCardRisen,
    onCardRotated,
    replay,
  };
}
