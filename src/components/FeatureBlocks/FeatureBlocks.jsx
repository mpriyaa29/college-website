"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ─── Feature data ─────────────────────────────────────────────────────────────
//
// Images  → public/images/features/<key>.jpg  (change extension if using .png)
// Videos  → public/videos/features/<key>.mp4
//
const FEATURES = [
  {
    key: 'research',
    label: 'Innovation & Discovery',
    titleNormal: '',
    titleItalic: 'Research',
    image: '/images/features/research.jpg',
    video: '/videos/features/research.mp4',
    route: '/research/',
  },
  {
    key: 'sports',
    label: 'Athletics & Campus Life',
    titleNormal: '',
    titleItalic: 'Sports',
    image: '/images/features/sports.jpeg',
    video: '/videos/features/sports.mp4',
    route: '/student-life/facilities/sports/',
  },
  {
    key: 'edc',
    label: 'Ideas Into Action',
    titleNormal: 'Entrepreneurship',
    titleItalic: 'Development Cell',
    image: '/images/features/edc.jpeg',
    video: '/videos/features/edc.mp4',
    route: '/student-life/entrepreneurship-development-cell/',
  },
];

// ─── Single panel ─────────────────────────────────────────────────────────────
const FeaturePanel = ({ feature, index }) => {
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="relative flex-1 min-h-[72vh] md:min-h-[80vh] overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Accessible full-block link */}
      <Link
        href={feature.route}
        className="absolute inset-0 z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-skcet-gold focus-visible:outline-offset-[-3px]"
        aria-label={`${feature.titleNormal} ${feature.titleItalic}`.trim()}
        tabIndex={0}
      />

      {/* ── Static image ── */}
      {imageError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-skcet-navy to-skcet-dark" />
      ) : (
        <motion.img
          src={feature.image}
          alt={`${feature.titleNormal} ${feature.titleItalic}`.trim()}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            opacity: hovered && videoReady ? 0 : 1,
            scale: hovered ? 1.04 : 1,
          }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}

      {/* ── Video ── */}
      <motion.video
        ref={videoRef}
        src={feature.video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: hovered && videoReady ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        onCanPlay={() => setVideoReady(true)}
      />

      {/* ── Bottom gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-10 pointer-events-none" />

      {/* ── Subtle hover darkening ── */}
      <motion.div
        className="absolute inset-0 bg-black/20 z-10 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* ── Text — bottom left, matching reference ── */}
      <div className="absolute bottom-0 left-0 z-10 p-7 md:p-10 pointer-events-none">
        {/* Small uppercase label */}
        <motion.p
          className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/65 font-medium mb-3"
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.3 }}
        >
          {feature.label}
        </motion.p>

        {/* Title — editorial serif mix */}
        <motion.div
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Normal line (if any) */}
          {feature.titleNormal && (
            <h3 className="font-display text-4xl md:text-5xl text-white font-semibold leading-none">
              {feature.titleNormal}
            </h3>
          )}
          {/* Italic line */}
          <h3 className="font-display text-4xl md:text-5xl text-white italic font-medium leading-none">
            {feature.titleItalic}
          </h3>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const FeatureBlocks = () => (
  <section className="bg-[#f2f2f0]" aria-labelledby="feature-heading">

    {/* Minimal heading row */}
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 pb-8">
      <motion.p
        id="feature-heading"
        className="text-xs tracking-[0.3em] uppercase text-skcet-gold font-medium mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Discover SKCET
      </motion.p>
      <motion.h2
        className="font-display text-2xl md:text-3xl text-gray-900 font-medium"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        Explore the ideas, people and experiences shaping our campus.
      </motion.h2>
    </div>

    {/* Three portrait panels with small gap — matching reference */}
    <div className="flex flex-col md:flex-row gap-1.5 px-4 sm:px-8 pb-8">
      {FEATURES.map((feature, i) => (
        <FeaturePanel key={feature.key} feature={feature} index={i} />
      ))}
    </div>
  </section>
);

export default FeatureBlocks;
