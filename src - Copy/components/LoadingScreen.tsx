import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import earth from "./erth.jpg"; // 👈 apna actual file name

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const loadingTexts = [
    "Initializing AI Engine...",
    "Loading Computer Vision...",
    "Preparing Satellite Data...",
    "Enhancing Infrared Imagery...",
    "Launching ZenVision AI...",
  ];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => (prev < 100 ? prev + 1 : 100));
  }, 80);

  // Jab window load ho jaaye → force 100%
  window.addEventListener("load", () => setProgress(100));

  return () => {
    clearInterval(interval);
    window.removeEventListener("load", () => setProgress(100));
  };
}, []);


  return (
    <div className="fixed inset-0 bg-[#020617] overflow-hidden flex items-center justify-center">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Nebula Glow */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full bg-cyan-500/10 blur-[220px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Earth + Orbit Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <motion.img
  src={earth}
  alt="Earth"
  className="w-80 h-80 rounded-full shadow-[0_0_100px_rgba(0,212,255,.45)]"
  animate={{ rotate: 360 }}
  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  style={{ transform: "rotate(23.5deg)" }} // axis tilt
/>


          {/* Orbit Rings */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] rounded-full border border-cyan-400/40 border-dashed"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-70px] rounded-full border border-cyan-500/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-100px] rounded-full border border-cyan-300/20"
          />

          {/* Satellite */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-120px] flex justify-center"
          >
            <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,212,255,.8)]" />
          </motion.div>

          {/* Optional Moon */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-160px] flex justify-center"
          >
            <div className="w-6 h-6 bg-gray-300 rounded-full shadow-[0_0_20px_rgba(255,255,255,.6)]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <h1 className="mt-12 text-5xl font-bold text-white">
          Zen<span className="text-cyan-400">Vision AI</span>
        </h1>
        <p className="mt-3 text-cyan-300 tracking-widest">
          Enhancing Vision Beyond the Visible
        </p>

        {/* Progress */}
        <div className="mt-10 w-96">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <motion.div
            key={textIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-4 text-center text-cyan-300"
          >
            {loadingTexts[textIndex]} ({progress}%)
          </motion.div>
        </div>
      </div>
    </div>
  );
}
