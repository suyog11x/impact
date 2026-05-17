import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Mic, Keyboard } from 'lucide-react';
import { useInterview } from '../../../hooks/useInterview';
import { useVoice } from '../../../hooks/useVoice';
import { useCodeExecution } from '../../../hooks/useCodeExecution';
import { useAuth } from '../../../context/AuthContext';
import InterviewHeader from '../../../components/interview/InterviewHeader';
import ChatBubble from '../../../components/interview/ChatBubble';
import TypingIndicator from '../../../components/interview/TypingIndicator';
import VoiceControls from '../../../components/interview/VoiceControls';
import StageProgress from '../../../components/interview/StageProgress';
import CodeEditor from '../../../components/interview/CodeEditor';
import type { InterviewConfig, CodeLanguage } from '../../../types/interview';

export default function InterviewEngine() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const config = (location.state as any)?.config as InterviewConfig | undefined;

  const {
    messages, stage, isAiThinking, sessionId, timer,
    sendMessage, startInterview, endInterview, setStage,
  } = useInterview();

  const { isRecording, isSpeaking, audioLevel, startRecording, stopRecording, speak, stopSpeaking } = useVoice();
  const { isExecuting, result, analysis, isAnalyzing, execute, analyze, clearResult } = useCodeExecution(sessionId);

  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('python');
  const [code, setCode] = useState('# Write your solution here\n');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [started, setStarted] = useState(false);

  // Start interview on mount
  useEffect(() => {
    if (config && !started) {
      setStarted(true);
      const name = profile?.full_name?.split(' ')[0] || 'Candidate';
      startInterview(config, name);
    }
  }, [config, started, startInterview, profile]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  // Speak AI messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'interviewer' && messages.length > 1) {
        // Optionally speak — commented out to save ElevenLabs quota
        // speak(lastMsg.content);
      }
    }
  }, [messages]);

  const handleSendText = () => {
    if (!inputText.trim() || isAiThinking) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleVoiceToggle = async () => {
    if (isRecording) {
      const transcript = await stopRecording();
      if (transcript) {
        setInputText(transcript);
        sendMessage(transcript);
      }
    } else {
      await startRecording();
    }
  };

  const handleRunCode = async () => {
    if (!code.trim()) return;
    await execute(codeLanguage, code);
  };

  const handleEndInterview = async () => {
    await endInterview();
    if (sessionId) {
      navigate(`/student/interview/report/${sessionId}`, {
        state: { messages, config },
      });
    }
  };

  // Redirect if no config
  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-text-secondary font-body mb-4">No interview configuration found.</p>
        <button
          onClick={() => navigate('/student/interview/setup')}
          className="text-gold font-body hover:underline"
        >
          Go to Interview Setup →
        </button>
      </div>
    );
  }

  const isDSA = config.type === 'dsa';
  const questionCount = messages.filter(m => m.role === 'interviewer').length;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -mx-8 -mt-8 -mb-12">
      {/* Header */}
      <InterviewHeader
        config={config}
        stage={stage}
        timer={timer}
        questionCount={questionCount}
        onEnd={handleEndInterview}
      />

      {/* Stage Progress */}
      <div className="border-b border-border bg-bg-card/50">
        <StageProgress currentStage={stage} hasCodeRound={isDSA} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex min-h-0 ${isDSA ? '' : ''}`}>
        {/* Chat Panel */}
        <div className={`flex flex-col ${isDSA ? 'w-1/2 border-r border-border' : 'w-full'}`}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.created_at}
              />
            ))}
            {isAiThinking && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-bg-card p-4">
            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <button
                onClick={() => setInputMode(inputMode === 'text' ? 'voice' : 'text')}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
                title={inputMode === 'text' ? 'Switch to voice' : 'Switch to text'}
              >
                {inputMode === 'text' ? <Mic size={18} /> : <Keyboard size={18} />}
              </button>

              {inputMode === 'text' ? (
                <>
                  <input
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                    placeholder="Type your answer..."
                    disabled={isAiThinking}
                    className="flex-1 bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-gold/50 transition-all disabled:opacity-50"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendText}
                    disabled={!inputText.trim() || isAiThinking}
                    className="p-3 rounded-xl bg-gold text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-light transition-colors"
                  >
                    <Send size={18} />
                  </motion.button>
                </>
              ) : (
                <div className="flex-1 flex items-center gap-3">
                  <VoiceControls
                    isRecording={isRecording}
                    isSpeaking={isSpeaking}
                    audioLevel={audioLevel}
                    onToggleRecording={handleVoiceToggle}
                    onStopSpeaking={stopSpeaking}
                    disabled={isAiThinking}
                  />
                  {!isRecording && !isSpeaking && (
                    <span className="text-xs font-body text-text-muted">
                      Click the mic to start recording your answer
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code Editor Panel (DSA only) */}
        {isDSA && (
          <div className="w-1/2">
            <CodeEditor
              language={codeLanguage}
              onLanguageChange={setCodeLanguage}
              code={code}
              onCodeChange={setCode}
              onRun={handleRunCode}
              isExecuting={isExecuting}
              result={result}
              analysis={analysis}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}
      </div>
    </div>
  );
}
