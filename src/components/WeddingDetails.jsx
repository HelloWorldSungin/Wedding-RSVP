import { motion } from 'framer-motion';

/**
 * Wedding details text section
 * Responsive design:
 * - Mobile: Horizontal "SAVE the DATE", centered layout
 * - Desktop: Vertical column with rotated letters (Paperless Post style)
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

  // Rotated letter component for desktop (90 degrees clockwise)
  const RotatedLetter = ({ letter }) => (
    <span
      className="font-serif text-charcoal text-5xl md:text-6xl lg:text-7xl tracking-wider block"
      style={{ transform: 'rotate(90deg)' }}
    >
      {letter}
    </span>
  );

  return (
    <motion.div
      className="h-full flex flex-col justify-center md:justify-between py-2 gap-4 md:gap-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* SAVE the DATE - Horizontal on mobile, Vertical on desktop */}
      <motion.div
        className="flex flex-col items-center md:items-end gap-0"
        variants={itemVariants}
      >
        {/* Mobile: Horizontal layout */}
        <div className="md:hidden text-center">
          <p className="font-serif text-charcoal text-2xl tracking-[0.3em] font-light">
            SAVE
          </p>
          <p className="font-script text-charcoal/70 text-2xl -mt-1">
            the
          </p>
          <p className="font-serif text-charcoal text-2xl tracking-[0.3em] font-light">
            DATE
          </p>
        </div>

        {/* Desktop: Vertical rotated layout */}
        <div className="hidden md:flex md:flex-col md:items-end">
          <RotatedLetter letter="S" />
          <RotatedLetter letter="A" />
          <RotatedLetter letter="V" />
          <RotatedLetter letter="E" />
          <span className="font-script text-charcoal/70 text-3xl md:text-4xl lg:text-5xl my-2">
            the
          </span>
          <RotatedLetter letter="D" />
          <RotatedLetter letter="A" />
          <RotatedLetter letter="T" />
          <RotatedLetter letter="E" />
        </div>
      </motion.div>

      {/* Names - tilted on desktop, straight on mobile */}
      <motion.div
        className="flex justify-center"
        variants={itemVariants}
      >
        <div className="md:rotate-[-20deg]">
          <p className="font-script text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight text-center">
            Sungin
          </p>
          <p className="font-script text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight text-center">
            & Diane
          </p>
        </div>
      </motion.div>

      {/* Bottom Section - Date, Venue */}
      <motion.div
        className="text-center md:text-right space-y-1"
        variants={itemVariants}
      >
        <p className="font-sans text-sm md:text-base text-charcoal tracking-[0.2em]">
          09.19.26
        </p>
        <p className="font-sans text-sm md:text-base text-charcoal font-medium tracking-[0.15em]">
          HART&MAIN
        </p>
        <p className="font-serif italic text-xs md:text-sm text-charcoal/50 pt-1">
          Invitation to follow
        </p>
      </motion.div>
    </motion.div>
  );
}

export default WeddingDetails;
