import { type AlgoStep } from '../types';

export const INSERTION_SORT_CODE = [
  { id: 1, text: 'for i from 1 to n:', indent: 0 },
  { id: 2, text: '  key = arr[i], j = i - 1', indent: 1 },
  { id: 3, text: '  while j >= 0 and arr[j] > key:', indent: 1 },
  { id: 4, text: '    arr[j + 1] = arr[j]', indent: 2 },
  { id: 5, text: '    j = j - 1', indent: 2 },
  { id: 6, text: '  arr[j + 1] = key', indent: 1 },
];

export const generateInsertionSortSteps = (initialArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const array = [...initialArray];
  const n = array.length;

  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: [0], // First element effectively sorted trivially
    action: 'none',
    description: 'Starting Insertion Sort...',
    lineNo: 0
  });

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      highlights: [i],
      sortedIndices: Array.from({length: i}, (_, k) => k),
      action: 'compare',
      description: `Selected key ${key} at index ${i} to insert into sorted portion.`,
      lineNo: 2
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        highlights: [j, j + 1],
        sortedIndices: [], 
        action: 'compare',
        description: `Comparing key ${key} with ${array[j]}. ${array[j]} > ${key}, shifting right.`,
        lineNo: 3
      });

      array[j + 1] = array[j];
      
      steps.push({
        array: [...array],
        highlights: [j, j+1],
        sortedIndices: [],
        action: 'swap',
        description: `Moved ${array[j]} to index ${j+1}.`,
        lineNo: 4
      });

      j = j - 1;
    }

    array[j + 1] = key;
    
    steps.push({
      array: [...array],
      highlights: [j + 1],
      sortedIndices: Array.from({length: i + 1}, (_, k) => k),
      action: 'sorted',
      description: `Inserted key ${key} at index ${j + 1}.`,
      lineNo: 6
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
