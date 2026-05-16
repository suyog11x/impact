import type { TextItem } from './types';

export const isBold = (item: TextItem) =>
  /bold/i.test(item.fontName);
