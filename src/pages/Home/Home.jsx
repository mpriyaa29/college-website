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
    </main>
  );
};

export default Home;
