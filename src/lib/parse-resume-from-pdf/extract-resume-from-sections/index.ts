import type { ResumeSectionToLines, Lines } from '../types';
import type { Resume, ResumeEducation, ResumeWorkExperience, ResumeProject } from '../../../redux/types';
import { extractProfile } from './extract-profile';

const DATE_RE = /(?:19|20)\d{2}|present|current|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i;
const GPA_RE = /[0-4]\.\d{1,2}/;
const DEGREE_KW = ['bachelor', 'master', 'b\.?tech', 'b\.?e\.?', 'm\.?tech', 'ph\.?d', 'associate', 'diploma', 'mba'];
const SCHOOL_KW = ['university', 'college', 'institute', 'school', 'academy'];

const lineText = (line: Lines[number]) => line.map(i => i.text).join(' ').trim();
const isBullet = (t: string) => /^[•\-*>]/.test(t.trim());

const findSectionLines = (sections: ResumeSectionToLines, keywords: string[]): Lines => {
  for (const key of Object.keys(sections)) {
    if (keywords.some(k => key.toLowerCase().includes(k))) return sections[key];
  }
  return [];
};

const splitSubsections = (lines: Lines): Lines[] => {
  const groups: Lines[] = [];
  let current: Lines = [];
  for (const line of lines) {
    const t = lineText(line);
    const isBoldLine = line.some(i => /bold/i.test(i.fontName));
    if ((isBoldLine || DATE_RE.test(t)) && !isBullet(t) && current.length > 0) {
      groups.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) groups.push(current);
  return groups;
};

const extractEducation = (lines: Lines): ResumeEducation[] => {
  const subs = splitSubsections(lines);
  return subs.map(sub => {
    const texts = sub.map(lineText).filter(Boolean);
    const edu: ResumeEducation = { school: '', degree: '', gpa: '', date: '', descriptions: [] };
    for (const t of texts) {
      if (!edu.degree && DEGREE_KW.some(k => new RegExp(k, 'i').test(t))) edu.degree = t;
      else if (!edu.school && SCHOOL_KW.some(k => new RegExp(k, 'i').test(t))) edu.school = t;
      else if (!edu.date && DATE_RE.test(t)) edu.date = t;
      else if (!edu.gpa && GPA_RE.test(t)) edu.gpa = t.match(GPA_RE)![0];
      else if (isBullet(t)) edu.descriptions.push(t.replace(/^[•\-*>\s]+/, ''));
    }
    if (!edu.school && texts[0]) edu.school = texts[0];
    return edu;
  }).filter(e => e.school || e.degree);
};

const extractExperience = (lines: Lines): ResumeWorkExperience[] => {
  const subs = splitSubsections(lines);
  return subs.map(sub => {
    const texts = sub.map(lineText).filter(Boolean);
    const exp: ResumeWorkExperience = { company: '', jobTitle: '', date: '', descriptions: [] };
    for (const t of texts) {
      if (!exp.date && DATE_RE.test(t)) { exp.date = t; continue; }
      if (isBullet(t)) { exp.descriptions.push(t.replace(/^[•\-*>\s]+/, '')); continue; }
      if (!exp.jobTitle) { exp.jobTitle = t; continue; }
      if (!exp.company) { exp.company = t; continue; }
    }
    return exp;
  }).filter(e => e.jobTitle || e.company);
};

const extractProjects = (lines: Lines): ResumeProject[] => {
  const subs = splitSubsections(lines);
  return subs.map(sub => {
    const texts = sub.map(lineText).filter(Boolean);
    const proj: ResumeProject = { project: '', date: '', descriptions: [] };
    for (const t of texts) {
      if (!proj.date && DATE_RE.test(t)) { proj.date = t; continue; }
      if (isBullet(t)) { proj.descriptions.push(t.replace(/^[•\-*>\s]+/, '')); continue; }
      if (!proj.project) { proj.project = t; continue; }
    }
    return proj;
  }).filter(p => p.project);
};

const extractSkills = (lines: Lines) => {
  const descriptions = lines
    .map(lineText)
    .filter(t => t && !isBullet(t) && t.length > 2);
  return { featuredSkills: [], descriptions };
};

export const extractResumeFromSections = (sections: ResumeSectionToLines): Resume => {
  const { profile } = extractProfile(sections);
  const educationLines = findSectionLines(sections, ['education']);
  const experienceLines = findSectionLines(sections, ['experience', 'employment', 'work', 'internship']);
  const projectLines = findSectionLines(sections, ['project']);
  const skillLines = findSectionLines(sections, ['skill', 'technical', 'competenc']);

  return {
    profile,
    educations: extractEducation(educationLines),
    workExperiences: extractExperience(experienceLines),
    projects: extractProjects(projectLines),
    skills: extractSkills(skillLines),
  };
};
