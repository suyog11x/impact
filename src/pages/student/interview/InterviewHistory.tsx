import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, TrendingUp, BarChart3, ArrowRight, Flame, Zap, Plus } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import NeonButton from '../../../components/ui/NeonButton';
import Badge from '../../../components/ui/Badge';
import ProgressBar from '../../../components/ui/ProgressBar';
import { useAuth } from '../../../context/AuthContext';
import { fetchSessions, fetchReports } from '../../../lib/interview-api';
import type { InterviewSession, InterviewReport } from '../../../types/interview';

export default function InterviewHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [reports, setReports] = useState<InterviewReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const [s, r] = await Promise.all([
          fetchSessions(user.id),
          fetchReports(user.id),
        ]);
        setSessions(s);
        setReports(r);
      } catch (e) {
        console.error('Failed to load history:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  // Stats
  const totalInterviews = sessions.length;
  const completed = sessions.filter(s => s.status === 'completed').length;
  const avgScore = reports.length > 0
    ? Math.round(reports.reduce((sum, r) => sum + (r.technical_score + r.communication_score + r.confidence_score + r.problem_solving_score) / 4, 0) / reports.length)
    : 0;
  const streak = Math.min(completed, 7); // simplified streak

  const statCards = [
    { label: 'Total Interviews', value: totalInterviews, icon: BarChart3 },
    { label: 'Completed', value: completed, icon: TrendingUp },
    { label: 'Avg Score', value: avgScore || '—', icon: Zap },
    { label: 'Streak', value: `${streak}d`, icon: Flame },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Progress</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">
          Interview History
        </h1>
        <p className="text-text-secondary font-body mt-3 text-lg">
          Track your interview practice and improvement
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <GlassCard className="p-5 text-center">
                <Icon size={22} className="text-gold mx-auto mb-2" />
                <p className="font-heading text-2xl text-text-primary">{stat.value}</p>
                <p className="text-xs font-body text-text-secondary mt-1">{stat.label}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Readiness Bar */}
      {avgScore > 0 && (
        <GlassCard className="p-6 mb-12" accent>
          <h3 className="font-heading text-lg text-text-primary mb-4">Placement Readiness</h3>
          <ProgressBar value={avgScore} label="Overall Readiness" />
        </GlassCard>
      )}

      {/* Sessions List */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl text-text-primary">Past Sessions</h3>
        <NeonButton size="sm" onClick={() => navigate('/student/interview/setup')}>
          <Plus size={14} className="mr-1.5" /> New Interview
        </NeonButton>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="shimmer h-20 rounded-xl" />)}
        </div>
      ) : sessions.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="font-body text-text-secondary mb-4">No interviews yet. Start your first mock interview!</p>
          <NeonButton onClick={() => navigate('/student/interview/setup')}>
            Start Interview <ArrowRight size={16} className="ml-2" />
          </NeonButton>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {sessions.map((session, idx) => {
            const report = reports.find(r => r.session_id === session.id);
            const avgSessionScore = report
              ? Math.round((report.technical_score + report.communication_score + report.confidence_score + report.problem_solving_score) / 4)
              : null;

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassCard className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <BarChart3 size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-heading text-sm text-text-primary capitalize">
                          {session.interview_type.replace('_', ' ')}
                        </span>
                        <Badge variant={session.status === 'completed' ? 'success' : session.status === 'in_progress' ? 'warning' : 'default'}>
                          {session.status.replace('_', ' ')}
                        </Badge>
                        {session.company_mode && (
                          <Badge variant="gold">{session.company_mode}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-body text-text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {new Date(session.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {session.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {avgSessionScore !== null && (
                      <div className="text-right">
                        <span className="font-heading text-lg text-text-primary">{avgSessionScore}%</span>
                        <span className="block text-[10px] font-body text-text-muted">Score</span>
                      </div>
                    )}
                    {report && (
                      <NeonButton
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/student/interview/report/${session.id}`, {
                          state: { messages: [], config: session.config },
                        })}
                      >
                        View Report
                      </NeonButton>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
