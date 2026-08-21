import { motion } from 'framer-motion';

/**
 * HeroContent
 * ──────────────────────────────────────────────────────────────────
 * Left column  → year label · SKCET · heading · accreditation badges
 * Right column → Admission 2026 announcement card (TNEA CODE 2718)
 * Logo sits centred above both columns.
 * ──────────────────────────────────────────────────────────────────
 */

/* ── Framer Motion variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.5 },
  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Component ──────────────────────────────────────────────────── */
const HeroContent = () => {
  return (
    <motion.div
      className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-8 lg:px-14 xl:px-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ══ CENTERED CONTENT ═══════════════════════════════════════════ */}
      {/* Year label */}
      <motion.p
        className="text-xs sm:text-sm tracking-[0.28em] uppercase text-skcet-gold font-medium mb-3"
        variants={fadeUp}
      >
        25 Years of Excellence
      </motion.p>

      {/* SKCET gold wordmark */}
      <motion.p
        className="font-display text-3xl sm:text-4xl font-bold text-skcet-gold tracking-wide mb-4 leading-none"
        variants={fadeUp}
      >
        SKCET
      </motion.p>

      {/* Main heading */}
      <motion.h1
        className="
          font-display
          text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl
          font-semibold text-white
          leading-tight tracking-tight
          max-w-4xl mb-12 mx-auto text-center
        "
        variants={fadeUp}
      >
        Technology Education
        <br />
        for a Better Future
      </motion.h1>

      {/* ── Cards Row (Accreditations & Admissions) ── */}
      <motion.div 
        className="w-full flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10 mt-4"
        variants={fadeUp}
      >
        {/* ── Accreditation badges ── */}
        <div className="inline-block bg-white p-2 sm:p-3 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <img 
            src="/images/accreditations.png" 
            alt="NAAC, NBA, NIRF, Ministry of Education Rankings" 
            className="h-10 sm:h-14 w-auto object-contain"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        {/* ── Admission Card ── */}
        <a
          href="/admissions/2026"
          className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-skcet-gold/60 rounded"
        >
          <img
            src="/images/admission-2026.png"
            alt="Admission 2026 TNEA CODE 2718 - Documents Required"
            className="
              w-full h-auto max-w-[280px] sm:max-w-[320px]
              rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.35)]
              group-hover:scale-[1.02] transition-transform duration-400
              bg-white
            "
            loading="eager"
            fetchpriority="high"
          />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
