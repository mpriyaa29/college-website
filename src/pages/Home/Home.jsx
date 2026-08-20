import Hero from '../../components/Hero/Hero';
import Welcome from '../../components/Welcome/Welcome';
import FeatureBlocks from '../../components/FeatureBlocks/FeatureBlocks';

/**
 * Home Page
 * ──────────────────────────────────────────────────────────────────
 * Root landing page.
 * Sections are ordered:
 *   1. Hero        (locked — do not modify)
 *   2. Welcome to SKCET  (white)
 *   3. Feature Blocks    (dark — Research / Sports / EDC)
 *   4. [Future sections go here]
 * ──────────────────────────────────────────────────────────────────
 */
const Home = () => {
  return (
    <main>
      {/* 1 ── Hero (locked) */}
      <Hero />

      {/* 2 ── Welcome to SKCET */}
      <Welcome />

      {/* 3 ── Cinematic three-block feature section */}
      <FeatureBlocks />

      {/* 4 ── Future sections */}
      <section className="bg-[#f2f2f0] py-12 border-t border-black/5">
        <p className="text-center text-gray-400 text-xs font-light tracking-wider">
          — Future Content Will Go Here —
        </p>
      </section>
    </main>
  );
};

export default Home;
