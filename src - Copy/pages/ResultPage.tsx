import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiDownload,
  FiShare2,
  FiRefreshCw,
  FiCheck,
  FiLoader,
  FiArrowLeft,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function ResultPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const fullExplanation = `Analysis complete. The satellite imagery shows significant detail enhancement across all spectral bands. We've identified 47 distinct geological features including 12 potential water bodies, 23 vegetation clusters, and 8 urban structures. Colorization has been applied using NDVI composite analysis, revealing previously undetectable patterns in the terrain. Confidence score: 98.7%. Recommended for cartographic accuracy validation.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullExplanation.length) {
        setAiExplanation(fullExplanation.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const stats = [
    { label: 'Objects Detected', value: 47, change: '+12' },
    { label: 'Enhancement Quality', value: '98.7%', change: '+0.8%' },
    { label: 'Processing Time', value: '12.4s', change: '-3.2s' },
    { label: 'Confidence Score', value: '99.2%', change: '+1.1%' },
  ];

  const detections = [
    { type: 'Water Body', count: 12, color: '#00D4FF', confidence: 97 },
    { type: 'Vegetation', count: 23, color: '#00F5D4', confidence: 98 },
    { type: 'Urban Area', count: 8, color: '#7B68EE', confidence: 96 },
    { type: 'Road Network', count: 15, color: '#A8B4CE', confidence: 94 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 text-white/60 hover:text-electric-cyan transition-colors mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Upload New Image</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-8 h-8 rounded-lg bg-electric-cyan/20 flex items-center justify-center"
                >
                  <FiCheck className="w-4 h-4 text-electric-cyan" />
                </motion.div>
                <span className="text-sm text-electric-cyan">Processing Complete</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="gradient-text">Analysis Results</span>
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center gap-2"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Reprocess</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center gap-2"
              >
                <FiShare2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-2"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/50">Original</span>
                  <div className="w-px h-4 bg-white/20" />
                  <span className="text-sm text-electric-cyan">Enhanced</span>
                </div>
                <div className="text-sm text-white/50">
                  Drag to compare
                </div>
              </div>

              {/* Comparison Slider */}
              <div
                ref={containerRef}
                className="comparison-slider relative aspect-video cursor-ew-resize select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
              >
                {/* Enhanced Image (Background) */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-electric-cyan/10 to-electric-purple/10">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/20 font-display text-2xl">Enhanced</span>
                  </div>
                </div>

                {/* Original Image (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-space-700 to-space-800">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 font-display text-2xl">Original</span>
                    </div>
                  </div>
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-electric-cyan"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-space-700 border-2 border-electric-cyan flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
                    }}
                  >
                    <div className="flex gap-1">
                      <div className="w-1 h-3 rounded-full bg-electric-cyan" />
                      <div className="w-1 h-3 rounded-full bg-electric-cyan" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mt-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-electric-blue/20 flex items-center justify-center">
                  {isTyping ? (
                    <FiLoader className="w-4 h-4 text-electric-blue animate-spin" />
                  ) : (
                    <FiCheck className="w-4 h-4 text-electric-cyan" />
                  )}
                </div>
                <span className="font-semibold text-white">AI Analysis</span>
              </div>

              <div className="text-white/70 leading-relaxed min-h-[100px]">
                <span>{aiExplanation}</span>
                {isTyping && <span className="typing-cursor" />}
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>

              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-white/60">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold gradient-text">{stat.value}</span>
                      <span className="text-xs text-electric-cyan">{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Detections */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Detections</h3>

              <div className="space-y-4">
                {detections.map((item, i) => (
                  <DetectionItem key={item.type} item={item} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Confidence Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Overall Confidence</h3>

              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 283' }}
                      animate={{ strokeDasharray: '275 283' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#00F5D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold gradient-text">97%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DetectionItem({ item, index }: { item: { type: string; count: number; color: string; confidence: number }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="flex items-center gap-3"
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-white/80">{item.type}</span>
          <span className="text-sm font-semibold text-electric-cyan">{item.count}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: item.color }}
            initial={{ width: 0 }}
            animate={{ width: `${item.confidence}%` }}
            transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
