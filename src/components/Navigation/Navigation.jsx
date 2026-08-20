import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { NavItem } from './MegaMenu';
import MobileMenu from './MobileMenu';

/**
 * Navigation
 * ──────────────────────────────────────────────────────────────────
 * Fixed glassmorphic top navigation bar.
 * – Logo removed from header (hero already has centred logo)
 * – Desktop: all 12 nav items spread evenly across the full width
 * – Mobile: hamburger → full-screen slide-in panel
 * – Transitions from fully transparent to more opaque on scroll
 * ──────────────────────────────────────────────────────────────────
 */

const navVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Prevent body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-30
          transition-all duration-500
          ${scrolled ? 'glass-scrolled shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'glass'}
        `}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        role="banner"
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* ── Desktop Navigation — full width, evenly spaced ── */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-between"
              aria-label="Main navigation"
            >
              <ul className="flex items-center justify-between w-full">
                {NAV_ITEMS.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </ul>
            </nav>

            {/* ── Mobile: site name (lightweight) + hamburger ── */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <span className="text-white/70 text-sm font-medium tracking-widest uppercase">
                SKCET
              </span>
              <button
                className="
                  flex items-center justify-center
                  w-10 h-10
                  text-white/80 hover:text-white
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-1 focus-visible:ring-skcet-gold/60
                  rounded-sm
                "
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>

          </div>
        </div>

        {/* ── Subtle bottom border gradient ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,162,39,0.2) 30%, rgba(201,162,39,0.4) 50%, rgba(201,162,39,0.2) 70%, transparent)',
          }}
          aria-hidden="true"
        />
      </motion.header>

      {/* ── Mobile Menu ── */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navigation;
