export interface TextItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontName: string;
  hasEOL: boolean;
}

export type TextItems = TextItem[];
export type Line = TextItem[];
export type Lines = Line[];
export type ResumeSectionToLines = Record<string, Lines>;

export interface TextScore {
  text: string;
  score: number;
}
export type TextScores = TextScore[];
