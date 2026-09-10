import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiLoader, FiCircle, FiBox, FiImage, FiDroplet, FiEye, FiCpu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface ProcessingStage {
  id: string;
  name: string;
  description: string;
  icon: typeof FiBox;
  duration: number;
}

const stages: ProcessingStage[] = [
  {
    id: 'upload',
    name: 'Upload',
    description: 'Receiving satellite data',
    icon: FiImage,
    duration: 1500,
  },
  {
    id: 'preprocessing',
    name: 'Preprocessing',
    description: 'Normalizing and calibrating',
    icon: FiBox,
    duration: 2000,
  },
  {
    id: 'enhancement',
    name: 'Enhancement',
    description: 'Enhancing image clarity',
    icon: FiEye,
    duration: 2500,
  },
  {
    id: 'colorization',
    name: 'Colorization',
    description: 'Applying spectral colors',
    icon: FiDroplet,
    duration: 2000,
  },
  {
    id: 'detection',
    name: 'Object Detection',
    description: 'Identifying features',
    icon: FiEye,
    duration: 2500,
  },
  {
    id: 'analysis',
    name: 'AI Analysis',
    description: 'Generating insights',
    icon: FiCpu,
    duration: 2000,
  },
];

export function ProcessingPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Process each stage
    if (currentStage < stages.length) {
      const stage = stages[currentStage];
      const interval = 50;
      const increment = 100 / (stage.duration / interval);

      const progressInterval = setInterval(() => {
        setStageProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return next;
        });
      }, interval);

      const stageTimer = setTimeout(() => {
        setStageProgress(0);
        setCurrentStage((prev) => prev + 1);
        setProgress(((currentStage + 1) / stages.length) * 100);
      }, stage.duration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(stageTimer);
      };
    } else {
      // All stages complete - navigate to results
      setTimeout(() => {
        navigate('/results');
      }, 1000);
    }
  }, [currentStage, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-electric-blue to-electric-cyan flex items-center justify-center"
            style={{
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)',
            }}
          >
            <FiCpu className="w-10 h-10 text-space-900" />
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Processing Your Image</span>
          </h1>

          <p className="text-xl text-white/60">
            Our AI is analyzing and enhancing your satellite imagery
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Overall Progress</span>
            <span className="text-sm font-semibold text-electric-cyan">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-purple rounded-full"
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradient 3s ease infinite',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-blue/20 via-electric-cyan/20 to-electric-purple/20 -translate-y-1/2" />

          {/* Stages */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {stages.map((stage, index) => (
              <StageNode
                key={stage.id}
                stage={stage}
                index={index}
                status={
                  index < currentStage
                    ? 'completed'
                    : index === currentStage
                    ? 'active'
                    : 'pending'
                }
                progress={index === currentStage ? stageProgress : 0}
              />
            ))}
          </div>
        </div>

        {/* Current Stage Details */}
        <AnimatePresence mode="wait">
          {currentStage < stages.length && (
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-16"
            >
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-electric-cyan/20 flex items-center justify-center"
                    >
                      {(() => {
                        const Icon = stages[currentStage].icon;
                        return <Icon className="w-6 h-6 text-electric-cyan" />;
                      })()}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {stages[currentStage].name}
                      </h3>
                      <p className="text-white/50">{stages[currentStage].description}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">
                      {Math.round(stageProgress)}%
                    </div>
                    <div className="text-sm text-white/50">Stage Progress</div>
                  </div>
                </div>

                {/* Stage Progress Bar */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-electric-cyan rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${stageProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Process Animation */}
                <div className="mt-8 flex items-center justify-center">
                  <ProcessingAnimation />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {currentStage >= stages.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-electric-cyan/10 border border-electric-cyan/20"
            >
              <FiCheck className="w-5 h-5 text-electric-cyan" />
              <span className="text-electric-cyan">Processing Complete! Redirecting...</span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function StageNode({
  stage,
  index,
  status,
  progress,
}: {
  stage: ProcessingStage;
  index: number;
  status: 'completed' | 'active' | 'pending';
  progress: number;
}) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex flex-col items-center">
        {/* Node Circle */}
        <motion.div
          className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
            status === 'completed'
              ? 'bg-electric-cyan'
              : status === 'active'
              ? 'bg-space-700 border-2 border-electric-cyan'
              : 'bg-space-800 border border-white/10'
          }`}
          animate={
            status === 'active'
              ? {
                  boxShadow: [
                    '0 0 0 0 rgba(0, 212, 255, 0.4)',
                    '0 0 0 15px rgba(0, 212, 255, 0)',
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {status === 'completed' ? (
            <FiCheck className="w-7 h-7 text-space-900" />
          ) : status === 'active' ? (
            <>
              <Icon className="w-6 h-6 text-electric-cyan" />
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="rgba(0, 212, 255, 0.3)"
                  strokeWidth="2"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="2"
                  strokeDasharray={`${progress * 1.88} 188`}
                />
              </svg>
            </>
          ) : (
            <FiCircle className="w-6 h-6 text-white/20" />
          )}
        </motion.div>

        {/* Label */}
        <div className="mt-3 text-center">
          <div
            className={`text-xs font-medium ${
              status === 'completed'
                ? 'text-electric-cyan'
                : status === 'active'
                ? 'text-white'
                : 'text-white/40'
            }`}
          >
            {stage.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessingAnimation() {
  return (
    <div className="relative w-48 h-48">
      {/* Orbiting Particles */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-electric-cyan"
          style={{
            top: '50%',
            left: '50%',
            marginTop: '-4px',
            marginLeft: '-4px',
          }}
          animate={{
            x: [0, Math.cos((angle * Math.PI) / 180) * 80],
            y: [0, Math.sin((angle * Math.PI) / 180) * 80],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      {/* Center Pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-electric-cyan/20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Spinning Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-dashed border-electric-blue/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-space-700 border-2 border-electric-cyan flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <FiLoader className="w-6 h-6 text-electric-cyan" />
        </motion.div>
      </div>
    </div>
  );
}
