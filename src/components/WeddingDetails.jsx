import { motion } from 'framer-motion';

/**
 * Wedding details text section
 * Same vertical layout on both mobile and desktop (Paperless Post style)
 * Just scaled down on mobile via parent container
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

  // Rotated letter component (90 degrees clockwise)
  const RotatedLetter = ({ letter }) => (
    <span
      className="font-serif text-charcoal text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider block"
      style={{ transform: 'rotate(90deg)' }}
    >
      {letter}
    </span>
  );

  return (
    <motion.div
      className="h-full flex flex-col justify-between py-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* SAVE the DATE - Vertical rotated layout on all screen sizes */}
      <motion.div
        className="flex flex-col items-end gap-0"
        variants={itemVariants}
      >
        <RotatedLetter letter="S" />
        <RotatedLetter letter="A" />
        <RotatedLetter letter="V" />
        <RotatedLetter letter="E" />
        <span className="font-script text-charcoal/70 text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-2">
          the
        </span>
        <RotatedLetter letter="D" />
        <RotatedLetter letter="A" />
        <RotatedLetter letter="T" />
        <RotatedLetter letter="E" />
      </motion.div>

      {/* Names - tilted */}
      <motion.div
        className="flex justify-center"
        variants={itemVariants}
      >
        <div className="rotate-[-20deg]">
          <p className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight text-center">
            Sungin
          </p>
          <p className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight text-center">
            &
          </p>
          <p className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight text-center">
            Diane
          </p>
        </div>
      </motion.div>

      {/* Bottom Section - Date, Venue */}
      <motion.div
        className="text-right space-y-1"
        variants={itemVariants}
      >
        <p className="font-sans text-xs sm:text-sm md:text-base text-charcoal tracking-[0.2em]">
          09.19.26
        </p>
        <p className="font-sans text-xs sm:text-sm md:text-base text-charcoal font-medium tracking-[0.15em]">
          HART&MAIN
        </p>
        <p className="font-serif italic text-[10px] sm:text-xs md:text-sm text-charcoal/50 pt-1">
          Invitation to follow
        </p>
      </motion.div>
    </motion.div>
  );
}

export default WeddingDetails;
