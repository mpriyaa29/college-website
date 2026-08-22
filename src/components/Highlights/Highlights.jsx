import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { highlights } from '../../data/highlightsData';
import HighlightCard from './HighlightCard';

const Highlights = () => {
  // Triple clone the array to enable seamless, infinite cyclic scrolling in both directions
  const extendedHighlights = [...highlights, ...highlights, ...highlights];

  // Start in the middle segment (index 5) to allow infinite sliding left or right
  const [currentIndex, setCurrentIndex] = useState(highlights.length);
  const [transitionDuration, setTransitionDuration] = useState(500);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  const isResettingRef = useRef(false);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);  // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);  // Tablet
      } else {
        setItemsPerPage(3);  // Desktop
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play scroll effect
  useEffect(() => {
    if (isHovered || isResettingRef.current) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 2500); // Slides every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovered, currentIndex, itemsPerPage]);

  const nextSlide = () => {
    if (isResettingRef.current) return;
    setTransitionDuration(500);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isResettingRef.current) return;
    setTransitionDuration(500);
    setCurrentIndex((prev) => prev - 1);
  };

  // Seamless cyclic snapping loop at boundaries
  useEffect(() => {
    // Snap when reaching the end of the middle segment
    if (currentIndex >= highlights.length * 2) {
      isResettingRef.current = true;
      const timer = setTimeout(() => {
        setTransitionDuration(0);
        setCurrentIndex(currentIndex - highlights.length);
        
        // Brief timeout to let the browser snap before allowing further transitions
        setTimeout(() => {
          isResettingRef.current = false;
        }, 50);
      }, 500); // matches the 500ms transition duration
      return () => clearTimeout(timer);
    }
    
    // Snap when scrolling left past the middle segment
    if (currentIndex < highlights.length) {
      isResettingRef.current = true;
      const timer = setTimeout(() => {
        setTransitionDuration(0);
        setCurrentIndex(currentIndex + highlights.length);
        
        setTimeout(() => {
          isResettingRef.current = false;
        }, 50);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Map the absolute index (0-14) to active indicator dot (0-4)
  const activeDotIndex = currentIndex % highlights.length;

  return (
    <section 
      className="bg-skcet-dark py-24 px-4 sm:px-8 border-t border-white/5 relative overflow-hidden"
      aria-labelledby="highlights-heading"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial accent */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 30%, rgba(201,162,39,0.2) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Editorial Heading with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-skcet-gold/70 font-semibold mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Highlights
            </motion.p>
            <motion.h2
              id="highlights-heading"
              className="font-display text-3xl md:text-4xl text-white font-medium leading-tight"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Recent achievements, recognitions and milestones from SKCET.
            </motion.h2>
          </div>

          {/* Navigation Controls */}
          <motion.div 
            className="flex gap-3 mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>

        {/* Carousel Slider Viewport */}
        <div className="relative overflow-hidden -mx-4 px-4">
          <div 
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              transition: transitionDuration > 0 ? `transform ${transitionDuration}ms ease-out` : 'none',
            }}
          >
            {extendedHighlights.map((highlight, idx) => (
              <div 
                key={`${highlight.id}-${idx}`}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3 md:px-4"
              >
                <HighlightCard highlight={highlight} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Progress Dots (Fixed 5 dots representing original highlights) */}
        <div className="flex justify-center gap-2 mt-12">
          {highlights.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (isResettingRef.current) return;
                setTransitionDuration(500);
                // Calculate the nearest segment index matching the clicked dot
                const segmentDiff = idx - activeDotIndex;
                setCurrentIndex((prev) => prev + segmentDiff);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeDotIndex ? 'w-8 bg-skcet-gold' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
