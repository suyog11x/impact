export type InterviewType =
  | 'hr' | 'technical' | 'dsa' | 'system_design' | 'resume_based'
  | 'project_viva' | 'behavioral' | 'group_discussion' | 'aptitude'
  | 'ai_ml' | 'frontend' | 'backend' | 'fullstack' | 'devops' | 'startup_rapidfire';

export type CompanyMode = 'mnc' | 'service' | 'startup';

export type InterviewStage = 'setup' | 'intro' | 'questions' | 'coding' | 'closing' | 'report';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface InterviewConfig {
  type: InterviewType;
  companyMode?: CompanyMode;
  targetCompany?: string;
  skills: string[];
  resumeData?: string;
  difficulty: Difficulty;
  duration: number;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  interview_type: InterviewType;
  company_mode?: CompanyMode;
  target_company?: string;
  difficulty: Difficulty;
  status: 'in_progress' | 'completed' | 'abandoned';
  config: InterviewConfig;
  started_at: string;
  ended_at?: string;
  created_at: string;
}

export interface InterviewMessage {
  id: string;
  session_id: string;
  role: 'interviewer' | 'candidate';
  content: string;
  voice_metrics?: VoiceMetrics;
  created_at: string;
}

export interface VoiceMetrics {
  confidence: number;
  speed: number;
  fillers: number;
  hesitation: number;
  clarity: number;
}

export interface InterviewReport {
  id: string;
  session_id: string;
  user_id: string;
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  problem_solving_score: number;
  recruiter_impression: number;
  placement_readiness: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  roadmap: RoadmapItem[];
  recruiter_verdict: string;
  detailed_feedback: DetailedFeedback;
  created_at: string;
}

export interface RoadmapItem {
  week: number;
  focus: string;
  tasks: string[];
}

export interface DetailedFeedback {
  answers: AnswerFeedback[];
  overall_summary: string;
  recruiter_perspective: string;
}

export interface AnswerFeedback {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  better_answer?: string;
}

export interface CodeSubmission {
  id: string;
  session_id: string;
  language: CodeLanguage;
  code: string;
  stdin?: string;
  stdout?: string;
  stderr?: string;
  exit_code?: number;
  execution_time_ms?: number;
  ai_analysis?: CodeAnalysis;
  created_at: string;
}

export type CodeLanguage = 'python' | 'cpp' | 'java' | 'javascript';

export interface CodeAnalysis {
  time_complexity: string;
  space_complexity: string;
  is_optimal: boolean;
  suggestions: string[];
  score: number;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  output: string;
  exitCode: number;
  executionTime: number;
  success: boolean;
}

export interface InterviewTypeInfo {
  type: InterviewType;
  title: string;
  description: string;
  icon: string;
  duration: number;
  difficulty: Difficulty;
  category: 'core' | 'specialized' | 'advanced';
}

export interface CompanyModeInfo {
  mode: CompanyMode;
  title: string;
  description: string;
  companies: string[];
  focus: string[];
}

export const INTERVIEW_TYPES: InterviewTypeInfo[] = [
  { type: 'hr', title: 'HR Interview', description: 'Behavioral and HR round with common placement questions', icon: 'Users', duration: 30, difficulty: 'medium', category: 'core' },
  { type: 'technical', title: 'Technical Interview', description: 'Core CS fundamentals, OOPs, DBMS, OS, CN', icon: 'Cpu', duration: 45, difficulty: 'hard', category: 'core' },
  { type: 'dsa', title: 'DSA Interview', description: 'Data structures & algorithms with live coding', icon: 'Code', duration: 60, difficulty: 'hard', category: 'core' },
  { type: 'system_design', title: 'System Design', description: 'Design scalable systems and architecture', icon: 'Network', duration: 45, difficulty: 'hard', category: 'advanced' },
  { type: 'resume_based', title: 'Resume-Based', description: 'Deep dive into your resume and experience', icon: 'FileText', duration: 30, difficulty: 'medium', category: 'core' },
  { type: 'project_viva', title: 'Project Viva', description: 'In-depth project architecture and decisions', icon: 'FolderOpen', duration: 30, difficulty: 'medium', category: 'core' },
  { type: 'behavioral', title: 'Behavioral', description: 'STAR method, leadership, teamwork scenarios', icon: 'Heart', duration: 25, difficulty: 'easy', category: 'core' },
  { type: 'group_discussion', title: 'Group Discussion', description: 'Simulate GD topics and argumentation', icon: 'MessageSquare', duration: 20, difficulty: 'medium', category: 'specialized' },
  { type: 'aptitude', title: 'Aptitude Round', description: 'Quantitative, logical, and verbal ability', icon: 'Calculator', duration: 30, difficulty: 'easy', category: 'specialized' },
  { type: 'ai_ml', title: 'AI/ML Interview', description: 'Machine learning, deep learning, NLP concepts', icon: 'Brain', duration: 45, difficulty: 'hard', category: 'specialized' },
  { type: 'frontend', title: 'Frontend Interview', description: 'React, CSS, JS, browser APIs, performance', icon: 'Layout', duration: 40, difficulty: 'medium', category: 'specialized' },
  { type: 'backend', title: 'Backend Interview', description: 'APIs, databases, auth, scalability', icon: 'Server', duration: 40, difficulty: 'medium', category: 'specialized' },
  { type: 'fullstack', title: 'Full Stack', description: 'End-to-end development knowledge', icon: 'Layers', duration: 50, difficulty: 'hard', category: 'specialized' },
  { type: 'devops', title: 'DevOps Interview', description: 'CI/CD, Docker, Kubernetes, cloud', icon: 'Cloud', duration: 35, difficulty: 'medium', category: 'specialized' },
  { type: 'startup_rapidfire', title: 'Startup Rapid-Fire', description: 'Fast-paced practical problem solving', icon: 'Zap', duration: 20, difficulty: 'hard', category: 'advanced' },
];

export const COMPANY_MODES: CompanyModeInfo[] = [
  {
    mode: 'mnc',
    title: 'MNC / Product Companies',
    description: 'Google, Microsoft, Amazon-style interviews',
    companies: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Atlassian', 'NVIDIA', 'Oracle'],
    focus: ['DSA', 'System Design', 'Problem Solving', 'Optimization', 'Scalability'],
  },
  {
    mode: 'service',
    title: 'Indian Service Companies',
    description: 'TCS, Infosys, Wipro-style interviews',
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Capgemini'],
    focus: ['Fundamentals', 'OOPs', 'DBMS', 'OS', 'Aptitude', 'Communication'],
  },
  {
    mode: 'startup',
    title: 'Startup Mode',
    description: 'Fast-paced practical interview style',
    companies: ['Razorpay', 'Zerodha', 'CRED', 'Swiggy', 'Meesho', 'PhonePe'],
    focus: ['Practical Skills', 'API Design', 'Real-world Thinking', 'Deployment'],
  },
];

export const CODE_LANGUAGES: Record<CodeLanguage, { version: string; name: string; pistonLang: string }> = {
  python: { version: '3.10.0', name: 'Python', pistonLang: 'python' },
  cpp: { version: '10.2.0', name: 'C++', pistonLang: 'c++' },
  java: { version: '15.0.2', name: 'Java', pistonLang: 'java' },
  javascript: { version: '18.15.0', name: 'JavaScript', pistonLang: 'javascript' },
};
