import { motion } from 'framer-motion';

/**
 * Stack of 3 engagement photos displayed vertically
 * Photos will be replaced with actual engagement photos
 */
function PhotoStack() {
  // Placeholder photos - replace with actual engagement photos
  const photos = [
    { id: 1, alt: 'Engagement photo 1' },
    { id: 2, alt: 'Engagement photo 2' },
    { id: 3, alt: 'Engagement photo 3' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const photoVariants = {
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
    <motion.div
      className="flex flex-col gap-3 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          className="flex-1 bg-beige rounded-lg overflow-hidden shadow-sm"
          variants={photoVariants}
        >
          {/* Placeholder - replace src with actual photo imports */}
          <div
            className="w-full h-full bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center"
          >
            <span className="text-charcoal/30 font-serif text-sm">
              Photo {photo.id}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PhotoStack;
