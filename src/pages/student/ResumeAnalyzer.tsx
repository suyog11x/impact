import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ScanText, Loader2, X, CheckCircle,
  User, Briefcase,
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
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">Analysis</p>
        <h1 className="text-4xl font-heading text-foreground">Resume Analyzer</h1>
        <p className="text-muted-foreground font-body mt-2 text-lg">
          Upload your PDF — parsed entirely in the browser, no server needed
        </p>
      </motion.div>

      {!pdfUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`serif-card rounded-lg p-14 text-center border-2 border-dashed transition-all ${
            dragging ? 'border-accent bg-accent-muted' : 'border-border hover:border-border-hover'
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
          <div className="w-20 h-20 bg-accent-muted rounded-lg flex items-center justify-center mx-auto mb-5">
            <Upload size={36} className="text-accent" />
          </div>
          <h3 className="text-xl font-heading text-foreground mb-2">
            Drop your resume here
          </h3>
          <p className="text-muted-foreground font-body mb-6">PDF format only</p>
          <NeonButton onClick={() => inputRef.current?.click()}>
            <Upload size={16} /> Browse File
          </NeonButton>

          {status === 'error' && error && (
            <p className="mt-4 text-danger font-body text-sm flex items-center justify-center gap-2">
              <X size={14} /> {error}
            </p>
          )}
        </motion.div>
      )}

      {pdfUrl && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                  <ScanText size={15} className="text-accent" />
                  <span className="truncate max-w-xs">{fileName}</span>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-danger transition-colors font-body"
                >
                  <RefreshCw size={12} /> Remove
                </button>
              </div>

              <GlassCard hover={false} className="p-0 overflow-hidden">
                <iframe
                  src={`${pdfUrl}#navpanes=0`}
                  className="w-full"
                  style={{ height: '70vh' }}
                  title="Resume PDF Preview"
                />
              </GlassCard>

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
                <p className="text-danger font-body text-sm text-center flex items-center justify-center gap-2">
                  <X size={14} /> {error}
                </p>
              )}
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-10rem)] space-y-4 pr-1">
              {status === 'idle' && (
                <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <ScanText size={28} className="text-muted-foreground" />
                  </div>
                  <p className="font-heading text-lg text-foreground">Ready to analyze</p>
                  <p className="text-muted-foreground font-body text-sm">
                    Click "Analyze Resume" to extract structured information
                  </p>
                </div>
              )}

              {status === 'parsing' && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 size={40} className="text-accent animate-spin" />
                  <p className="font-heading text-lg text-foreground">Parsing resume…</p>
                  <p className="text-muted-foreground font-body text-sm">Extracting sections and fields</p>
                </div>
              )}

              {status === 'done' && resume && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-accent" />
                        <span className="font-heading text-lg text-foreground">Parse Complete</span>
                      </div>
                      <button
                        onClick={() => { setStatus('idle'); setResume(null); }}
                        className="text-xs text-muted-foreground hover:text-accent transition-colors font-body flex items-center gap-1"
                      >
                        <RefreshCw size={12} /> Re-analyze
                      </button>
                    </div>

                    <ResultCard title="Contact Info" icon={<User size={16} className="text-accent" />}>
                      <InfoRow label="Name" value={resume.profile.name} />
                      <InfoRow label="Email" value={resume.profile.email} />
                      <InfoRow label="Phone" value={resume.profile.phone} />
                      <InfoRow label="Location" value={resume.profile.location} />
                      <InfoRow label="URL" value={resume.profile.url} />
                      {resume.profile.summary && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.15em] mb-2">Summary</p>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">{resume.profile.summary}</p>
                        </div>
                      )}
                    </ResultCard>

                    {resume.skills.descriptions.length > 0 && (
                      <ResultCard title="Skills" icon={<Code size={16} className="text-accent" />}>
                        <div className="flex flex-wrap gap-2">
                          {resume.skills.descriptions.map((s, i) => (
                            <Badge key={i} variant="success">{s}</Badge>
                          ))}
                        </div>
                      </ResultCard>
                    )}

                    {resume.workExperiences.length > 0 && resume.workExperiences.some(e => e.company || e.jobTitle) && (
                      <ResultCard
                        title="Work Experience"
                        icon={<Briefcase size={16} className="text-accent" />}
                        count={resume.workExperiences.filter(e => e.company || e.jobTitle).length}
                      >
                        {resume.workExperiences.filter(e => e.company || e.jobTitle).map((exp, i) => (
                          <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t border-border' : ''}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-heading text-foreground">{exp.jobTitle}</p>
                                <p className="text-sm text-accent font-body">{exp.company}</p>
                              </div>
                              {exp.date && <span className="text-xs text-muted-foreground font-mono">{exp.date}</span>}
                            </div>
                            {exp.descriptions.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {exp.descriptions.map((d, j) => (
                                  <li key={j} className="text-sm text-muted-foreground font-body">• {d}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </ResultCard>
                    )}

                    {resume.educations.length > 0 && resume.educations.some(e => e.school || e.degree) && (
                      <ResultCard
                        title="Education"
                        icon={<GraduationCap size={16} className="text-accent" />}
                        count={resume.educations.filter(e => e.school || e.degree).length}
                      >
                        {resume.educations.filter(e => e.school || e.degree).map((edu, i) => (
                          <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t border-border' : ''}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-heading text-foreground">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground font-body">{edu.school}</p>
                              </div>
                              <div className="text-right">
                                {edu.date && <p className="text-xs text-muted-foreground font-mono">{edu.date}</p>}
                                {edu.gpa && <p className="text-xs text-muted-foreground font-mono">GPA: {edu.gpa}</p>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </ResultCard>
                    )}

                    {resume.projects.length > 0 && resume.projects.some(p => p.project) && (
                      <ResultCard
                        title="Projects"
                        icon={<Layers size={16} className="text-accent" />}
                        count={resume.projects.filter(p => p.project).length}
                      >
                        {resume.projects.filter(p => p.project).map((proj, i) => (
                          <div key={i} className={i > 0 ? 'mt-4 pt-4 border-t border-border' : ''}>
                            <div className="flex justify-between items-start">
                              <p className="font-heading text-foreground">{proj.project}</p>
                              {proj.date && <span className="text-xs text-muted-foreground font-mono">{proj.date}</span>}
                            </div>
                            {proj.descriptions.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {proj.descriptions.map((d, j) => (
                                  <li key={j} className="text-sm text-muted-foreground font-body">• {d}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </ResultCard>
                    )}

                    {!resume.profile.name && !resume.profile.email &&
                      resume.workExperiences.filter(e => e.company).length === 0 &&
                      resume.educations.filter(e => e.school).length === 0 && (
                      <GlassCard>
                        <div className="text-center py-4">
                          <Award size={28} className="text-muted-foreground mx-auto mb-2" />
                          <p className="font-heading text-lg text-foreground mb-1">Low parse confidence</p>
                          <p className="text-muted-foreground font-body text-sm">
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg text-foreground flex items-center gap-2">
          {icon} {title}
        </h3>
        {count !== undefined && (
          <span className="text-xs bg-accent-muted text-accent border border-accent/20 px-2 py-0.5 rounded-md font-mono">
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
    <div className="flex items-start gap-3 py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground font-mono uppercase tracking-[0.15em] w-20 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-foreground font-body break-all">{value}</span>
    </div>
  );
}
