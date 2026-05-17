import { Fragment } from 'react';
import type { Resume } from '../lib/redux/types';
import { initialEducation, initialWorkExperience } from '../lib/redux/resumeSlice';
import { deepClone } from '../lib/deep-clone';
import { cx } from '../lib/cx';

const TableRowHeader = ({ children }: { children: React.ReactNode }) => (
  <tr className="divide-x bg-bg-elevated">
    <th className="px-3 py-2 font-semibold text-text-primary text-left" scope="colgroup" colSpan={2}>
      {children}
    </th>
  </tr>
);

const TableRow = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | string[];
  className?: string | false;
}) => (
  <tr className={cx('divide-x border-b border-border', className || '')}>
    <th className="px-3 py-2 font-medium text-text-secondary text-left whitespace-nowrap w-28" scope="row">
      {label}
    </th>
    <td className="w-full px-3 py-2 text-text-primary font-body text-sm">
      {typeof value === 'string'
        ? value
        : value.map((x, idx) => (
            <Fragment key={idx}>
              • {x}
              <br />
            </Fragment>
          ))}
    </td>
  </tr>
);

export const ResumeTable = ({ resume }: { resume: Resume }) => {
  const educations =
    resume.educations.length === 0 ? [deepClone(initialEducation)] : resume.educations;
  const workExperiences =
    resume.workExperiences.length === 0
      ? [deepClone(initialWorkExperience)]
      : resume.workExperiences;
  const skills = [...resume.skills.descriptions];
  const featuredSkills = resume.skills.featuredSkills
    .filter(item => item.skill.trim())
    .map(item => item.skill)
    .join(', ')
    .trim();
  if (featuredSkills) skills.unshift(featuredSkills);

  return (
    <table className="mt-2 w-full border border-border rounded-xl overflow-hidden text-sm text-text-primary">
      <tbody className="divide-y border-border text-left align-top">
        <TableRowHeader>Profile</TableRowHeader>
        <TableRow label="Name" value={resume.profile.name} />
        <TableRow label="Email" value={resume.profile.email} />
        <TableRow label="Phone" value={resume.profile.phone} />
        <TableRow label="Location" value={resume.profile.location} />
        <TableRow label="Link" value={resume.profile.url} />
        <TableRow label="Summary" value={resume.profile.summary} />
        <TableRowHeader>Education</TableRowHeader>
        {educations.map((edu, idx) => (
          <Fragment key={idx}>
            <TableRow label="School" value={edu.school} />
            <TableRow label="Degree" value={edu.degree} />
            <TableRow label="GPA" value={edu.gpa} />
            <TableRow label="Date" value={edu.date} />
            <TableRow
              label="Descriptions"
              value={edu.descriptions}
              className={educations.length - 1 !== 0 && idx !== educations.length - 1 && '!border-b-4'}
            />
          </Fragment>
        ))}
        <TableRowHeader>Work Experience</TableRowHeader>
        {workExperiences.map((exp, idx) => (
          <Fragment key={idx}>
            <TableRow label="Company" value={exp.company} />
            <TableRow label="Job Title" value={exp.jobTitle} />
            <TableRow label="Date" value={exp.date} />
            <TableRow
              label="Descriptions"
              value={exp.descriptions}
              className={workExperiences.length - 1 !== 0 && idx !== workExperiences.length - 1 && '!border-b-4'}
            />
          </Fragment>
        ))}
        {resume.projects.length > 0 && <TableRowHeader>Projects</TableRowHeader>}
        {resume.projects.map((proj, idx) => (
          <Fragment key={idx}>
            <TableRow label="Project" value={proj.project} />
            <TableRow label="Date" value={proj.date} />
            <TableRow
              label="Descriptions"
              value={proj.descriptions}
              className={resume.projects.length - 1 !== 0 && idx !== resume.projects.length - 1 && '!border-b-4'}
            />
          </Fragment>
        ))}
        <TableRowHeader>Skills</TableRowHeader>
        <TableRow label="Descriptions" value={skills} />
      </tbody>
    </table>
  );
};
