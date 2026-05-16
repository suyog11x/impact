import { motion } from 'framer-motion';
import { FileText, GitFork, Code, Target, Route, Mic, TrendingUp, Building2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={28} />,
  Github: <GitFork size={28} />,
  Code: <Code size={28} />,
  Target: <Target size={28} />,
  Route: <Route size={28} />,
  Mic: <Mic size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  Building2: <Building2 size={28} />,
};

const featuresData = [
  { title: 'Resume Analyzer', description: 'AI-powered resume analysis with ATS scoring and keyword optimization', icon: 'FileText', accent: false },
  { title: 'GitHub Analysis', description: 'Deep analysis of your GitHub profile, contributions, and code quality', icon: 'Github', accent: false },
  { title: 'Coding Profile Analysis', description: 'Aggregated performance across LeetCode, CodeChef, HackerRank', icon: 'Code', accent: false },
  { title: 'Skill Gap Detection', description: 'AI identifies missing skills required for your target companies', icon: 'Target', accent: true },
  { title: 'AI Learning Roadmap', description: 'Personalized monthly roadmap to bridge your skill gaps', icon: 'Route', accent: false },
  { title: 'Mock Interviews', description: 'AI-conducted mock interviews with detailed performance reports', icon: 'Mic', accent: false },
  { title: 'Placement Prediction', description: 'ML-based prediction of your placement probability', icon: 'TrendingUp', accent: false },
  { title: 'Company Tracker', description: 'Track preparation progress for your dream companies', icon: 'Building2', accent: false },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime mb-4">FEATURES</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary mb-4">
            Everything You Need to<br />Land Your Dream Role
          </h2>
          <p className="text-text-secondary font-body max-w-xl mx-auto">
            From skill analysis to placement prediction — one unified platform for your entire placement journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuresData.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`rounded-[2.5rem] p-8 ${
                feature.accent
                  ? 'bg-lime text-black'
                  : 'glass hover:border-lime/30 transition-all duration-300'
              }`}
            >
              <div className={`mb-5 ${feature.accent ? 'text-black' : 'text-lime'}`}>
                {iconMap[feature.icon]}
              </div>
              <h3 className={`text-xl font-heading font-semibold tracking-tight mb-3 ${feature.accent ? 'text-black' : 'text-text-primary'}`}>
                {feature.title}
              </h3>
              <p className={`font-body text-sm leading-relaxed ${feature.accent ? 'text-black/70' : 'text-text-secondary'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
