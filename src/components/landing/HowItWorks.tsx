import { motion } from 'framer-motion';
import { Upload, GitFork, Brain, Map } from 'lucide-react';

const steps = [
  { icon: <Upload size={32} />, title: 'Upload Resume', desc: 'Upload your resume for AI-powered analysis and ATS scoring' },
  { icon: <GitFork size={32} />, title: 'Connect Coding Profiles', desc: 'Link GitHub, LeetCode, CodeChef & more for comprehensive analysis' },
  { icon: <Brain size={32} />, title: 'AI Analysis', desc: 'Our AI identifies skill gaps and benchmarks you against industry standards' },
  { icon: <Map size={32} />, title: 'Get Roadmap', desc: 'Receive a personalized learning roadmap with monthly milestones' },
];

export default function HowItWorks() {
  return (
    <section className="relative py-32">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime mb-4">HOW IT WORKS</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary">
            From Zero to Placement Ready
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass rounded-[2rem] p-8 text-center relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-lime rounded-full flex items-center justify-center text-black font-mono font-bold text-sm">
                {idx + 1}
              </div>
              <div className="text-lime mb-5 flex justify-center mt-2">{step.icon}</div>
              <h3 className="text-lg font-heading font-semibold tracking-tight text-text-primary mb-3">{step.title}</h3>
              <p className="text-sm font-body text-text-secondary leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
