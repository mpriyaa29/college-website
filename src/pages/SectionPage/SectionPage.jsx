import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../../data/navigation';
import ABOUT_CONTENT from '../../data/aboutContent';
import ACHIEVEMENTS_CONTENT from '../../data/achievementsContent';
import { ArrowRight, Award, Trophy, Star, BookOpen, ExternalLink, ChevronLeft, ChevronRight, GraduationCap, Users, BarChart2, Clock, Sparkles, Building2, UserCheck, HeartHandshake, Globe } from 'lucide-react';

/* ─── Icons for Core Values ─────────────────────────────────────── */
const VALUE_ICONS = {
  Excellence:            '🏆',
  Exploration:           '🔬',
  Entrepreneurship:      '🚀',
  'Ethics and Integrity':'⚖️',
  'Team Spirit':         '🤝',
  'Social Concerns':     '🌍',
};

/* ─── Theme tokens for light / dark section bands ────────────────── */
const themeClasses = (isDark) => ({
  body: isDark ? 'text-white' : 'text-black',
  heading: isDark ? 'text-white' : 'text-skcet-navy',
  muted: isDark ? 'text-white/55' : 'text-skcet-navy/55',
  card: isDark
    ? 'border-white/10 bg-white/[0.05]'
    : 'border-skcet-navy/10 bg-skcet-navy/[0.02]',
  cardHover: isDark ? 'hover:border-white/25' : 'hover:border-skcet-navy/20',
  photoBg: isDark ? 'bg-white/5' : 'bg-skcet-navy/5',
  borderSoft: isDark ? 'border-white/10' : 'border-skcet-navy/10',
  divider: isDark ? 'bg-white/15' : 'bg-skcet-navy/10',
});

