import { useState, useCallback } from 'react';
import type { CodeLanguage, ExecutionResult, CodeAnalysis } from '../types/interview';
import { executeCode, analyzeCode, saveCodeSubmission } from '../lib/interview-api';

interface UseCodeExecutionReturn {
  isExecuting: boolean;
  isAnalyzing: boolean;
  result: ExecutionResult | null;
  analysis: CodeAnalysis | null;
  error: string | null;
  execute: (language: CodeLanguage, code: string, stdin?: string) => Promise<ExecutionResult>;
  analyze: (language: string, code: string, problem: string) => Promise<CodeAnalysis>;
  clearResult: () => void;
}

export function useCodeExecution(sessionId?: string | null): UseCodeExecutionReturn {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (language: CodeLanguage, code: string, stdin?: string): Promise<ExecutionResult> => {
    setIsExecuting(true);
    setError(null);
    setResult(null);

    try {
      const execResult = await executeCode(language, code, stdin);
      setResult(execResult);

      // Save submission to Supabase
      if (sessionId) {
        saveCodeSubmission({
          session_id: sessionId,
          language,
          code,
          stdin: stdin || null,
          stdout: execResult.stdout,
          stderr: execResult.stderr,
          exit_code: execResult.exitCode,
          execution_time_ms: execResult.executionTime,
        });
      }

      return execResult;
    } catch (err: any) {
      const errMsg = err.message || 'Code execution failed';
      setError(errMsg);
      throw err;
    } finally {
      setIsExecuting(false);
    }
  }, [sessionId]);

  const analyze = useCallback(async (language: string, code: string, problem: string): Promise<CodeAnalysis> => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeCode(language, code, problem);
      setAnalysis(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setAnalysis(null);
    setError(null);
  }, []);

  return { isExecuting, isAnalyzing, result, analysis, error, execute, analyze, clearResult };
}
