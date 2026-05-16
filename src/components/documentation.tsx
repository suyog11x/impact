import { cx } from '../lib/cx';

export const Heading = ({
  level = 1,
  className = '',
  children,
}: {
  level?: 1 | 2 | 3;
  className?: string;
  children: React.ReactNode;
}) => {
  const base = 'font-heading font-bold text-text-primary mt-6 mb-2';
  const sizes: Record<number, string> = {
    1: 'text-2xl',
    2: 'text-lg border-t border-white/10 pt-4 mt-8',
    3: 'text-base',
  };
  if (level === 1) return <h1 className={cx(base, sizes[1], className)}>{children}</h1>;
  if (level === 2) return <h2 className={cx(base, sizes[2], className)}>{children}</h2>;
  return <h3 className={cx(base, sizes[3], className)}>{children}</h3>;
};

export const Paragraph = ({
  children,
  smallMarginTop = false,
}: {
  children: React.ReactNode;
  smallMarginTop?: boolean;
}) => (
  <p className={cx('font-body text-sm text-text-secondary leading-relaxed', smallMarginTop ? 'mt-2' : 'mt-4')}>
    {children}
  </p>
);

export const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-lime underline underline-offset-2 hover:text-lime/80 transition-colors">
    {children}
  </a>
);

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-lime/10 text-lime border border-lime/20 text-xs font-mono px-2 py-0.5 rounded-md">
    {children}
  </span>
);

export const Table = ({
  table,
  title,
  className = '',
  tdClassNames = [],
  trClassNames = [],
}: {
  table: React.ReactNode[][];
  title?: string;
  className?: string;
  tdClassNames?: string[];
  trClassNames?: string[];
}) => (
  <div className={className}>
    {title && <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">{title}</p>}
    <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden border-separate border-spacing-0">
      <tbody>
        {table.map((row, ri) => (
          <tr key={ri} className={cx(ri === 0 ? 'bg-white/5 font-semibold' : 'hover:bg-white/[0.02]', trClassNames[ri - 1] ?? '')}>
            {row.map((cell, ci) => (
              <td
                key={ci}
                className={cx('border-b border-white/5 px-3 py-2 text-text-secondary align-top', tdClassNames[ci] ?? '')}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
