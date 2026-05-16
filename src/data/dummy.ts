import type { Skill, SkillGap, ResumeAnalysis, CodingProfile, PlacementPrediction, RoadmapMilestone, Notification, Testimonial, FAQItem, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@college.edu',
  role: 'student',
  college: 'MIT College of Engineering',
  department: 'Computer Science',
  graduationYear: 2026,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
};

export const skills: Skill[] = [
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'React', level: 70, category: 'Frontend' },
  { name: 'TypeScript', level: 60, category: 'Frontend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'Node.js', level: 55, category: 'Backend' },
  { name: 'SQL', level: 65, category: 'Database' },
  { name: 'Docker', level: 30, category: 'DevOps' },
  { name: 'AWS', level: 25, category: 'DevOps' },
  { name: 'Data Structures', level: 72, category: 'Core' },
  { name: 'Algorithms', level: 68, category: 'Core' },
  { name: 'Git', level: 80, category: 'Tools' },
  { name: 'Communication', level: 78, category: 'Soft Skills' },
];

export const skillGap: SkillGap = {
  currentSkills: skills,
  requiredSkills: [
    { name: 'Docker', level: 70, category: 'DevOps' },
    { name: 'AWS', level: 65, category: 'DevOps' },
    { name: 'System Design', level: 60, category: 'Core' },
    { name: 'DSA', level: 85, category: 'Core' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'TypeScript', level: 75, category: 'Frontend' },
    { name: 'Kubernetes', level: 50, category: 'DevOps' },
  ],
  missingSkills: ['Docker', 'AWS', 'Kubernetes', 'System Design', 'GraphQL', 'Redis', 'Kafka'],
  readinessScore: 62,
};

export const resumeAnalysis: ResumeAnalysis = {
  score: 74,
  atsScore: 68,
  weakAreas: ['Work Experience', 'Projects Section', 'Technical Keywords'],
  missingKeywords: ['Docker', 'AWS', 'CI/CD', 'System Design', 'Agile', 'REST API'],
  suggestions: [
    'Add more quantifiable achievements in experience section',
    'Include Docker and AWS as technical skills',
    'Strengthen project descriptions with tech stack details',
    'Add a summary section at the top',
    'Include links to GitHub and LeetCode profiles',
  ],
};

export const codingProfiles: CodingProfile[] = [
  { platform: 'GitHub', username: 'arjunsharma-dev', problemsSolved: 245, rating: 0, streak: 45, contributions: 876, color: '#ccff00' },
  { platform: 'LeetCode', username: 'arjun_codes', problemsSolved: 320, rating: 1680, streak: 67, contributions: 0, color: '#ffa116' },
  { platform: 'CodeChef', username: 'arjun_cc', problemsSolved: 180, rating: 1750, streak: 23, contributions: 0, color: '#654321' },
  { platform: 'HackerRank', username: 'arjun_hr', problemsSolved: 210, rating: 1950, streak: 34, contributions: 0, color: '#00ea64' },
];

