import { useRef, useState } from 'react';

/**
 * VideoBackground
 * ──────────────────────────────────────────────────────────────────
 * Full-viewport cinematic video background.
 * – Autoplay, muted, loop, playsInline for mobile
 * – Falls back to hero-fallback.jpg if video cannot load
 * – Overlay gradient applied here keeps text readable
 * ──────────────────────────────────────────────────────────────────
 */
const VideoBackground = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* ── Video ── */}
      {!videoError && (
        <video
          ref={videoRef}
          className="video-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback.jpg"
          onError={handleVideoError}
          aria-hidden="true"
        >
          <source src="/videos/skcet-campus.mp4" type="video/mp4" />
          {/* WebM fallback for broader browser support */}
          <source src="/videos/skcet-campus.webm" type="video/webm" />
        </video>
      )}

      {/* ── Static fallback if video fails ── */}
      {videoError && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-fallback.jpg')" }}
          aria-hidden="true"
        />
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
