import { motion } from 'framer-motion';
import Hero from '../../components/Hero/Hero';

/**
 * Discover Section — teaser placeholder below the hero.
 * Lets us test the scroll transition from hero → content.
 * Replace this with real section components later.
 */
const DiscoverSection = () => {
  const stats = [
    { value: '25+',  label: 'Years of Excellence' },
    { value: '15+',  label: 'UG & PG Programmes' },
    { value: '10K+', label: 'Alumni Worldwide' },
    { value: '500+', label: 'Expert Faculty' },
  ];

  return (
    <section
      id="discover"
      className="relative bg-skcet-dark py-24 px-4 sm:px-8 overflow-hidden"
      aria-label="Discover SKCET"
    >
      {/* Subtle top gradient blend from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,18,40,0.9) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 39px,
            rgba(201,162,39,0.5) 40px
          )`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-skcet-gold/60 font-light text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Established 1999 · Coimbatore
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl text-white text-center font-semibold mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Where Excellence Meets{' '}
          <span className="text-gradient-gold italic">Innovation</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-white/50 text-base sm:text-lg font-light max-w-2xl mx-auto text-center leading-relaxed mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          Sri Krishna College of Engineering and Technology is an autonomous institution
          affiliated with Anna University, committed to shaping engineers who lead,
          innovate, and transform industries worldwide.
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/8 rounded-sm overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-skcet-dark px-6 py-8 text-center group hover:bg-skcet-navy/40 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
            >
              <div className="font-display text-4xl sm:text-5xl font-semibold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/45 uppercase tracking-wider font-light group-hover:text-white/65 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accreditation badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {['NAAC A+', 'NBA Accredited', 'NIRF Ranked', 'AICTE Approved', 'Anna University Affiliated'].map((badge) => (
            <span
              key={badge}
              className="
                px-4 py-1.5
                text-xs tracking-widest uppercase font-medium
                border border-skcet-gold/25
                text-skcet-gold/60
                rounded-full
                hover:border-skcet-gold/50 hover:text-skcet-gold
                transition-all duration-300
                cursor-default
              "
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Placeholder notice */}
        <motion.p
          className="text-center text-white/15 text-xs mt-16 font-light tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          — More sections coming in Phase 2 —
        </motion.p>
      </div>
    </section>
  );
};

/**
 * Home Page
 * ──────────────────────────────────────────────────────────────────
 * Root landing page combining Hero + teaser section.
 * Additional sections will be added here incrementally.
 * ──────────────────────────────────────────────────────────────────
 */
const Home = () => {
  return (
    <main>
      <Hero />
      <DiscoverSection />
    </main>
  );
};

export default Home;
