import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ScanText, Loader2, X, CheckCircle,
  User, Mail, Phone, Link2, Briefcase,
  GraduationCap, Code, Layers, Award, RefreshCw,
} from 'lucide-react';
import { readPdf } from '../../lib/parse-resume-from-pdf/read-pdf';
import { groupTextItemsIntoLines } from '../../lib/parse-resume-from-pdf/group-text-items-into-lines';
import { groupLinesIntoSections } from '../../lib/parse-resume-from-pdf/group-lines-into-sections';
import { extractResumeFromSections } from '../../lib/parse-resume-from-pdf/extract-resume-from-sections';
import type { Resume } from '../../lib/redux/types';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';

type Status = 'idle' | 'parsing' | 'done' | 'error';

export default function ResumeAnalyzer() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = (file: File) => {
    if (!file.name.match(/\.pdf$/i)) {
      setError('Please upload a PDF file.');
      setStatus('error');
      return;
    }
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setFileName(file.name);
    setResume(null);
    setError(null);
    setStatus('idle');
  };

  const analyze = async () => {
    if (!pdfUrl) return;
    setStatus('parsing');
    setError(null);
    try {
      const items = await readPdf(pdfUrl);
      const lines = groupTextItemsIntoLines(items);
      const sections = groupLinesIntoSections(lines);
      const parsed = extractResumeFromSections(sections);
      setResume(parsed);
      setStatus('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse PDF.');
      setStatus('error');
    }
  };

  const reset = () => {
    setPdfUrl(null);
    setFileName(null);
    setResume(null);
    setError(null);
    setStatus('idle');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-lime/10 rounded-xl flex items-center justify-center">
            <ScanText size={20} className="text-lime" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-primary">Resume Analyzer</h1>
            <p className="text-text-secondary font-body text-sm">
              Upload your PDF — parsed entirely in the browser, no server needed
            </p>
          </div>
        </div>
      </motion.div>

      {/* Upload zone — shown when no file loaded */}
      {!pdfUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass rounded-[2rem] p-14 text-center border-2 border-dashed transition-all ${
            dragging ? 'border-lime bg-lime/5' : 'border-white/10 hover:border-white/20'
          }`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) loadFile(f);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); }}
          />
          <div className="w-20 h-20 bg-lime/5 border border-lime/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Upload size={36} className="text-lime" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Drop your resume here
          </h3>
          <p className="text-text-secondary font-body mb-6">PDF format only</p>
          <NeonButton onClick={() => inputRef.current?.click()}>
            <Upload size={16} /> Browse File
          </NeonButton>

          {status === 'error' && error && (
            <p className="mt-4 text-red-400 font-body text-sm flex items-center justify-center gap-2">
              <X size={14} /> {error}
            </p>
          )}
        </motion.div>
      )}

      {/* Main 2-column layout — shown once file is loaded */}
      {pdfUrl && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {/* ── Left: PDF preview + controls ── */}
            <div className="flex flex-col gap-4">
              {/* File info bar */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-sm font-body text-text-secondary">
                  <ScanText size={15} className="text-lime" />
                  <span className="truncate max-w-xs">{fileName}</span>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs text-muted hover:text-red-400 transition-colors font-body"
                >
                  <RefreshCw size={12} /> Remove
                </button>
              </div>

              {/* PDF iframe */}
              <GlassCard hover={false} className="p-0 overflow-hidden !rounded-[1.5rem]">
                <iframe
                  src={`${pdfUrl}#navpanes=0`}
                  className="w-full rounded-[1.5rem]"
                  style={{ height: '70vh' }}
                  title="Resume PDF Preview"
                />
              </GlassCard>

              {/* Analyze button */}
              {status !== 'done' && (
                <NeonButton
                  onClick={analyze}
                  disabled={status === 'parsing'}
                  size="lg"
                >
                  {status === 'parsing' ? (
                    <><Loader2 size={18} className="animate-spin" /> Analyzing…</>
                  ) : (
                    <><ScanText size={18} /> Analyze Resume</>
                  )}
                </NeonButton>
              )}

              {status === 'error' && error && (
                <p className="text-red-400 font-body text-sm text-center flex items-center justify-center gap-2">
                  <X size={14} /> {error}
                </p>
              )}
            </div>

            {/* ── Right: Results ── */}
            <div className="overflow-y-auto max-h-[calc(100vh-10rem)] space-y-4 pr-1">
              {status === 'idle' && (
                <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                    <ScanText size={28} className="text-muted" />
                  </div>
                  <p className="font-heading font-semibold text-text-primary">Ready to analyze</p>
                  <p className="text-text-secondary font-body text-sm">
                    Click "Analyze Resume" to extract structured information
                  </p>
                </div>
              )}

              {status === 'parsing' && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 size={40} className="text-lime animate-spin" />
                  <p className="font-heading font-semibold text-text-primary">Parsing resume…</p>
                  <p className="text-text-secondary font-body text-sm">Extracting sections and fields</p>
                </div>
              )}

              {status === 'done' && resume && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Success badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-lime" />
                        <span className="font-heading font-semibold text-text-primary">Parse Complete</span>
                      </div>
                      <button
                        onClick={() => { setStatus('idle'); setResume(null); }}
                        className="text-xs text-muted hover:text-lime transition-colors font-body flex items-center gap-1"
                      >
                        <RefreshCw size={12} /> Re-analyze
                      </button>
                    </div>

                    {/* Profile */}
                    <ResultCard title="Contact Info" icon={<User size={16} className="text-lime" />}>
                      <InfoRow label="Name" value={resume.profile.name} />
                      <InfoRow label="Email" value={resume.profile.email} />
                      <InfoRow label="Phone" value={resume.profile.phone} />
                      <InfoRow label="Location" value={resume.profile.location} />
                      <InfoRow label="URL" value={resume.profile.url} />
                      {resume.profile.summary && (
                        <div className="mt-2 pt-2 border-t border-white/5">
                          <p className="text-xs text-muted font-mono uppercase tracking-wider mb-1">Summary</p>
                          <p className="text-sm text-text-secondary font-body leading-relaxed">{resume.profile.summary}</p>
                        </div>
                      )}
                    </ResultCard>

                    {/* Skills */}
                    {resume.skills.descriptions.length > 0 && (
                      <ResultCard title="Skills" icon={<Code size={16} className="text-lime" />}>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.descriptions.map((s, i) => (
                            <Badge key={i} variant="success">{s}</Badge>
                          ))}
                        </div>
                      </ResultCard>
                    )}

                    {/* Work Experience */}
                    {resume.workExperiences.length > 0 && resume.workExperiences.some(e => e.company || e.jobTitle) && (
                      <ResultCard
                        title="Work Experience"
                        icon={<Briefcase size={16} className="text-lime" />}
                        count={resume.workExperiences.filter(e => e.company || e.jobTitle).length}
                      >
                        {resume.workExperiences.filter(e => e.company || e.jobTitle).map((exp, i) => (
                          <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-white/5' : ''}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-heading font-semibold text-text-primary text-sm">{exp.jobTitle}</p>
                                <p className="text-xs text-lime font-body">{exp.company}</p>
                              </div>
                              {exp.date && <span className="text-xs text-muted font-mono">{exp.date}</span>}
                            </div>
                            {exp.descriptions.length > 0 && (
                              <ul className="mt-1.5 space-y-0.5">
                                {exp.descriptions.map((d, j) => (
                                  <li key={j} className="text-xs text-text-secondary font-body">• {d}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </ResultCard>
                    )}

                    {/* Education */}
                    {resume.educations.length > 0 && resume.educations.some(e => e.school || e.degree) && (
                      <ResultCard
                        title="Education"
                        icon={<GraduationCap size={16} className="text-lime" />}
                        count={resume.educations.filter(e => e.school || e.degree).length}
                      >
                        {resume.educations.filter(e => e.school || e.degree).map((edu, i) => (
                          <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-white/5' : ''}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-heading font-semibold text-text-primary text-sm">{edu.degree}</p>
                                <p className="text-xs text-text-secondary font-body">{edu.school}</p>
                              </div>
                              <div className="text-right">
                                {edu.date && <p className="text-xs text-muted font-mono">{edu.date}</p>}
                                {edu.gpa && <p className="text-xs text-muted font-mono">GPA: {edu.gpa}</p>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </ResultCard>
                    )}

                    {/* Projects */}
                    {resume.projects.length > 0 && resume.projects.some(p => p.project) && (
                      <ResultCard
                        title="Projects"
                        icon={<Layers size={16} className="text-lime" />}
                        count={resume.projects.filter(p => p.project).length}
                      >
                        {resume.projects.filter(p => p.project).map((proj, i) => (
                          <div key={i} className={i > 0 ? 'mt-3 pt-3 border-t border-white/5' : ''}>
                            <div className="flex justify-between items-start">
                              <p className="font-heading font-semibold text-text-primary text-sm">{proj.project}</p>
                              {proj.date && <span className="text-xs text-muted font-mono">{proj.date}</span>}
                            </div>
                            {proj.descriptions.length > 0 && (
                              <ul className="mt-1 space-y-0.5">
                                {proj.descriptions.map((d, j) => (
                                  <li key={j} className="text-xs text-text-secondary font-body">• {d}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </ResultCard>
                    )}

                    {/* Empty state */}
                    {!resume.profile.name && !resume.profile.email &&
                      resume.workExperiences.filter(e => e.company).length === 0 &&
                      resume.educations.filter(e => e.school).length === 0 && (
                      <GlassCard>
                        <div className="text-center py-4">
                          <Award size={28} className="text-muted mx-auto mb-2" />
                          <p className="font-heading font-semibold text-text-primary mb-1">Low parse confidence</p>
                          <p className="text-text-secondary font-body text-sm">
                            The parser works best with single-column, text-based PDFs.
                            Scanned or image-based resumes may not parse correctly.
                          </p>
                        </div>
                      </GlassCard>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ── Small helpers ────────────────────────────────────────────────────────────

function ResultCard({
  title, icon, count, children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-text-primary flex items-center gap-2">
          {icon} {title}
        </h3>
        {count !== undefined && (
          <span className="text-xs bg-lime/10 text-lime border border-lime/20 px-2 py-0.5 rounded-full font-mono">
            {count}
          </span>
        )}
      </div>
      {children}
    </GlassCard>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-muted font-mono uppercase tracking-wider w-20 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-text-primary font-body break-all">{value}</span>
    </div>
  );
}
