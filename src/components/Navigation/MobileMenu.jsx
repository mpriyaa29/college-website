import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';

/**
 * MobileMenu
 * ──────────────────────────────────────────────────────────────────
 * Full-screen slide-in menu for mobile/tablet viewports.
 * Accordion-style sub-menus. Closes on route navigation.
 * ──────────────────────────────────────────────────────────────────
 */

const LOGO_URL =
  'https://skcet.ac.in/wp-content/uploads/2024/08/skcet-logo.png';

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden:  { x: '100%' },
  visible: { x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: '100%', transition: { duration: 0.3, ease: 'easeIn' } },
};

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Slide-in panel ── */}
          <motion.div
            className="
              fixed top-0 right-0 bottom-0 z-50
              w-[85vw] max-w-sm
              bg-skcet-dark
              border-l border-white/10
              flex flex-col
              overflow-hidden
            "
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <img
                src={LOGO_URL}
                alt="SKCET"
                className="h-9 w-auto object-contain filter brightness-110"
              />
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-skcet-gold/60"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Gold accent line */}
            <div className="h-[1px] bg-gradient-to-r from-skcet-gold/0 via-skcet-gold/60 to-skcet-gold/0" />

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-4 px-2" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedId === item.id;

                  return (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="
                          flex items-center
                          px-4 py-3
                          text-sm font-medium tracking-wide
                          text-white/75 hover:text-white
                          hover:bg-white/5
                          rounded-sm
                          transition-all duration-200
                        "
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-white/10">
              <p className="text-xs text-white/30 font-light tracking-wider text-center">
                Sri Krishna College of Engineering and Technology
              </p>
              <p className="text-xs text-skcet-gold/50 font-light tracking-wider text-center mt-1">
                Coimbatore · Est. 1999
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
