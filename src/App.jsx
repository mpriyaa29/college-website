import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SectionPage from './pages/SectionPage/SectionPage';
import DepartmentAchievementPage from './pages/DepartmentAchievementPage/DepartmentAchievementPage';
import Placeholder from './pages/Placeholder/Placeholder';
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

        {/* ── Department achievement detail pages (must be before wildcard routes) ── */}
        <Route path="/achievements/department-achievements/:deptId" element={<DepartmentAchievementPage />} />

        {/* ── Dynamic Section Pages ── */}
        {NAV_ITEMS.map((item) => (
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
