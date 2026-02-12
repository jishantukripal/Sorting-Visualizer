import React from 'react';
import { useVisualizer } from '../hooks/useVisualizer';
import { generateInsertionSortSteps, INSERTION_SORT_CODE } from '../lib/insertionSort';
import { Visualizer } from '../components/Visualizer';
import { Controls } from '../components/Controls';
import { CodeViewer } from '../components/CodeViewer';

const LEGEND = [
    { label: 'Compare', color: 'bg-warning' },
    { label: 'Shift', color: 'bg-danger' },
    { label: 'Sorted', color: 'bg-secondary/20' },
];

export const InsertionSortPage: React.FC = () => {
  const viz = useVisualizer(generateInsertionSortSteps);

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] bg-background">
      <div className="flex-1 flex flex-col lg:border-r border-border-color relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10 px-6 py-2 bg-surface/80 border border-border-color rounded-full backdrop-blur-md shadow-sm flex items-center gap-3 max-w-[calc(100%-2rem)] md:max-w-md whitespace-nowrap overflow-hidden text-ellipsis">
           <div className={`shrink-0 w-2 h-2 rounded-full ${viz.isPlaying ? 'bg-success animate-pulse' : 'bg-primary'}`}></div>
           <span className="text-sm font-medium text-main truncate">{viz.currentStep.description}</span>
        </div>
        <div className="h-[400px] lg:h-auto lg:flex-1 relative bg-background border-b lg:border-b-0 border-border-color">
           <Visualizer step={viz.currentStep} maxValue={viz.maxValue} legend={LEGEND} />
        </div>
        <Controls {...viz} />
      </div>
      <div className="w-full lg:w-96 bg-surface lg:border-l border-border-color flex flex-col h-auto lg:h-full">
        <div className="flex-1 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-main mb-4 flex items-center gap-2">
                Insertion Sort
                <span className="text-xs font-normal text-secondary border border-border-color px-2 py-0.5 rounded-full">O(n²)</span>
            </h3>
            <div className="flex-1">
                <CodeViewer currentLine={viz.currentStep.lineNo} codeLines={INSERTION_SORT_CODE} />
            </div>
        </div>
      </div>
    </div>
  );
};
