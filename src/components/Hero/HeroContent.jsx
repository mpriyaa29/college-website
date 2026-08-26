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
      className="relative z-10 w-full flex-1 flex flex-col items-center justify-between text-center px-4 sm:px-8 lg:px-14 xl:px-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ══ CENTERED CONTENT ═══════════════════════════════════════════ */}
      {/* 25 Years of Excellence Golden Emblem */}
      <motion.div
        className="mt-20 flex justify-center"
        variants={fadeUp}
      >
        <img
          src="/images/25-years-of-excellence.png"
          alt="25 Years of Excellence"
          className="h-14 sm:h-18 md:h-22 lg:h-24 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-300"
          loading="eager"
        />
      </motion.div>

      {/* Main heading */}
      <motion.h1
        className="
          font-display
          text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl
          font-semibold text-white
          leading-tight tracking-tight
          max-w-4xl mx-auto text-center
        "
        variants={fadeUp}
      >
        Technology Education
        <br />
        for a Better Future
      </motion.h1>

      {/* ── Cards Row (Accreditations) ── */}
      <motion.div 
        className="w-full flex justify-center mb-8"
        variants={fadeUp}
      >
        {/* ── Accreditation badges ── */}
        <div className="inline-block">
          <img
  src="/images/accreditations.png"
  alt="NAAC, NBA, NIRF, Ministry of Education Rankings"
  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain"
  loading="eager"
  fetchPriority="high"
/>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
