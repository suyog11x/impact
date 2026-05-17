import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceLine,
} from 'recharts';
import { Bot, Send, User, Flame, BrainCircuit, Activity } from 'lucide-react';

// ─── CAREER TWIN ──────────────────────────────────────────────────────────────
const trajectoryData = [
  { month: 'Now',    score: 62, projected: 62 },
  { month: 'Jun',   score: null, projected: 67 },
  { month: 'Jul',   score: null, projected: 73 },
  { month: 'Aug',   score: null, projected: 79 },
  { month: 'Sep',   score: null, projected: 84 },
  { month: 'Oct',   score: null, projected: 88 },
  { month: 'Nov',   score: null, projected: 91 },
];

export function CareerTwin() {
  return (
    <div className="card-flat p-6">
      <div className="flex items-center gap-2 mb-1">
        <BrainCircuit size={16} className="text-purple-400" />
        <p className="premium-label" style={{ color: '#A78BFA' }}>AI Career Twin</p>
      </div>
      <h4 className="font-heading font-bold text-text-primary mb-1">Readiness Trajectory</h4>
      <p className="text-xs text-text-secondary mb-4">
        If you follow the roadmap consistently, your readiness score is projected to reach{' '}
        <span className="text-purple-400 font-semibold">91/100 by November 2025</span>.
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={trajectoryData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <YAxis domain={[50, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickFormatter={v => `${v}`} />
          <Tooltip
            contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 12 }}
            formatter={(v: number) => [`${v}`, 'Score']}
          />
          <ReferenceLine y={75} stroke="rgba(212,175,55,0.3)" strokeDasharray="4 4" label={{ value: 'Placement Ready', fill: 'rgba(212,175,55,0.5)', fontSize: 10, position: 'right' }} />
          <Line
            type="monotone"
            dataKey="projected"
            stroke="#A78BFA"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#A78BFA' }}
            strokeDasharray="5 3"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: 'Projected Peak', value: '91/100', color: '#A78BFA' },
          { label: 'Months to Ready', value: '4 mo', color: '#D4AF37' },
          { label: 'Consistency Needed', value: '3h/day', color: '#10B981' },
        ].map(s => (
          <div key={s.label} className="bg-bg-elevated rounded-xl p-3 text-center">
            <p className="text-lg font-bold font-heading" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EMPLOYABILITY HEATMAP ────────────────────────────────────────────────────
const heatmapDomains = [
  { name: 'DSA', score: 72 }, { name: 'Frontend', score: 75 }, { name: 'Backend', score: 55 },
  { name: 'Cloud', score: 25 }, { name: 'DevOps', score: 30 }, { name: 'AI/ML', score: 40 },
  { name: 'Databases', score: 65 }, { name: 'Sys Design', score: 35 }, { name: 'Comm.', score: 78 },
  { name: 'OSS / Collab', score: 20 }, { name: 'Resume Quality', score: 60 }, { name: 'Projects', score: 68 },
];

function cellColor(score: number) {
  if (score >= 75) return { bg: 'rgba(16,185,129,0.7)', text: '#fff' };
  if (score >= 60) return { bg: 'rgba(212,175,55,0.6)', text: '#000' };
  if (score >= 40) return { bg: 'rgba(245,158,11,0.5)', text: '#000' };
  return { bg: 'rgba(239,68,68,0.6)', text: '#fff' };
}

export function EmployabilityHeatmap() {
  return (
    <div className="card-flat p-6">
      <div className="flex items-center gap-2 mb-1">
        <Activity size={16} className="text-amber-400" />
        <p className="premium-label" style={{ color: '#FBbf24' }}>Employability Heatmap</p>
      </div>
      <h4 className="font-heading font-bold text-text-primary mb-4">Strength & Weakness Map</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {heatmapDomains.map((d, i) => {
          const c = cellColor(d.score);
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl p-3 flex flex-col items-center gap-1"
              style={{ background: c.bg }}
            >
              <span className="text-lg font-bold font-heading" style={{ color: c.text }}>{d.score}</span>
              <span className="text-xs font-medium text-center leading-tight" style={{ color: c.text, opacity: 0.85 }}>{d.name}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex gap-3 mt-4 text-xs text-text-muted flex-wrap">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(16,185,129,0.7)' }} />Strong (75+)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(212,175,55,0.6)' }} />Good (60–74)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(245,158,11,0.5)' }} />Weak (40–59)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(239,68,68,0.6)' }} />Critical (&lt;40)</span>
      </div>
    </div>
  );
}

// ─── BURNOUT DETECTOR ─────────────────────────────────────────────────────────
const weeklyHours = [
  { day: 'Mon', hours: 4 }, { day: 'Tue', hours: 7 }, { day: 'Wed', hours: 9 },
  { day: 'Thu', hours: 11 }, { day: 'Fri', hours: 8 }, { day: 'Sat', hours: 3 }, { day: 'Sun', hours: 2 },
];
const avgHours = weeklyHours.reduce((s, d) => s + d.hours, 0) / weeklyHours.length;

export function BurnoutDetector() {
  const risk = avgHours > 8 ? 'High' : avgHours > 5 ? 'Moderate' : 'Low';
  const riskColor = risk === 'High' ? '#EF4444' : risk === 'Moderate' ? '#F59E0B' : '#10B981';

  return (
    <div className="card-flat p-6">
      <div className="flex items-center gap-2 mb-1">
        <Flame size={16} className="text-orange-400" />
        <p className="premium-label" style={{ color: '#FB923C' }}>Burnout Detection</p>
      </div>
      <h4 className="font-heading font-bold text-text-primary mb-1">Productivity Intelligence</h4>
      <p className="text-xs text-text-secondary mb-4">
        Weekly average: <span className="font-semibold text-text-primary">{avgHours.toFixed(1)}h/day</span> ·
        Burnout risk: <span className="font-semibold" style={{ color: riskColor }}>{risk}</span>
      </p>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={weeklyHours} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <YAxis domain={[0, 12]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 12 }}
            formatter={(v: number) => [`${v}h`, 'Study hours']}
          />
          <ReferenceLine y={6} stroke="rgba(16,185,129,0.4)" strokeDasharray="4 4" />
          <ReferenceLine y={9} stroke="rgba(239,68,68,0.4)" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="hours" stroke={riskColor} strokeWidth={2.5} dot={{ r: 4, fill: riskColor }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{ background: `${riskColor}12`, color: riskColor }}>
        {risk === 'High'
          ? '⚠️ You\'re studying 9h+ on weekdays. Consider spacing learning across the weekend to avoid burnout and retain more.'
          : risk === 'Moderate'
          ? '✅ Learning pattern looks sustainable. Maintain consistency and take at least one rest day per week.'
          : '🌱 Low intensity detected. Push to 4–6h/day for faster skill progression.'}
      </div>
    </div>
  );
}

// ─── AI MENTOR CHAT ───────────────────────────────────────────────────────────
type Msg = { role: 'user' | 'ai'; text: string };

const QUICK_REPLIES = [
  'What should I learn first?',
  'How do I improve my GitHub?',
  'Best DSA resources?',
  'How to get internship ready?',
];

const BOT_RESPONSES: Record<string, string> = {
  'What should I learn first?':
    'Based on your profile, start with **Docker** and **AWS basics** — they appear in 82% of your target JDs. Spend 2 weeks on Docker, then 2 weeks on AWS EC2 & S3. This will immediately boost your readiness score by ~8 points.',
  'How do I improve my GitHub?':
    'Your GitHub lacks open-source contributions and PRs. Find 2–3 active repos with "good first issue" labels on GitHub Explore. Even 3–5 merged PRs signal team collaboration to recruiters.',
  'Best DSA resources?':
    'For your weak areas (Graphs & DP): Use **NeetCode.io** for structured problem sets and **Abdul Bari\'s YouTube** for concept clarity. Aim for 5 problems/day for 30 days — that\'s 150 problems and a noticeable improvement.',
  'How to get internship ready?':
    'Internship readiness requires: ① 1 deployed full-stack project, ② 200+ LeetCode problems solved, ③ an ATS-optimized resume (yours is at 68%), and ④ a LinkedIn with 3+ recommendations. Focus on the resume first — it\'s the highest-ROI action right now.',
};

function getReply(input: string): string {
  for (const key of Object.keys(BOT_RESPONSES)) {
    if (input.toLowerCase().includes(key.toLowerCase().slice(0, 12))) return BOT_RESPONSES[key];
  }
  return `Great question! Based on your profile with a readiness score of **62/100**, I recommend focusing on: closing your Cloud gap (AWS), improving your GitHub presence, and rewriting your resume bullet points with measurable impact. Want a specific action plan for any of these?`;
}

function typeText(setText: (s: string) => void, full: string) {
  let i = 0;
  const iv = setInterval(() => {
    i++;
    setText(full.slice(0, i));
    if (i >= full.length) clearInterval(iv);
  }, 18);
}

export function AIMentor() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: 'Hi! I\'m your AI Mentor. I\'ve analyzed your profile and I\'m ready to guide your placement journey. What would you like to work on today?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [currentAI, setCurrentAI] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, currentAI]);

  function send(text: string) {
    if (!text.trim() || typing) return;
    setMessages(m => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setCurrentAI('');
    setTimeout(() => {
      const reply = getReply(text);
      typeText(setCurrentAI, reply);
      setTimeout(() => {
        setMessages(m => [...m, { role: 'ai', text: reply }]);
        setCurrentAI('');
        setTyping(false);
      }, reply.length * 18 + 100);
    }, 600);
  }

  return (
    <div className="card-flat flex flex-col" style={{ height: 480 }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
          <Bot size={16} className="text-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">AI Mentor</p>
          <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: m.role === 'ai' ? 'rgba(212,175,55,0.2)' : 'rgba(99,102,241,0.2)' }}
            >
              {m.role === 'ai' ? <Bot size={13} className="text-gold" /> : <User size={13} className="text-indigo-400" />}
            </div>
            <div
              className="max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
              style={
                m.role === 'ai'
                  ? { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.85)' }
                  : { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', borderRadius: '16px 4px 16px 16px' }
              }
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {/* Typing bubble */}
        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0"><Bot size={13} className="text-gold" /></div>
              <div className="max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed bg-white/5 text-text-secondary">
                {currentAI || <span className="flex gap-1 items-center h-5"><span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: '300ms' }} /></span>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {QUICK_REPLIES.map(q => (
            <button key={q} onClick={() => send(q)}
              className="text-xs px-3 py-1.5 rounded-xl border border-gold/20 text-gold/70 hover:bg-gold/10 hover:text-gold transition-all">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-white/5 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask your AI mentor anything..."
          className="flex-1 bg-bg-elevated rounded-xl px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none border border-transparent focus:border-gold/30 transition-colors"
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || typing}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
          style={{ background: input.trim() ? '#D4AF37' : 'rgba(255,255,255,0.05)' }}
        >
          <Send size={14} style={{ color: input.trim() ? '#000' : 'rgba(255,255,255,0.3)' }} />
        </button>
      </div>
    </div>
  );
}
