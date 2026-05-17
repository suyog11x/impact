import { useState, useCallback, useRef } from 'react';
import type { InterviewConfig, InterviewMessage, InterviewStage } from '../types/interview';
import { sendInterviewMessage, createSession, saveMessage, completeSession } from '../lib/interview-api';
import { getIntroMessage } from '../lib/interview-prompts';

interface UseInterviewReturn {
  messages: InterviewMessage[];
  stage: InterviewStage;
  isAiThinking: boolean;
  sessionId: string | null;
  timer: number;
  sendMessage: (content: string) => Promise<void>;
  startInterview: (config: InterviewConfig, candidateName: string) => Promise<void>;
  endInterview: () => Promise<void>;
  setStage: (stage: InterviewStage) => void;
}

export function useInterview(): UseInterviewReturn {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [stage, setStage] = useState<InterviewStage>('setup');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const configRef = useRef<InterviewConfig | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionCountRef = useRef(0);

  const startTimer = useCallback((duration: number) => {
    setTimer(duration * 60);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const startInterview = useCallback(async (config: InterviewConfig, candidateName: string) => {
    configRef.current = config;
    questionCountRef.current = 0;

    // Create session in Supabase
    try {
      const session = await createSession(config);
      setSessionId(session.id);
    } catch (e) {
      console.error('Failed to create session:', e);
      setSessionId('local-' + Date.now());
    }

    // Start timer
    startTimer(config.duration);

    // AI introduction
    setStage('intro');
    const introText = getIntroMessage(config, candidateName);
    const introMsg: InterviewMessage = {
      id: crypto.randomUUID(),
      session_id: '',
      role: 'interviewer',
      content: introText,
      created_at: new Date().toISOString(),
    };
    setMessages([introMsg]);

    // Save intro message
    if (sessionId) saveMessage(sessionId, 'interviewer', introText);

    // Transition to questions after intro
    setTimeout(() => setStage('questions'), 1000);
  }, [sessionId, startTimer]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !configRef.current) return;

    // Add candidate message
    const candidateMsg: InterviewMessage = {
      id: crypto.randomUUID(),
      session_id: sessionId || '',
      role: 'candidate',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, candidateMsg]);

    // Save candidate message
    if (sessionId) saveMessage(sessionId, 'candidate', content.trim());

    // Get AI response
    setIsAiThinking(true);
    try {
      const chatHistory = [...messages, candidateMsg].map((m) => ({
        role: m.role === 'interviewer' ? 'assistant' : 'user',
        content: m.content,
      }));

      const { response } = await sendInterviewMessage(
        chatHistory,
        configRef.current,
        stage
      );

      questionCountRef.current += 1;

      const aiMsg: InterviewMessage = {
        id: crypto.randomUUID(),
        session_id: sessionId || '',
        role: 'interviewer',
        content: response,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Save AI message
      if (sessionId) saveMessage(sessionId, 'interviewer', response);

      // Check if we should transition to closing
      if (questionCountRef.current >= 8 && configRef.current.type !== 'dsa') {
        // After ~8 questions, suggest wrapping up
      }
    } catch (err) {
      console.error('AI response error:', err);
      const errorMsg: InterviewMessage = {
        id: crypto.randomUUID(),
        session_id: sessionId || '',
        role: 'interviewer',
        content: "I apologize for the brief interruption. Could you please repeat your last response?",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiThinking(false);
    }
  }, [messages, sessionId, stage]);

  const endInterview = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStage('closing');

    if (sessionId && !sessionId.startsWith('local-')) {
      await completeSession(sessionId);
    }

    setStage('report');
  }, [sessionId]);

  return {
    messages,
    stage,
    isAiThinking,
    sessionId,
    timer,
    sendMessage,
    startInterview,
    endInterview,
    setStage,
  };
}
