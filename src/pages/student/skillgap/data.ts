// ============================================================
// SKILL GAP ANALYSIS ENGINE — DATA & TYPES
// ============================================================

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type RoleKey = 'frontend' | 'backend' | 'fullstack' | 'ai' | 'data' | 'devops' | 'security';
export type TimelineMode = '30' | '90' | '180';

export interface GapInsight {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  importance: number;
  recommendation: string;
  category: string;
}

export interface RadarDomain {
  subject: string;
  student: number;
  industry: number;
}

export interface RoleProfile {
  key: RoleKey;
  label: string;
  match: number;
  missingSkills: string[];
  strongSkills: string[];
  description: string;
}

export interface RoadmapWeek {
  week: number;
  title: string;
  goals: string[];
  projects: string;
  certification?: string;
  resources: string[];
  completed: boolean;
}

export interface ProjectRec {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  resumeValue: number;
  timeEstimate: string;
  recruiterImpact: number;
  missingSkillsCovered: string[];
}

export interface MarketTrend {
  skill: string;
  demand: number;
  growth: string;
  category: string;
  aligned: boolean;
}

export interface RecruiterMetric {
  label: string;
  score: number;
  icon: string;
  description: string;
}

// ---- STUDENT PROFILE DATA ----
export const studentProfile = {
  name: 'Arjun Sharma',
  readinessScore: 62,
  confidencePercent: 78,
  timelineMonths: 4,
  placementProbability: 74,
  marketAlignment: 63,
  atsScore: 68,
};

export const radarDomains: RadarDomain[] = [
  { subject: 'DSA', student: 72, industry: 90 },
  { subject: 'Frontend', student: 75, industry: 85 },
  { subject: 'Backend', student: 55, industry: 80 },
  { subject: 'Cloud', student: 25, industry: 70 },
  { subject: 'DevOps', student: 30, industry: 65 },
  { subject: 'AI/ML', student: 40, industry: 60 },
  { subject: 'Databases', student: 65, industry: 75 },
  { subject: 'Sys Design', student: 35, industry: 70 },
  { subject: 'Comm.', student: 78, industry: 75 },
  { subject: 'Problem Solving', student: 70, industry: 85 },
];

export const gapInsights: GapInsight[] = [
  {
    id: 'g1',
    title: 'No Cloud Exposure',
    description: 'Your GitHub and resume show zero AWS, GCP, or Azure usage. 82% of companies require cloud familiarity.',
    severity: 'critical',
    importance: 96,
    recommendation: 'Complete AWS Cloud Practitioner or Azure Fundamentals. Deploy at least one project on EC2/S3.',
    category: 'Cloud',
  },
  {
    id: 'g2',
    title: 'GitHub Lacks Open-Source Contributions',
    description: 'Your profile shows 0 pull requests to external repos. Recruiters flag solo-only profiles.',
    severity: 'high',
    importance: 88,
    recommendation: 'Contribute to 2–3 open-source projects on GitHub. Start with "good first issue" labels.',
    category: 'GitHub',
  },
  {
    id: 'g3',
    title: 'React Without Deployment Knowledge',
    description: 'You know React (70%) but have never deployed an app. Vercel/Netlify/Docker deployment is expected.',
    severity: 'high',
    importance: 82,
    recommendation: 'Deploy your React projects using Vercel. Learn Docker basics for containerized deployment.',
    category: 'Frontend',
  },
  {
    id: 'g4',
    title: 'Resume Lacks Measurable Impact',
    description: 'Bullet points are generic (e.g., "Built a feature"). No numbers, percentages, or metrics present.',
    severity: 'high',
    importance: 79,
    recommendation: 'Rewrite 80% of bullet points with metrics: "Reduced load time by 40%", "Served 500+ users".',
    category: 'Resume',
  },
  {
    id: 'g5',
    title: 'System Design Knowledge Missing',
    description: 'System design is tested in all senior/FAANG roles. Your profile shows no study or projects in this area.',
    severity: 'high',
    importance: 85,
    recommendation: 'Study "Grokking the System Design Interview". Build a scalable URL shortener project.',
    category: 'Core',
  },
  {
    id: 'g6',
    title: 'Graph & DP Weak in DSA',
    description: 'Your LeetCode history shows strong array/string performance but only 23% success on graph and DP problems.',
    severity: 'medium',
    importance: 71,
    recommendation: 'Solve 50+ graph problems (BFS/DFS/Dijkstra) and 40+ DP problems on LeetCode.',
    category: 'DSA',
  },
  {
    id: 'g7',
    title: 'Backend API Depth Missing',
    description: 'You know Node.js basics but lack REST API best practices, authentication (JWT/OAuth), and error handling.',
    severity: 'medium',
    importance: 68,
    recommendation: 'Build a full REST API with authentication, pagination, and proper error handling using Express or FastAPI.',
    category: 'Backend',
  },
  {
    id: 'g8',
    title: 'No DevOps/CI-CD Pipeline Experience',
    description: 'GitHub Actions, Jenkins, or CircleCI are expected in modern dev roles. None found on your profile.',
    severity: 'medium',
    importance: 65,
    recommendation: 'Set up a GitHub Actions pipeline for your main project with lint, test, and deploy stages.',
    category: 'DevOps',
  },
];

