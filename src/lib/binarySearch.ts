import { type AlgoStep } from '../types';

export const BINARY_SEARCH_CODE = [
  { id: 1, text: 'low = 0, high = n - 1', indent: 0 },
  { id: 2, text: 'while low <= high:', indent: 0 },
  { id: 3, text: 'mid = floor((low + high) / 2)', indent: 1 },
  { id: 4, text: 'if arr[mid] == target: return mid', indent: 1 },
  { id: 5, text: 'if arr[mid] < target: low = mid + 1', indent: 1 },
  { id: 6, text: 'else: high = mid - 1', indent: 1 },
];

export const generateBinarySearchSteps = (initialArray: number[], target: number): AlgoStep[] => {
  // Binary search requires sorted array. We will sort it for the visualization if not sorted, 
  // but usually we expect the input to be sorted or we sort it at start.
  // For visualization consistency, we sort a copy here.
  const array = [...initialArray].sort((a, b) => a - b);
  
  const steps: AlgoStep[] = [];
  let low = 0;
  let high = array.length - 1;

  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: [], // We can use this to grey out ignored parts
    action: 'none',
    description: `Starting Binary Search for ${target}. Array must be sorted.`,
    lineNo: 1
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Calculate ignored indices for visualization (grey out outside low-high)
    const ignoredIndices = [];
    for(let i=0; i<array.length; i++) {
        if (i < low || i > high) ignoredIndices.push(i);
    }

    steps.push({
      array: [...array],
      highlights: [low, high],
      midIndex: mid,
      sortedIndices: ignoredIndices,
      action: 'none',
      description: `Range: [${low}, ${high}]. Calculating mid...`,
      lineNo: 2
    });

    steps.push({
      array: [...array],
      highlights: [mid],
      midIndex: mid,
      sortedIndices: ignoredIndices,
      action: 'compare',
      description: `Checking mid index ${mid} (Value: ${array[mid]})`,
      lineNo: 3
    });

    if (array[mid] === target) {
      steps.push({
        array: [...array],
        highlights: [mid],
        midIndex: mid,
        sortedIndices: ignoredIndices,
        action: 'found',
        description: `Target ${target} found at index ${mid}!`,
        lineNo: 4
      });
      return steps;
    }

    if (array[mid] < target) {
      steps.push({
        array: [...array],
        highlights: [mid],
        midIndex: mid,
        sortedIndices: ignoredIndices,
        action: 'searching',
        description: `${array[mid]} < ${target}. Ignoring left half.`,
        lineNo: 5
      });
      low = mid + 1;
    } else {
      steps.push({
        array: [...array],
        highlights: [mid],
        midIndex: mid,
        sortedIndices: ignoredIndices,
        action: 'searching',
        description: `${array[mid]} > ${target}. Ignoring right half.`,
        lineNo: 6
      });
      high = mid - 1;
    }
  }

  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: Array.from({length: array.length}, (_, i) => i),
    action: 'none',
    description: `Target ${target} not found in array.`,
    lineNo: 6
  });

  return steps;
};
