import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiEye, FiCode, FiUsers, FiTrendingUp, FiMap } from 'react-icons/fi';
import { GiSatelliteCommunication } from 'react-icons/gi';

export function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-electric-blue to-electric-cyan flex items-center justify-center"
            style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' }}
          >
            <GiSatelliteCommunication className="w-10 h-10 text-space-900" />
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">About </span>
            <span className="gradient-text">ZenVision AI</span>
          </h1>

          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            A cutting-edge AI platform for satellite imagery analysis, developed
            for ISRO Hackathon 2024. Built with passion for space innovation.
          </p>
        </motion.div>

        {/* Mission Section */}
        <Section title="Mission" icon={FiTarget} index={0}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/70 leading-relaxed"
          >
            Our mission is to revolutionize satellite imagery analysis by leveraging
            advanced AI techniques to extract meaningful insights from satellite data.
            We aim to make space-grade image analysis accessible, efficient, and
            actionable for researchers, organizations, and decision-makers worldwide.
          </motion.p>
        </Section>

        {/* Vision Section */}
        <Section title="Vision" icon={FiEye} index={1}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/70 leading-relaxed"
          >
            We envision a future where satellite imagery analysis is instant, accurate,
            and available to everyone. By democratizing access to advanced AI-powered
            analysis tools, we hope to accelerate discoveries, improve disaster response,
            and contribute to a better understanding of our planet.
          </motion.p>
        </Section>

        {/* Technology Section */}
        <Section title="Technology" icon={FiCode} index={2}>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Deep Learning Models',
                desc: 'State-of-the-art CNN architectures for image enhancement and classification.',
              },
              {
                title: 'Multi-Spectral Analysis',
                desc: 'Processing across infrared, visible, and thermal spectral bands.',
              },
              {
                title: 'Real-Time Processing',
                desc: 'Optimized pipeline for sub-second analysis of large satellite images.',
              },
              {
                title: 'Explainable AI',
                desc: 'Transparent AI decisions with confidence scores and explanations.',
              },
            ].map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="font-semibold text-electric-cyan mb-2">{tech.title}</h4>
                <p className="text-white/60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Team Section */}
        <Section title="Team" icon={FiUsers} index={3}>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Lead Developer', role: 'AI/ML' },
              { name: 'Frontend Engineer', role: 'UI/UX' },
              { name: 'Backend Developer', role: 'Pipeline' },
              { name: 'Data Scientist', role: 'Analysis' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric-blue/20 to-electric-cyan/20 flex items-center justify-center">
                  <span className="text-2xl gradient-text font-bold">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-white">{member.name}</h4>
                <p className="text-sm text-electric-cyan">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Timeline Section */}
        <Section title="Timeline" icon={FiTrendingUp} index={4}>
          <Timeline />
        </Section>

        {/* Future Scope */}
        <Section title="Future Scope" icon={FiMap} index={5}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/70 leading-relaxed mb-8"
          >
            ZenVision AI is just the beginning. Our roadmap includes real-time satellite
            tracking, global coverage integration, advanced 3D terrain modeling, and
            seamless integration with ISRO's satellite constellation feeds.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Real-Time Tracking', desc: 'Live satellite feed integration', icon: '🛰️' },
              { title: 'Global Coverage', desc: 'Planet-wide analysis capability', icon: '🌍' },
              { title: '3D Modeling', desc: 'Advanced terrain reconstruction', icon: '🗺️' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-white/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <Link to="/upload">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-lg"
            >
              Try ZenVision AI
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  icon: Icon,
  index,
  children,
}: {
  title: string;
  icon: typeof FiTarget;
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-24"
    >
      <div
        className="mb-8"
        style={{
          background: 'radial-gradient(circle at left, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-blue/20 to-electric-cyan/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-electric-cyan" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            <span className="gradient-text">{title}</span>
          </h2>
        </div>
      </div>

      <div className="pl-16">{children}</div>
    </motion.section>
  );
}

function Timeline() {
  const events = [
    { date: 'Jan 2024', title: 'Project Initiation', desc: 'Conceptualization and team formation' },
    { date: 'Feb 2024', title: 'Research Phase', desc: 'Literature review and technology selection' },
    { date: 'Mar 2024', title: 'Development Start', desc: 'Core AI model development' },
    { date: 'Apr 2024', title: 'MVP Release', desc: 'Minimum viable product completion' },
    { date: 'May 2024', title: 'Testing & Refinement', desc: 'Extensive testing and optimization' },
    { date: 'Jun 2024', title: 'ISRO Hackathon', desc: 'Final presentation and submission' },
  ];

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-electric-cyan to-electric-purple" />

      <div className="space-y-8">
        {events.map((event, i) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="relative flex items-start gap-6"
          >
            {/* Dot */}
            <motion.div
              className="relative z-10 w-12 h-12 rounded-full bg-space-800 border-2 border-electric-cyan flex items-center justify-center"
              whileInView={{
                boxShadow: ['0 0 0 0 rgba(0, 212, 255, 0.4)', '0 0 0 10px rgba(0, 212, 255, 0)'],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-3 h-3 rounded-full bg-electric-cyan" />
            </motion.div>

            {/* Content */}
            <div className="glass-card p-6 flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-electric-cyan font-mono">{event.date}</span>
                <div className="w-px h-4 bg-white/20" />
                <span className="text-sm text-white/50">Milestone {i + 1}</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{event.title}</h4>
              <p className="text-white/60">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