/* ─── Reusable card wrapper ──────────────────────────────────────── */
const GlassCard = ({ children, className = '', isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div
      className={`
        relative rounded-xl border ${t.card}
        p-6 sm:p-8
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* ─── Institution Section ────────────────────────────────────────── */
const InstitutionContent = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* ── Top Hero Block: Text + Custom Cut Building Photo ── */}
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-skcet-navy/8 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-skcet-gold mb-3">
            <span>INSTITUTION</span>
            <span className="w-8 h-0.5 bg-skcet-gold rounded-full" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-skcet-navy font-bold tracking-tight leading-tight mb-4">
            Building Futures.<br />Transforming Lives.
          </h2>
          <p className="text-skcet-navy/65 font-light leading-relaxed text-sm sm:text-base">
            {data.intro}
          </p>
        </div>

        {/* Curved photo frame */}
        <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden shadow-lg border border-skcet-navy/10 group">
          <img
            src="/images/about-institution.png"
            onError={(e) => {
              if (e.currentTarget.src.endsWith('.png')) {
                e.currentTarget.src = "/images/about-institution.jpg";
              } else if (e.currentTarget.src.endsWith('.jpg')) {
                e.currentTarget.src = "/images/about-institution.webp";
              } else {
                e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";
              }
            }}
            alt="SKCET Campus Building"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-skcet-dark/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── 3 Feature Cards Row ── */}
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-skcet-navy/8 hover:border-skcet-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-full bg-amber-50 text-skcet-gold flex items-center justify-center mb-4 group-hover:bg-skcet-gold group-hover:text-white transition-all duration-300">
              <GraduationCap size={22} />
            </div>
            <h3 className="font-display text-lg font-bold text-skcet-navy mb-2">Transformative Education</h3>
            <p className="text-xs text-skcet-navy/60 font-light leading-relaxed">
              Pioneer in offering exclusive B.Tech in Computer Science and Business Systems in partnership with TCS Ltd.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-skcet-navy/5 flex items-center text-xs font-semibold text-skcet-gold group-hover:translate-x-1 transition-transform">
            Read More <ArrowRight size={13} className="ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-skcet-navy/8 hover:border-skcet-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-full bg-amber-50 text-skcet-gold flex items-center justify-center mb-4 group-hover:bg-skcet-gold group-hover:text-white transition-all duration-300">
              <Globe size={22} />
            </div>
            <h3 className="font-display text-lg font-bold text-skcet-navy mb-2">Global Outlook</h3>
            <p className="text-xs text-skcet-navy/60 font-light leading-relaxed">
              Nurturing global citizens through industry collaborations, research excellence and international partnerships.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-skcet-navy/5 flex items-center text-xs font-semibold text-skcet-gold group-hover:translate-x-1 transition-transform">
            Read More <ArrowRight size={13} className="ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-skcet-navy/8 hover:border-skcet-gold/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-full bg-amber-50 text-skcet-gold flex items-center justify-center mb-4 group-hover:bg-skcet-gold group-hover:text-white transition-all duration-300">
              <Award size={22} />
            </div>
            <h3 className="font-display text-lg font-bold text-skcet-navy mb-2">Excellence Recognized</h3>
            <p className="text-xs text-skcet-navy/60 font-light leading-relaxed">
              A legacy of academic excellence, innovation and holistic development reflected in our achievements and rankings.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-skcet-navy/5 flex items-center text-xs font-semibold text-skcet-gold group-hover:translate-x-1 transition-transform">
            Read More <ArrowRight size={13} className="ml-1" />
          </div>
        </div>
      </div>

      {/* ── Dark Navy Bottom Stats Strip ── */}
      <div className="bg-skcet-dark text-white rounded-2xl p-6 shadow-xl border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <Trophy size={24} className="text-skcet-gold flex-shrink-0" />
            <div>
              <div className="font-display text-2xl font-bold text-white">28+</div>
              <div className="text-[11px] text-white/60 font-light leading-tight">Years of Excellence</div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <Users size={24} className="text-skcet-gold flex-shrink-0" />
            <div>
              <div className="font-display text-2xl font-bold text-white">10000+</div>
              <div className="text-[11px] text-white/60 font-light leading-tight">Students Empowered</div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <UserCheck size={24} className="text-skcet-gold flex-shrink-0" />
            <div>
              <div className="font-display text-2xl font-bold text-white">500+</div>
              <div className="text-[11px] text-white/60 font-light leading-tight">Experienced Faculty</div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <Building2 size={24} className="text-skcet-gold flex-shrink-0" />
            <div>
              <div className="font-display text-2xl font-bold text-white">50+</div>
              <div className="text-[11px] text-white/60 font-light leading-tight">Programs Offered</div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:pl-4">
            <Globe size={24} className="text-skcet-gold flex-shrink-0" />
            <div>
              <div className="font-display text-2xl font-bold text-white">20+</div>
              <div className="text-[11px] text-white/60 font-light leading-tight">Global Partnerships</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Management Section ─────────────────────────────────────────── */
const ManagementContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-10">
      {data.members.map((member) => (
        <GlassCard key={member.name} isDark={isDark} className="flex flex-col md:flex-row gap-8 items-start hover:border-skcet-gold/25">
          <div className="w-full md:w-48 flex-shrink-0">
            <div className={`w-36 h-44 mx-auto md:mx-0 rounded-xl overflow-hidden border-2 border-skcet-gold/30 ${t.photoBg} shadow-lg`}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-display text-xl sm:text-2xl ${t.heading} font-semibold`}>{member.name}</h3>
            <p className="text-skcet-gold text-xs sm:text-sm uppercase tracking-wider font-medium mt-1 mb-4">{member.title}</p>
            <div className="space-y-3">
              {member.bio.map((para, i) => (
                <p key={i} className={`${t.body} font-light leading-relaxed text-sm`}>{para}</p>
              ))}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

/* ─── Principal Section ──────────────────────────────────────────── */
const PrincipalContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-10">
      <GlassCard isDark={isDark} className="flex flex-col md:flex-row gap-8 items-start border-skcet-gold/25">
        <div className="w-full md:w-52 flex-shrink-0">
          <div className={`w-40 h-48 mx-auto md:mx-0 rounded-xl overflow-hidden border-2 border-skcet-gold/30 ${t.photoBg} shadow-lg`}>
            <img
              src="/images/principal.webp"
              onError={(e) => {
                if (e.currentTarget.src.endsWith('.webp')) {
                  e.currentTarget.src = "/images/principal.png";
                } else if (e.currentTarget.src.endsWith('.png')) {
                  e.currentTarget.src = "/images/principal.jpg";
                } else {
                  e.currentTarget.src = data.image;
                }
              }}
              alt={data.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-2xl sm:text-3xl ${t.heading} font-semibold`}>{data.name}</h3>
          <p className="text-skcet-gold/80 text-xs uppercase tracking-wider mt-2 font-medium">{data.credentials}</p>
          <p className={`${t.body} text-sm mt-3`}>{data.designation}</p>
          <p className={`${t.muted} text-xs mt-1 leading-relaxed`}>{data.tagline}</p>
          <p className={`${t.muted} text-xs mt-3 italic border-t ${t.borderSoft} pt-3`}>{data.awards}</p>
        </div>
      </GlassCard>

      <div className="space-y-4">
        <h3 className="text-sm uppercase tracking-widest text-skcet-gold font-semibold mb-4">Principal&apos;s Message</h3>
        {data.message.map((para, i) => (
          <p key={i} className={`${t.body} font-light leading-relaxed text-base`}>{para}</p>
        ))}
      </div>

      <div className="pt-4">
        <h3 className="text-sm uppercase tracking-widest text-skcet-gold font-semibold mb-6">Institutional Rankings</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.rankings.map((r, i) => (
            <motion.div
              key={i}
              className={`${t.card} border rounded-xl p-5 text-center hover:border-skcet-gold/40 hover:bg-skcet-gold/[0.06] transition-all duration-300 shadow-sm`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">{r.rank}</div>
              <p className={`${t.muted} text-xs mt-2 leading-relaxed`}>{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Core Values Section ────────────────────────────────────────── */
const CoreValuesContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-8">
      <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg`}>{data.intro}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.values.map((v) => (
          <motion.div
            key={v.name}
            className={`group relative rounded-xl border ${t.card} p-6 hover:border-skcet-gold/40 hover:bg-skcet-gold/[0.06] transition-all duration-300`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h4 className={`font-display ${t.heading} font-semibold text-base mb-2 group-hover:text-skcet-gold transition-colors`}>{v.name}</h4>
            <p className={`${t.body} text-sm font-light leading-relaxed`}>{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── CSR Section ────────────────────────────────────────────────── */
const CSRContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-8">
      <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg`}>{data.intro}</p>
      <div className="space-y-3.5">
        {data.activities.map((activity, i) => (
          <motion.div
            key={i}
            className={`flex gap-4 items-start rounded-xl border ${t.card} p-5 hover:border-skcet-gold/25 hover:bg-skcet-gold/[0.05] transition-all duration-300`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <span className="text-skcet-gold mt-0.5 flex-shrink-0 text-base">◆</span>
            <p className={`${t.body} font-light leading-relaxed text-sm sm:text-base`}>{activity}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── Achievements: Recent Highlights Smooth Slideshow (Pure Image & Title) ─── */
const SLIDE_DURATION = 4000; // 4 seconds per slide

const RecentHighlightsContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  const slides = data?.slides || (data?.items ? [data.featured, ...data.items].filter(Boolean) : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Continuous auto-advancing slideshow
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [slides.length, currentIndex]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <div className="space-y-4">
      {/* Pure Slideshow Container */}
      <div
        className={`
          relative w-full rounded-2xl overflow-hidden border ${t.card}
          h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px]
          shadow-2xl select-none
        `}
      >
        {/* Animated Image Slide with smooth crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Title - Cleanly overlayed at the Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {currentSlide.title}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ─── Achievements: Yearly Institutional Content (Compact Academic Year Tab View) ─── */
const YearlyAchievementsContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  const yearsList = (data?.years || []).map((y) => y.year);
  const defaultYear = yearsList[0] || '2025';
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Records' },
    { id: 'rankings', label: 'Rankings' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'collaborations', label: 'MoUs & Partners' },
    { id: 'innovation', label: 'Innovation & IIC' },
    { id: 'academics', label: 'Academics & NBA' },
    { id: 'awards', label: 'Awards & Honors' },
  ];

  const currentYearData = (data?.years || []).find((y) => y.year === selectedYear);
  const currentHighlights = (currentYearData?.highlights || []).filter(
    (h) => selectedCategory === 'all' || h.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {data.intro && (
        <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg max-w-4xl`}>
          {data.intro}
        </p>
      )}

      {/* Year Tabs Bar */}
      <div className={`p-4 sm:p-5 rounded-xl border ${t.borderSoft} ${isDark ? 'bg-white/[0.02]' : 'bg-skcet-navy/[0.02]'} space-y-4`}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-xs uppercase tracking-wider ${t.muted} font-semibold`}>
            Select Academic Year:
          </span>
          <span className="text-xs font-mono text-skcet-gold font-medium">
            Displaying Year {selectedYear} ({currentHighlights.length} {currentHighlights.length === 1 ? 'Record' : 'Records'})
          </span>
        </div>

        {/* Scrollable Year Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {yearsList.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`
                px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 flex-shrink-0 cursor-pointer
                ${selectedYear === year
                  ? 'bg-skcet-gold text-skcet-dark shadow-sm scale-105'
                  : isDark
                    ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                    : 'bg-skcet-navy/5 text-skcet-navy/70 hover:bg-skcet-navy/10 hover:text-skcet-navy border border-skcet-navy/10'}
              `}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 border-t border-skcet-gold/15">
          <span className={`text-[11px] uppercase tracking-wider ${t.muted} font-semibold flex-shrink-0 mr-2`}>
            Filter By:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                px-2.5 py-1 rounded text-xs transition-all duration-200 flex-shrink-0 cursor-pointer
                ${selectedCategory === cat.id
                  ? 'text-skcet-gold font-semibold bg-skcet-gold/10 border border-skcet-gold/30'
                  : isDark
                    ? 'text-white/50 hover:text-white/80'
                    : 'text-skcet-navy/50 hover:text-skcet-navy/80'}
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Year Display (Compact & Clean) */}
      <div className="space-y-3">
        {currentHighlights.length > 0 ? (
          <div className="space-y-3">
            {currentHighlights.map((h, idx) => (
              <div
                key={idx}
                className={`
                  p-4 sm:p-5 rounded-lg border ${t.borderSoft}
                  ${isDark ? 'bg-white/[0.015] hover:bg-white/[0.035]' : 'bg-skcet-navy/[0.015] hover:bg-skcet-navy/[0.03]'}
                  transition-colors duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3
                `}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-skcet-gold mt-0.5 text-xs flex-shrink-0">◆</span>
                  <p className={`${t.body} font-light leading-relaxed text-sm sm:text-[15px]`}>
                    {h.text}
                  </p>
                </div>

                {h.tag && (
                  <span className="self-start sm:self-auto px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded border border-skcet-gold/30 bg-skcet-gold/10 text-skcet-gold flex-shrink-0">
                    {h.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-10 border ${t.borderSoft} rounded-xl`}>
            <p className={t.muted}>No records match the selected category for {selectedYear}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Achievements: Rankings & Recognitions (Formal Accreditations Matrix) ─── */
const RankingsContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-10">
      {data.intro && (
        <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg max-w-4xl`}>
          {data.intro}
        </p>
      )}

      {/* Official Rankings Matrix Table */}
      <div className={`overflow-x-auto rounded-xl border ${t.borderSoft} shadow-sm`}>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className={`border-b ${t.borderSoft} ${isDark ? 'bg-white/[0.04]' : 'bg-skcet-navy/[0.04]'}`}>
              <th className={`py-3.5 px-4 sm:px-6 font-mono text-xs font-bold uppercase tracking-wider text-skcet-gold`}>
                Ranking Body / Agency
              </th>
              <th className={`py-3.5 px-4 sm:px-6 font-mono text-xs font-bold uppercase tracking-wider ${t.heading}`}>
                Standing / Recognition
              </th>
              <th className={`py-3.5 px-4 sm:px-6 font-mono text-xs font-bold uppercase tracking-wider ${t.heading} hidden md:table-cell`}>
                Category & Scope
              </th>
              <th className={`py-3.5 px-4 sm:px-6 font-mono text-xs font-bold uppercase tracking-wider ${t.heading} hidden lg:table-cell`}>
                Key Landmark
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-skcet-gold/10">
            {data.rankCards.map((card, i) => (
              <tr
                key={i}
                className={`
                  transition-colors
                  ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-skcet-navy/[0.02]'}
                `}
              >
                <td className="py-4 px-4 sm:px-6 align-top">
                  <span className="font-semibold text-skcet-gold block">{card.title}</span>
                  <span className={`text-xs ${t.muted} block mt-0.5`}>{card.sub}</span>
                </td>
                <td className="py-4 px-4 sm:px-6 align-top font-display text-base font-semibold text-gradient-gold">
                  {card.rank}
                </td>
                <td className="py-4 px-4 sm:px-6 align-top hidden md:table-cell">
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-skcet-gold/10 border border-skcet-gold/20 text-skcet-gold">
                    {card.badge}
                  </span>
                </td>
                <td className={`py-4 px-4 sm:px-6 align-top text-xs font-light ${t.body} leading-relaxed hidden lg:table-cell max-w-xs`}>
                  {card.highlight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NIRF Track Record Timeline Ledger */}
      <div className={`p-6 sm:p-8 rounded-xl border ${t.borderSoft} ${isDark ? 'bg-white/[0.02]' : 'bg-skcet-navy/[0.02]'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-skcet-gold/20">
          <div>
            <h3 className={`font-display text-lg sm:text-xl font-semibold ${t.heading}`}>
              National Institutional Ranking Framework (NIRF) Track Record
            </h3>
            <p className={`text-xs ${t.muted} mt-0.5`}>Ministry of Education, Government of India</p>
          </div>
          <span className="px-2.5 py-1 text-xs font-mono text-skcet-gold bg-skcet-gold/10 rounded border border-skcet-gold/30 self-start sm:self-auto">
            Official NIRF Timeline
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.nirfJourney.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${t.borderSoft} ${isDark ? 'bg-black/30' : 'bg-white'}`}
            >
              <span className="text-sm font-mono font-bold text-skcet-gold block">{item.year}</span>
              <p className={`text-xs ${t.body} font-light mt-1.5 leading-relaxed`}>{item.rank}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Achievements: Historical Milestones (Foundational Journey Ledger) ─── */
const HistoricalMilestonesContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-10">
      {data.intro && (
        <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg max-w-4xl`}>
          {data.intro}
        </p>
      )}

      {/* Foundational Timeline List */}
      <div className="space-y-8 relative">
        {data.milestones.map((m) => (
          <div key={m.year} className="grid md:grid-cols-12 gap-3 md:gap-6 items-start pb-6 border-b border-skcet-gold/15">
            <div className="md:col-span-3">
              <span className="text-2xl font-mono font-bold text-skcet-gold">
                {m.year}
              </span>
            </div>
            <div className="md:col-span-9">
              <ul className="space-y-2">
                {m.items.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 text-sm sm:text-[15px] ${t.body} font-light leading-relaxed`}>
                    <span className="text-skcet-gold text-xs mt-1.5 flex-shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Generic Section ────────────────────────────────────────────── */
const GenericContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-6">
      {data.intro && (
        <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg`}>{data.intro}</p>
      )}
      {data.note && (
        <GlassCard isDark={isDark} className="border-skcet-gold/20 bg-skcet-gold/[0.06]">
          <p className={`${t.body} text-sm italic`}>{data.note}</p>
        </GlassCard>
      )}
    </div>
  );
};

