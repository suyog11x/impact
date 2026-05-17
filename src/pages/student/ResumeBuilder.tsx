import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Link2, Plus, Trash2, Download,
  Briefcase, GraduationCap, Layers, Award, ChevronDown, ChevronUp,
  Eye, Edit3, FileText, CheckCircle
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Profile {
  name: string; email: string; phone: string;
  linkedin: string; github: string; summary: string;
}

interface Experience {
  id: string; title: string; company: string;
  duration: string; description: string;
}

interface Education {
  id: string; degree: string; institution: string;
  year: string; gpa: string;
}

interface Project {
  id: string; name: string; technologies: string; description: string;
}

interface Certification {
  id: string; name: string; issuer: string; year: string;
}

interface ResumeState {
  profile: Profile;
  skills: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}

const uid = () => Math.random().toString(36).slice(2);

const defaultResume: ResumeState = {
  profile: { name: '', email: '', phone: '', linkedin: '', github: '', summary: '' },
  skills: '',
  experience: [{ id: uid(), title: '', company: '', duration: '', description: '' }],
  education: [{ id: uid(), degree: '', institution: '', year: '', gpa: '' }],
  projects: [{ id: uid(), name: '', technologies: '', description: '' }],
  certifications: [],
};

// ─── Small helpers ────────────────────────────────────────────────────────────

