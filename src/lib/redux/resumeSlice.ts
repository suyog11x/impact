import type { ResumeEducation, ResumeWorkExperience } from './types';

export const initialEducation: ResumeEducation = {
  school: '',
  degree: '',
  gpa: '',
  date: '',
  descriptions: [],
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: '',
  jobTitle: '',
  date: '',
  descriptions: [],
};
