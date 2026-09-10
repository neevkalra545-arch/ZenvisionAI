import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiSatelliteCommunication } from 'react-icons/gi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Upload', path: '/upload' },
  { name: 'About', path: '/about' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-space-900/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <GiSatelliteCommunication className="w-8 h-8 text-electric-cyan" />
                <motion.div
                  className="absolute inset-0 bg-electric-cyan/30 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight">
                  <span className="text-white">Zen</span>
                  <span className="gradient-text">Vision</span>
                </span>
                <span className="text-[10px] text-electric-blue/60 font-medium tracking-widest uppercase">
                  AI Powered
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/upload"
                className="relative px-6 py-2.5 rounded-lg font-semibold text-space-900 bg-gradient-to-r from-electric-blue to-electric-cyan overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-electric-cyan" />
              ) : (
                <FiMenu className="w-6 h-6 text-electric-cyan" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-space-900/95 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="relative pt-24 px-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-4 text-2xl font-display font-semibold transition-colors ${
                      location.pathname === link.path
                        ? 'text-electric-cyan'
                        : 'text-white/80 hover:text-electric-cyan'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Link
                  to="/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-4 rounded-xl font-semibold text-space-900 bg-gradient-to-r from-electric-blue to-electric-cyan"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
    />
  );
}
