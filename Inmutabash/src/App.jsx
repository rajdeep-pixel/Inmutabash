import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InstitutionPage from './pages/InstitutionPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] bg-ribbed-glass text-slate-100 font-sans selection:bg-blue-500/30">
      <Router>
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-6 py-12">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/institution" element={<InstitutionPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;