const Field = ({
  label, value, onChange, placeholder = '', multiline = false, mono = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; mono?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-mono text-muted-foreground uppercase tracking-[0.15em]">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className={`bg-transparent border border-input rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent resize-none transition-all duration-150 ${mono ? 'font-mono' : 'font-body'}`}
      />
    ) : (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-transparent border border-input rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent transition-all duration-150 ${mono ? 'font-mono' : 'font-body'}`}
      />
    )}
  </div>
);

const SectionHeader = ({
  icon, title, onAdd, addLabel, open, onToggle,
}: {
  icon: React.ReactNode; title: string; onAdd?: () => void;
  addLabel?: string; open: boolean; onToggle: () => void;
}) => (
  <div className="flex items-center justify-between mb-4">
    <button onClick={onToggle} className="flex items-center gap-2 group">
      <span className="text-accent">{icon}</span>
      <span className="font-heading text-lg text-foreground group-hover:text-accent transition-colors">{title}</span>
      <span className="text-muted-foreground">{open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
    </button>
    {onAdd && (
      <button onClick={onAdd} className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-secondary transition-colors font-body">
        <Plus size={13} /> {addLabel ?? 'Add'}
      </button>
    )}
  </div>
);

// ─── Preview Component ────────────────────────────────────────────────────────

function ResumePreview({ resume }: { resume: ResumeState }) {
  const { profile, skills, experience, education, projects, certifications } = resume;
  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div
      id="resume-preview"
      className="bg-white text-gray-900 rounded-2xl p-8 text-[13px] leading-snug font-sans"
      style={{ minHeight: '842px', fontFamily: 'Georgia, serif' }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">{profile.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 mt-1.5 text-xs text-gray-600">
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && <span>{profile.phone}</span>}
          {profile.linkedin && <span>LinkedIn: {profile.linkedin}</span>}
          {profile.github && <span>GitHub: {profile.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {profile.summary && (
        <Section title="Summary">
          <p className="text-gray-700">{profile.summary}</p>
        </Section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <Section title="Technical Skills">
          <div className="flex flex-wrap gap-1.5">
            {skillList.map((s, i) => (
              <span key={i} className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded text-xs">{s}</span>
            ))}
          </div>
        </Section>
      )}

      {/* Experience */}
      {experience.some(e => e.title || e.company) && (
        <Section title="Work Experience">
          {experience.filter(e => e.title || e.company).map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-bold">{exp.title || 'Job Title'}</span>
                <span className="text-gray-500 text-xs">{exp.duration}</span>
              </div>
              <div className="text-gray-600 italic">{exp.company}</div>
              {exp.description && <p className="mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.some(e => e.degree || e.institution) && (
        <Section title="Education">
          {education.filter(e => e.degree || e.institution).map(edu => (
            <div key={edu.id} className="mb-2 flex justify-between items-baseline">
              <div>
                <span className="font-bold">{edu.degree || 'Degree'}</span>
                {edu.institution && <span className="text-gray-600">, {edu.institution}</span>}
                {edu.gpa && <span className="text-gray-500 ml-2">GPA: {edu.gpa}</span>}
              </div>
              <span className="text-gray-500 text-xs">{edu.year}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.some(p => p.name) && (
        <Section title="Projects">
          {projects.filter(p => p.name).map(proj => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-bold">{proj.name}</span>
                {proj.technologies && (
                  <span className="text-gray-500 text-xs">{proj.technologies}</span>
                )}
              </div>
              {proj.description && <p className="mt-0.5 text-gray-700">{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications.some(c => c.name) && (
        <Section title="Certifications">
          {certifications.filter(c => c.name).map(cert => (
            <div key={cert.id} className="flex justify-between items-baseline mb-1">
              <span className="font-bold">{cert.name}</span>
              <span className="text-gray-500 text-xs">{cert.issuer} {cert.year}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 mb-2 pb-0.5">{title}</h2>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResumeBuilder() {
  const [resume, setResume] = useState<ResumeState>(defaultResume);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [openSections, setOpenSections] = useState({
    profile: true, skills: true, experience: true,
    education: true, projects: false, certifications: false,
  });
  const [saved, setSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const setProfile = (field: keyof Profile, val: string) =>
    setResume(r => ({ ...r, profile: { ...r.profile, [field]: val } }));

  // Experience
  const addExp = () => setResume(r => ({ ...r, experience: [...r.experience, { id: uid(), title: '', company: '', duration: '', description: '' }] }));
  const removeExp = (id: string) => setResume(r => ({ ...r, experience: r.experience.filter(e => e.id !== id) }));
  const setExp = (id: string, field: keyof Experience, val: string) =>
    setResume(r => ({ ...r, experience: r.experience.map(e => e.id === id ? { ...e, [field]: val } : e) }));

  // Education
  const addEdu = () => setResume(r => ({ ...r, education: [...r.education, { id: uid(), degree: '', institution: '', year: '', gpa: '' }] }));
  const removeEdu = (id: string) => setResume(r => ({ ...r, education: r.education.filter(e => e.id !== id) }));
  const setEdu = (id: string, field: keyof Education, val: string) =>
    setResume(r => ({ ...r, education: r.education.map(e => e.id === id ? { ...e, [field]: val } : e) }));

  // Projects
  const addProj = () => setResume(r => ({ ...r, projects: [...r.projects, { id: uid(), name: '', technologies: '', description: '' }] }));
  const removeProj = (id: string) => setResume(r => ({ ...r, projects: r.projects.filter(p => p.id !== id) }));
  const setProj = (id: string, field: keyof Project, val: string) =>
    setResume(r => ({ ...r, projects: r.projects.map(p => p.id === id ? { ...p, [field]: val } : p) }));

  // Certifications
  const addCert = () => setResume(r => ({ ...r, certifications: [...r.certifications, { id: uid(), name: '', issuer: '', year: '' }] }));
  const removeCert = (id: string) => setResume(r => ({ ...r, certifications: r.certifications.filter(c => c.id !== id) }));
  const setCert = (id: string, field: keyof Certification, val: string) =>
    setResume(r => ({ ...r, certifications: r.certifications.map(c => c.id === id ? { ...c, [field]: val } : c) }));

  const handleSave = () => {
    localStorage.setItem('skillsync_resume', JSON.stringify(resume));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePrint = () => {
    const el = document.getElementById('resume-preview');
    if (!el) return;
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html><head><title>Resume</title>
      <style>body{margin:0;padding:24px;font-family:Georgia,serif;font-size:13px;}
      h1{font-size:22px;text-align:center;text-transform:uppercase;letter-spacing:2px;}
      h2{font-size:11px;text-transform:uppercase;letter-spacing:3px;border-bottom:1px solid #888;margin-bottom:6px;padding-bottom:2px;}
      .header-meta{text-align:center;color:#555;font-size:11px;margin-top:6px;}
      </style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div>
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-muted rounded-md flex items-center justify-center">
            <FileText size={20} className="text-accent" />
          </div>
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent mb-1">Editor</p>
            <h1 className="text-4xl font-heading text-foreground">Resume Builder</h1>
            <p className="text-muted-foreground font-body mt-1 text-lg">Build a clean, ATS-friendly resume with live preview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all"
          >
            {view === 'edit' ? <><Eye size={15} /> Preview</> : <><Edit3 size={15} /> Edit</>}
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body border transition-all ${saved ? 'border-accent/40 text-accent bg-accent-muted' : 'border-border text-muted-foreground hover:border-border-hover'}`}
          >
            {saved ? <><CheckCircle size={15} /> Saved!</> : 'Save Draft'}
          </button>
          <NeonButton onClick={handlePrint} size="sm">
            <Download size={14} /> Export PDF
          </NeonButton>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ── Left: Editor ── */}
        <AnimatePresence mode="wait">
          {view === 'edit' && (
            <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 xl:col-span-1">

              {/* Profile */}
              <GlassCard>
                <SectionHeader icon={<User size={16} />} title="Contact Info" open={openSections.profile} onToggle={() => toggleSection('profile')} />
                {openSections.profile && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Full Name" value={resume.profile.name} onChange={v => setProfile('name', v)} placeholder="Jane Doe" />
                    <Field label="Email" value={resume.profile.email} onChange={v => setProfile('email', v)} placeholder="jane@email.com" />
                    <Field label="Phone" value={resume.profile.phone} onChange={v => setProfile('phone', v)} placeholder="+91 9876543210" />
                    <Field label="LinkedIn" value={resume.profile.linkedin} onChange={v => setProfile('linkedin', v)} placeholder="linkedin.com/in/jane" />
                    <Field label="GitHub" value={resume.profile.github} onChange={v => setProfile('github', v)} placeholder="github.com/jane" />
                    <div className="sm:col-span-2">
                      <Field label="Professional Summary" value={resume.profile.summary} onChange={v => setProfile('summary', v)} placeholder="Brief overview of your background..." multiline />
                    </div>
                  </div>
                )}
              </GlassCard>

              {/* Skills */}
              <GlassCard>
                <SectionHeader icon={<Award size={16} />} title="Technical Skills" open={openSections.skills} onToggle={() => toggleSection('skills')} />
                {openSections.skills && (
                  <Field label="Skills (comma-separated)" value={resume.skills} onChange={v => setResume(r => ({ ...r, skills: v }))} placeholder="React, Python, SQL, Docker..." />
                )}
              </GlassCard>

              {/* Experience */}
              <GlassCard>
                <SectionHeader icon={<Briefcase size={16} />} title="Work Experience" open={openSections.experience} onToggle={() => toggleSection('experience')} onAdd={addExp} addLabel="Add Role" />
                {openSections.experience && (
                  <div className="space-y-4">
                    {resume.experience.map((exp, i) => (
                      <div key={exp.id} className="p-4 bg-muted rounded-md relative">
                        {resume.experience.length > 1 && (
                          <button onClick={() => removeExp(exp.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-danger transition-colors"><Trash2 size={13} /></button>
                        )}
                        <p className="text-xs text-muted-foreground font-mono mb-3">Position {i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Field label="Job Title" value={exp.title} onChange={v => setExp(exp.id, 'title', v)} placeholder="Software Engineer" />
                          <Field label="Company" value={exp.company} onChange={v => setExp(exp.id, 'company', v)} placeholder="Tech Corp" />
                          <div className="sm:col-span-2">
                            <Field label="Duration" value={exp.duration} onChange={v => setExp(exp.id, 'duration', v)} placeholder="Jun 2022 – Present" />
                          </div>
                          <div className="sm:col-span-2">
                            <Field label="Responsibilities / Achievements" value={exp.description} onChange={v => setExp(exp.id, 'description', v)} placeholder="• Built X that improved Y by Z..." multiline />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>

              {/* Education */}
              <GlassCard>
                <SectionHeader icon={<GraduationCap size={16} />} title="Education" open={openSections.education} onToggle={() => toggleSection('education')} onAdd={addEdu} addLabel="Add Education" />
                {openSections.education && (
                  <div className="space-y-4">
                    {resume.education.map((edu, i) => (
                      <div key={edu.id} className="p-4 bg-muted rounded-md relative">
                        {resume.education.length > 1 && (
                          <button onClick={() => removeEdu(edu.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-danger transition-colors"><Trash2 size={13} /></button>
                        )}
                        <p className="text-xs text-muted-foreground font-mono mb-3">Entry {i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Field label="Degree / Program" value={edu.degree} onChange={v => setEdu(edu.id, 'degree', v)} placeholder="B.Tech Computer Science" />
                          <Field label="Institution" value={edu.institution} onChange={v => setEdu(edu.id, 'institution', v)} placeholder="IIT Bombay" />
                          <Field label="Year" value={edu.year} onChange={v => setEdu(edu.id, 'year', v)} placeholder="2020 – 2024" />
                          <Field label="GPA (optional)" value={edu.gpa} onChange={v => setEdu(edu.id, 'gpa', v)} placeholder="8.5 / 10" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>

              {/* Projects */}
              <GlassCard>
                <SectionHeader icon={<Layers size={16} />} title="Projects" open={openSections.projects} onToggle={() => toggleSection('projects')} onAdd={addProj} addLabel="Add Project" />
                {openSections.projects && (
                  <div className="space-y-4">
                    {resume.projects.map((proj, i) => (
                      <div key={proj.id} className="p-4 bg-muted rounded-md relative">
                        <button onClick={() => removeProj(proj.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-danger transition-colors"><Trash2 size={13} /></button>
                        <p className="text-xs text-muted-foreground font-mono mb-3">Project {i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Field label="Project Name" value={proj.name} onChange={v => setProj(proj.id, 'name', v)} placeholder="SkillSync AI" />
                          <Field label="Technologies" value={proj.technologies} onChange={v => setProj(proj.id, 'technologies', v)} placeholder="React, FastAPI, Supabase" />
                          <div className="sm:col-span-2">
                            <Field label="Description" value={proj.description} onChange={v => setProj(proj.id, 'description', v)} placeholder="What you built and its impact..." multiline />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>

              {/* Certifications */}
              <GlassCard>
                <SectionHeader icon={<Award size={16} />} title="Certifications" open={openSections.certifications} onToggle={() => toggleSection('certifications')} onAdd={addCert} addLabel="Add Cert" />
                {openSections.certifications && (
                  <div className="space-y-3">
                    {resume.certifications.length === 0 && (
                      <p className="text-muted-foreground font-body text-sm">No certifications yet. Click "Add Cert" to start.</p>
                    )}
                    {resume.certifications.map((cert, i) => (
                      <div key={cert.id} className="p-4 bg-muted rounded-md relative">
                        <button onClick={() => removeCert(cert.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-danger transition-colors"><Trash2 size={13} /></button>
                        <p className="text-xs text-muted-foreground font-mono mb-3">Cert {i + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Field label="Certificate Name" value={cert.name} onChange={v => setCert(cert.id, 'name', v)} placeholder="AWS Cloud Practitioner" />
                          <Field label="Issuer" value={cert.issuer} onChange={v => setCert(cert.id, 'issuer', v)} placeholder="Amazon" />
                          <Field label="Year" value={cert.year} onChange={v => setCert(cert.id, 'year', v)} placeholder="2024" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>

              {/* Socials / Links hint */}
              <div className="p-4 bg-accent-muted rounded-md border border-accent/20 flex items-start gap-3">
                <Link2 size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-heading text-foreground mb-0.5">Quick Tip</p>
                  <p className="text-xs text-muted-foreground font-body">
                    Fill in all contact fields and keep skill keywords relevant to the job — this significantly improves ATS parsing accuracy.
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Right: Preview ── */}
        <div ref={previewRef} className={`${view === 'edit' ? 'hidden xl:block' : 'col-span-1 xl:col-span-1'}`}>
          <div className="sticky top-24">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
              <Eye size={12} className="text-accent" /> Live Preview
            </p>
            <div className="overflow-y-auto max-h-[calc(100vh-10rem)] rounded-lg border border-border">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
