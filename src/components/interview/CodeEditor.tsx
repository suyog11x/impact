import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Check, AlertTriangle, ChevronDown } from 'lucide-react';
import NeonButton from '../ui/NeonButton';
import Badge from '../ui/Badge';
import type { CodeLanguage, ExecutionResult, CodeAnalysis } from '../../types/interview';
import { CODE_LANGUAGES } from '../../types/interview';

interface CodeEditorProps {
  language: CodeLanguage;
  onLanguageChange: (lang: CodeLanguage) => void;
  code: string;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  isExecuting: boolean;
  result: ExecutionResult | null;
  analysis: CodeAnalysis | null;
  isAnalyzing: boolean;
}

export default function CodeEditor({
  language, onLanguageChange, code, onCodeChange,
  onRun, isExecuting, result, analysis, isAnalyzing,
}: CodeEditorProps) {
  const [stdin, setStdin] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const editorOptions = {
    fontSize: 14,
    fontFamily: '"Fira Code", "JetBrains Mono", monospace',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    roundedSelection: true,
    padding: { top: 16 },
    lineNumbers: 'on' as const,
    renderLineHighlight: 'all' as const,
    cursorBlinking: 'smooth' as const,
    smoothScrolling: true,
    tabSize: 2,
  };

  return (
    <div className="flex flex-col h-full bg-bg-card border-l border-border">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-elevated">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-border text-sm font-body text-text-primary hover:border-gold/30 transition-colors"
          >
            {CODE_LANGUAGES[language].name}
            <ChevronDown size={14} className="text-text-muted" />
          </button>
          {showLangMenu && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-1 w-40 bg-bg-elevated border border-border rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {(Object.keys(CODE_LANGUAGES) as CodeLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { onLanguageChange(lang); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors ${
                    lang === language ? 'bg-gold/10 text-gold' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {CODE_LANGUAGES[lang].name}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Run Button */}
        <NeonButton size="sm" onClick={onRun} disabled={isExecuting || !code.trim()}>
          {isExecuting ? (
            <><Loader2 size={14} className="animate-spin mr-1.5" /> Running...</>
          ) : (
            <><Play size={14} className="mr-1.5" /> Run Code</>
          )}
        </NeonButton>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          onChange={(val) => onCodeChange(val || '')}
          theme="vs-dark"
          options={editorOptions}
          loading={
            <div className="flex items-center justify-center h-full text-text-muted font-body text-sm">
              Loading editor...
            </div>
          }
        />
      </div>

      {/* Stdin Input */}
      <div className="border-t border-border">
        <div className="px-4 py-2">
          <label className="text-[10px] font-body text-text-muted uppercase tracking-widest">Input (stdin)</label>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Enter test input here..."
            className="w-full mt-1 bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/30 resize-none h-16"
          />
        </div>
      </div>

      {/* Output Panel */}
      {(result || isExecuting) && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="border-t border-border"
        >
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-body text-text-muted uppercase tracking-widest">Output</span>
              {result && (
                <Badge variant={result.success ? 'success' : 'danger'}>
                  {result.success ? (
                    <><Check size={10} className="mr-1" /> Executed Successfully</>
                  ) : (
                    <><AlertTriangle size={10} className="mr-1" /> Error</>
                  )}
                </Badge>
              )}
            </div>

            {isExecuting ? (
              <div className="shimmer h-20 rounded-lg" />
            ) : result && (
              <div className="bg-bg-primary rounded-lg p-3 max-h-40 overflow-y-auto font-mono text-xs">
                {result.stdout && <pre className="text-success whitespace-pre-wrap">{result.stdout}</pre>}
                {result.stderr && <pre className="text-danger whitespace-pre-wrap mt-1">{result.stderr}</pre>}
                {!result.stdout && !result.stderr && (
                  <span className="text-text-muted">No output</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* AI Analysis */}
      {(analysis || isAnalyzing) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-t border-border px-4 py-3"
        >
          <span className="text-[10px] font-body text-text-muted uppercase tracking-widest">AI Analysis</span>
          {isAnalyzing ? (
            <div className="shimmer h-16 rounded-lg mt-2" />
          ) : analysis && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-3 text-xs font-body">
                <span className="text-text-secondary">Time: <span className="text-gold">{analysis.time_complexity}</span></span>
                <span className="text-text-secondary">Space: <span className="text-gold">{analysis.space_complexity}</span></span>
                <Badge variant={analysis.is_optimal ? 'success' : 'warning'}>
                  {analysis.is_optimal ? 'Optimal' : 'Can be optimized'}
                </Badge>
              </div>
              {analysis.suggestions.length > 0 && (
                <ul className="text-xs font-body text-text-secondary space-y-1">
                  {analysis.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-gold mt-0.5">→</span> {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
