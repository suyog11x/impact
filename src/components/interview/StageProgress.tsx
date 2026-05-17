import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import type { InterviewStage } from '../../types/interview';

interface StageProgressProps {
  currentStage: InterviewStage;
  hasCodeRound: boolean;
}

const STAGES: { key: InterviewStage; label: string; dsaOnly?: boolean }[] = [
  { key: 'intro', label: 'Introduction' },
  { key: 'questions', label: 'Questions' },
  { key: 'coding', label: 'Coding', dsaOnly: true },
  { key: 'closing', label: 'Closing' },
  { key: 'report', label: 'Report' },
];

export default function StageProgress({ currentStage, hasCodeRound }: StageProgressProps) {
  const filteredStages = STAGES.filter((s) => !s.dsaOnly || hasCodeRound);
  const currentIdx = filteredStages.findIndex((s) => s.key === currentStage);

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      {filteredStages.map((stage, idx) => {
        const isActive = idx === currentIdx;
        const isCompleted = idx < currentIdx;

        return (
          <div key={stage.key} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <motion.div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-body ${
                  isActive
                    ? 'bg-gold text-black'
                    : isCompleted
                      ? 'bg-success/20 text-success'
                      : 'bg-white/5 text-text-muted'
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isCompleted ? '✓' : idx + 1}
              </motion.div>
              <span className={`text-xs font-body ${isActive ? 'text-gold' : 'text-text-muted'}`}>
                {stage.label}
              </span>
            </div>
            {idx < filteredStages.length - 1 && (
              <div className={`w-8 h-px ${isCompleted ? 'bg-success/30' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
