import { motion } from 'framer-motion';

/**
 * Action buttons for RSVP, wedding website, registry, and directions
 * Uses environment variables for URLs
 */
function ActionButtons() {
  const buttons = [
    {
      id: 'rsvp',
      label: 'RSVP',
      href: import.meta.env.VITE_RSVP_URL || '#',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'website',
      label: 'Our Website',
      href: import.meta.env.VITE_WEDDING_WEBSITE_URL || '#',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      id: 'registry',
      label: 'Gift Registry',
      href: import.meta.env.VITE_REGISTRY_URL || '#',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      id: 'directions',
      label: 'Directions',
      href: import.meta.env.VITE_DIRECTIONS_URL || 'https://maps.google.com/?q=Hart+and+Main+24217+Main+St+Santa+Clarita+CA',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 gap-2 mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {buttons.map((button) => (
        <motion.a
          key={button.id}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2 bg-charcoal text-cream rounded-lg font-sans text-sm hover:bg-charcoal/90 transition-colors"
          style={{ boxShadow: 'var(--shadow-button)' }}
          variants={buttonVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {button.icon}
          <span>{button.label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}

export default ActionButtons;
