import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { useRef, useState } from 'react';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = (y - centerY) / 20;
    const rotateYValue = (centerX - x) / 20;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="glass-card-hover p-8 relative group"
    >
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-purple p-[1px] animate-gradient">
          <div className="w-full h-full bg-space-800 rounded-2xl" />
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-blue/20 to-electric-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
          style={{
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)',
          }}
        >
          <Icon className="w-7 h-7 text-electric-cyan group-hover:rotate-6 transition-transform duration-500" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-electric-cyan transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 leading-relaxed">{description}</p>

        {/* Bottom Accent */}
        <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-0.5 bg-electric-cyan rounded-full" />
          <span className="text-xs text-electric-cyan font-medium uppercase tracking-wider">
            Learn More
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function FeatureGrid() {
  const features = [
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
      title: 'Image Enhancement',
      description: 'AI-powered image enhancement bringing out details invisible to the naked eye.',
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
      title: 'Colorization',
      description: 'Transform grayscale satellite imagery into vibrant color representations.',
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: 'Object Detection',
      description: 'Real-time detection and classification of objects in satellite imagery.',
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Multi-Spectral Analysis',
      description: 'Analyze data across multiple spectral bands for comprehensive insights.',
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'Real-Time Processing',
      description: 'Process satellite data in real-time with our optimized AI pipeline.',
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      ),
      title: 'AI Explain Mode',
      description: 'Understand AI decisions with our transparent explanation system.',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  );
}
