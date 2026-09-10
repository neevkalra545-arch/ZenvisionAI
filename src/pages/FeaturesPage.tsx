import { motion } from 'framer-motion';
import { FeatureGrid } from '../components/FeatureCard';

export function FeaturesPage() {
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
            <span className="text-sm text-electric-cyan">Advanced AI Capabilities</span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Powerful </span>
            <span className="gradient-text">Features</span>
          </h1>

          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            State-of-the-art AI capabilities designed for satellite imagery analysis
            and enhancement, built for ISRO-grade precision and reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <FeatureGrid />

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div
            className="glass-card p-12"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Under the Hood</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { value: '99.2%', label: 'Accuracy', desc: 'State-of-the-art accuracy' },
                { value: '<50ms', label: 'Latency', desc: 'Real-time processing' },
                { value: '10+', label: 'Models', desc: 'Specialized AI models' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-white/50">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
