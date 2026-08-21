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

const LOGO_URL = 'https://skcet.ac.in/wp-content/uploads/2024/08/skcet-logo.png';

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
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            {/* ── Logo (Left) ── */}
            <div className="hidden lg:flex flex-shrink-0 mr-8">
              <a href="/" className="group block">
                <img
                  src={LOGO_URL}
                  alt="SKCET Logo"
                  className="h-16 xl:h-[72px] w-auto object-contain filter brightness-110 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  fetchPriority="high"
                />
              </a>
            </div>

            {/* ── Desktop Navigation (Right, 2 Rows) ── */}
            <nav
              className="hidden lg:flex flex-1 flex-col items-end justify-center gap-1.5 xl:gap-2"
              aria-label="Main navigation"
            >
              {/* Top Row */}
              <ul className="flex items-center gap-2 xl:gap-5 justify-end">
                {['about', 'achievements', 'accreditations', 'online-payment', 'placements', 'documents']
                  .map(id => NAV_ITEMS.find(item => item.id === id))
                  .filter(Boolean)
                  .map(item => (
                    <NavItem key={item.id} item={item} />
                  ))}
              </ul>
              
              {/* Bottom Row */}
              <ul className="flex items-center gap-2 xl:gap-5 justify-end">
                {['academics', 'admissions', 'student-life', 'innovations', 'research', 'exams']
                  .map(id => NAV_ITEMS.find(item => item.id === id))
                  .filter(Boolean)
                  .map(item => (
                    <NavItem key={item.id} item={item} />
                  ))}
              </ul>
            </nav>

            {/* ── Mobile: Logo (Left) + hamburger (Right) ── */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <a href="/" className="block">
                <img
                  src={LOGO_URL}
                  alt="SKCET Logo"
                  className="h-12 w-auto object-contain filter brightness-110"
                  loading="eager"
                  fetchPriority="high"
                />
              </a>
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