/* ─── Achievements: Department Achievements (Card Grid → links to dept pages) ─── */
const DepartmentAchievementsContent = ({ data }) => {
  const departments = data?.departments || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {departments.map((dept) => (
        <Link
          key={dept.id}
          to={`/achievements/department-achievements/${dept.id}`}
          className="flex items-center justify-between p-4 rounded-xl border border-skcet-navy/10 bg-white hover:border-skcet-gold/50 hover:shadow-md hover:shadow-skcet-gold/8 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-10 h-10 rounded-lg bg-skcet-navy/6 text-skcet-navy/65 border border-skcet-navy/10 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-skcet-gold group-hover:text-white group-hover:border-skcet-gold transition-all duration-200">
              {dept.code}
            </span>
            <span className="font-semibold text-sm text-skcet-navy group-hover:text-skcet-gold transition-colors leading-snug">
              {dept.name}
            </span>
          </div>
          <ArrowRight size={15} className="text-skcet-navy/25 group-hover:text-skcet-gold group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
        </Link>
      ))}
    </div>
  );
};


/* ─── Content Renderers ──────────────────────────────────────────── */
const renderAboutContent = (anchorId, data, isDark = false) => {
  if (!data) return null;

  switch (anchorId) {
    case 'institution':
      return <InstitutionContent data={data} isDark={isDark} />;
    case 'management':
      return <ManagementContent data={data} isDark={isDark} />;
    case 'principal':
      return <PrincipalContent data={data} isDark={isDark} />;
    case 'core-values':
      return <CoreValuesContent data={data} isDark={isDark} />;
    case 'csr':
      return <CSRContent data={data} isDark={isDark} />;
    default:
      return <GenericContent data={data} isDark={isDark} />;
  }
};

