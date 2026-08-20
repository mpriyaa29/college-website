import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../data/navigation';
import ABOUT_CONTENT from '../../data/aboutContent';
import { ArrowRight } from 'lucide-react';

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
const InstitutionContent = ({ data, isDark = false }) => {
  const t = themeClasses(isDark);
  return (
    <div className="space-y-8">
      <p className={`${t.body} font-light leading-relaxed text-base sm:text-lg`}>{data.intro}</p>

      {data.subsections.map((sub) => (
        <GlassCard key={sub.title} isDark={isDark} className={t.cardHover}>
          <h3 className="text-lg font-semibold text-skcet-gold mb-3">{sub.title}</h3>
          <p className={`${t.body} font-light leading-relaxed`}>{sub.body}</p>
        </GlassCard>
      ))}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <GlassCard isDark={isDark} className="border-skcet-gold/25 bg-skcet-gold/[0.06]">
          <h3 className="text-sm uppercase tracking-widest text-skcet-gold font-semibold mb-3 flex items-center gap-2">
            <span>✦</span> Vision
          </h3>
          <p className={`${t.body} font-light leading-relaxed italic`}>{data.vision}</p>
        </GlassCard>
        <GlassCard isDark={isDark} className="border-skcet-gold/25 bg-skcet-gold/[0.06]">
          <h3 className="text-sm uppercase tracking-widest text-skcet-gold font-semibold mb-3 flex items-center gap-2">
            <span>✦</span> Mission
          </h3>
          <ul className="space-y-3">
            {data.mission.map((m, i) => (
              <li key={i} className={`flex gap-3 ${t.body} font-light leading-relaxed`}>
                <span className="text-skcet-gold mt-1 flex-shrink-0">▸</span>
                {m}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard isDark={isDark}>
        <h3 className="text-sm uppercase tracking-widest text-skcet-gold font-semibold mb-4">Quality Policy</h3>
        <p className={`${t.body} text-sm mb-4`}>We are committed to produce globally competitive and ethical engineers through the following:</p>
        <div className="flex flex-wrap gap-2.5">
          {data.qualityPolicy.map((p) => (
            <span
              key={p}
              className="px-4 py-2 text-xs tracking-wider uppercase border border-skcet-gold/30 bg-skcet-gold/[0.08] text-skcet-gold rounded-full font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </GlassCard>

      <GlassCard isDark={isDark}>
        <h3 className={`text-lg font-semibold ${t.heading} mb-3`}>The Knowledge Hub</h3>
        <p className={`${t.body} font-light leading-relaxed`}>{data.knowledgeHub}</p>
      </GlassCard>

      <GlassCard isDark={isDark}>
        <h3 className={`text-lg font-semibold ${t.heading} mb-3`}>A Pioneer</h3>
        <p className={`${t.body} font-light leading-relaxed`}>{data.pioneer}</p>
      </GlassCard>
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
              src={data.image}
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
            <div className="text-3xl mb-3">{VALUE_ICONS[v.name] || '✦'}</div>
            <h4 className={`${t.heading} font-semibold text-base mb-2 group-hover:text-skcet-gold transition-colors`}>{v.name}</h4>
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

/* ─── Content Renderer ───────────────────────────────────────────── */
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

/**
 * SectionPage
 * ──────────────────────────────────────────────────────────────────
 * A generic page template for main navigation sections (e.g., About).
 * About uses alternating full-bleed section bands (white / header blue).
 * ──────────────────────────────────────────────────────────────────
 */
const SectionPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const rootPath = `/${pathParts[0]}`;

  const currentSection = NAV_ITEMS.find((item) => item.path === rootPath);
  const [activeSectionId, setActiveSectionId] = useState('');

  useEffect(() => {
    if (!currentSection || !currentSection.children || currentSection.children.length === 0) return;

    const sectionIds = currentSection.children.map((c) =>
      c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    );

    if (sectionIds.length > 0 && !activeSectionId) {
      setActiveSectionId(sectionIds[0]);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

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

  const isAboutSection = currentSection.id === 'about';
  const activeIndex = Math.max(
    0,
    (currentSection.children || []).findIndex(
      (c) => c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') === activeSectionId
    )
  );
  const sidebarOnDark = isAboutSection && activeIndex % 2 === 1;

  const pageBg = isAboutSection ? 'bg-white' : 'bg-[#0a0f1d]';
  const headingColor = isAboutSection ? 'text-skcet-navy' : 'text-white';
  const mutedText = isAboutSection ? 'text-skcet-navy/50' : 'text-white/40';
  const bodyText = isAboutSection ? 'text-black' : 'text-white/60';
  const navIdle = isAboutSection
    ? 'bg-skcet-navy/5 text-skcet-navy/70 hover:bg-skcet-navy/10 hover:text-skcet-navy border border-skcet-navy/10'
    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5';
  const borderMuted = isAboutSection ? 'border-skcet-navy/10' : 'border-white/10';

  return (
    <main className={`min-h-screen ${pageBg} pt-24 pb-0`}>

      {/* ── Page Header ── */}
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

      {/* ── Mobile Horizontal Sticky Quick-Nav ── */}
      {currentSection.children && currentSection.children.length > 0 && (
        <div className={`lg:hidden sticky top-20 z-30 ${isAboutSection ? 'bg-white/95' : 'bg-[#0a0f1d]/90'} border-y ${borderMuted} px-4 py-3`}>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {currentSection.children.map((child, index) => {
              const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const isActive = activeSectionId === anchorId;
              return (
                <a
                  key={index}
                  href={`#${anchorId}`}
                  className={`
                    px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0
                    ${isActive
                      ? 'bg-skcet-gold text-skcet-dark font-semibold shadow-md shadow-skcet-gold/20'
                      : navIdle}
                  `}
                >
                  <span className="opacity-50 mr-1.5 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  {child.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {isAboutSection ? (
        /* ── About: alternating full-bleed bands + sticky rail ── */
        <div className="relative">
          {/* Sticky sidebar overlays the bands */}
          <aside className="hidden lg:block absolute left-0 top-0 bottom-0 z-20 pointer-events-none">
            <div className="sticky top-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
              <nav
                aria-label="Section topics"
                className={`w-56 pointer-events-auto transition-colors duration-300 ${
                  sidebarOnDark ? 'text-white' : 'text-black'
                }`}
              >
                <ul className="relative flex flex-col">
                  <span
                    className={`absolute left-[15px] top-3 bottom-3 w-px transition-colors duration-300 ${
                      sidebarOnDark ? 'bg-white/25' : 'bg-skcet-navy/15'
                    }`}
                    aria-hidden="true"
                  />

                  {currentSection.children.map((child, index) => {
                    const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    const isActive = activeSectionId === anchorId;
                    const num = String(index + 1).padStart(2, '0');

                    return (
                      <li key={index}>
                        <a
                          href={`#${anchorId}`}
                          onClick={() => setActiveSectionId(anchorId)}
                          className="group relative flex items-start gap-4 py-3.5 pl-0 pr-2"
                        >
                          <span className="relative z-10 flex-shrink-0 mt-0.5">
                            <span
                              className={`
                                flex items-center justify-center w-8 h-8 rounded-full
                                text-[10px] font-mono tracking-wider transition-all duration-300
                                ${isActive
                                  ? 'bg-skcet-gold text-skcet-dark scale-110 shadow-[0_0_0_4px_rgba(201,162,39,0.2)]'
                                  : sidebarOnDark
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
                                  : sidebarOnDark
                                    ? 'font-medium text-white group-hover:text-skcet-gold'
                                    : 'font-medium text-black group-hover:text-skcet-navy'}
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
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {currentSection.children.map((child, index) => {
            const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const contentData = ABOUT_CONTENT[anchorId];
            const isDark = index % 2 === 1;
            const t = themeClasses(isDark);

            return (
              <motion.section
                key={index}
                id={anchorId}
                className={`scroll-mt-24 ${isDark ? 'bg-skcet-dark' : 'bg-white'}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45 }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                  <div className="lg:pl-72">
                    <h2 className={`font-display text-2xl sm:text-3xl ${t.heading} font-medium mb-6 flex items-center gap-3`}>
                      <span>{child.label}</span>
                      <span className={`h-px ${t.divider} flex-1 ml-4`} />
                    </h2>

                    {contentData ? (
                      renderAboutContent(anchorId, contentData, isDark)
                    ) : (
                      <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''} prose-p:font-light prose-p:leading-relaxed`}>
                        <p className={t.body}>
                          This is the official content section for <strong>{child.label}</strong> under the {currentSection.label} department.
                        </p>
                        <p className={t.body}>
                          Sri Krishna College of Engineering and Technology is dedicated to providing excellence in {child.label.toLowerCase()}
                          by fostering innovation, rigorous academics, and comprehensive skill development.
                        </p>
                        <div className="mt-6 flex items-center not-prose">
                          <button className="text-sm text-skcet-gold hover:text-skcet-gold-light flex items-center gap-2 group transition-colors">
                            Learn more about {child.label}
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
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
