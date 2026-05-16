import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem as PdfTextItem } from 'pdfjs-dist/types/src/display/api';
import type { TextItems } from './types';

// Use Vite's URL resolution to bundle the local worker — avoids CDN dependency
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).href;

export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  const loadingTask = pdfjsLib.getDocument(fileUrl);
  const pdfDoc = await loadingTask.promise;
  const textItems: TextItems = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();

    for (const item of textContent.items) {
      const t = item as PdfTextItem;
      // Skip whitespace-only items that have no EOL marker
      if (!t.str && !t.hasEOL) continue;

      textItems.push({
        text: t.str,
        x: t.transform[4],
        y: t.transform[5],
        width: t.width,
        height: t.height,
        fontName: t.fontName ?? '',
        hasEOL: t.hasEOL ?? false,
      });
    }
  }

  return textItems;
};
