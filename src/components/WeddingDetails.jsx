import { motion } from 'framer-motion';

/**
 * Wedding details text section
 * Displays names, date, time, and venue
 */
function WeddingDetails() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className="text-center md:text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Save the Date */}
      <motion.p
        className="font-serif text-charcoal/60 text-xs tracking-[0.3em] uppercase mb-2"
        variants={itemVariants}
      >
        Save the Date
      </motion.p>

      {/* Names */}
      <motion.h1
        className="font-script text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4"
        variants={itemVariants}
      >
        Sungin & Diane
      </motion.h1>

      {/* Date */}
      <motion.p
        className="font-serif text-lg md:text-xl text-charcoal/80 mb-1"
        variants={itemVariants}
      >
        Saturday, September 19, 2026
      </motion.p>

      {/* Time */}
      <motion.p
        className="font-sans text-sm text-charcoal/60 mb-4"
        variants={itemVariants}
      >
        4:00 PM PDT
      </motion.p>

      {/* Venue */}
      <motion.div variants={itemVariants}>
        <p className="font-serif text-base md:text-lg text-charcoal/80">
          Hart & Main
        </p>
        <p className="font-sans text-sm text-charcoal/50">
          24217 Main St, Santa Clarita, CA 91321
        </p>
      </motion.div>

      {/* Invitation note */}
      <motion.p
        className="font-serif italic text-sm text-charcoal/40 mt-6"
        variants={itemVariants}
      >
        Invitation to follow
      </motion.p>
    </motion.div>
  );
}

export default WeddingDetails;
