import { isBold } from '../lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features';
import { Badge, Heading, Link, Paragraph, Table } from './documentation';
import type {
  Line, Lines, ResumeSectionToLines, TextItem, TextItems, TextScores,
} from '../lib/parse-resume-from-pdf/types';
import { extractProfile } from '../lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile';

export const ResumeParserAlgorithmArticle = ({
  textItems, lines, sections,
}: {
  textItems: TextItems;
  lines: Lines;
  sections: ResumeSectionToLines;
}) => {
  const getBadgeContent = (item: TextItem) => {
    const X1 = Math.round(item.x);
    const X2 = Math.round(item.x + item.width);
    const Y = Math.round(item.y);
    let content = `X₁=${X1} X₂=${X2} Y=${Y}`;
    if (X1 === X2) content = `X=${X2} Y=${Y}`;
    if (isBold(item)) content = `${content} Bold`;
    if (item.hasEOL) content = `${content} NewLine`;
    return content;
  };

  const step1Table = [
    ['#', 'Text Content', 'Metadata'],
    ...textItems.map((item, idx) => [
      idx + 1,
      item.text,
      <Badge key={idx}>{getBadgeContent(item)}</Badge>,
    ]),
  ];

  const step2Table = [
    ['Lines', 'Line Content'],
    ...lines.map((line, idx) => [
      idx + 1,
      line.map((item, i) => (
        <span key={i}>
          {item.text}
          {i !== line.length - 1 && (
            <span className="select-none font-extrabold text-sky-400">&nbsp;&nbsp;{'|'}&nbsp;&nbsp;</span>
          )}
        </span>
      )),
    ]),
  ];

  const { profile, profileScores } = extractProfile(sections);
  const Scores = ({ scores }: { scores: TextScores }) => (
    <>
      {scores.sort((a, b) => b.score - a.score).map((item, idx) => (
        <span key={idx} className="break-all">
          <Badge>{item.score}</Badge> {item.text}<br />
        </span>
      ))}
    </>
  );

  const step4ProfileTable = [
    ['Resume Attribute', 'Text (Highest Score)', 'Feature Scores'],
    ['Name', profile.name, <Scores key="name" scores={profileScores.name ?? []} />],
    ['Email', profile.email, <Scores key="email" scores={profileScores.email ?? []} />],
    ['Phone', profile.phone, <Scores key="phone" scores={profileScores.phone ?? []} />],
  ];

  const Step3SectionsTable = ({ sections: secs }: { sections: ResumeSectionToLines }) => {
    const table: React.ReactNode[][] = [['Lines', 'Line Content']];
    const trClasses: string[] = [];
    const COLORS = ['bg-red-500/10', 'bg-yellow-500/10', 'bg-green-500/10', 'bg-blue-500/10', 'bg-purple-500/10', 'bg-orange-500/10'];
    let lineCounter = 0;
    const entries = Object.entries(secs);
    const LineRow = ({ line }: { line: Line }) => (
      <>
        {line.map((item, i) => (
          <span key={i}>
            {item.text}
            {i !== line.length - 1 && <span className="select-none font-extrabold text-sky-400">&nbsp;&nbsp;{'|'}&nbsp;&nbsp;</span>}
          </span>
        ))}
      </>
    );
    entries.forEach(([title, sectionLines], i) => {
      const color = COLORS[i % 6];
      table.push([title === 'profile' ? '' : lineCounter, title === 'profile' ? 'PROFILE' : title]);
      trClasses.push(`${color} font-bold`);
      lineCounter++;
      sectionLines.forEach(line => {
        table.push([lineCounter, <LineRow key={lineCounter} line={line} />]);
        trClasses.push(color);
        lineCounter++;
      });
    });
    return (
      <div className="mt-4 max-h-96 overflow-y-scroll border border-white/10 rounded-xl">
        <Table table={table} className="!border-none" trClassNames={trClasses} />
      </div>
    );
  };

  return (
    <article className="mt-10">
      <Heading className="!mt-0 border-t border-white/10 pt-8">Resume Parser Algorithm Deep Dive</Heading>
      <Paragraph smallMarginTop>
        This section walks through the 4 steps of the client-side OpenResume parsing algorithm.
        (Designed for single-column English resumes)
      </Paragraph>

      <Heading level={2}>Step 1. Read text items from PDF</Heading>
      <Paragraph smallMarginTop>
        Uses Mozilla's open-source{' '}
        <Link href="https://github.com/mozilla/pdf.js">pdf.js</Link> to decode and extract
        all text items with their positions, font names, and EOL markers.
      </Paragraph>
      <Paragraph>
        The table below lists {textItems.length} text items extracted from the resume.
      </Paragraph>
      <div className="mt-4 max-h-72 overflow-y-scroll border border-white/10 rounded-xl">
        <Table table={step1Table} className="!border-none" tdClassNames={['', '', 'md:whitespace-nowrap']} />
      </div>

      <Heading level={2}>Step 2. Group text items into lines</Heading>
      <Paragraph smallMarginTop>
        Text items are grouped by their Y coordinate into lines, and adjacent items with tiny
        gaps are merged to remove noise. Result: {lines.length} lines.
      </Paragraph>
      <div className="mt-4 max-h-96 overflow-y-scroll border border-white/10 rounded-xl">
        <Table table={step2Table} className="!border-none" />
      </div>

      <Heading level={2}>Step 3. Group lines into sections</Heading>
      <Paragraph smallMarginTop>
        A line is a section title if it is the only item on the line, is bold, and all-uppercase
        (or matches a keyword list). Lines are grouped under the closest section title above.
      </Paragraph>
      <Step3SectionsTable sections={sections} />

      <Heading level={2}>Step 4. Extract resume from sections</Heading>
      <Paragraph smallMarginTop>
        Each section's lines are passed through a feature scoring system. Each candidate text
        item is scored against regex patterns (email, phone, URL, location, name) and the
        highest-scoring item wins the field.
      </Paragraph>
      <Table table={step4ProfileTable} className="mt-4" />
      <Paragraph>
        Written with reference to{' '}
        <Link href="https://github.com/xitanggg/open-resume">OpenResume</Link> by Xitang (June 2023).
      </Paragraph>
    </article>
  );
};
