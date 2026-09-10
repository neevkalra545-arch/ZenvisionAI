import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { SatelliteScanner } from './SatelliteScanner';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.9,
        }
      );

      // Parallax on scroll
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-scanner', {
        y: -50,
        scale: 0.9,
        opacity: 0.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Radial Glow */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="hero-content space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg"
          >
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
            <span className="text-sm text-white/70">ISRO Hackathon 2024</span>
          </motion.div>

          {/* Title */}
          <div className="perspective-1000">
            <h1
              ref={titleRef}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Zen</span>
              <span className="gradient-text">Vision</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-white/80 block mt-4">
                AI
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed"
          >
            Enhancing Vision Beyond the Visible.
            <br />
            <span className="text-electric-cyan/80">Powered by Advanced AI</span>
          </p>

          {/* Buttons */}
          <div ref={buttonRef} className="flex flex-wrap gap-4">
            <Link to="/upload">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-3 group"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center gap-3"
              >
                <FiPlay className="w-5 h-5" />
                <span>Learn More</span>
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
          >
            {[
              { value: '99.2%', label: 'Accuracy' },
              { value: '50ms', label: 'Response' },
              { value: '24/7', label: 'Available' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - 3D Scanner */}
        <div className="hero-scanner relative h-[400px] md:h-[500px] lg:h-[600px]">
          {/* Glow Background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
            }}
          />

          {/* Scanner */}
          <div className="relative w-full h-full">
            <SatelliteScanner />

            {/* Floating UI Elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute top-1/4 left-0 glass-card px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-cyan" />
                <span className="text-xs text-white/70 font-mono">SCANNING</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
              className="absolute top-1/3 right-0 glass-card px-4 py-2"
            >
              <div className="text-xs text-white/70 font-mono">
                <span className="text-electric-cyan">45.2</span> MHz
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.5 }}
              className="absolute bottom-1/4 left-1/4 glass-card px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-electric-cyan/30 rounded">
                  <motion.div
                    className="h-full bg-electric-cyan rounded"
                    initial={{ width: '20%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <span className="text-xs text-white/70 font-mono">DATA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-electric-cyan/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
