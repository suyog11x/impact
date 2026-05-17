import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain, Users, BarChart3, Play, Clock, Sparkles, History, ArrowRight,
  Building2, Briefcase, Rocket, TrendingUp, Mic, Code
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';

const interviewTypes = [
  {
    icon: <Brain size={36} />,
    title: 'Technical Interview',
    desc: 'AI-conducted technical interview with CS fundamentals, OOPs, DBMS, OS',
    duration: '45 min',
    difficulty: 'Hard',
    features: ['Dynamic Questions', 'Follow-ups', 'Counter Questions'],
  },
  {
    icon: <Users size={36} />,
    title: 'HR Interview',
    desc: 'Behavioral round with realistic placement questions and STAR method evaluation',
    duration: '30 min',
    difficulty: 'Medium',
    features: ['Confidence Analysis', 'Communication Score', 'Body Language Tips'],
  },
  {
    icon: <Code size={36} />,
    title: 'DSA Interview',
    desc: 'Live coding round with integrated code editor, test cases, and complexity analysis',
    duration: '60 min',
    difficulty: 'Hard',
    features: ['Code Editor', 'Live Execution', 'AI Code Review'],
  },
  {
    icon: <BarChart3 size={36} />,
    title: 'System Design',
    desc: 'Design scalable systems with AI evaluation on architecture decisions',
    duration: '45 min',
    difficulty: 'Hard',
    features: ['Architecture Review', 'Scalability', 'Trade-offs'],
  },
  {
    icon: <Mic size={36} />,
    title: 'Resume / Project Viva',
    desc: 'Deep dive into your resume, projects, and technical decisions',
    duration: '30 min',
    difficulty: 'Medium',
    features: ['Resume Parsing', 'Project Deep Dive', 'Architecture'],
  },
  {
    icon: <Sparkles size={36} />,
    title: 'Startup Rapid-Fire',
    desc: 'Fast-paced practical problem solving and real-world scenarios',
    duration: '20 min',
    difficulty: 'Hard',
    features: ['Speed Thinking', 'Practical Skills', 'Adaptability'],
  },
];

const companyModes = [
  {
    icon: <Building2 size={28} />,
    title: 'MNC Mode',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe'],
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Service Company',
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture'],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
  },
  {
    icon: <Rocket size={28} />,
    title: 'Startup Mode',
    companies: ['Razorpay', 'CRED', 'Swiggy', 'Zerodha'],
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
  },
];

const features = [
  { icon: <Brain size={20} />, title: 'AI-Powered Brain', desc: 'Powered by Grok & Gemini for intelligent, dynamic interviews' },
  { icon: <Mic size={20} />, title: 'Voice Support', desc: 'Speak your answers with real-time transcription via Deepgram' },
  { icon: <Code size={20} />, title: 'Live Code Editor', desc: 'Write and run code in Python, C++, Java, JavaScript' },
  { icon: <TrendingUp size={20} />, title: 'AI Report Card', desc: '6-dimension scoring with recruiter perspective analysis' },
];

export default function MockInterviews() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">AI Interview Engine</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">
          Mock Interviews
        </h1>
        <p className="text-text-secondary font-body mt-3 text-lg max-w-2xl">
          Experience AI-powered mock interviews that feel like real placements. Get evaluated on technical skills,
          communication, confidence, and placement readiness.
        </p>
      </motion.div>

      {/* CTA Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-8 mb-12 relative overflow-hidden" accent>
          <div className="gold-glow -top-20 -right-20" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl text-text-primary mb-2">Ready for your next interview?</h2>
              <p className="font-body text-sm text-text-secondary max-w-md">
                Choose your interview type, company mode, and difficulty. Our AI interviewer will adapt to your skill level in real-time.
              </p>
            </div>
            <div className="flex gap-3">
              <NeonButton size="lg" onClick={() => navigate('/student/interview/setup')}>
                <Sparkles size={18} className="mr-2" /> Start Interview
              </NeonButton>
              <NeonButton variant="secondary" onClick={() => navigate('/student/interview/history')}>
                <History size={16} className="mr-2" /> View History
              </NeonButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Interview Types */}
      <div className="mb-12">
        <h3 className="font-heading text-xl text-text-primary mb-6">Interview Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewTypes.map((type, idx) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <GlassCard className="p-6 flex flex-col h-full" hover accent>
                <div className="text-gold mb-4">{type.icon}</div>
                <h3 className="text-xl font-heading text-text-primary mb-2">{type.title}</h3>
                <p className="text-sm font-body text-text-secondary flex-1 mb-4">{type.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {type.features.map((f) => (
                    <span key={f} className="text-[10px] font-body px-2 py-0.5 bg-gold/5 text-gold/70 border border-gold/10 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary font-body">
                    <Clock size={14} /> {type.duration}
                  </div>
                  <Badge variant={
                    type.difficulty === 'Hard' ? 'danger' :
                    type.difficulty === 'Medium' ? 'warning' : 'success'
                  }>
                    {type.difficulty}
                  </Badge>
                </div>
                <NeonButton size="sm" className="w-full" onClick={() => navigate('/student/interview/setup')}>
                  <Play size={14} className="mr-1.5" /> Start Interview
                </NeonButton>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Modes */}
      <div className="mb-12">
        <h3 className="font-heading text-xl text-text-primary mb-6">Company Target Modes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companyModes.map((mode, idx) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 cursor-pointer" onClick={() => navigate('/student/interview/setup')}>
                <div className={`w-12 h-12 rounded-xl ${mode.bgColor} flex items-center justify-center ${mode.color} mb-4`}>
                  {mode.icon}
                </div>
                <h4 className="font-heading text-lg text-text-primary mb-3">{mode.title}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {mode.companies.map((c) => (
                    <span key={c} className={`text-xs font-body px-2.5 py-1 ${mode.bgColor} ${mode.color} rounded-full border ${mode.borderColor}`}>
                      {c}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h3 className="font-heading text-xl text-text-primary mb-6">Powered By</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <GlassCard className="p-5">
                <div className="text-gold mb-3">{feat.icon}</div>
                <h4 className="font-heading text-sm text-text-primary mb-1">{feat.title}</h4>
                <p className="text-xs font-body text-text-secondary">{feat.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
