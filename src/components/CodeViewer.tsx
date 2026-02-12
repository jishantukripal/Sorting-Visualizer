import React from 'react';
import { type CodeLine } from '../types';

interface CodeViewerProps {
  currentLine: number;
  codeLines: CodeLine[];
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ currentLine, codeLines }) => {
  return (
    <div className="bg-surface rounded-xl border border-border-color overflow-hidden shadow-sm h-full flex flex-col">
      <div className="bg-background/50 px-4 py-2 border-b border-border-color flex items-center justify-between">
        <span className="text-sm font-semibold text-secondary">Pseudocode</span>
      </div>
      <div className="p-4 font-mono text-sm overflow-y-auto flex-1">
        {codeLines.map((line) => {
           const isActive = currentLine === line.id;
           return (
            <div
              key={line.id}
              className={`px-2 py-1.5 rounded transition-colors duration-200 flex ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-secondary border-l-2 border-transparent'
              }`}
              style={{ paddingLeft: `${(line.indent * 16) + 8}px` }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
