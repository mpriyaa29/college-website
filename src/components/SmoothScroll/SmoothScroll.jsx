import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * SmoothScroll
 * ─────────────────────────────────────────────────────────────────────────────
 * Ultra-smooth, high-framerate momentum scroll configuration.
 *
 * Performance Features:
 * – Fine-tuned lerp/damping to prevent input latency.
 * – Native touch on mobile to leverage hardware 120Hz refresh rates.
 * – Automated frame rendering via standard requestAnimationFrame loop.
 * – Smooth hash anchor navigation and clean route transitions.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const SmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis with optimized momentum physics
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Use native touch momentum on phones/tablets for 120Hz smoothness
      infinite: false,
    });

    window.lenis = lenis;

    // High performance RAF loop
    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Global anchor click listener for smooth in-page jumps
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, { offset: -90, duration: 0.9 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Scroll to top or anchor on route changes
  useEffect(() => {
    if (window.lenis) {
      if (location.hash) {
        const targetElement = document.querySelector(location.hash);
        if (targetElement) {
          setTimeout(() => {
            window.lenis.scrollTo(targetElement, { offset: -90, duration: 0.8 });
          }, 80);
          return;
        }
      }
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  return null;
};

export default SmoothScroll;
