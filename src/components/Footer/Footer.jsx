import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowUp, Award } from 'lucide-react';

const SISTER_INSTITUTIONS = [
  { name: 'SRI KRISHNA COLLEGE OF TECHNOLOGY (SKCT)', href: 'https://www.skct.edu.in' },
  { name: 'SRI KRISHNA ARTS AND SCIENCE COLLEGE (SKASC)', href: 'https://www.skasc.ac.in' },
  { name: 'SRI KRISHNA ADITHYA COLLEGE OF ARTS AND SCIENCE (SKACAS)', href: 'https://www.skacas.ac.in' },
  { name: 'SRI KRISHNA POLYTECHNIC COLLEGE (SKPTC)', href: '#' },
];

const INSTITUTIONAL_PORTALS = [
  { label: 'Online Fee Payment Gateway', path: '/online-payment' },
  { label: 'Controller of Examinations & Results', path: '/exams/results' },
  { label: 'Admissions 2026 TNEA Procedure', path: '/admissions/procedure' },
  { label: 'Student Document Portal', path: '/documents' },
  { label: 'Placement Statistics Dashboard', path: '/placements/statistics' },
  { label: 'Compliance & RTI Disclosures', path: '/documents/mandatory-disclosures' },
];

const SITEMAP_COL_1 = [
  { label: 'About', path: '/about' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Online Payment', path: '/online-payment' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Innovations', path: '/innovations' },
  { label: 'Exams', path: '/exams' },
  { label: 'Documents', path: '/documents' },
];