export const placementPrediction: PlacementPrediction = {
  probability: 87,
  strengths: ['Strong DSA foundation', 'Good communication skills', 'Active GitHub profile', 'Multiple hackathon wins'],
  weaknesses: ['Lack of internship experience', 'Missing DevOps skills', 'Low system design knowledge'],
  suggestions: [
    'Complete at least 1 internship before placements',
    'Learn Docker and AWS fundamentals',
    'Practice system design for product-based companies',
    'Build 2-3 full-stack projects',
  ],
  recommendedCompanies: [
    { id: 'c1', name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', requiredSkills: ['DSA', 'System Design', 'React', 'Azure'], rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'HR'], difficulty: 'Hard', preparationProgress: 60, status: 'In Progress' },
    { id: 'c2', name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', requiredSkills: ['DSA', 'System Design', 'OOP', 'Leadership'], rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Bar Raiser'], difficulty: 'Hard', preparationProgress: 45, status: 'In Progress' },
    { id: 'c3', name: 'Google', logo: 'https://logo.clearbit.com/google.com', requiredSkills: ['DSA', 'System Design', 'Go', 'Distributed Systems'], rounds: ['Phone Screen', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3', 'Hiring Committee'], difficulty: 'Hard', preparationProgress: 20, status: 'Not Started' },
    { id: 'c4', name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com', requiredSkills: ['Java', 'SQL', 'Communication', 'Aptitude'], rounds: ['Aptitude Test', 'Technical Round', 'HR'], difficulty: 'Easy', preparationProgress: 90, status: 'Ready' },
    { id: 'c5', name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com', requiredSkills: ['Java', 'Python', 'SQL', 'Communication'], rounds: ['Aptitude Test', 'Technical Round', 'HR'], difficulty: 'Medium', preparationProgress: 75, status: 'In Progress' },
  ],
};

export const roadmap: RoadmapMilestone[] = [
  { month: 1, title: 'Foundations', tasks: ['Complete DSA Basics', 'Learn Advanced JavaScript', 'Build a CLI Tool', 'Start React Course'], completed: 4, total: 4 },
  { month: 2, title: 'Intermediate', tasks: ['Master React with TypeScript', 'Learn Node.js & Express', 'Build Full Stack App', 'Start Docker'], completed: 3, total: 4 },
  { month: 3, title: 'Advanced', tasks: ['Learn AWS Basics', 'Complete DSA Advanced', 'System Design Primer', 'Build Capstone Project'], completed: 1, total: 4 },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'recommendation', title: 'Skill Gap Alert', message: 'You are missing Docker - a key requirement for 70% of companies', read: false, date: '2026-05-16' },
  { id: 'n2', type: 'deadline', title: 'Application Deadline', message: 'Microsoft campus drive closes in 3 days', read: false, date: '2026-05-15' },
  { id: 'n3', type: 'alert', title: 'Resume Score Low', message: 'Your ATS score is 68. Improve it to get more shortlists.', read: false, date: '2026-05-14' },
  { id: 'n4', type: 'recommendation', title: 'Course Recommendation', message: 'AWS Certified Solutions Provider course is trending among placed students', read: true, date: '2026-05-12' },
  { id: 'n5', type: 'deadline', title: 'Mock Interview Scheduled', message: 'Your technical mock interview is tomorrow at 3 PM', read: true, date: '2026-05-11' },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Priya Patel', role: 'Placed at Google', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', quote: 'SkillSync AI identified gaps I never knew existed. The roadmap was a game-changer for my placement prep.' },
  { id: 't2', name: 'Rahul Verma', role: 'Placed at Microsoft', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul', quote: 'The AI-driven skill analysis helped me focus on exactly what top tech companies were looking for.' },
  { id: 't3', name: 'Ananya Singh', role: 'Placed at Amazon', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya', quote: 'From resume analysis to mock interviews - SkillSync is the ultimate placement companion.' },
  { id: 't4', name: 'Arjun Nair', role: 'Placed at Infosys', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', quote: 'The placement prediction feature kept me motivated and on track throughout my preparation.' },
];

export const faqs: FAQItem[] = [
  { id: 'f1', question: 'How does SkillSync AI analyze my skill gaps?', answer: 'Our AI compares your current skills against industry requirements from top companies, identifying exactly what you need to learn to be placement-ready.' },
  { id: 'f2', question: 'Is my data secure?', answer: 'Yes, all your data is encrypted end-to-end. We follow industry-standard security practices and never share your information with third parties.' },
  { id: 'f3', question: 'How long does the analysis take?', answer: 'The initial analysis takes about 2-3 minutes. Once complete, your dashboard updates in real-time as you add new skills and achievements.' },
  { id: 'f4', question: 'Can I connect multiple coding profiles?', answer: 'Yes! You can connect GitHub, LeetCode, CodeChef, HackerRank, and more platforms for a comprehensive analysis.' },
  { id: 'f5', question: 'How accurate is the placement prediction?', answer: 'Our predictions are based on data from 50,000+ students and have a 92% accuracy rate in predicting placement readiness.' },
];

export const features = [
  { title: 'Resume Analyzer', description: 'AI-powered resume analysis with ATS scoring and keyword optimization', icon: 'FileText', accent: false },
  { title: 'GitHub Analysis', description: 'Deep analysis of your GitHub profile, contributions, and code quality', icon: 'Github', accent: false },
  { title: 'Coding Profile Analysis', description: 'Aggregated performance across LeetCode, CodeChef, HackerRank', icon: 'Code', accent: false },
  { title: 'Skill Gap Detection', description: 'AI identifies missing skills required for your target companies', icon: 'Target', accent: true },
  { title: 'AI Learning Roadmap', description: 'Personalized monthly roadmap to bridge your skill gaps', icon: 'Route', accent: false },
  { title: 'Mock Interviews', description: 'AI-conducted mock interviews with detailed performance reports', icon: 'Mic', accent: false },
  { title: 'Placement Prediction', description: 'ML-based prediction of your placement probability', icon: 'TrendingUp', accent: false },
  { title: 'Company Tracker', description: 'Track preparation progress for your dream companies', icon: 'Building2', accent: false },
];

export const studentStats = {
  readinessScore: 82,
  resumeScore: 74,
  codingScore: 78,
  communicationScore: 85,
  internshipScore: 60,
};
