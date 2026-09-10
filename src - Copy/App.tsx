import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './context/SmoothScroll';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { UploadPage } from './pages/UploadPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultPage } from './pages/ResultPage';
import { AboutPage } from './pages/AboutPage';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorGlow } from './components/CursorGlow';
import { useState, useEffect } from 'react';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen bg-space-900 text-white overflow-x-hidden">
          {/* Animated Background */}
          <AnimatedBackground />

          {/* Cursor Glow Effect */}
          <CursorGlow />

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="relative z-10">
            <AnimatedRoutes />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/5 py-12 px-6 lg:px-8"
      style={{
        background: 'linear-gradient(180deg, transparent, rgba(6, 8, 22, 0.8))',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-electric-cyan flex items-center justify-center">
              <span className="text-xs font-bold text-space-900">ZV</span>
            </div>
            <span className="font-display font-semibold">
              <span className="text-white">Zen</span>
              <span className="gradient-text">Vision AI</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-electric-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-electric-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-electric-cyan transition-colors">Support</a>
          </div>

          <div className="text-sm text-white/30">
            © 2024 ZenVision AI. ISRO Hackathon.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
