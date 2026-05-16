import type { Lines, ResumeSectionToLines } from './types';

const SECTION_KEYWORDS = [
  'experience', 'education', 'skills', 'projects', 'certifications',
  'awards', 'publications', 'volunteer', 'languages', 'interests',
  'summary', 'objective', 'profile', 'work', 'employment', 'internship',
  'activities', 'achievements', 'honors',
];

const isSectionTitle = (line: Lines[number]): boolean => {
  if (line.length !== 1) return false;
  const item = line[0];
  const text = item.text.trim();
  if (!text) return false;

  // Primary: bold + uppercase
  const bold = /bold/i.test(item.fontName);
  const upper = text === text.toUpperCase() && /[A-Z]/.test(text);
  if (bold && upper) return true;

  // Fallback: keyword match (case-insensitive)
  const lower = text.toLowerCase();
  return SECTION_KEYWORDS.some(kw => lower.includes(kw));
};

/**
 * Groups lines into named sections. Lines before the first section
 * title are grouped under the key "profile".
 */
export const groupLinesIntoSections = (lines: Lines): ResumeSectionToLines => {
  const sections: ResumeSectionToLines = { profile: [] };
  let currentSection = 'profile';

  for (const line of lines) {
    if (isSectionTitle(line)) {
      currentSection = line[0].text.trim().toLowerCase();
      sections[currentSection] = [];
    } else {
      sections[currentSection].push(line);
    }
  }

  return sections;
};
