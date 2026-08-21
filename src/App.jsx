import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import SectionPage from './pages/SectionPage/SectionPage';

import DepartmentAchievementPage from './pages/DepartmentAchievementPage/DepartmentAchievementPage';
import HighlightDetail from './pages/HighlightDetail/HighlightDetail';
import OnlinePayment from './pages/OnlinePayment/OnlinePayment';
import Documents from './pages/Documents/Documents';

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

{/* ── Department Achievement Details Page ── */}
<Route
  path="/achievements/department-achievements/:deptId"
  element={<DepartmentAchievementPage />}
/>

{/* ── Highlight Details Page ── */}
<Route
  path="/highlights/:id"
  element={<HighlightDetail />}
/>

{/* ── Dedicated Online Fee Payment Portal ── */}
<Route
  path="/online-payment/*"
  element={<OnlinePayment />}
/>

{/* ── Dedicated Document Request & Tracking Service ── */}
<Route
  path="/documents/*"
  element={<Documents />}
/>

        {/* ── Dynamic Section Pages ── */}
        {NAV_ITEMS
          .filter(
            (item) =>
              item.id !== 'online-payment' &&
              item.id !== 'documents'
          )
          .map((item) => (
            <Route
              key={item.id}
              path={`${item.path}/*`}
              element={<SectionPage />}
            />
          ))}

        {/* ── 404 catch-all ── */}
        <Route path="*" element={<Placeholder />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
