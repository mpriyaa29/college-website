import VideoBackground from '../VideoBackground/VideoBackground';
import HeroContent from './HeroContent';
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator';

/**
 * Hero
 * ──────────────────────────────────────────────────────────────────
 * Full-screen cinematic hero section.
 * Composes: VideoBackground + HeroContent + ScrollIndicator
 * The navigation (Header) sits above this as a fixed overlay.
 * ──────────────────────────────────────────────────────────────────
 */
const Hero = () => {
  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="SKCET — Sri Krishna College of Engineering and Technology"
    >
      {/* ── Full-viewport video with overlay ── */}
      <VideoBackground />

      {/* ── Hero content — centred vertically, full width ── */}
      <div className="relative z-10 flex flex-1 items-center justify-center pt-20 pb-28 w-full">
        <HeroContent />
      </div>

      {/* ── Scroll indicator pinned to bottom ── */}
      <div className="relative z-10 pb-8 flex justify-center">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;
