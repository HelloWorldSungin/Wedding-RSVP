import { motion } from 'framer-motion';
import ActionButtons from './ActionButtons';

/**
 * Details section that appears below the card
 * Matches Paperless Post reference design
 * Desktop: 3 columns | Mobile: Stacked vertically
 */
function DetailsSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      className="w-full max-w-4xl mx-auto mt-16 md:mt-20 px-6 md:px-8 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Headline - Large serif font */}
      <motion.h2
        className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6 md:mb-8"
        variants={itemVariants}
      >
        Sungin&Diane are getting married!
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="font-sans text-base md:text-lg text-charcoal/60 mb-12 md:mb-16"
        variants={itemVariants}
      >
        Website and details will be sent at a later time. Thank you!
      </motion.p>

      {/* Info Grid - Desktop: 3 cols, Mobile: stacked */}
      <motion.div
        className="flex flex-col md:flex-row md:justify-center md:gap-16 lg:gap-24 gap-12 mb-16 md:mb-20"
        variants={itemVariants}
      >
        {/* Hosted By */}
        <div className="text-center">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-charcoal/50 mb-4">
            Hosted By
          </p>
          <p className="font-serif text-xl md:text-2xl text-charcoal">
            Sungin & Diane
          </p>
        </div>

        {/* Date */}
        <div className="text-center">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-charcoal/50 mb-4">
            Date
          </p>
          <p className="font-serif text-xl md:text-2xl text-charcoal underline underline-offset-4 decoration-charcoal/30">
            Saturday, September 19
          </p>
          <p className="font-serif text-lg md:text-xl text-charcoal underline underline-offset-4 decoration-charcoal/30 mt-1">
            4:00PM PDT
          </p>
        </div>

        {/* Address */}
        <div className="text-center">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-charcoal/50 mb-4">
            Address
          </p>
          <p className="font-serif text-xl md:text-2xl text-charcoal underline underline-offset-4 decoration-charcoal/30">
            Hart & Main
          </p>
          <p className="font-serif text-lg md:text-xl text-charcoal underline underline-offset-4 decoration-charcoal/30 mt-1">
            24217 Main St
          </p>
          <p className="font-serif text-lg md:text-xl text-charcoal underline underline-offset-4 decoration-charcoal/30 mt-1">
            Santa Clarita, CA 91321
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="max-w-xl mx-auto"
        variants={itemVariants}
      >
        <ActionButtons />
      </motion.div>
    </motion.section>
  );
}

export default DetailsSection;
