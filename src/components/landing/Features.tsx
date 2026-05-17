import { motion } from 'framer-motion';
import { FileText, GitFork, Code, Target, Route, Mic, TrendingUp, Building2 } from 'lucide-react';

interface FeaturesProps {
  isDark: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText size={24} />,
  Github: <GitFork size={24} />,
  Code: <Code size={24} />,
  Target: <Target size={24} />,
  Route: <Route size={24} />,
  Mic: <Mic size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Building2: <Building2 size={24} />,
};

const featuresData = [
  { title: 'Resume analyzer', description: 'AI-powered resume analysis with ATS scoring', icon: 'FileText', accent: '#E8EFE8' },
  { title: 'GitHub analysis', description: 'Deep analysis of your GitHub contributions', icon: 'Github', accent: '#EFEDF4' },
  { title: 'Coding profiles', description: 'LeetCode, CodeChef, HackerRank aggregated', icon: 'Code', accent: '#FFE4E1' },
  { title: 'Skill gap detection', description: 'AI identifies missing skills for target roles', icon: 'Target', accent: '#FFB7B2' },
  { title: 'Learning roadmap', description: 'Personalized monthly milestones', icon: 'Route', accent: '#E8EFE8' },
  { title: 'Mock interviews', description: 'AI-conducted interviews with reports', icon: 'Mic', accent: '#EFEDF4' },
  { title: 'Placement prediction', description: 'ML-based placement probability', icon: 'TrendingUp', accent: '#FFE4E1' },
  { title: 'Company tracker', description: 'Track preparation for dream companies', icon: 'Building2', accent: '#E8EFE8' },
];

export default function Features({ isDark }: FeaturesProps) {
  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className={`font-landing text-sm font-medium tracking-widest uppercase mb-4 ${
            isDark ? 'text-gold' : 'text-landing-muted'
          }`}>
            Features
          </p>
          <h2 className={`font-landing font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-2xl mx-auto ${
            isDark ? 'text-text-primary' : 'text-landing-text'
          }`}>
            Everything you need to land your dream role
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-none">
          {featuresData.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              className={`snap-start flex-shrink-0 w-72 h-40 rounded-3xl p-6 flex flex-col justify-between transition-colors duration-300 cursor-pointer ${
                isDark 
                  ? 'bg-bg-card border border-border hover:border-gold/30' 
                  : 'bg-white border border-landing-stone-100 hover:shadow-lg'
              }`}
              style={{ '--hover-color': feature.accent } as React.CSSProperties}
            >
              <div className="flex items-start justify-between">
                <span className={`font-landing text-xs tracking-widest ${
                  isDark ? 'text-text-muted' : 'text-landing-stone-400'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={isDark ? 'text-gold' : 'text-landing-text'}>
                  {iconMap[feature.icon]}
                </span>
              </div>
              <div>
                <h3 className={`font-landing font-semibold text-lg mb-1 transition-colors ${
                  isDark ? 'text-text-primary' : 'text-landing-stone-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={`font-landing text-sm ${
                  isDark ? 'text-text-secondary' : 'text-landing-muted'
                }`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
