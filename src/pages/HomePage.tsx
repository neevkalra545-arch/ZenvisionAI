import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureCard';

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Section Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.05) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
              <span className="text-sm text-electric-cyan">Advanced Technology</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Powerful </span>
              <span className="gradient-text">Features</span>
            </h2>

            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              State-of-the-art AI capabilities designed for satellite imagery analysis
              and enhancement, built for ISRO-grade precision.
            </p>
          </motion.div>

          {/* Features Grid */}
          <FeatureGrid />
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="font-display text-4xl md:text-5xl font-bold">
                  <span className="text-white">Built for</span>
                  <br />
                  <span className="gradient-text">Space Innovation</span>
                </h2>
                <p className="text-xl text-white/60">
                  ZenVision AI has been developed specifically for ISRO's satellite
                  imagery analysis needs, combining cutting-edge AI with space-grade precision.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10M+', label: 'Images Processed' },
                  { value: '99.2%', label: 'Accuracy Rate' },
                  { value: '<50ms', label: 'Response Time' },
                  { value: '24/7', label: 'System Uptime' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="text-3xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card aspect-square flex items-center justify-center overflow-hidden">
                {/* Animated Radar Effect */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-electric-cyan/20"
                      style={{
                        width: `${i * 25}%`,
                        height: `${i * 25}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1, 1.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeOut',
                      }}
                    />
                  ))}

                  {/* Center Circle */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-space-700 border-2 border-electric-cyan flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-full border border-dashed border-electric-cyan/50"
                    />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-electric-cyan animate-pulse" />
                  </div>

                  {/* Orbiting Dots */}
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-electric-cyan"
                      style={{
                        top: '50%',
                        left: '50%',
                        marginTop: '-6px',
                        marginLeft: '-6px',
                        transform: `rotate(${angle}deg) translateX(80px)`,
                      }}
                      animate={{
                        opacity: [1, 0.5, 1],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 md:p-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Transform</span>
              <br />
              <span className="gradient-text">Your Satellite Data?</span>
            </h2>

            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Join us in revolutionizing satellite imagery analysis. Upload your first
              image and experience the power of ZenVision AI.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg"
            >
              Start Processing Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
