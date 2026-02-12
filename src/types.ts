export type ActionType = 'compare' | 'swap' | 'sorted' | 'none' | 'found' | 'searching';

export interface AlgoStep {
  array: number[];
  highlights: number[]; // Indices currently involved
  sortedIndices: number[]; // For sorting: confirmed sorted. For searching: checked/eliminated
  action: ActionType;
  description: string;
  lineNo: number;
  midIndex?: number; // Specific to Binary Search
  foundIndex?: number; // Specific to Search
}

export interface CodeLine {
  id: number;
  text: string;
  indent: number;
}

export interface AlgoState {
  steps: AlgoStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  arraySize: number;
  inputMode: 'random' | 'custom';
  userInput: string;
  target?: number; // For searching
}
