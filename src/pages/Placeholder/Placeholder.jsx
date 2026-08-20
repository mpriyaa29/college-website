import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';

/**
 * Placeholder Page
 * ──────────────────────────────────────────────────────────────────
 * Rendered for all routes that haven't been built yet.
 * Shows the current route path so navigation can be tested.
 * ──────────────────────────────────────────────────────────────────
 */
const Placeholder = () => {
  const location = useLocation();
  const pageName = location.pathname
    .split('/')
    .filter(Boolean)
    .map((s) => s.replace(/-/g, ' '))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' › ');

  return (
    <main className="min-h-screen bg-skcet-dark flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border border-skcet-gold/30 flex items-center justify-center">
            <Construction size={28} strokeWidth={1} className="text-skcet-gold/60" />
          </div>
        </div>

        {/* Path breadcrumb */}
        <p className="text-xs tracking-[0.25em] uppercase text-skcet-gold/50 font-light mb-4">
          {pageName || 'Page'}
        </p>

        {/* Heading */}
        <h1 className="font-display text-3xl sm:text-4xl text-white font-medium mb-4">
          Coming Soon
        </h1>

        <p className="text-white/40 text-sm font-light leading-relaxed mb-10">
          This section is being built as part of the next phase of the SKCET
          website. Check back soon.
        </p>

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-skcet-gold/70 hover:text-skcet-gold transition-colors duration-200"
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
};

export default Placeholder;
