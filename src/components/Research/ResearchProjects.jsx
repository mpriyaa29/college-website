import { useEffect, useRef, useState } from 'react';
import { researchProjects } from '../../data/researchData';
import { motion } from 'framer-motion';

export default function ResearchProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef([]);

  const setRowRef = (index, el) => {
    rowRefs.current[index] = el;
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = rowRefs.current;
      const triggerPoint = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      elements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - triggerPoint);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial active item
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = (index) => {
    setActiveIndex(index);
    const el = rowRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const middleOffset = absoluteTop - (window.innerHeight / 2) + (rect.height / 2);
      window.scrollTo({
        top: middleOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start relative pb-20">
      
      {/* ── LEFT COLUMN: STICKY IMAGE AREA (Desktop only) ── */}
      <div className="hidden lg:block lg:col-span-5 sticky top-28 h-[550px] w-full z-10">
        <div className="h-full w-full flex flex-col gap-3">
          {researchProjects.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={project.id}
                onClick={() => scrollToProject(index)}
                className={`relative overflow-hidden rounded-none transition-all duration-700 ease-in-out cursor-pointer ${
                  isActive
                    ? 'flex-[4.5] opacity-100'
                    : 'flex-[0.8] opacity-30 hover:opacity-55'
                }`}
              >
                {/* Image element with backup placeholder rendering */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback gradient placeholder in case physical image doesn't exist */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-skcet-navy via-[#121b2f] to-[#080d1a] flex items-center justify-center p-4 text-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-white/40">
                    <span className="block font-mono text-xl font-bold text-white mb-1">
                      {String(project.id).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold block">
                      Project Image Placeholder
                    </span>
                  </div>
                </div>

                {/* Subtle description overlay shown on the active large card */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 transition-opacity duration-700"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <h4 className="font-google-sans text-lg sm:text-xl font-bold tracking-wide text-white leading-snug line-clamp-2">
                    {project.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT COLUMN: SCROLLING DETAILS AREA ── */}
      <div className="col-span-12 lg:col-span-7 lg:py-4">
        
        {researchProjects.map((project, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.div
              ref={(el) => setRowRef(index, el)}
              key={project.id}
              onClick={() => scrollToProject(index)}
              className={`scroll-mt-32 py-8 sm:py-10 border-b border-skcet-navy/10 last:border-b-0 transition-all duration-300 cursor-pointer ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Mobile Inline Collapsing/Expanding Image Showcase */}
              <div
                className="lg:hidden w-full overflow-hidden rounded-none transition-all duration-500 mb-5 relative"
                style={{
                  height: isActive ? '220px' : '90px',
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback gradient placeholder for mobile */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-skcet-navy via-[#121b2f] to-[#080d1a] flex items-center justify-center p-4 text-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-white/40">
                    <span className="block font-mono text-lg font-bold text-white mb-0.5">
                      {String(project.id).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-semibold block">
                      Project Image
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Layout */}
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="flex-1 space-y-3">
                  <h3
                    className={`font-google-sans text-xl sm:text-2xl font-bold leading-snug tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-skcet-navy' : 'text-skcet-navy/70'
                    }`}
                  >
                    {project.name}
                  </h3>
                    
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-skcet-navy/50 font-semibold">
                      Lead Investigator
                    </span>
                    <span className="text-sm font-medium text-skcet-navy/80">
                      {project.faculty}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
    </div>
  );
}
