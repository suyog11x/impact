import { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { cx } from '../lib/cx';

interface ResumeDropzoneProps {
  onFileUrlChange: (url: string | null) => void;
  playgroundView?: boolean;
}

export const ResumeDropzone = ({ onFileUrlChange, playgroundView = false }: ResumeDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.includes('pdf')) {
      alert('Please upload a PDF file.');
      return;
    }
    const url = URL.createObjectURL(file);
    onFileUrlChange(url);
  };

  return (
    <div
      className={cx(
        'border-2 border-dashed border-white/15 rounded-2xl text-center transition-all hover:border-lime/40 cursor-pointer',
        playgroundView ? 'p-6' : 'p-10'
      )}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <Upload size={28} className="mx-auto mb-3 text-muted" />
      <p className="font-body text-sm text-text-secondary">
        <span className="text-lime font-semibold">Click to upload</span> or drag & drop a PDF resume
      </p>
      <button
        onClick={e => { e.stopPropagation(); onFileUrlChange(null); }}
        className="mt-3 text-xs text-muted hover:text-red-400 transition-colors flex items-center gap-1 mx-auto"
      >
        <FileText size={12} /> Clear
      </button>
    </div>
  );
};
