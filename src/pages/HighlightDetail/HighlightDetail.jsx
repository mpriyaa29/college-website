import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { highlights } from '../../data/highlightsData';

const HighlightDetail = () => {
  const { id } = useParams();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find the matching highlight item
  const highlightItem = highlights.find((item) => item.id === parseInt(id, 10));

  if (!highlightItem) {
    return (
      <main className="min-h-screen bg-skcet-dark flex items-center justify-center pt-24 px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl text-white font-medium mb-4">Highlight Not Found</h2>
          <p className="text-white/40 text-sm mb-8">The highlight item you are looking for does not exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-skcet-gold hover:text-skcet-gold-light transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const { title, category, image, longDescription } = highlightItem;

  return (
    <main className="min-h-screen bg-skcet-dark pt-32 pb-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background glow element */}
      <div
        className="absolute top-0 right-0 w-2/3 h-1/2 opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(201,162,39,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm tracking-widest uppercase text-white/50 hover:text-skcet-gold transition-colors duration-200 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200 text-skcet-gold" />
            <span>Back to Highlights</span>
          </Link>
        </motion.div>

        {/* Content Wrapper */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main Hero Image Container */}
          <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-10 md:mb-12 shadow-2xl flex items-center justify-center max-h-[60vh]">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[60vh] object-contain select-none"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Category */}
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-skcet-gold bg-skcet-gold/10 px-3 py-1 rounded-md">
              {category}
            </span>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
              {title}
            </h1>

            {/* Decorative Divider */}
            <div className="w-16 h-[2px] bg-skcet-gold/45 rounded my-6" />

            {/* Full description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
                {longDescription}
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </main>
  );
};

export default HighlightDetail;
