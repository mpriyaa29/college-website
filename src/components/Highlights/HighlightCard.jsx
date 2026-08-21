import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HighlightCard = ({ highlight }) => {
  const { id, title, category, image } = highlight;

  return (
    <Link 
      to={`/highlights/${id}`} 
      className="group block relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-skcet-dark border border-white/10 shadow-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-skcet-gold focus-visible:outline-offset-2"
      aria-label={`View highlight: ${title}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center select-none"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
        {/* Category Label */}
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-skcet-gold mb-2 block">
          {category}
        </span>

        {/* Title */}
        <h3 className="font-display text-base sm:text-lg md:text-xl text-white font-medium leading-snug mb-3 group-hover:-translate-y-0.5 transition-transform duration-300">
          {title}
        </h3>

        {/* Read More Action */}
        <div className="flex items-center text-xs font-semibold text-skcet-gold group-hover:text-white transition-colors duration-300 mt-1">
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-2">
            Read details
          </span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default HighlightCard;
