export const FlexboxSpacer = ({
  maxWidth,
  className = '',
}: {
  maxWidth: number;
  className?: string;
}) => <div style={{ maxWidth }} className={className} />;
