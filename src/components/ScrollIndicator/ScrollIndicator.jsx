import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * ScrollIndicator
 * ──────────────────────────────────────────────────────────────────
 * Subtle animated cue at the bottom of the hero section.
 * Smooth bounce animation communicates that content exists below.
 * ──────────────────────────────────────────────────────────────────
 */
const ScrollIndicator = () => {
  const handleClick = () => {
    const nextSection = document.getElementById('discover');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 cursor-pointer group focus:outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      aria-label="Scroll down to explore"
    >
      <span className="text-xs tracking-[0.25em] uppercase text-white/50 font-light group-hover:text-white/80 transition-colors duration-300">
        Scroll to explore
      </span>

      {/* Animated chevron stack */}
      <div className="flex flex-col items-center -space-y-2">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              className="text-skcet-gold"
            />
          </motion.div>
        ))}
      </div>
    </motion.button>
  );
};

export default ScrollIndicator;
