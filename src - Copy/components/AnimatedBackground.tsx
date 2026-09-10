import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stars: Star[] = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }));
  }, []);

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 20,
    }));
  }, []);

  const nebulas: Nebula[] = useMemo(() => [
    { id: 1, x: 10, y: 20, size: 400, color: '#00D4FF', opacity: 0.15, duration: 8 },
    { id: 2, x: 80, y: 60, size: 500, color: '#00F5D4', opacity: 0.1, duration: 10 },
    { id: 3, x: 50, y: 40, size: 350, color: '#7B68EE', opacity: 0.08, duration: 12 },
    { id: 4, x: 20, y: 70, size: 300, color: '#00D4FF', opacity: 0.12, duration: 9 },
    { id: 5, x: 90, y: 30, size: 450, color: '#00F5D4', opacity: 0.1, duration: 11 },
  ], []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      container.style.setProperty('--mouse-x', `${x}`);
      container.style.setProperty('--mouse-y', `${y}`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        background: 'linear-gradient(180deg, #060816 0%, #0A1020 50%, #101728 100%)',
      }}
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise" />

      {/* Nebulas */}
      {nebulas.map((nebula) => (
        <motion.div
          key={nebula.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: nebula.size,
            height: nebula.size,
            background: `radial-gradient(circle, ${nebula.color}${Math.round(nebula.opacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [nebula.opacity, nebula.opacity * 1.3, nebula.opacity],
          }}
          transition={{
            duration: nebula.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(0, 212, 255, 0.8), rgba(0, 245, 212, 0.4))`,
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              rgba(0, 212, 255, 0.02) 50%,
              transparent 100%
            )`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Moving Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%)',
          left: '20%',
          top: '30%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.08), transparent 70%)',
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Scan Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent)',
        }}
        animate={{
          y: [-100, window.innerHeight + 100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
