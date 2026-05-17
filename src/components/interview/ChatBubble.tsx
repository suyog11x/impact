import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  role: 'interviewer' | 'candidate';
  content: string;
  timestamp?: string;
}

export default function ChatBubble({ role, content, timestamp }: ChatBubbleProps) {
  const isAI = role === 'interviewer';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAI 
          ? 'bg-gold/15 text-gold border border-gold/20' 
          : 'bg-white/5 text-text-secondary border border-border'
      }`}>
        {isAI ? <Bot size={16} /> : <User size={16} />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
        isAI
          ? 'bg-bg-elevated border border-border rounded-tl-sm'
          : 'bg-gold/10 border border-gold/20 rounded-tr-sm'
      }`}>
        <p className="font-body text-sm text-text-primary leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p className={`text-[10px] font-body mt-1.5 ${isAI ? 'text-text-muted' : 'text-gold/40'}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </motion.div>
  );
}