const SITEMAP_COL_2 = [
  { label: 'Governance', path: '/about/management' },
  { label: 'Accreditations', path: '/accreditations' },
  { label: 'Academics', path: '/academics' },
  { label: 'Student Life', path: '/student-life' },
  { label: 'Research', path: '/research' },
  { label: 'Placements', path: '/placements' },
];

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* ── 25 Years Milestone Full-Width Celebration Banner (Right Above Yellow Sister Institutions Bar) ── */}
      {isHomePage && (
        <section aria-label="25 Years of SKCET Milestone" className="w-full relative overflow-hidden bg-white p-0 m-0 leading-none">
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <img
              src="/images/skcet-25-years-footer-banner.png"
              alt="SKCET 25 Years - Transforming Lives to Legacies"
              className="w-full h-auto min-w-full block object-cover sm:object-fill lg:object-cover"
              style={{
                maskImage: 'radial-gradient(ellipse 92% 82% at 50% 50%, black 50%, rgba(0,0,0,0.6) 78%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 92% 82% at 50% 50%, black 50%, rgba(0,0,0,0.6) 78%, transparent 100%)',
              }}
            />
            {/* Radial perimeter soft smudge overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 92% 82% at 50% 50%, transparent 48%, rgba(255,255,255,0.7) 78%, #ffffff 100%)',
              }}
            />
            {/* 4-Directional edge smudge overlays to blend all borders seamlessly */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-white via-white/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-white via-white/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/70 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/70 to-transparent" />
          </div>
        </section>
      )}

      <footer className="w-full bg-[#080e1c] text-white">
        
        {/* ── 1. Top Bar: Sister Institutions ───────────────────────────── */}
        <div className="bg-[#f0b429] py-3.5 px-4 sm:px-8 border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-y-1.5 gap-x-3 text-center">
          {SISTER_INSTITUTIONS.map((inst, index) => (
            <React.Fragment key={inst.name}>
              <a
                href={inst.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] sm:text-xs font-bold tracking-wider text-[#0d1529] hover:text-black transition-colors uppercase"
              >
                {inst.name}
              </a>
              {index < SISTER_INSTITUTIONS.length - 1 && (
                <span className="text-[#0d1529]/40 font-bold hidden md:inline">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── 2. Main Footer Body ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Institutional Identity & Logo (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo + College Title Matching Reference */}
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src="/images/skcet-emblem.png"
                  alt="Sri Krishna College of Engineering and Technology Emblem"
                  className="h-16 sm:h-20 w-auto object-contain flex-shrink-0 filter drop-shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-display font-bold text-white text-lg sm:text-xl leading-tight tracking-tight">
                    Sri Krishna College of<br />Engineering and Technology
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-[11px] font-normal tracking-tight mt-1 leading-snug">
                    ( An Autonomous Institution | Affiliated to Anna University | Accredited by NAAC with A++ Grade )
                  </p>
                </div>
              </div>
            </div>

            {/* Motto */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400/95 tracking-wide pt-1">
              <Award size={16} className="text-amber-400 flex-shrink-0" />
              <span>Motto: <span className="text-amber-300 font-semibold italic">Perfection Through Performance</span></span>
            </div>
          </div>

          {/* Column 2: CAMPUS ADDRESS (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5 pb-1 border-b border-white/10">
              Campus Address
            </h4>

            <div className="space-y-3.5 text-xs text-white/70">
              {/* Location */}
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Kuniamuthur, Coimbatore, Tamil Nadu – 641008
                </p>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-2.5">
                <Phone size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  <a href="tel:04222678001" className="hover:text-amber-300 transition-colors">0422-267 8001 (7 Lines)</a>
                  <span className="text-white/30 mx-1.5">·</span>
                  <a href="tel:04222678012" className="hover:text-amber-300 transition-colors">0422-267 8012</a>
                </p>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-2.5">
                <Mail size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed break-all">
                  <a href="mailto:principal@skcet.ac.in" className="hover:text-amber-300 transition-colors">principal@skcet.ac.in</a>
                  <span className="text-white/30 mx-1.5">·</span>
                  <a href="mailto:placement@skcet.ac.in" className="hover:text-amber-300 transition-colors">placement@skcet.ac.in</a>
                </p>
              </div>

              {/* Website */}
              <div className="flex items-center gap-2.5">
                <Globe size={15} className="text-amber-400 flex-shrink-0" />
                <a href="https://www.skcet.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                  www.skcet.ac.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: INSTITUTIONAL PORTALS (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5 pb-1 border-b border-white/10">
              Institutional Portals
            </h4>

            <ul className="space-y-2.5 text-xs text-white/70">
              {INSTITUTIONAL_PORTALS.map((portal) => (
                <li key={portal.label}>
                  <Link
                    to={portal.path}
                    className="group flex items-start gap-2 hover:text-amber-300 transition-colors duration-200"
                  >
                    <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>{portal.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: SITEMAP SHORTCUTS (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5 pb-1 border-b border-white/10">
              Sitemap Shortcuts
            </h4>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/70">
              {/* Sub-column 1 */}
              <ul className="space-y-2.5">
                {SITEMAP_COL_1.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-amber-300 transition-colors duration-200 block whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Sub-column 2 */}
              <ul className="space-y-2.5">
                {SITEMAP_COL_2.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-amber-300 transition-colors duration-200 block whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* ── 3. Accreditations Badges & Back to Top Row ───────────────── */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <span className="font-bold text-white/90 mr-1 text-xs">Accreditations:</span>

            {/* NAAC */}
            <span className="px-3 py-1 rounded-md bg-[#c9a227]/20 border border-[#c9a227]/70 text-[#f5c742] font-semibold text-[11px] tracking-wide">
              NAAC Grade A++ (3.62)
            </span>

            {/* NBA */}
            <span className="px-3 py-1 rounded-md bg-blue-500/20 border border-blue-500/60 text-blue-300 font-semibold text-[11px] tracking-wide">
              NBA Tier-1 Status
            </span>

            {/* AICTE */}
            <span className="px-3 py-1 rounded-md bg-teal-500/20 border border-teal-500/60 text-teal-300 font-semibold text-[11px] tracking-wide">
              AICTE Approved
            </span>

            {/* NIRF */}
            <span className="px-3 py-1 rounded-md bg-purple-500/20 border border-purple-500/60 text-purple-300 font-semibold text-[11px] tracking-wide">
              NIRF Ranked
            </span>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/15 text-white/80 hover:text-amber-300 hover:border-amber-400/50 hover:bg-white/10 text-xs font-semibold transition-all duration-200 shadow-sm flex-shrink-0 cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="text-amber-400" />
          </button>
        </div>

      </div>

      {/* ── 4. Bottom Legal / Copyright Bar ───────────────────────────── */}
      <div className="bg-[#050a14] border-t border-white/5 py-4 px-4 sm:px-8 text-[11px] text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
          <p>© 2026 Sri Krishna College of Engineering and Technology (SKCET). All rights reserved.</p>

          <div className="flex items-center gap-3">
            <Link to="/documents/policies" className="hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/documents/policies" className="hover:text-amber-300 transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link to="/documents/mandatory-disclosures" className="hover:text-amber-300 transition-colors">
              RTI & Mandatory Disclosures
            </Link>
          </div>
        </div>
      </div>

    </footer>
    </>
  );
};

export default Footer;
