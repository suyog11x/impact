export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter' | 'admin';
  college: string;
  department: string;
  graduationYear: number;
  avatar?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface SkillGap {
  currentSkills: Skill[];
  requiredSkills: Skill[];
  missingSkills: string[];
  readinessScore: number;
}

export interface ResumeAnalysis {
  score: number;
  atsScore: number;
  weakAreas: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface CodingProfile {
  platform: string;
  username: string;
  problemsSolved: number;
  rating: number;
  streak: number;
  contributions: number;
  color?: string;
}

export interface PlacementPrediction {
  probability: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  recommendedCompanies: Company[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  requiredSkills: string[];
  rounds: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  preparationProgress: number;
  status: 'Not Started' | 'In Progress' | 'Ready';
}

export interface RoadmapMilestone {
  month: number;
  title: string;
  tasks: string[];
  completed: number;
  total: number;
}

export interface Notification {
  id: string;
  type: 'recommendation' | 'alert' | 'deadline';
  title: string;
  message: string;
  read: boolean;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
