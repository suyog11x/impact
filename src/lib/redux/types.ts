// Types mirroring OpenResume's Resume shape consumed by ResumeTable

export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  url: string;
  summary: string;
}

export interface ResumeEducation {
  school: string;
  degree: string;
  gpa: string;
  date: string;
  descriptions: string[];
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  educations: ResumeEducation[];
  workExperiences: ResumeWorkExperience[];
  projects: ResumeProject[];
  skills: ResumeSkills;
}
