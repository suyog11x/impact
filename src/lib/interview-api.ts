import type {
  InterviewConfig,
  InterviewMessage,
  InterviewReport,
  InterviewSession,
  CodeLanguage,
  ExecutionResult,
  CodeAnalysis,
} from '../types/interview';
import { supabase } from './supabase';

const API_BASE = 'http://localhost:5001';

// ─── Grok / Gemini Chat ─────────────────────────────────────────────────────

export async function sendInterviewMessage(
  messages: { role: string; content: string }[],
  config: InterviewConfig,
  stage: string
): Promise<{ response: string; followUp?: string; evaluation?: Record<string, number> }> {
  const res = await fetch(`${API_BASE}/api/interview/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ messages, interviewConfig: config, stage }),
  });
  if (!res.ok) throw new Error('Failed to get AI response');
  return res.json();
}

// ─── Deepgram STT ────────────────────────────────────────────────────────────

export async function speechToText(audioBlob: Blob): Promise<{ transcript: string; confidence: number }> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  const res = await fetch(`${API_BASE}/api/interview/stt`, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData,
  });
  if (!res.ok) throw new Error('Speech-to-text failed');
  return res.json();
}

// ─── ElevenLabs TTS ──────────────────────────────────────────────────────────

export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  const res = await fetch(`${API_BASE}/api/interview/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Text-to-speech failed');
  return res.arrayBuffer();
}

// ─── Piston Code Execution ───────────────────────────────────────────────────

export async function executeCode(
  language: CodeLanguage,
  code: string,
  stdin?: string
): Promise<ExecutionResult> {
  const res = await fetch(`${API_BASE}/api/interview/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ language, code, stdin }),
  });
  if (!res.ok) throw new Error('Code execution failed');
  return res.json();
}

// ─── Code Analysis ───────────────────────────────────────────────────────────

export async function analyzeCode(
  language: string,
  code: string,
  problem: string
): Promise<CodeAnalysis> {
  const res = await fetch(`${API_BASE}/api/interview/analyze-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ language, code, problem }),
  });
  if (!res.ok) throw new Error('Code analysis failed');
  return res.json();
}

// ─── Report Generation ──────────────────────────────────────────────────────

export async function generateReport(
  sessionId: string,
  messages: { role: string; content: string }[],
  config: InterviewConfig
): Promise<InterviewReport> {
  const res = await fetch(`${API_BASE}/api/interview/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ sessionId, messages, interviewConfig: config }),
  });
  if (!res.ok) throw new Error('Report generation failed');
  return res.json();
}

// ─── Supabase Session Management ─────────────────────────────────────────────

export async function createSession(config: InterviewConfig): Promise<InterviewSession> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('interview_sessions')
    .insert({
      user_id: user.id,
      interview_type: config.type,
      company_mode: config.companyMode || null,
      target_company: config.targetCompany || null,
      difficulty: config.difficulty,
      status: 'in_progress',
      config: config as any,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveMessage(
  sessionId: string,
  role: 'interviewer' | 'candidate',
  content: string,
  voiceMetrics?: any
) {
  const { error } = await supabase.from('interview_messages').insert({
    session_id: sessionId,
    role,
    content,
    voice_metrics: voiceMetrics || null,
  });
  if (error) console.error('Failed to save message:', error);
}

export async function completeSession(sessionId: string) {
  await supabase
    .from('interview_sessions')
    .update({ status: 'completed', ended_at: new Date().toISOString() })
    .eq('id', sessionId);
}

export async function saveReport(report: Omit<InterviewReport, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('interview_reports')
    .insert(report)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function saveCodeSubmission(submission: any) {
  const { error } = await supabase.from('code_submissions').insert(submission);
  if (error) console.error('Failed to save code submission:', error);
}

export async function fetchSessions(userId: string): Promise<InterviewSession[]> {
  const { data, error } = await supabase
    .from('interview_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchSessionMessages(sessionId: string): Promise<InterviewMessage[]> {
  const { data, error } = await supabase
    .from('interview_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function fetchReport(sessionId: string): Promise<InterviewReport | null> {
  const { data } = await supabase
    .from('interview_reports')
    .select('*')
    .eq('session_id', sessionId)
    .single();
  return data;
}

export async function fetchReports(userId: string): Promise<InterviewReport[]> {
  const { data, error } = await supabase
    .from('interview_reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ─── Auth Helpers ────────────────────────────────────────────────────────────

function authHeaders(): Record<string, string> {
  // Supabase stores the session in localStorage
  const raw = localStorage.getItem('sb-deoqpvipyvrjdomgmxwy-auth-token');
  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (session?.access_token) {
        return { Authorization: `Bearer ${session.access_token}` };
      }
    } catch {}
  }
  return {};
}
