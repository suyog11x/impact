import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceControlsProps {
  isRecording: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  onToggleRecording: () => void;
  onStopSpeaking: () => void;
  disabled?: boolean;
}

export default function VoiceControls({ isRecording, isSpeaking, audioLevel, onToggleRecording, onStopSpeaking, disabled }: VoiceControlsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Mic Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleRecording}
        disabled={disabled || isSpeaking}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isRecording
            ? 'bg-danger text-white shadow-lg shadow-danger/30'
            : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isRecording ? <MicOff size={20} /> : <Mic size={20} />}

        {/* Recording pulse ring */}
        {isRecording && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-danger"
            animate={{ scale: [1, 1.3 + audioLevel * 0.5], opacity: [0.6, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Audio Level Indicator */}
      {isRecording && (
        <div className="flex items-center gap-0.5 h-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-gold"
              animate={{ height: `${Math.max(4, audioLevel * 32 * (1 + Math.sin(Date.now() / 200 + i) * 0.5))}px` }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </div>
      )}

      {/* Speaking Indicator */}
      {isSpeaking && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onStopSpeaking}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-body hover:bg-gold/20 transition-colors"
        >
          <Volume2 size={14} className="animate-pulse" />
          AI Speaking — Click to stop
        </motion.button>
      )}

      {isRecording && (
        <span className="text-xs font-body text-danger animate-pulse">Recording...</span>
      )}
    </div>
  );
}
