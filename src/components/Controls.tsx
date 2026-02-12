import React from 'react';
import { Play, Pause, SkipBack, RotateCcw, ArrowRight, Dices, Keyboard, Search } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  speed: number;
  setSpeed: (val: number) => void;
  arraySize: number;
  setArraySize: (val: number) => void;
  inputMode: 'random' | 'custom';
  setInputMode: (mode: 'random' | 'custom') => void;
  userInput: string;
  setUserInput: (val: string) => void;
  progress: number;
  isSearchingAlgo?: boolean;
  target?: number;
  setTarget?: (val: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  onReset,
  onStepForward,
  onStepBackward,
  speed,
  setSpeed,
  arraySize,
  setArraySize,
  inputMode,
  setInputMode,
  userInput,
  setUserInput,
  progress,
  isSearchingAlgo = false,
  target,
  setTarget
}) => {
  return (
    <div className="bg-surface border-t border-border-color p-4 flex flex-col gap-4 backdrop-blur-md">
      
      {/* Top Row: Playback & Stepping */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <button onClick={onReset} className="control-btn" title="Reset">
            <RotateCcw size={18} />
          </button>
          <div className="h-8 w-[1px] bg-border-color mx-1"></div>
          <button onClick={onStepBackward} disabled={isPlaying} className="control-btn" title="Back">
            <SkipBack size={18} />
          </button>
          <button onClick={onPlayPause} className={`px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all active:scale-95 min-w-[100px] justify-center ${isPlaying ? 'bg-warning/20 text-warning border border-warning/20' : 'bg-surface border border-border-color text-main hover:bg-background'}`}>
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            <span>{isPlaying ? 'Pause' : 'Auto'}</span>
          </button>
          <button onClick={onStepForward} disabled={isPlaying} className="px-5 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2" title="Next Step">
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 bg-background px-3 py-2 rounded-lg border border-border-color w-full md:w-auto">
          <span className="text-xs text-secondary font-bold uppercase tracking-wider">Speed</span>
          <input type="range" min="10" max="1000" step="10" value={1010 - speed} onChange={(e) => setSpeed(1010 - Number(e.target.value))} className="w-full md:w-32 h-1.5 bg-surface rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
      </div>

      <div className="h-px w-full bg-border-color"></div>

      {/* Bottom Row: Inputs */}
      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-background p-1 rounded-lg border border-border-color w-full md:w-auto">
          <button onClick={() => setInputMode('random')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${inputMode === 'random' ? 'bg-secondary/20 text-main shadow-sm' : 'text-secondary hover:text-main'}`}>
            <Dices size={14} /> Random
          </button>
          <button onClick={() => setInputMode('custom')} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${inputMode === 'custom' ? 'bg-secondary/20 text-main shadow-sm' : 'text-secondary hover:text-main'}`}>
            <Keyboard size={14} /> Custom
          </button>
        </div>

        <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-4 justify-end">
            {/* Search Target Input */}
            {isSearchingAlgo && setTarget && (
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <span className="text-xs font-bold text-secondary uppercase">Target</span>
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-secondary" />
                        <input 
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(Number(e.target.value))}
                            className="w-full md:w-24 bg-background border border-border-color rounded-lg pl-8 pr-2 py-1.5 text-sm focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>
            )}

            {inputMode === 'random' ? (
                <div className="flex items-center gap-3 w-full md:w-48">
                    <span className="text-xs text-secondary whitespace-nowrap">Size: {arraySize}</span>
                    <input type="range" min="5" max="50" value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} disabled={isPlaying} className="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-accent" />
                </div>
            ) : (
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="e.g. 5, 12, 8..." className="w-full md:w-64 bg-background border border-border-color rounded-lg px-3 py-1.5 text-sm text-main placeholder:text-secondary/50 focus:outline-none focus:border-primary/50 font-mono transition-all" disabled={isPlaying} />
            )}
        </div>
      </div>
      
      <div className="w-full h-1 bg-border-color rounded-full overflow-hidden mt-1">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <style>{`
        .control-btn {
            @apply p-2.5 rounded-lg bg-background hover:bg-surface border border-transparent hover:border-border-color text-secondary hover:text-main transition-all active:scale-95;
        }
      `}</style>
    </div>
  );
};
