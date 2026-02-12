import { type AlgoStep } from '../types';

export const LINEAR_SEARCH_CODE = [
  { id: 1, text: 'for i from 0 to n-1:', indent: 0 },
  { id: 2, text: 'if arr[i] == target:', indent: 1 },
  { id: 3, text: 'return i (Found)', indent: 2 },
  { id: 4, text: 'return -1 (Not Found)', indent: 0 },
];

export const generateLinearSearchSteps = (array: number[], target: number): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const n = array.length;
  
  // Initial State
  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: [],
    action: 'none',
    description: `Starting Linear Search for target: ${target}`,
    lineNo: 0
  });

  for (let i = 0; i < n; i++) {
    // Check Step
    steps.push({
      array: [...array],
      highlights: [i],
      sortedIndices: Array.from({ length: i }, (_, k) => k), // Mark previous as checked
      action: 'compare',
      description: `Checking index ${i}: Is ${array[i]} == ${target}?`,
      lineNo: 2
    });

    if (array[i] === target) {
      // Found Step
      steps.push({
        array: [...array],
        highlights: [i],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        foundIndex: i,
        action: 'found',
        description: `Match found at index ${i}!`,
        lineNo: 3
      });
      return steps;
    }
  }

  // Not Found
  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    action: 'none',
    description: `End of array reached. Target ${target} not found.`,
    lineNo: 4
  });

  return steps;
};
