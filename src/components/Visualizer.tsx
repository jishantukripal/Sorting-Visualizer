import React from 'react';
import { type AlgoStep } from '../types';

interface LegendItem {
  label: string;
  color: string;
}

interface VisualizerProps {
  step: AlgoStep;
  maxValue: number;
  legend?: LegendItem[];
  sortedBarColor?: string;
}

export const Visualizer: React.FC<VisualizerProps> = ({ step, maxValue, legend, sortedBarColor = 'bg-success' }) => {
  const { array, highlights, sortedIndices, action, foundIndex, midIndex } = step;

  const getBarColor = (index: number) => {
    if (index === foundIndex) return 'bg-success shadow-[0_0_15px_rgba(16,185,129,0.4)]';
    if (index === midIndex) return 'bg-accent shadow-[0_0_15px_rgba(139,92,246,0.4)]';
    
    // For Searching: checked/eliminated. For Sorting: finalized/sorted.
    if (sortedIndices.includes(index)) return sortedBarColor; 

    if (highlights.includes(index)) {
      if (action === 'compare') return 'bg-warning shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      if (action === 'swap') return 'bg-danger shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      if (action === 'searching') return 'bg-secondary/50';
      if (action === 'sorted') return 'bg-success shadow-[0_0_15px_rgba(16,185,129,0.4)]';
    }
    return 'bg-primary/80 hover:bg-primary';
  };

  return (
    <div className="h-full w-full flex items-end justify-center gap-1 md:gap-2 px-4 pb-8 pt-20 relative select-none">
       {/* Legend Overlay */}
       {legend && (
         <div className="absolute top-4 right-4 flex flex-wrap gap-3 p-3 bg-surface/90 border border-border-color rounded-xl backdrop-blur-sm shadow-sm z-20 max-w-[200px] md:max-w-none justify-end">
            {legend.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-secondary">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span>{item.label}</span>
              </div>
            ))}
         </div>
       )}

       {/* Grid */}
       <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 p-4 pb-8 pt-20">
         {[...Array(5)].map((_, i) => (
           <div key={i} className="w-full h-px bg-secondary"></div>
         ))}
       </div>

      {array.map((value, idx) => {
        const heightPercentage = (value / maxValue) * 100;
        
        return (
          <div
            key={idx}
            className="flex flex-col items-center justify-end w-full max-w-[40px] h-full group transition-all duration-300 ease-in-out"
          >
            <span className={`text-[10px] md:text-xs text-secondary mb-1 opacity-0 group-hover:opacity-100 transition-opacity ${array.length < 15 ? 'opacity-100' : ''}`}>
              {value}
            </span>
            
            <div
              className={`w-full rounded-t-md transition-all duration-200 ease-in-out ${getBarColor(idx)}`}
              style={{ height: `${Math.max(heightPercentage, 2)}%` }} // Ensure at least tiny height
            >
              <div className="w-full h-full bg-gradient-to-tr from-white/20 to-transparent opacity-30"></div>
            </div>
            
            <span className={`text-[10px] mt-1 font-mono ${highlights.includes(idx) ? 'text-main font-bold' : 'text-secondary/50'}`}>
                {idx}
            </span>
          </div>
        );
      })}
    </div>
  );
};