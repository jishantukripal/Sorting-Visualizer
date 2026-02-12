import { type AlgoStep } from '../types';

export const generateBubbleSortSteps = (initialArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const array = [...initialArray];
  const n = array.length;
  
  // Initial State
  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: [],
    action: 'none',
    description: 'Starting Bubble Sort...',
    lineNo: 0
  });

  for (let i = 0; i < n; i++) {
    // Start of outer loop
    steps.push({
      array: [...array],
      highlights: [],
      sortedIndices: getSortedIndices(n, i),
      action: 'none',
      description: `Iteration ${i + 1}: Starting pass through the array.`,
      lineNo: 1
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Comparison Step
      steps.push({
        array: [...array],
        highlights: [j, j + 1],
        sortedIndices: getSortedIndices(n, i),
        action: 'compare',
        description: `Comparing indices ${j} (${array[j]}) and ${j + 1} (${array[j + 1]}).`,
        lineNo: 2
      });

      if (array[j] > array[j + 1]) {
        // Swap Step
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        steps.push({
          array: [...array],
          highlights: [j, j + 1],
          sortedIndices: getSortedIndices(n, i),
          action: 'swap',
          description: `${temp} > ${array[j]}, so swapping positions.`,
          lineNo: 3
        });
      }
    }

    // Mark the last element of this pass as sorted
    steps.push({
      array: [...array],
      highlights: [n - i - 1],
      sortedIndices: getSortedIndices(n, i + 1),
      action: 'sorted',
      description: `Element at index ${n - i - 1} is now in its sorted position.`,
      lineNo: 1 // Returning to loop start check technically
    });
  }

  // Final State
  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    action: 'sorted',
    description: 'Array is fully sorted!',
    lineNo: 4 // Done
  });

  return steps;
};

const getSortedIndices = (total: number, iterationsDone: number): number[] => {
  const indices: number[] = [];
  for (let k = 0; k < iterationsDone; k++) {
    indices.push(total - 1 - k);
  }
  return indices;
};

export const generateRandomArray = (size: number, min = 10, max = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
};