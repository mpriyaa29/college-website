import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * VideoBackground
 * ──────────────────────────────────────────────────────────────────
 * Full-viewport cinematic video background.
 *
 * Loading strategy:
 *  1. Hero poster (hero-poster.webp) renders immediately as a CSS
 *     background-image — no JavaScript, no waiting.
 *  2. The <link rel="preload" fetchpriority="high"> in index.html
 *     starts fetching both the poster and the video at the very top
 *     of the network waterfall, before React even boots.
 *  3. The <video> element uses preload="auto" so the browser buffers
 *     as much as needed to begin playback immediately.
 *  4. onLoadedData fires as soon as the first frame is decoded —
 *     earlier than onCanPlay — giving the fastest possible fade-in.
 *  5. Smooth opacity crossfade hides the poster→video switch.
 *
 * – Autoplay, muted, loop, playsInline for mobile/browser compat.
 * – Overlay gradient keeps hero text readable.
 * ──────────────────────────────────────────────────────────────────
 */
const VideoBackground = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  // onLoadedData fires as soon as the first frame is available —
  // earlier than onCanPlay — so we use it as the primary trigger.
  const handleVideoReady = () => {
    setVideoReady(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-skcet-dark">
      {/* ── Static Poster / Fallback ──────────────────────────────
          Renders immediately; stays visible until the video fades in.
          The poster is preloaded in <head> so it appears with zero delay.
      ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-poster.webp')" }}
        aria-hidden="true"
      />

      {/* ── Hero Video ────────────────────────────────────────────
          Preloaded + high-priority via <link rel="preload"> in index.html.
          preload="auto" tells the browser to buffer aggressively.
          Fades in smoothly once the first frame is decoded.
      ── */}
      {!videoError && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.webp"
          onError={handleVideoError}
          onLoadedData={handleVideoReady}   // earliest trigger: first frame decoded
          onCanPlay={handleVideoReady}       // secondary trigger for broader compat
          onPlaying={handleVideoReady}       // final fallback if earlier events miss
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* MP4 listed first — universally supported, matches the preload hint */}
          <source src="/videos/skcet-campus.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* ── Dark cinematic overlay ── */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* ── Subtle vignette for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,18,40,0.5) 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackground;