export const roleProfiles: Record<RoleKey, RoleProfile> = {
  fullstack: {
    key: 'fullstack',
    label: 'Full Stack Developer',
    match: 74,
    missingSkills: ['Docker', 'AWS/GCP', 'System Design', 'CI/CD', 'Redis', 'GraphQL'],
    strongSkills: ['React', 'JavaScript', 'Node.js', 'SQL', 'Git'],
    description: 'Strong frontend base. Backend needs depth in APIs and databases. Cloud & DevOps are critical gaps.',
  },
  frontend: {
    key: 'frontend',
    label: 'Frontend Developer',
    match: 81,
    missingSkills: ['Performance Optimization', 'WebSockets', 'Testing (Jest/Cypress)', 'Micro-frontend', 'Deployment'],
    strongSkills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Git'],
    description: 'Near placement-ready for frontend roles. Focus on deployment and testing to close the gap.',
  },
  backend: {
    key: 'backend',
    label: 'Backend Developer',
    match: 58,
    missingSkills: ['Microservices', 'Kafka/RabbitMQ', 'Docker', 'AWS', 'PostgreSQL Advanced', 'gRPC'],
    strongSkills: ['Python', 'Node.js', 'SQL', 'REST APIs', 'DSA'],
    description: 'Backend foundations are decent but scalability and cloud knowledge are critical gaps.',
  },
  ai: {
    key: 'ai',
    label: 'AI Engineer',
    match: 42,
    missingSkills: ['PyTorch/TensorFlow', 'LangChain', 'Vector DBs', 'MLOps', 'LLM Fine-tuning', 'RAG Systems'],
    strongSkills: ['Python', 'Data Structures', 'Problem Solving'],
    description: 'Python base is useful, but deep ML/AI engineering skills need significant development.',
  },
  data: {
    key: 'data',
    label: 'Data Analyst',
    match: 67,
    missingSkills: ['Pandas/NumPy Advanced', 'Tableau/Power BI', 'Statistical Analysis', 'Spark', 'Data Wrangling'],
    strongSkills: ['Python', 'SQL', 'Problem Solving', 'Communication'],
    description: 'SQL and Python are assets. Visualization and statistical analysis need improvement.',
  },
  devops: {
    key: 'devops',
    label: 'DevOps Engineer',
    match: 31,
    missingSkills: ['Kubernetes', 'Terraform', 'Ansible', 'AWS/GCP', 'Prometheus/Grafana', 'Jenkins', 'Linux Advanced'],
    strongSkills: ['Git', 'Basic Docker', 'Communication'],
    description: 'Significantly underprepared for DevOps roles. Requires 6+ months of focused upskilling.',
  },
  security: {
    key: 'security',
    label: 'Cybersecurity Analyst',
    match: 28,
    missingSkills: ['Network Security', 'Penetration Testing', 'SIEM Tools', 'OWASP', 'Cryptography', 'Ethical Hacking'],
    strongSkills: ['Problem Solving', 'Communication'],
    description: 'Cybersecurity is a highly specialized field with a long learning curve from your current profile.',
  },
};

