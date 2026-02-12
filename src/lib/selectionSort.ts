import { type AlgoStep } from '../types';

export const SELECTION_SORT_CODE = [
  { id: 1, text: 'for i from 0 to n-1:', indent: 0 },
  { id: 2, text: '  min_idx = i', indent: 1 },
  { id: 3, text: '  for j from i+1 to n:', indent: 1 },
  { id: 4, text: '    if arr[j] < arr[min_idx]:', indent: 2 },
  { id: 5, text: '      min_idx = j', indent: 3 },
  { id: 6, text: '  swap(arr[i], arr[min_idx])', indent: 1 },
];

export const generateSelectionSortSteps = (initialArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const array = [...initialArray];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: [],
    action: 'none',
    description: 'Starting Selection Sort...',
    lineNo: 0
  });

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    
    steps.push({
      array: [...array],
      highlights: [i, minIdx],
      sortedIndices: Array.from({length: i}, (_, k) => k),
      action: 'compare',
      description: `Current minimum is at index ${i} (${array[i]})`,
      lineNo: 2
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        highlights: [j, minIdx],
        sortedIndices: Array.from({length: i}, (_, k) => k),
        action: 'compare',
        description: `Comparing iterator ${j} (${array[j]}) with min ${minIdx} (${array[minIdx]})`,
        lineNo: 4
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...array],
          highlights: [j],
          sortedIndices: Array.from({length: i}, (_, k) => k),
          action: 'found',
          description: `New minimum found at index ${j} (${array[j]})`,
          lineNo: 5
        });
      }
    }

    if (minIdx !== i) {
      const temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;

      steps.push({
        array: [...array],
        highlights: [i, minIdx],
        sortedIndices: Array.from({length: i}, (_, k) => k),
        action: 'swap',
        description: `Swapping index ${i} with minimum at ${minIdx}`,
        lineNo: 6
      });
    } else {
        steps.push({
        array: [...array],
        highlights: [i],
        sortedIndices: Array.from({length: i}, (_, k) => k),
        action: 'none',
        description: `Index ${i} is already the minimum. No swap needed.`,
        lineNo: 6
      });
    }
    
    // Mark i as sorted
    steps.push({
        array: [...array],
        highlights: [i],
        sortedIndices: Array.from({length: i + 1}, (_, k) => k),
        action: 'sorted',
        description: `Index ${i} is now sorted.`,
        lineNo: 1
    });
  }

  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: Array.from({length: n}, (_, k) => k),
    action: 'sorted',
    description: 'Array is fully sorted!',
    lineNo: 0
  });

  return steps;
};
