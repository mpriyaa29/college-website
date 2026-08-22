import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SectionPage from './pages/SectionPage/SectionPage';
import Placeholder from './pages/Placeholder/Placeholder';
import Accreditations from './pages/Accreditations/Accreditations';
import Placements from './pages/Placements/Placements';
import { NAV_ITEMS } from './data/navigation';

/**
 * App
 * ──────────────────────────────────────────────────────────────────
 * Root application shell.
 * – Navigation is rendered at the top level (fixed overlay)
 * – Routes handle page-level rendering
 * ──────────────────────────────────────────────────────────────────
 */
const App = () => {
  return (
    <BrowserRouter>
      {/* Fixed navigation overlays all pages */}
      <Navigation />

      <Routes>
        {/* ── Home / Landing Page ── */}
        <Route path="/" element={<Home />} />

        {/* ── Custom Pages ── */}
        <Route path="/accreditations/*" element={<Accreditations />} />
        <Route path="/placements/*" element={<Placements />} />

        {/* ── Dynamic Section Pages ── */}
        {NAV_ITEMS.filter(item => item.id !== 'accreditations' && item.id !== 'placements').map((item) => (
          <Route key={item.id} path={`${item.path}/*`} element={<SectionPage />} />
        ))}

        {/* ── 404 catch-all ── */}
        <Route path="*" element={<Placeholder />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