export const roadmapData: Record<TimelineMode, Record<string, RoadmapWeek[]>> = {
  '30': {
    fullstack: [
      { week: 1, title: 'Cloud Foundations', goals: ['AWS EC2 & S3 basics', 'Deploy a React app on Vercel', 'Set up GitHub Actions CI pipeline'], projects: 'Deploy existing React project with CI/CD', certification: 'AWS Cloud Practitioner (start)', resources: ['AWS Free Tier Docs', 'Fireship YouTube: AWS Explained'], completed: false },
      { week: 2, title: 'Docker & Containerization', goals: ['Dockerize a Node.js app', 'Write Dockerfile and docker-compose', 'Push to Docker Hub'], projects: 'Containerized Full-Stack App', resources: ['TechWorld with Nana: Docker Tutorial', 'Official Docker Docs'], completed: false },
      { week: 3, title: 'System Design Basics', goals: ['Study URL shortener design', 'Learn CAP theorem', 'Understand load balancers'], projects: 'Design & implement URL shortener', resources: ['Grokking System Design', 'ByteByteGo YouTube'], completed: false },
      { week: 4, title: 'Resume & Portfolio Polish', goals: ['Rewrite bullet points with metrics', 'Add 2 deployed project links', 'Optimize LinkedIn with keywords'], projects: 'Final portfolio deployment', resources: ['Resume Worded AI Checker', 'LinkedIn Learning: Resume Writing'], completed: false },
    ],
  },
  '90': {
    fullstack: [
      { week: 1, title: 'DSA: Graphs & Trees', goals: ['BFS, DFS, Dijkstra', '20 LeetCode graph problems', 'Binary tree traversals'], projects: 'Graph visualizer web app', resources: ['NeetCode.io Roadmap', 'Abdul Bari DSA YouTube'], completed: false },
      { week: 2, title: 'Advanced React Patterns', goals: ['Context API & Zustand', 'React Query for server state', 'Custom hooks & compound components'], projects: 'State-managed dashboard UI', resources: ['ui.dev React Advanced', 'Jack Herrington YouTube'], completed: false },
      { week: 3, title: 'Backend: REST APIs', goals: ['JWT Auth in Node.js/FastAPI', 'Rate limiting & error handling', 'API documentation with Swagger'], projects: 'Full REST API with auth', resources: ['Traversy Media: Node.js REST', 'FastAPI official docs'], completed: false },
      { week: 4, title: 'Databases Deep Dive', goals: ['PostgreSQL indexing & optimization', 'Redis caching basics', 'MongoDB aggregation pipelines'], projects: 'Backend API with multi-DB strategy', resources: ['CMU DB Course', 'Redis University Free Course'], completed: false },
      { week: 5, title: 'Cloud: AWS Essentials', goals: ['EC2, S3, RDS, Lambda basics', 'Deploy backend on EC2', 'S3 static hosting'], projects: 'Cloud-hosted full stack app', certification: 'AWS Solutions Architect (start)', resources: ['A Cloud Guru AWS Course', 'AWS skill builder (free)'], completed: false },
      { week: 6, title: 'Docker & Kubernetes Intro', goals: ['Multi-container with docker-compose', 'Kubernetes pods & deployments (basics)', 'Helm chart basics'], projects: 'Microservices app with docker-compose', resources: ['TechWorld with Nana: K8s', 'Play with Kubernetes (free)'], completed: false },
      { week: 7, title: 'System Design', goals: ['Design Twitter feed, URL shortener, Chat App', 'Study consistent hashing, sharding', 'Mock system design interview x2'], projects: 'System design case study repo', resources: ['ByteByteGo Book', 'Exponent Mock Interviews'], completed: false },
      { week: 8, title: 'Open-Source & Capstone', goals: ['Submit 2 PRs to OSS projects', 'Finalize capstone project', 'Publish technical blog'], projects: 'Capstone: scalable full-stack SaaS', resources: ['GitHub Explore', 'Dev.to publishing'], completed: false },
    ],
  },
  '180': {
    fullstack: [
      { week: 1, title: 'DSA Sprint: Arrays & Strings', goals: ['Two-pointer technique', '25 LeetCode easy/medium', 'Sliding window pattern'], projects: 'Algorithm practice tracker', resources: ['NeetCode.io', 'Striver A-Z DSA Sheet'], completed: false },
      { week: 2, title: 'DSA Sprint: Linked Lists & Stacks', goals: ['Reverse LL, detect cycle', 'Stack & queue problems', 'Monotonic stack pattern'], projects: 'DSA solution repo on GitHub', resources: ['Abdul Bari YouTube', 'LeetCode discuss'], completed: false },
      { week: 3, title: 'JavaScript Deep Dive', goals: ['Event loop, promises, async/await', 'Prototypes, closures', 'ES2024 features'], projects: 'Custom promise implementation', resources: ['javascript.info', 'Kyle Simpson: YDKJS'], completed: false },
      { week: 4, title: 'React Mastery', goals: ['Performance optimization', 'Lazy loading & code splitting', 'React Testing Library'], projects: 'Optimized React e-commerce frontend', resources: ['Epic React by Kent C. Dodds', 'React docs'], completed: false },
    ],
  },
};

