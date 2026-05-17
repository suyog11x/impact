import { motion } from 'framer-motion';
import { recruiterMetrics, studentProfile } from './data';
import { RadarChart as RechartsRadar, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle } from 'lucide-react';

const radarData = recruiterMetrics.map(m => ({ subject: m.label.replace(' Score', '').replace(' Index', '').replace(' Signals', ''), value: m.score }));

function getVerdict(confidence: number) {
  if (confidence >= 80) return { text: 'Highly Likely to Shortlist', color: '#10B981', icon: '✅' };
  if (confidence >= 65) return { text: 'Likely to Shortlist', color: '#D4AF37', icon: '👍' };
  if (confidence >= 50) return { text: 'Borderline — Needs Improvement', color: '#F59E0B', icon: '⚠️' };
  return { text: 'Unlikely to Shortlist', color: '#EF4444', icon: '❌' };
}

export default function Section10_RecruiterView() {
  const verdict = getVerdict(studentProfile.readinessScore + 6);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
      <div className="mb-5">
        <p className="premium-label mb-1">Recruiter View</p>
        <h3 className="text-xl font-heading font-bold text-text-primary">Hiring Intelligence Report</h3>
      </div>

      {/* Verdict */}
      <div
        className="card-flat p-5 mb-6 flex items-center gap-4"
        style={{ borderLeft: `3px solid ${verdict.color}`, background: `${verdict.color}08` }}
      >
        <span className="text-3xl">{verdict.icon}</span>
        <div>
          <p className="text-sm text-text-secondary">Would a recruiter shortlist this candidate?</p>
          <p className="text-lg font-bold mt-0.5" style={{ color: verdict.color }}>{verdict.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar */}
        <div className="card-flat p-6">
          <h4 className="font-semibold text-sm text-text-primary mb-4">Recruiter Confidence Radar</h4>
          <ResponsiveContainer width="100%" height={280}>
            <RechartsRadar data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }} />
              <Radar dataKey="value" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.2} strokeWidth={2} dot={{ r: 3, fill: '#D4AF37' }} />
            </RechartsRadar>
          </ResponsiveContainer>
        </div>

        {/* Metric bars */}
        <div className="card-flat p-6 flex flex-col gap-4">
          <h4 className="font-semibold text-sm text-text-primary">Detailed Metrics</h4>
          {recruiterMetrics.map((m, i) => {
            const good = m.score >= 65;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span>{m.icon}</span>
                    <span className="text-sm text-text-primary">{m.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {good ? <CheckCircle size={13} className="text-emerald-400" /> : <XCircle size={13} className="text-red-400" />}
                    <span className="text-sm font-bold" style={{ color: good ? '#10B981' : '#EF4444' }}>{m.score}</span>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ duration: 1, delay: i * 0.07 + 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: good ? '#10B981' : '#EF4444' }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1 hidden group-hover:block transition-all">{m.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
