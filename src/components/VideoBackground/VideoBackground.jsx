import { useRef, useState, useEffect } from 'react';

/**
 * VideoBackground
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-viewport cinematic video background with ultra-high scroll performance.
 *
 * Performance Optimizations:
 * 1. IntersectionObserver: Automatically pauses video decoding when scrolled
 *    out of viewport to eliminate 100% of GPU/CPU compositor contention during scroll.
 * 2. Hardware Acceleration: uses translate3d, will-change, and backface-visibility
 *    to isolate the video in a dedicated GPU compositor layer.
 * 3. CSS transitions instead of JS-driven render loops for smooth fade-in.
 * 4. Preloaded video + fallback poster with zero layout shift.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const VideoBackground = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
  };

  // Video ready trigger
  const handleVideoReady = () => {
    setVideoReady(true);
  };

  // ── Intersection Observer: Pause video decoding when out of viewport ──
  useEffect(() => {
    const videoEl = videoRef.current;
    const containerEl = containerRef.current;
    if (!videoEl || !containerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // In view: play video
          if (videoEl.paused) {
            videoEl.play().catch(() => {
              // Autoplay policy fallback
            });
          }
        } else {
          // Scrolled out of view: pause decoding to free GPU/CPU for buttery scrolling
          if (!videoEl.paused) {
            videoEl.pause();
          }
        }
      },
      {
        threshold: [0, 0.1, 0.5],
        rootMargin: '100px 0px 100px 0px',
      }
    );

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-skcet-dark"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        contain: 'layout paint',
      }}
    >
      {/* ── Static Poster / Fallback ──────────────────────────────
          Renders immediately; stays visible until the video fades in.
      ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: "url('/images/hero-poster.webp')",
          opacity: videoReady ? 0.3 : 1,
          transform: 'translateZ(0)',
        }}
        aria-hidden="true"
      />

      {/* ── Hero Video ────────────────────────────────────────────
          GPU hardware accelerated, isolated composite layer.
      ── */}
      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out pointer-events-none ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.webp"
          onError={handleVideoError}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          aria-hidden="true"
        >
          <source src="/videos/skcet-campus.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── Dark cinematic overlay ── */}
      <div
        className="absolute inset-0 hero-overlay pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
        aria-hidden="true"
      />

      {/* ── Subtle vignette for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,18,40,0.5) 100%)',
          transform: 'translateZ(0)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackground;
