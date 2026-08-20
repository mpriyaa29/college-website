import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Printer } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SISTER_INSTITUTIONS = [
  { name: 'Sri Krishna College of Technology',            href: 'https://www.skct.edu.in' },
  { name: 'Sri Krishna Arts And Science College',         href: 'https://www.skasc.ac.in' },
  { name: 'Sri Krishna Adithya College of Arts and Science', href: '#' },
  { name: 'Sri Krishna Polytechnic College',              href: '#' },
];

const QUICK_LINKS = [
  { label: 'About Us',       path: '/about-us/institution/' },
  { label: 'Academics',      path: '/academics/departments/' },
  { label: 'Admissions',     path: '/admissions/' },
  { label: 'Research',       path: '/research/' },
  { label: 'Placements',     path: '/placement/recruiters/' },
  { label: 'Campus Life',    path: '/student-life/facilities/sports/' },
  { label: 'Achievements',   path: '/about-us/achievements/' },
  { label: 'Best Practices', path: '/quick-links/best-practices/' },
];

const LOGO_URL = 'https://skcet.ac.in/wp-content/uploads/2024/08/skcet-logo.png';

// ─── Component ────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer>

    {/* ── Sister Institutions Bar ─────────────────────────────────── */}
    <div className="bg-skcet-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-0 divide-x divide-skcet-dark/20">
          {SISTER_INSTITUTIONS.map((inst) => (
            <a
              key={inst.name}
              href={inst.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-4 py-3
                text-[11px] font-semibold tracking-wide
                text-skcet-dark/85
                hover:text-skcet-dark
                transition-colors duration-200
                text-center
              "
            >
              {inst.name}
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* ── Main Footer ─────────────────────────────────────────────── */}
    <div className="bg-skcet-navy border-t border-skcet-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* ── Logo + college name ── */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="SKCET Logo"
                className="h-14 w-14 object-contain"
                loading="lazy"
              />
              <div>
                <p className="text-white font-semibold text-sm leading-snug">
                  Sri Krishna College of<br />Engineering and Technology
                </p>
                <p className="text-white/35 text-[10px] mt-1 tracking-wide">
                  Autonomous · Anna University Affiliated
                </p>
              </div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs mt-4">
              An institution of excellence in technical education, fostering
              innovation and shaping future engineers since 1998.
            </p>
          </motion.div>

          {/* ── Quick links ── */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-skcet-gold/70 font-medium mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/50 text-xs hover:text-skcet-gold transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-skcet-gold/70 font-medium mb-5">
              Contact
            </h4>
            <div className="space-y-4">

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1.5} className="text-skcet-gold/60 mt-0.5 shrink-0" />
                <p className="text-white/55 text-xs leading-relaxed">
                  Kuniamuthur, Coimbatore,<br />Tamil Nadu — 641 008
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone size={14} strokeWidth={1.5} className="text-skcet-gold/60 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <a
                    href="tel:04222678001"
                    className="block text-white/55 text-xs hover:text-skcet-gold transition-colors duration-200"
                  >
                    0422-267 8001 <span className="text-white/30">(7 Lines)</span>
                  </a>
                  <a
                    href="tel:04222678012"
                    className="block text-white/55 text-xs hover:text-skcet-gold transition-colors duration-200"
                  >
                    0422-267 8012
                  </a>
                </div>
              </div>

              {/* Fax */}
              <div className="flex items-start gap-3">
                <Printer size={14} strokeWidth={1.5} className="text-skcet-gold/60 mt-0.5 shrink-0" />
                <p className="text-white/55 text-xs">0422-267 8020</p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={14} strokeWidth={1.5} className="text-skcet-gold/60 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <a
                    href="mailto:principal@skcet.ac.in"
                    className="block text-white/55 text-xs hover:text-skcet-gold transition-colors duration-200"
                  >
                    principal@skcet.ac.in
                  </a>
                  <a
                    href="mailto:placement@skcet.ac.in"
                    className="block text-white/55 text-xs hover:text-skcet-gold transition-colors duration-200"
                  >
                    placement@skcet.ac.in
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>

    {/* ── Bottom bar ──────────────────────────────────────────────── */}
    <div className="bg-skcet-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white/25 text-[10px] tracking-wide">
          © {new Date().getFullYear()} Sri Krishna College of Engineering and Technology. All rights reserved.
        </p>
        <p className="text-white/20 text-[10px] tracking-wide">
          Autonomous Institution · Affiliated to Anna University · NBA Accredited
        </p>
      </div>
    </div>

  </footer>
);

export default Footer;
