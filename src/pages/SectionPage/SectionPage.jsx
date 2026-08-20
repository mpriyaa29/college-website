import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../data/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * SectionPage
 * ──────────────────────────────────────────────────────────────────
 * A generic page template for main navigation sections (e.g., About).
 * Renders a sticky sidebar for subtopics and a main content area
 * displaying all the topics vertically on a single page.
 * ──────────────────────────────────────────────────────────────────
 */
const SectionPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const rootPath = `/${pathParts[0]}`;

  // Find the top-level nav item matching the current route
  const currentSection = NAV_ITEMS.find((item) => item.path === rootPath);

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

  return (
    <main className="min-h-screen bg-[#0a0f1d] pt-24 pb-20">
      
      {/* ── Page Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-semibold tracking-tight">
            {currentSection.label}
          </h1>
          <div className="w-16 h-1 bg-skcet-gold mt-6 rounded-full" />
        </motion.div>
      </div>

      {/* ── Layout Container (Sidebar + Content) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
        
        {/* ── Sidebar (Sticky) ── */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-28">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-6">
              Topics
            </h3>
            {currentSection.children && currentSection.children.length > 0 ? (
              <ul className="flex flex-col gap-1 border-l border-white/10">
                {currentSection.children.map((child, index) => {
                  // create an anchor id from the label
                  const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <li key={index}>
                      <a
                        href={`#${anchorId}`}
                        className="
                          block px-4 py-2.5 
                          text-sm font-medium text-white/60 
                          hover:text-white hover:bg-white/5 
                          hover:border-l-2 hover:-ml-[1px] hover:border-skcet-gold
                          transition-all duration-200
                        "
                      >
                        {child.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-white/40">No subtopics available.</p>
            )}
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <div className="flex-1 min-w-0 pb-32">
          {currentSection.children && currentSection.children.length > 0 ? (
            <div className="space-y-24">
              {currentSection.children.map((child, index) => {
                const anchorId = child.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <motion.section
                    key={index}
                    id={anchorId}
                    className="scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="font-display text-2xl sm:text-3xl text-white font-medium mb-6 flex items-center gap-3">
                      {child.label}
                      <span className="h-px bg-white/10 flex-1 ml-4" />
                    </h2>
                    
                    {/* Placeholder Content for the topic */}
                    <div className="prose prose-invert prose-p:text-white/60 prose-p:font-light prose-p:leading-relaxed max-w-none">
                      <p>
                        This is the official content section for <strong>{child.label}</strong> under the {currentSection.label} department. 
                        In the full implementation, this placeholder will be replaced with rich text, images, faculty profiles, or dynamic data fetched from the CMS.
                      </p>
                      <p>
                        Sri Krishna College of Engineering and Technology is dedicated to providing excellence in {child.label.toLowerCase()} 
                        by fostering innovation, rigorous academics, and comprehensive skill development.
                      </p>
                      
                      <div className="mt-6 flex items-center">
                        <button className="text-sm text-skcet-gold hover:text-skcet-gold-light flex items-center gap-2 group transition-colors">
                          Learn more about {child.label}
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.section>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center border border-white/10 rounded-sm bg-white/5">
              <h2 className="text-xl text-white/60 mb-2">Content in development</h2>
              <p className="text-sm text-white/40">Check back later for updates to this section.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default SectionPage;
