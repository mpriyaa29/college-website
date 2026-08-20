import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { highlightsData } from '../../data/homeData';

const Highlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === highlightsData.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? highlightsData.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, currentIndex]);

  const currentHighlight = highlightsData[currentIndex];

  return (
    <section 
      className="bg-skcet-dark py-24 px-4 sm:px-8 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-skcet-gold/60 font-light mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Highlights
        </motion.p>
        
        <div className="relative rounded-lg overflow-hidden bg-white/5 border border-white/10 flex flex-col md:flex-row h-auto md:h-[500px]">
          {/* Image Section */}
          <div className="w-full md:w-2/3 h-[300px] md:h-full relative overflow-hidden bg-[#0a0f1c]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentHighlight.id}
                src={currentHighlight.image}
                alt={currentHighlight.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-skcet-dark/80 via-transparent to-transparent pointer-events-none md:bg-gradient-to-r md:from-transparent md:to-skcet-dark/90 z-20" />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center relative bg-skcet-dark/50 md:bg-transparent z-10 border-t md:border-t-0 md:border-l border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHighlight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col h-full justify-center"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-skcet-gold mb-4 block">
                  {currentHighlight.category}
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-display text-white font-medium leading-tight mb-6">
                  {currentHighlight.title}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/10">
              <div className="text-white/40 font-light text-sm tracking-widest">
                <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(highlightsData.length).padStart(2, '0')}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                  aria-label="Previous highlight"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                  aria-label="Next highlight"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {highlightsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-skcet-gold' : 'w-2 bg-white/20'
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