export const projectRecs: ProjectRec[] = [
  {
    id: 'p1',
    title: 'CloudDeploy: Scalable Deployment Platform',
    description: 'Build a mini-Vercel that takes a GitHub repo URL and deploys it automatically using AWS EC2 + S3.',
    difficulty: 'Advanced',
    techStack: ['Node.js', 'AWS EC2', 'S3', 'Docker', 'GitHub Actions', 'React'],
    resumeValue: 95,
    timeEstimate: '3–4 weeks',
    recruiterImpact: 98,
    missingSkillsCovered: ['AWS', 'Docker', 'CI/CD', 'Cloud'],
  },
  {
    id: 'p2',
    title: 'DevMetrics: GitHub Analytics Dashboard',
    description: 'A real-time GitHub analytics platform that visualizes your contribution heatmap, language breakdown, and PR statistics.',
    difficulty: 'Intermediate',
    techStack: ['React', 'GitHub API', 'Recharts', 'Node.js', 'PostgreSQL'],
    resumeValue: 82,
    timeEstimate: '2 weeks',
    recruiterImpact: 80,
    missingSkillsCovered: ['APIs', 'Data Visualization', 'PostgreSQL'],
  },
  {
    id: 'p3',
    title: 'MicroChat: Microservices Chat App',
    description: 'A WebSocket-based chat application built with microservices using Docker, Redis pub/sub, and Kubernetes.',
    difficulty: 'Advanced',
    techStack: ['Node.js', 'WebSockets', 'Redis', 'Docker', 'Kubernetes', 'React'],
    resumeValue: 92,
    timeEstimate: '4–5 weeks',
    recruiterImpact: 94,
    missingSkillsCovered: ['Redis', 'Docker', 'Kubernetes', 'System Design'],
  },
  {
    id: 'p4',
    title: 'QueryForge: SQL Optimization Studio',
    description: 'An interactive SQL query analyzer that profiles query performance and suggests index optimizations.',
    difficulty: 'Intermediate',
    techStack: ['Python', 'PostgreSQL', 'FastAPI', 'React', 'D3.js'],
    resumeValue: 75,
    timeEstimate: '2–3 weeks',
    recruiterImpact: 72,
    missingSkillsCovered: ['PostgreSQL Advanced', 'Backend APIs', 'Python'],
  },
  {
    id: 'p5',
    title: 'SecureAPI: Auth & Rate-Limiting Service',
    description: 'A production-grade auth microservice with JWT, OAuth2, rate limiting, and API key management.',
    difficulty: 'Intermediate',
    techStack: ['Node.js', 'Express', 'Redis', 'JWT', 'PostgreSQL', 'Docker'],
    resumeValue: 88,
    timeEstimate: '2–3 weeks',
    recruiterImpact: 86,
    missingSkillsCovered: ['Auth/Security', 'Redis', 'Backend APIs', 'Docker'],
  },
  {
    id: 'p6',
    title: 'AIResume: Intelligent Resume Screener',
    description: 'An LLM-powered resume screener that extracts skills, scores ATS compatibility, and suggests improvements.',
    difficulty: 'Advanced',
    techStack: ['Python', 'FastAPI', 'OpenAI API', 'React', 'PostgreSQL', 'Supabase'],
    resumeValue: 97,
    timeEstimate: '3–4 weeks',
    recruiterImpact: 99,
    missingSkillsCovered: ['AI/ML', 'LLM APIs', 'FastAPI', 'Full Stack'],
  },
];

