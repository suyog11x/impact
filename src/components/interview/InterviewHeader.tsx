import { motion } from 'framer-motion';
import { Clock, BarChart3, Layers, X } from 'lucide-react';
import Badge from '../ui/Badge';
import type { InterviewStage, InterviewConfig } from '../../types/interview';

interface InterviewHeaderProps {
  config: InterviewConfig;
  stage: InterviewStage;
  timer: number;
  questionCount: number;
  onEnd: () => void;
}

const STAGE_LABELS: Record<InterviewStage, string> = {
  setup: 'Setting Up',
  intro: 'Introduction',
  questions: 'Interview',
  coding: 'Coding Round',
  closing: 'Wrapping Up',
  report: 'Generating Report',
};

export default function InterviewHeader({ config, stage, timer, questionCount, onEnd }: InterviewHeaderProps) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const isLowTime = timer > 0 && timer < 120;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-6 py-3 bg-bg-card border-b border-border"
    >
      {/* Left: Interview Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="font-heading text-sm text-text-primary">Live Interview</span>
        </div>
        <Badge variant="gold">{STAGE_LABELS[stage]}</Badge>
        <Badge variant={
          config.difficulty === 'hard' ? 'danger' :
          config.difficulty === 'medium' ? 'warning' : 'success'
        }>
          {config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1)}
        </Badge>
      </div>

      {/* Center: Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <Layers size={14} />
          <span className="font-body text-xs">Q{questionCount}</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <BarChart3 size={14} />
          <span className="font-body text-xs capitalize">{config.type.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Right: Timer + End */}
      <div className="flex items-center gap-4">
        {timer > 0 && (
          <div className={`flex items-center gap-1.5 font-mono text-sm ${isLowTime ? 'text-danger animate-pulse' : 'text-text-secondary'}`}>
            <Clock size={14} />
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        )}
        <button
          onClick={onEnd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body text-danger hover:bg-danger/10 transition-colors"
        >
          <X size={14} />
          End
        </button>
      </div>
    </motion.div>
  );
}
