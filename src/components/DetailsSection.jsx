import { motion } from 'framer-motion';
import ActionButtons from './ActionButtons';

/**
 * Details section that appears below the card
 * Contains event details and action buttons
 * Inspired by Paperless Post layout
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

  return (
    <motion.section
      className="w-full max-w-2xl mx-auto mt-12 px-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Headline */}
      <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
        Sungin & Diane are getting married!
      </h2>

      {/* Subtitle */}
      <p className="font-sans text-charcoal/60 mb-8">
        We can't wait to celebrate with you.
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-sm">
        {/* Date */}
        <div>
          <p className="font-sans text-xs uppercase tracking-wider text-charcoal/50 mb-2">
            Date
          </p>
          <p className="font-serif text-charcoal">Saturday, September 19, 2026</p>
          <p className="font-sans text-charcoal/70">4:00 PM PDT</p>
        </div>

        {/* Venue */}
        <div>
          <p className="font-sans text-xs uppercase tracking-wider text-charcoal/50 mb-2">
            Venue
          </p>
          <p className="font-serif text-charcoal">Hart & Main</p>
          <p className="font-sans text-charcoal/70">24217 Main St</p>
          <p className="font-sans text-charcoal/70">Santa Clarita, CA 91321</p>
        </div>

        {/* Hosted By */}
        <div>
          <p className="font-sans text-xs uppercase tracking-wider text-charcoal/50 mb-2">
            Hosted By
          </p>
          <p className="font-serif text-charcoal">Sungin & Diane</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto">
        <ActionButtons />
      </div>
    </motion.section>
  );
}

export default DetailsSection;
