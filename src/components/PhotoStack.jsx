import { motion } from 'framer-motion';
import photo1 from '../assets/photos/e-invite-pic1.JPG';
import photo2 from '../assets/photos/e-invite-pic2.JPG';
import photo3 from '../assets/photos/e-invite-pic3.JPG';

/**
 * Stack of 3 engagement photos displayed vertically
 */
function PhotoStack() {
  const photos = [
    { id: 1, src: photo1, alt: 'Sungin & Diane engagement photo 1' },
    { id: 2, src: photo2, alt: 'Sungin & Diane engagement photo 2' },
    { id: 3, src: photo3, alt: 'Sungin & Diane engagement photo 3' },
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
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PhotoStack;
