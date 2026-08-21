import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star, ChevronRight } from 'lucide-react';
import ACHIEVEMENTS_CONTENT from '../../data/achievementsContent';

/* ─── Per-department hero images ─────────────────────────────────────────── */
const DEPT_HERO = {
  cse:   'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80',
  it:    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
  aids:  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1600&q=80',
  csbs:  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
  ece:   'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80',
  eee:   'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80',
  mech:  'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1600&q=80',
  mct:   'https://images.unsplash.com/photo-1563770557593-5a7b5e11e987?auto=format&fit=crop&w=1600&q=80',
  civil: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
  csd:   'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80',
  mba:   'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
  sh:    'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1600&q=80',
};

/* ─── Per-department gallery photos ──────────────────────────────────────── */
const DEPT_GALLERY = {
  cse: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  ],
  it: [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  ],
  aids: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=800&q=80',
  ],
  csbs: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  ],
  ece: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&w=800&q=80',
  ],
  eee: [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  ],
  mech: [
    'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  ],
  mct: [
    'https://images.unsplash.com/photo-1563770557593-5a7b5e11e987?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  ],
  civil: [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  ],
  csd: [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=800&q=80',
  ],
  mba: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  ],
  sh: [
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
  ],
};



/* ─── Component ──────────────────────────────────────────────────────────── */
const DepartmentAchievementPage = () => {
  const { deptId } = useParams();
  const allDepts   = ACHIEVEMENTS_CONTENT['department-achievements']?.departments || [];
  const dept       = allDepts.find((d) => d.id === deptId);

  /* 404 state */
  if (!dept) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl text-skcet-navy font-semibold mb-4">Department not found</h1>
          <Link
            to="/achievements/department-achievements"
            className="text-skcet-gold hover:underline flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={16} /> Back to Department Achievements
          </Link>
        </div>
      </main>
    );
  }

  const heroImg    = DEPT_HERO[deptId]    || DEPT_HERO.cse;
  const gallery    = DEPT_GALLERY[deptId] || [];
  const highlights = dept.highlights      || [];
  const currentIdx = allDepts.findIndex((d) => d.id === deptId);
  const prevDept   = allDepts[currentIdx - 1];
  const nextDept   = allDepts[currentIdx + 1];

  return (
    <main className="min-h-screen bg-white pt-20">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden">
        <img src={heroImg} alt={dept.name} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-skcet-dark/95 via-skcet-dark/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-skcet-dark/50 via-transparent to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-light uppercase tracking-widest text-white/60 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-40" />
            <Link to="/achievements" className="hover:text-white transition-colors">Achievements</Link>
            <ChevronRight size={12} className="opacity-40" />
            <Link to="/achievements/department-achievements" className="hover:text-white transition-colors">Departments</Link>
            <ChevronRight size={12} className="opacity-40" />
            <span className="text-skcet-gold font-semibold">{dept.code}</span>
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 text-xs font-mono font-bold bg-skcet-gold text-skcet-dark rounded-md mb-3 tracking-widest shadow-lg">
              {dept.code}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-tight max-w-3xl">
              {dept.name}
            </h1>
            <p className="text-white/55 text-sm mt-2 font-light">
              Department Achievements — Sri Krishna College of Engineering and Technology
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">

          {/* Left: achievements */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Trophy size={22} className="text-skcet-gold flex-shrink-0" />
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-skcet-navy">Key Achievements</h2>
              <span className="h-px bg-skcet-navy/10 flex-1 ml-2" />
            </div>

            <ul className="space-y-4">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-skcet-navy/8 bg-white hover:border-skcet-gold/40 hover:shadow-sm transition-all duration-200 group"
                >
                  <span className="w-7 h-7 rounded-full bg-skcet-gold/10 border border-skcet-gold/25 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-skcet-gold group-hover:border-skcet-gold transition-all duration-200">
                    <Star size={10} className="text-skcet-gold group-hover:text-white transition-colors" />
                  </span>
                  <p className="text-skcet-navy/75 font-light leading-relaxed text-sm sm:text-base">{item}</p>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                to="/achievements/department-achievements"
                className="inline-flex items-center gap-2 text-sm font-medium text-skcet-navy/55 hover:text-skcet-gold transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to all departments
              </Link>
            </div>
          </div>

          {/* Right: gallery + navigation */}
          <div className="space-y-6">

            {/* Gallery */}
            {gallery.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-skcet-gold" />
                  <h3 className="text-sm font-semibold text-skcet-navy/60 uppercase tracking-wider">Gallery</h3>
                </div>
                <div className="space-y-3">
                  {gallery.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="rounded-xl overflow-hidden border border-skcet-navy/8 shadow-sm aspect-video"
                    >
                      <img
                        src={src}
                        alt={dept.name + ' — photo ' + (i + 1)}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next department */}
            {(prevDept || nextDept) && (
              <div className="rounded-xl border border-skcet-navy/10 overflow-hidden">
                {prevDept && (
                  <Link
                    to={'/achievements/department-achievements/' + prevDept.id}
                    className="flex items-center justify-between p-4 hover:bg-amber-50/60 transition-colors group border-b border-skcet-navy/8"
                  >
                    <div>
                      <p className="text-[11px] text-skcet-navy/40 font-semibold uppercase tracking-wider mb-0.5">Previous</p>
                      <p className="text-sm font-semibold text-skcet-navy group-hover:text-skcet-gold transition-colors">{prevDept.name}</p>
                    </div>
                    <ArrowLeft size={16} className="text-skcet-navy/25 group-hover:text-skcet-gold flex-shrink-0 ml-3" />
                  </Link>
                )}
                {nextDept && (
                  <Link
                    to={'/achievements/department-achievements/' + nextDept.id}
                    className="flex items-center justify-between p-4 hover:bg-amber-50/60 transition-colors group"
                  >
                    <div>
                      <p className="text-[11px] text-skcet-navy/40 font-semibold uppercase tracking-wider mb-0.5">Next</p>
                      <p className="text-sm font-semibold text-skcet-navy group-hover:text-skcet-gold transition-colors">{nextDept.name}</p>
                    </div>
                    <ChevronRight size={16} className="text-skcet-navy/25 group-hover:text-skcet-gold flex-shrink-0 ml-3" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DepartmentAchievementPage;
