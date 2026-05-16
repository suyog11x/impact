import type { ResumeSectionToLines, TextScores } from '../types';
import type { ResumeProfile } from '../../../redux/types';

const EMAIL_RE = /\S+@\S+\.\S+/;
const PHONE_RE = /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const URL_RE = /(?:https?:\/\/)?(?:www\.)?\S+\.[a-z]{2,}\/\S*/i;
const LOCATION_RE = /[A-Z][a-zA-Z\s]+,\s*[A-Z]{2}/;
const NAME_RE = /^[a-zA-Z]+([\s.][a-zA-Z]+)+$/;

const scoreText = (text: string): { field: keyof ResumeProfile; score: number } | null => {
  if (EMAIL_RE.test(text)) return { field: 'email', score: 4 };
  if (PHONE_RE.test(text)) return { field: 'phone', score: 4 };
  if (URL_RE.test(text)) return { field: 'url', score: 3 };
  if (LOCATION_RE.test(text)) return { field: 'location', score: 3 };
  if (NAME_RE.test(text.trim()) && text.trim().length < 40) return { field: 'name', score: 2 };
  return null;
};

export const extractProfile = (sections: ResumeSectionToLines): {
  profile: ResumeProfile;
  profileScores: Record<string, TextScores>;
} => {
  const profileLines = sections['profile'] ?? [];
  const allTexts = profileLines.flatMap(l => l.map(i => i.text.trim())).filter(Boolean);

  const profile: ResumeProfile = { name: '', email: '', phone: '', location: '', url: '', summary: '' };
  const scores: Record<string, TextScores> = { name: [], email: [], phone: [], location: [], url: [] };
  const used = new Set<string>();

  for (const text of allTexts) {
    const result = scoreText(text);
    if (result) {
      const { field, score } = result;
      scores[field].push({ text, score });
      if (!profile[field] && !used.has(text)) {
        profile[field] = text;
        used.add(text);
      }
    }
  }

  // Summary: longest line not matched to a field, if present
  const summaryLine = allTexts.find(t => !used.has(t) && t.length > 30);
  if (summaryLine) profile.summary = summaryLine;

  return { profile, profileScores: scores };
};
