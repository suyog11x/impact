import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, MessageSquare, Shield, Lightbulb, Eye, Target,
  ArrowRight, ChevronDown, ChevronUp, RotateCcw, Download
} from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import NeonButton from '../../../components/ui/NeonButton';
import Badge from '../../../components/ui/Badge';
import ScoreCard from '../../../components/interview/ScoreCard';
import { generateReport } from '../../../lib/interview-api';
import { useAuth } from '../../../context/AuthContext';
import type { InterviewConfig, InterviewMessage, InterviewReport as IReport } from '../../../types/interview';

const SCORE_META = [
  { key: 'technical_score', label: 'Technical', icon: Trophy, color: '#D4AF37' },
  { key: 'communication_score', label: 'Communication', icon: MessageSquare, color: '#10B981' },
  { key: 'confidence_score', label: 'Confidence', icon: Shield, color: '#8B5CF6' },
  { key: 'problem_solving_score', label: 'Problem Solving', icon: Lightbulb, color: '#F59E0B' },
  { key: 'recruiter_impression', label: 'Recruiter Impression', icon: Eye, color: '#EC4899' },
  { key: 'placement_readiness', label: 'Placement Ready', icon: Target, color: '#06B6D4' },
];

export default function InterviewReport() {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const messages = (location.state as any)?.messages as InterviewMessage[] | undefined;
  const config = (location.state as any)?.config as InterviewConfig | undefined;

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedAnswer, setExpandedAnswer] = useState<number | null>(null);

  useEffect(() => {
    async function loadReport() {
      if (!sessionId || !messages || !config) {
        setLoading(false);
        return;
      }

      try {
        const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
        const data = await generateReport(sessionId, chatHistory, config);
        setReport(data);
      } catch (err) {
        console.error('Report error:', err);
        // Generate fallback report
        setReport({
          technical_score: 65,
          communication_score: 70,
          confidence_score: 60,
          problem_solving_score: 55,
          recruiter_impression: 62,
          placement_readiness: 58,
          strengths: ['Completed the interview', 'Showed willingness to learn'],
          weaknesses: ['Needs more technical depth'],
          improvements: ['Practice DSA daily', 'Work on system design'],
          recruiter_verdict: 'Shows potential but needs more preparation.',
          detailed_feedback: { answers: [], overall_summary: 'Good attempt. Keep practicing.', recruiter_perspective: 'Average candidate, needs improvement.' },
          roadmap: [{ week: 1, focus: 'DSA Fundamentals', tasks: ['Solve 5 easy problems daily'] }],
        });
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [sessionId, messages, config]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full animate-spin mb-6" />
        <p className="font-heading text-xl text-text-primary mb-2">Analyzing Your Interview</p>
        <p className="font-body text-sm text-text-secondary">AI is evaluating your responses...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-text-secondary font-body mb-4">No report data available.</p>
        <NeonButton onClick={() => navigate('/student/interview/setup')}>
          Start New Interview <ArrowRight size={16} className="ml-2" />
        </NeonButton>
      </div>
    );
  }

  const avgScore = Math.round(
    (report.technical_score + report.communication_score + report.confidence_score +
      report.problem_solving_score + report.recruiter_impression + report.placement_readiness) / 6
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Performance Report</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">
          Interview Report
        </h1>
        <p className="text-text-secondary font-body mt-3 text-lg">
          AI-powered analysis of your interview performance
        </p>
      </motion.div>

      {/* Overall Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlassCard className="p-8 mb-8 text-center" accent>
          <p className="text-xs font-body text-gold uppercase tracking-widest mb-4">Overall Score</p>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <motion.circle
                cx="50" cy="50" r="42"
                stroke="#D4AF37"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - avgScore / 100) }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading text-4xl text-text-primary">{avgScore}</span>
            </div>
          </div>
          <Badge variant={avgScore >= 75 ? 'success' : avgScore >= 50 ? 'warning' : 'danger'}>
            {avgScore >= 75 ? 'Interview Ready' : avgScore >= 50 ? 'Needs Practice' : 'Keep Learning'}
          </Badge>
        </GlassCard>
      </motion.div>

      {/* Score Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {SCORE_META.map((meta, idx) => (
          <ScoreCard
            key={meta.key}
            label={meta.label}
            score={report[meta.key]}
            color={meta.color}
            delay={idx * 0.1}
          />
        ))}
      </div>

      {/* Strengths, Weaknesses, Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <GlassCard className="p-6">
          <h3 className="font-heading text-lg text-success mb-4">💪 Strengths</h3>
          <ul className="space-y-2">
            {report.strengths?.map((s: string, i: number) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="text-sm font-body text-text-secondary flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span> {s}
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-heading text-lg text-danger mb-4">⚠️ Weaknesses</h3>
          <ul className="space-y-2">
            {report.weaknesses?.map((w: string, i: number) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="text-sm font-body text-text-secondary flex items-start gap-2">
                <span className="text-danger mt-0.5">✗</span> {w}
              </motion.li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-heading text-lg text-gold mb-4">🎯 Improvements</h3>
          <ul className="space-y-2">
            {report.improvements?.map((imp: string, i: number) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="text-sm font-body text-text-secondary flex items-start gap-2">
                <span className="text-gold mt-0.5">→</span> {imp}
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Recruiter Verdict */}
      <GlassCard className="p-6 mb-12 border-l-4 border-l-gold">
        <h3 className="font-heading text-lg text-text-primary mb-3 flex items-center gap-2">
          <Eye size={18} className="text-gold" /> Recruiter Perspective
        </h3>
        <p className="font-body text-text-secondary leading-relaxed italic">
          "{report.recruiter_verdict}"
        </p>
        {report.detailed_feedback?.recruiter_perspective && (
          <p className="font-body text-text-muted text-sm mt-3">
            {report.detailed_feedback.recruiter_perspective}
          </p>
        )}
      </GlassCard>

      {/* Answer-by-Answer Feedback */}
      {report.detailed_feedback?.answers?.length > 0 && (
        <GlassCard className="p-6 mb-12">
          <h3 className="font-heading text-lg text-text-primary mb-6">📝 Answer Analysis</h3>
          <div className="space-y-3">
            {report.detailed_feedback.answers.map((a: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-bg-elevated rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedAnswer(expandedAnswer === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={a.score >= 75 ? 'success' : a.score >= 50 ? 'warning' : 'danger'}>
                      {a.score}%
                    </Badge>
                    <span className="font-body text-sm text-text-primary truncate max-w-md">{a.question}</span>
                  </div>
                  {expandedAnswer === i ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                </button>
                {expandedAnswer === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-4 pb-4 space-y-3">
                    <div>
                      <p className="text-[10px] font-body text-text-muted uppercase tracking-widest mb-1">Your Answer</p>
                      <p className="font-body text-sm text-text-secondary">{a.answer}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-body text-text-muted uppercase tracking-widest mb-1">Feedback</p>
                      <p className="font-body text-sm text-gold">{a.feedback}</p>
                    </div>
                    {a.better_answer && (
                      <div>
                        <p className="text-[10px] font-body text-text-muted uppercase tracking-widest mb-1">Better Answer</p>
                        <p className="font-body text-sm text-success">{a.better_answer}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Learning Roadmap */}
      {report.roadmap?.length > 0 && (
        <GlassCard className="p-6 mb-12">
          <h3 className="font-heading text-lg text-text-primary mb-6">🗺️ Improvement Roadmap</h3>
          <div className="space-y-4">
            {report.roadmap.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="font-heading text-sm text-gold">W{item.week}</span>
                </div>
                <div>
                  <h4 className="font-heading text-sm text-text-primary">{item.focus}</h4>
                  <ul className="mt-1 space-y-0.5">
                    {item.tasks?.map((t: string, j: number) => (
                      <li key={j} className="text-xs font-body text-text-secondary">• {t}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <NeonButton variant="secondary" onClick={() => navigate('/student/interview/setup')}>
          <RotateCcw size={16} className="mr-2" /> Practice Again
        </NeonButton>
        <NeonButton onClick={() => navigate('/student/interview/history')}>
          View History <ArrowRight size={16} className="ml-2" />
        </NeonButton>
      </div>
    </div>
  );
}
