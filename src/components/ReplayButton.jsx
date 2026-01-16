import { motion } from 'framer-motion';

/**
 * Replay button to restart the envelope animation
 * Appears after the animation completes
 */
function ReplayButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-transparent border border-charcoal/20 text-charcoal/60 rounded-full font-sans text-sm hover:bg-charcoal/5 hover:border-charcoal/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      <span>Replay Animation</span>
    </motion.button>
  );
}

export default ReplayButton;