export const marketTrends: MarketTrend[] = [
  { skill: 'AI Agents / LLMs', demand: 97, growth: '+340%', category: 'AI', aligned: false },
  { skill: 'Docker & Kubernetes', demand: 91, growth: '+78%', category: 'DevOps', aligned: false },
  { skill: 'AWS / Cloud', demand: 89, growth: '+65%', category: 'Cloud', aligned: false },
  { skill: 'React / Next.js', demand: 86, growth: '+42%', category: 'Frontend', aligned: true },
  { skill: 'LangChain / RAG', demand: 84, growth: '+290%', category: 'AI', aligned: false },
  { skill: 'TypeScript', demand: 82, growth: '+55%', category: 'Frontend', aligned: true },
  { skill: 'Vector Databases', demand: 78, growth: '+410%', category: 'AI', aligned: false },
  { skill: 'GraphQL', demand: 72, growth: '+38%', category: 'Backend', aligned: false },
  { skill: 'Python (Backend)', demand: 88, growth: '+47%', category: 'Backend', aligned: true },
  { skill: 'Rust (Systems)', demand: 61, growth: '+120%', category: 'Systems', aligned: false },
  { skill: 'PostgreSQL', demand: 80, growth: '+35%', category: 'Database', aligned: true },
  { skill: 'Terraform / IaC', demand: 69, growth: '+95%', category: 'DevOps', aligned: false },
];

export const recruiterMetrics: RecruiterMetric[] = [
  { label: 'Hiring Confidence', score: 68, icon: '🎯', description: 'Probability a recruiter will shortlist this profile' },
  { label: 'Skill Reliability', score: 74, icon: '⚡', description: 'Consistency of claimed vs. demonstrated skills' },
  { label: 'Technical Depth', score: 62, icon: '🔬', description: 'Depth of expertise in primary tech stack' },
  { label: 'Consistency Score', score: 71, icon: '📈', description: 'Regularity of commits, coding, and learning' },
  { label: 'Collaboration Index', score: 45, icon: '🤝', description: 'Team-work signals from OSS, PRs, group projects' },
  { label: 'Leadership Signals', score: 58, icon: '🌟', description: 'Hackathon leads, project ownership, mentoring' },
];

export const dsaTopics = [
  { topic: 'Arrays & Strings', solved: 95, total: 120, strength: true },
  { topic: 'Linked Lists', solved: 42, total: 60, strength: true },
  { topic: 'Trees & BST', solved: 38, total: 70, strength: false },
  { topic: 'Graphs', solved: 18, total: 80, strength: false },
  { topic: 'Dynamic Programming', solved: 22, total: 90, strength: false },
  { topic: 'Backtracking', solved: 15, total: 50, strength: false },
  { topic: 'Stacks & Queues', solved: 55, total: 65, strength: true },
  { topic: 'Heap / Priority Queue', solved: 28, total: 45, strength: false },
  { topic: 'Binary Search', solved: 40, total: 50, strength: true },
  { topic: 'Sorting & Searching', solved: 50, total: 55, strength: true },
];

export const codingPlatforms = [
  { platform: 'LeetCode', username: 'arjun_codes', problems: 320, rating: 1680, streak: 67, color: '#FFA116', rank: 'Knight' },
  { platform: 'GitHub', username: 'arjunsharma-dev', problems: 876, rating: 0, streak: 45, color: '#D4AF37', rank: 'Active' },
  { platform: 'Codeforces', username: 'arjun_cf', problems: 180, rating: 1420, streak: 12, color: '#1F8DD6', rank: 'Specialist' },
  { platform: 'HackerRank', username: 'arjun_hr', problems: 210, rating: 1950, streak: 34, color: '#00EA64', rank: '5 Stars' },
];
