import React from 'react';
import { useVisualizer } from '../hooks/useVisualizer';
import { generateLinearSearchSteps, LINEAR_SEARCH_CODE } from '../lib/linearSearch';
import { Visualizer } from '../components/Visualizer';
import { Controls } from '../components/Controls';
import { CodeViewer } from '../components/CodeViewer';

const LEGEND = [
    { label: 'Comparing', color: 'bg-warning' },
    { label: 'Found', color: 'bg-success' },
    { label: 'Checked', color: 'bg-secondary/20' },
];

export const LinearSearchPage: React.FC = () => {
  const viz = useVisualizer((arr, target = 15) => generateLinearSearchSteps(arr, target), 15, true);

  return (
    <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] bg-background">
      <div className="flex-1 flex flex-col lg:border-r border-border-color relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10 px-6 py-2 bg-surface/80 border border-border-color rounded-full backdrop-blur-md shadow-sm flex items-center gap-3 max-w-[calc(100%-2rem)] md:max-w-md whitespace-nowrap overflow-hidden text-ellipsis">
           <span className="text-sm font-medium text-main truncate">Target: {viz.target} | {viz.currentStep.description}</span>
        </div>
        <div className="h-[400px] lg:h-auto lg:flex-1 relative bg-background border-b lg:border-b-0 border-border-color">
           <Visualizer step={viz.currentStep} maxValue={viz.maxValue} legend={LEGEND} sortedBarColor="bg-secondary/20" />
        </div>
        <Controls {...viz} isSearchingAlgo />
      </div>
      <div className="w-full lg:w-96 bg-surface lg:border-l border-border-color flex flex-col h-auto lg:h-full">
        <div className="flex-1 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-main mb-4 flex items-center gap-2">
                Linear Search
                <span className="text-xs font-normal text-secondary border border-border-color px-2 py-0.5 rounded-full">O(n)</span>
            </h3>
            <div className="flex-1">
                <CodeViewer currentLine={viz.currentStep.lineNo} codeLines={LINEAR_SEARCH_CODE} />
            </div>
        </div>
      </div>
    </div>
  );
};