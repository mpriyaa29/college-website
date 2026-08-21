import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SectionPage from './pages/SectionPage/SectionPage';
import OnlinePayment from './pages/OnlinePayment/OnlinePayment';
import Documents from './pages/Documents/Documents';
import Exams from './pages/Exams/Exams';
import Admissions from './pages/Admissions/Admissions';
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

        {/* ── Dedicated Online Fee Payment Portal ── */}
        <Route path="/online-payment/*" element={<OnlinePayment />} />

        {/* ── Dedicated Document Request & Tracking Service ── */}
        <Route path="/documents/*" element={<Documents />} />

        {/* ── Dedicated Autonomous Examination Portal ── */}
        <Route path="/exams/*" element={<Exams />} />

        {/* ── Dedicated Admissions Portal ── */}
        <Route path="/admissions/*" element={<Admissions />} />

        {/* ── Dynamic Section Pages ── */}
        {NAV_ITEMS.filter((item) => item.id !== 'online-payment' && item.id !== 'documents' && item.id !== 'exams' && item.id !== 'admissions').map((item) => (
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
