import type { TextItems, Lines } from './types';

/**
 * Groups text items that share the same Y coordinate into lines.
 * Also merges adjacent items if the gap between them is smaller than
 * the average character width (noise removal step).
 */
export const groupTextItemsIntoLines = (textItems: TextItems): Lines => {
  if (textItems.length === 0) return [];

  // Calculate average char width (exclude bold / EOL items to avoid skew)
  const regularItems = textItems.filter(i => i.width > 0 && i.text.trim());
  const avgCharWidth =
    regularItems.length > 0
      ? regularItems.reduce((sum, i) => sum + i.width, 0) /
        regularItems.reduce((sum, i) => sum + i.text.length, 0)
      : 5;

  // Group by rounded Y position
  const yMap = new Map<number, typeof textItems>();
  for (const item of textItems) {
    const y = Math.round(item.y);
    if (!yMap.has(y)) yMap.set(y, []);
    yMap.get(y)!.push(item);
  }

  // Sort lines top-to-bottom (higher Y first in PDF coords)
  const sortedYs = [...yMap.keys()].sort((a, b) => b - a);

  const lines: Lines = [];
  for (const y of sortedYs) {
    const items = yMap.get(y)!.sort((a, b) => a.x - b.x);
    // Merge adjacent items with tiny gap
    const merged = [items[0]];
    for (let i = 1; i < items.length; i++) {
      const prev = merged[merged.length - 1];
      const cur = items[i];
      const gap = cur.x - (prev.x + prev.width);
      if (gap < avgCharWidth) {
        merged[merged.length - 1] = {
          ...prev,
          text: prev.text + cur.text,
          width: cur.x + cur.width - prev.x,
          hasEOL: cur.hasEOL,
        };
      } else {
        merged.push(cur);
      }
    }
    lines.push(merged.filter(i => i.text.trim() || i.hasEOL));
  }

  return lines.filter(l => l.length > 0);
};