const renderAchievementsContent = (anchorId, data, isDark = false) => {
  if (!data) return null;

  switch (anchorId) {
    case 'recent-highlights':
    case 'highlights':
      return <RecentHighlightsContent data={data} isDark={isDark} />;
    case 'institutional-achievements':
    case 'institutional':
      return <YearlyAchievementsContent data={data} isDark={isDark} />;
    case 'rankings':
      return <RankingsContent data={data} isDark={isDark} />;
    case 'historical-milestones':
    case 'milestones':
      return <HistoricalMilestonesContent data={data} isDark={isDark} />;
    case 'department-achievements':
    case 'department':
    case 'departments':
      return <DepartmentAchievementsContent data={data} isDark={isDark} />;
    default:
      return <GenericContent data={data} isDark={isDark} />;
  }
};

/* ─── Icon map for Achievements sidebar ─────────────────────────────────── */
const ACHIEVEMENTS_ICONS = {
  'recent-highlights':          <Sparkles size={18} />,
  'institutional-achievements': <Trophy size={18} />,
  'institutional':              <Trophy size={18} />,
  'rankings':                   <BarChart2 size={18} />,
  'historical-milestones':      <Clock size={18} />,
  'milestones':                 <Clock size={18} />,
  'department-achievements':    <Users size={18} />,
  'department':                 <Users size={18} />,
  'departments':                <Users size={18} />,
};

