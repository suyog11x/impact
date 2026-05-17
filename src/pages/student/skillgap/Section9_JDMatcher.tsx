import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Zap, X, CheckCircle, AlertCircle } from 'lucide-react';
import { studentProfile } from './data';

const MISSING_KEYWORDS = ['Docker', 'AWS', 'Kubernetes', 'System Design', 'CI/CD', 'GraphQL', 'Redis', 'Kafka', 'Terraform'];
const PRESENT_KEYWORDS = ['React', 'JavaScript', 'TypeScript', 'Python', 'Node.js', 'SQL', 'Git', 'REST API'];
const SUGGESTIONS = [
  'Add "Reduced API response time by 40%" instead of "Improved performance".',
  'Include Docker in your skills section — present in 78% of JDs.',
  'Your projects lack deployment details. Mention Vercel/EC2 hosting.',
  'Add a Skills section with categorized tech stack (Frontend / Backend / Tools).',
  'Include a professional summary paragraph at the top of the resume.',
  'Quantify your impact in each experience bullet point.',
];

function DropZone({ label, icon, onFile }: { label: string; icon: React.ReactNode; onFile: (name: string) => void }) {
  const [file, setFile] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  function handle(name: string) { setFile(name); onFile(name); }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f.name); }}
      onClick={() => !file && ref.current?.click()}
      className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative"
      style={{
        borderColor: drag ? '#D4AF37' : file ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.1)',
        background: drag ? 'rgba(212,175,55,0.05)' : file ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <input ref={ref} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={e => { const f = e.target.files?.[0]; if (f) handle(f.name); }} />
      {file ? (
        <>
          <CheckCircle size={28} className="text-emerald-400" />
          <p className="text-sm text-emerald-400 font-medium">{file}</p>
          <button onClick={ev => { ev.stopPropagation(); setFile(null); }} className="absolute top-2 right-2 text-text-muted hover:text-text-primary transition-colors"><X size={14} /></button>
        </>
      ) : (
        <>
          <div className="p-3 rounded-xl bg-white/5">{icon}</div>
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-xs text-text-muted">PDF, DOC, TXT · Drop or click</p>
        </>
      )}
    </div>
  );
}

export default function Section9_JDMatcher() {
  const [resume, setResume] = useState(false);
  const [jd, setJd] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');

  function analyze() {
    if (!resume || !jd) return;
    setLoading(true);
    let count = 0;
    const iv = setInterval(() => { setDots(d => d.length < 3 ? d + '.' : ''); count++; if (count > 18) { clearInterval(iv); setLoading(false); setAnalyzed(true); } }, 200);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}>
      <div className="mb-5">
        <p className="premium-label mb-1">Resume vs JD Matcher</p>
        <h3 className="text-xl font-heading font-bold text-text-primary">ATS Compatibility Engine</h3>
      </div>

      {!analyzed ? (
        <div className="card-flat p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <DropZone label="Upload Resume" icon={<FileText size={24} className="text-gold" />} onFile={() => setResume(true)} />
            <DropZone label="Upload Job Description" icon={<Upload size={24} className="text-blue-400" />} onFile={() => setJd(true)} />
          </div>
          <button
            onClick={analyze}
            disabled={!resume || !jd || loading}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            style={
              resume && jd && !loading
                ? { background: '#D4AF37', color: '#000' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', cursor: 'not-allowed' }
            }
          >
            {loading ? (
              <><Zap size={16} className="animate-pulse" /> Analyzing with AI{dots}</>
            ) : (
              <><Zap size={16} /> Run ATS Analysis</>
            )}
          </button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ATS score */}
            <div className="card-flat p-6 flex flex-col items-center gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
              <p className="premium-label">ATS Match Score</p>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none" stroke="#D4AF37" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 50}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - studentProfile.atsScore / 100) }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-heading text-gold">{studentProfile.atsScore}%</span>
                </div>
              </div>
              <button onClick={() => setAnalyzed(false)} className="text-xs text-text-muted hover:text-text-primary transition-colors">Re-analyze →</button>
            </div>

            {/* Keyword breakdown */}
            <div className="card-flat p-5">
              <h4 className="font-semibold text-sm text-text-primary mb-3">Keyword Match</h4>
              <div className="space-y-1.5 mb-3">
                <p className="text-xs text-text-muted uppercase tracking-wider">Present in Resume</p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESENT_KEYWORDS.map(k => <span key={k} className="text-xs px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{k}</span>)}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-text-muted uppercase tracking-wider">Missing from JD</p>
                <div className="flex flex-wrap gap-1.5">
                  {MISSING_KEYWORDS.map(k => <span key={k} className="text-xs px-2 py-0.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">{k}</span>)}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="card-flat p-5">
              <h4 className="font-semibold text-sm text-text-primary mb-3">AI Resume Tips</h4>
              <div className="space-y-2 overflow-y-auto max-h-56">
                {SUGGESTIONS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-2 p-2 bg-bg-elevated rounded-lg"
                  >
                    <AlertCircle size={13} className="text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-text-secondary">{s}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