/* ─── Icon map for About sidebar ─────────────────────────────────────────── */
const ABOUT_ICONS = {
  'institution':  <Building2 size={18} />,
  'management':   <Users size={18} />,
  'principal':    <UserCheck size={18} />,
  'core-values':  <Award size={18} />,
  'csr':          <HeartHandshake size={18} />,
};

const AboutHero = () => (
  <div className="bg-white border-b border-skcet-navy/8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-light uppercase tracking-widest text-skcet-gold/70 mb-3">
            <Link to="/" className="hover:text-skcet-gold transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-skcet-gold font-semibold">About</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-skcet-navy font-bold tracking-tight leading-none mb-3">
            About
          </h1>
          <div className="w-16 h-1 bg-skcet-gold rounded-full" />
        </div>
        <p className="text-skcet-navy/55 text-sm max-w-md italic font-light border-l-2 border-skcet-gold/40 pl-4 py-1">
          “ At SKCET, we don't just educate — we inspire innovation, nurture talent and build leaders for a better tomorrow. ”
        </p>
      </div>
    </div>
  </div>
);

const AchievementsHero = () => (
  <div className="relative bg-white border-b border-skcet-navy/8 overflow-hidden">
    {/* Right: full-bleed blended image */}
    <div
      className="hidden lg:block absolute inset-y-0 right-0 w-[46%] h-full pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 15%, black 40%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 15%, black 40%)',
      }}
    >
      <img
        src="/images/achievements-hero.jpg.webp"
        onError={(e) => {
          if (e.currentTarget.src.endsWith('.jpg.webp')) {
            e.currentTarget.src = "/images/achievements-hero.jpg";
          } else if (e.currentTarget.src.endsWith('.jpg')) {
            e.currentTarget.src = "/images/achievements-hero.png";
          } else if (e.currentTarget.src.endsWith('.png')) {
            e.currentTarget.src = "/images/achievements-hero.webp";
          } else {
            e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";
          }
        }}
        alt="SKCET Campus Achievements"
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[240px] lg:min-h-[280px]">
        <div className="flex-1 flex flex-col justify-center py-10 lg:py-12 pr-0 lg:pr-12 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-light uppercase tracking-widest text-skcet-gold/70 mb-4">
            <Link to="/" className="hover:text-skcet-gold transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-skcet-gold font-semibold">Achievements</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-skcet-navy font-bold tracking-tight leading-none mb-3">
            Achievements
          </h1>

          <p className="text-skcet-gold font-medium text-sm sm:text-base mb-3 flex items-center gap-2 flex-wrap">
            <span>Celebrating Excellence</span>
            <span className="w-1 h-1 rounded-full bg-skcet-gold inline-block" />
            <span>Recognizing Progress</span>
            <span className="w-1 h-1 rounded-full bg-skcet-gold inline-block" />
            <span>Inspiring Tomorrow</span>
          </p>
          <p className="text-skcet-navy/55 font-light leading-relaxed text-sm sm:text-base">
            A journey of innovation, dedication and success — showcasing the remarkable milestones of SKCET.
          </p>
        </div>
      </div>
    </div>
  </div>
);

/**
 * SectionPage
 * ──────────────────────────────────────────────────────────────────
 * A generic page template for main navigation sections (e.g., About).
 * About uses alternating full-bleed section bands (white / header blue).
 * ──────────────────────────────────────────────────────────────────
 */
const SectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const rootPath = `/${pathParts[0]}`;

  const currentSection = NAV_ITEMS.find((item) => item.path === rootPath);
  const [activeSectionId, setActiveSectionId] = useState('');

  useEffect(() => {
    if (!currentSection || !currentSection.children || currentSection.children.length === 0) return;

    const subPath = location.pathname;

    const matchingChild = currentSection.children.find((c) => {
      const cid = c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const pathEnd = c.path?.split('/').pop();
      const currentEnd = subPath.split('/').pop();
      return (
        c.path === subPath ||
        cid === currentEnd ||
        pathEnd === currentEnd
      );
    });

    if (matchingChild) {
      const cid = matchingChild.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setActiveSectionId(cid);
    } else {
      const defaultId = currentSection.children[0].label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setActiveSectionId(defaultId);
    }
  }, [currentSection, location.pathname]);

  if (!currentSection) {
    return (
      <main className="min-h-screen bg-skcet-dark flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4">Section not found</h1>
          <Link to="/" className="text-skcet-gold hover:underline">Return to Home</Link>
        </div>
      </main>
    );
  }

  const isAbout = currentSection.id === 'about';
  const isAchievements = currentSection.id === 'achievements';
  const isThemedSection = isAbout || isAchievements;

  const pageBg = isThemedSection ? 'bg-white' : 'bg-[#0a0f1d]';
  const headingColor = isThemedSection ? 'text-skcet-navy' : 'text-white';
  const mutedText = isThemedSection ? 'text-skcet-navy/50' : 'text-white/40';
  const bodyText = isThemedSection ? 'text-black' : 'text-white/60';
  const navIdle = isThemedSection
    ? 'bg-skcet-navy/5 text-skcet-navy/70 hover:bg-skcet-navy/10 hover:text-skcet-navy border border-skcet-navy/10'
    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5';
  const borderMuted = isThemedSection ? 'border-skcet-navy/10' : 'border-white/10';

  return (
    <main className={`min-h-screen ${pageBg} ${isThemedSection ? 'pt-20' : 'pt-24'} pb-0`}>

      {/* ── Custom hero header for About & Achievements ── */}
      {isAchievements ? (
        <AchievementsHero />
      ) : isAbout ? (
        <AboutHero />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-xs font-light uppercase tracking-widest text-skcet-gold/60 mb-3">
              <Link to="/" className="hover:text-skcet-gold transition-colors">Home</Link>
              <span>/</span>
              <span className="text-skcet-gold">{currentSection.label}</span>
            </div>
            <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl ${headingColor} font-semibold tracking-tight`}>
              {currentSection.label}
            </h1>
            <div className="w-16 h-1 bg-skcet-gold mt-6 rounded-full" />
          </motion.div>
        </div>
      )}

      {/* ── Mobile Horizontal Sticky Quick-Nav ── */}
      {currentSection.children && currentSection.children.length > 0 && (
        <div className={`lg:hidden sticky top-20 z-30 ${isThemedSection ? 'bg-white/95' : 'bg-[#0a0f1d]/90'} border-y ${borderMuted} px-4 py-3`}>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {currentSection.children.map((child, index) => {
              const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const isActive = activeSectionId === anchorId;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (child.path) navigate(child.path);
                    setActiveSectionId(anchorId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`
                    px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer
                    ${isActive
                      ? 'bg-skcet-gold text-skcet-dark font-semibold shadow-md shadow-skcet-gold/20'
                      : navIdle}
                  `}
                >
                  <span className="opacity-50 mr-1.5 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  {child.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isThemedSection ? (
        /* ── Themed Sections (About, Achievements): tab-panel layout — one section visible at a time ── */
        (() => {
          const activeIndex = Math.max(
            0,
            (currentSection.children || []).findIndex(
              (c) => c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeSectionId
            )
          );
          const isAch = currentSection.id === 'achievements';
          const activeChild = currentSection.children[activeIndex];
          const anchorId = activeChild?.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
          const pathEnd = activeChild?.path?.split('/').pop();
          const isDark = (isAch || isAbout) ? false : activeIndex % 2 === 1;
          const t = themeClasses(isDark);
          const contentData = currentSection.id === 'about'
            ? ABOUT_CONTENT[anchorId]
            : currentSection.id === 'achievements'
            ? (ACHIEVEMENTS_CONTENT[anchorId] || ACHIEVEMENTS_CONTENT[pathEnd])
            : null;

          return (
            <div className={`min-h-[calc(100vh-64px)] ${
              (isAch || isAbout) ? 'bg-white' : isDark ? 'bg-skcet-dark' : 'bg-white'
            } transition-colors duration-300`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-0 lg:gap-8">

                  {/* ── Sticky Sidebar ── */}
                  <aside className="hidden lg:flex flex-col flex-shrink-0 w-56">
                    <div className={`sticky top-28 ${isThemedSection ? 'h-[440px] flex flex-col justify-between py-1' : 'pt-4 pb-8'}`}>
                      <nav aria-label="Section topics" className={isThemedSection ? 'h-full flex flex-col justify-between' : ''}>
                        <ul className={`relative flex flex-col ${
                          isThemedSection ? 'h-full justify-between' : ''
                        }`}>
                          {isThemedSection && (
                            <span
                              className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-skcet-navy/15 z-0"
                              aria-hidden="true"
                            />
                          )}
                          {currentSection.children.map((child, index) => {
                            const cid = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            const isActive = activeSectionId === cid;
                            const num = String(index + 1).padStart(2, '0');
                            const icon = isAch ? ACHIEVEMENTS_ICONS[cid] : ABOUT_ICONS[cid];
                            return (
                              <li key={index} className="relative z-10">
                                {isThemedSection ? (
                                  /* About & Achievements: icon + label pill style */
                                  <button
                                    onClick={() => {
                                      if (child.path) navigate(child.path);
                                      setActiveSectionId(cid);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`
                                      group w-full flex items-center gap-3 px-3.5 py-3 rounded-xl
                                      text-left cursor-pointer transition-all duration-200
                                      ${isActive
                                        ? 'bg-amber-50 border border-skcet-gold/45 shadow-sm'
                                        : 'hover:bg-skcet-navy/5 border border-transparent'}
                                    `}
                                  >
                                    <span className={`
                                      w-7 h-7 rounded-full flex items-center justify-center
                                      text-[11px] font-mono font-bold flex-shrink-0 transition-all duration-200
                                      ${isActive
                                        ? 'bg-skcet-gold text-white shadow-sm'
                                        : 'bg-skcet-navy/8 text-skcet-navy/60 group-hover:bg-skcet-gold/20 group-hover:text-skcet-gold'}
                                    `}>
                                      {num}
                                    </span>
                                    <span className={`flex-shrink-0 transition-colors duration-200 ${
                                      isActive ? 'text-skcet-gold' : 'text-skcet-navy/40 group-hover:text-skcet-navy/70'
                                    }`}>
                                      {icon}
                                    </span>
                                    <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
                                      isActive
                                        ? 'text-skcet-gold'
                                        : 'text-skcet-navy/70 group-hover:text-skcet-navy'
                                    }`}>
                                      {child.label}
                                    </span>
                                  </button>
                                ) : (
                                  /* Default numbered circle style */
                                  <button
                                    onClick={() => {
                                      if (child.path) navigate(child.path);
                                      setActiveSectionId(cid);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="group relative flex items-start gap-4 py-2 pl-0 pr-2 w-full text-left cursor-pointer"
                                  >
                                    <span className="relative z-10 flex-shrink-0 mt-0.5">
                                      <span
                                        className={`
                                          flex items-center justify-center w-8 h-8 rounded-full
                                          text-[10px] font-mono tracking-wider transition-all duration-300
                                          ${isActive
                                            ? 'bg-skcet-gold text-skcet-dark scale-110 shadow-[0_0_0_4px_rgba(201,162,39,0.2)]'
                                            : isDark
                                              ? 'bg-skcet-dark border border-white/30 text-white group-hover:border-skcet-gold/50 group-hover:text-skcet-gold'
                                              : 'bg-white border border-skcet-navy/25 text-black group-hover:border-skcet-gold/50 group-hover:text-skcet-gold'}
                                        `}
                                      >
                                        {num}
                                      </span>
                                    </span>
                                    <span className="pt-1.5 min-w-0">
                                      <span
                                        className={`
                                          block text-[15px] leading-snug transition-all duration-300
                                          ${isActive
                                            ? 'font-display text-skcet-gold font-semibold translate-x-0.5'
                                            : isDark
                                              ? 'font-medium text-white/70 group-hover:text-skcet-gold'
                                              : 'font-medium text-black/70 group-hover:text-skcet-navy'}
                                        `}
                                      >
                                        {child.label}
                                      </span>
                                      {isActive && (
                                        <motion.span
                                          layoutId="topic-underline"
                                          className="mt-1.5 block h-0.5 w-8 bg-skcet-gold rounded-full"
                                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                      )}
                                    </span>
                                  </button>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </nav>
                    </div>
                  </aside>

                  {/* ── Content Panel — only the active topic ── */}
                  <div className={`flex-1 min-w-0 ${
                    isAch ? 'py-8 lg:py-10' : 'py-10 lg:py-14'
                  }`}>
                    <AnimatePresence mode="wait">
                      <motion.section
                        key={activeSectionId}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                      >
                        {isAch ? (
                          /* Achievements: centered decorative section title */
                          <div className="text-center mb-10">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-skcet-navy">
                              {activeChild?.label}
                            </h2>
                            <div className="flex items-center justify-center gap-3 mt-3">
                              <span className="h-px w-12 bg-skcet-gold/40" />
                              <span className="text-skcet-gold text-lg">✦</span>
                              <span className="h-px w-12 bg-skcet-gold/40" />
                            </div>
                          </div>
                        ) : (
                          <h2 className={`font-display text-2xl sm:text-3xl ${t.heading} font-medium mb-8 flex items-center gap-3`}>
                            <span>{activeChild?.label}</span>
                            <span className={`h-px ${t.divider} flex-1 ml-4`} />
                          </h2>
                        )}

                        {contentData ? (
                          currentSection.id === 'achievements'
                            ? renderAchievementsContent(anchorId, contentData, isDark)
                            : renderAboutContent(anchorId, contentData, isDark)
                        ) : (
                          <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''} prose-p:font-light prose-p:leading-relaxed`}>
                            <p className={t.body}>
                              This is the official content section for <strong>{activeChild?.label}</strong> under the {currentSection.label} department.
                            </p>
                            <p className={t.body}>
                              Sri Krishna College of Engineering and Technology is dedicated to providing excellence in {activeChild?.label?.toLowerCase()}
                              by fostering innovation, rigorous academics, and comprehensive skill development.
                            </p>
                            <div className="mt-6 flex items-center not-prose">
                              <button className="text-sm text-skcet-gold hover:text-skcet-gold-light flex items-center gap-2 group transition-colors">
                                Learn more about {activeChild?.label}
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Prev / Next navigation */}
                        <div className={`mt-12 pt-8 border-t flex items-center justify-between gap-4 ${
                          isDark ? 'border-white/10' : 'border-skcet-navy/10'
                        }`}>
                          <button
                            disabled={activeIndex === 0}
                            onClick={() => {
                              const prev = currentSection.children[activeIndex - 1];
                              if (prev) {
                                setActiveSectionId(prev.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                              activeIndex === 0
                                ? 'opacity-30 cursor-not-allowed'
                                : isDark
                                  ? 'text-white/60 hover:text-skcet-gold hover:bg-white/5'
                                  : 'text-black/60 hover:text-skcet-gold hover:bg-skcet-navy/5'
                            }`}
                          >
                            <ChevronLeft size={16} />
                            {activeIndex > 0 ? currentSection.children[activeIndex - 1].label : 'Previous'}
                          </button>
                          <button
                            disabled={activeIndex === currentSection.children.length - 1}
                            onClick={() => {
                              const next = currentSection.children[activeIndex + 1];
                              if (next) {
                                setActiveSectionId(next.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }}
                            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg ${
                              activeIndex === currentSection.children.length - 1
                                ? 'opacity-30 cursor-not-allowed'
                                : isDark
                                  ? 'text-white/60 hover:text-skcet-gold hover:bg-white/5'
                                  : 'text-black/60 hover:text-skcet-gold hover:bg-skcet-navy/5'
                            }`}
                          >
                            {activeIndex < currentSection.children.length - 1 ? currentSection.children[activeIndex + 1].label : 'Next'}
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </motion.section>
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </div>
          );
        })()
      ) : (
        /* ── Other sections: original layout ── */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-12 lg:gap-16 relative pb-24">
          <aside className="hidden lg:block lg:w-56 flex-shrink-0 sticky top-28 self-start z-20">
            {currentSection.children && currentSection.children.length > 0 ? (
              <nav aria-label="Section topics">
                <ul className="relative flex flex-col">
                  <span className="absolute left-[15px] top-3 bottom-3 w-px bg-white/15" aria-hidden="true" />
                  {currentSection.children.map((child, index) => {
                    const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    const isActive = activeSectionId === anchorId;
                    const num = String(index + 1).padStart(2, '0');
                    return (
                      <li key={index}>
                        <a
                          href={`#${anchorId}`}
                          onClick={() => setActiveSectionId(anchorId)}
                          className="group relative flex items-start gap-4 py-3.5"
                        >
                          <span className="relative z-10 flex-shrink-0 mt-0.5">
                            <span
                              className={`
                                flex items-center justify-center w-8 h-8 rounded-full
                                text-[10px] font-mono tracking-wider transition-all duration-300
                                ${isActive
                                  ? 'bg-skcet-gold text-skcet-dark scale-110 shadow-[0_0_0_4px_rgba(201,162,39,0.2)]'
                                  : 'bg-[#0a0f1d] border border-white/20 text-white/40 group-hover:border-skcet-gold/50 group-hover:text-skcet-gold'}
                              `}
                            >
                              {num}
                            </span>
                          </span>
                          <span className="pt-1.5 min-w-0">
                            <span
                              className={`
                                block text-[15px] leading-snug transition-all duration-300
                                ${isActive
                                  ? 'font-display text-skcet-gold font-semibold'
                                  : 'font-medium text-white/45 group-hover:text-white'}
                              `}
                            >
                              {child.label}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : (
              <p className={`text-sm ${mutedText}`}>No subtopics available.</p>
            )}
          </aside>

          <div className="flex-1 min-w-0 pb-32">
            {currentSection.children && currentSection.children.length > 0 ? (
              <div className="space-y-24">
                {currentSection.children.map((child, index) => {
                  const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <motion.section
                      key={index}
                      id={anchorId}
                      className="scroll-mt-28"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="font-display text-2xl sm:text-3xl text-white font-medium mb-6 flex items-center gap-3">
                        <span>{child.label}</span>
                        <span className="h-px bg-white/10 flex-1 ml-4" />
                      </h2>
                      <div className="prose prose-invert prose-p:text-white/60 prose-p:font-light prose-p:leading-relaxed max-w-none">
                        <p>
                          This is the official content section for <strong>{child.label}</strong> under the {currentSection.label} department.
                        </p>
                        <p className={bodyText}>
                          Sri Krishna College of Engineering and Technology is dedicated to providing excellence in {child.label.toLowerCase()}
                          by fostering innovation, rigorous academics, and comprehensive skill development.
                        </p>
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center border border-white/10 rounded-xl bg-white/5">
                <h2 className="text-xl text-white/60 mb-2">Content in development</h2>
                <p className="text-sm text-white/40">Check back later for updates to this section.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default SectionPage;
