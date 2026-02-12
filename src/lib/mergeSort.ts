import { type AlgoStep } from '../types';

export const MERGE_SORT_CODE = [
  { id: 1, text: 'mergeSort(arr, left, right):', indent: 0 },
  { id: 2, text: '  if left >= right: return', indent: 1 },
  { id: 3, text: '  mid = (left + right) / 2', indent: 1 },
  { id: 4, text: '  mergeSort(arr, left, mid)', indent: 1 },
  { id: 5, text: '  mergeSort(arr, mid + 1, right)', indent: 1 },
  { id: 6, text: '  merge(arr, left, mid, right)', indent: 1 },
];

export const generateMergeSortSteps = (initialArray: number[]): AlgoStep[] => {
  const steps: AlgoStep[] = [];
  const array = [...initialArray];
  
  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: [],
    action: 'none',
    description: 'Starting Merge Sort...',
    lineNo: 0
  });

  const merge = (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    let i = 0;
    let j = 0;
    let k = left;

    steps.push({
      array: [...arr],
      highlights: [],
      sortedIndices: Array.from({length: right - left + 1}, (_, idx) => left + idx), // Highlight current range
      action: 'searching',
      description: `Merging range [${left}, ${right}]`,
      lineNo: 6
    });

    while (i < n1 && j < n2) {
      steps.push({
        array: [...arr],
        highlights: [left + i, mid + 1 + j, k], // Comparing Left[i] vs Right[j], writing to k
        sortedIndices: [], 
        action: 'compare',
        description: `Comparing ${L[i]} and ${R[j]}`,
        lineNo: 6
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        steps.push({
            array: [...arr],
            highlights: [k],
            sortedIndices: [],
            action: 'swap', // Using swap color to denote overwrite
            description: `Placing ${L[i]} at index ${k}`,
            lineNo: 6
        });
        i++;
      } else {
        arr[k] = R[j];
        steps.push({
            array: [...arr],
            highlights: [k],
            sortedIndices: [],
            action: 'swap',
            description: `Placing ${R[j]} at index ${k}`,
            lineNo: 6
        });
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      steps.push({
        array: [...arr],
        highlights: [k],
        sortedIndices: [],
        action: 'swap',
        description: `Placing remaining ${L[i]} at index ${k}`,
        lineNo: 6
      });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      steps.push({
        array: [...arr],
        highlights: [k],
        sortedIndices: [],
        action: 'swap',
        description: `Placing remaining ${R[j]} at index ${k}`,
        lineNo: 6
      });
      j++;
      k++;
    }
  };

  const mergeSortHelper = (arr: number[], left: number, right: number) => {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);

    steps.push({
        array: [...arr],
        highlights: [left, right],
        sortedIndices: [],
        action: 'none',
        description: `Splitting range [${left}, ${right}] at ${mid}`,
        lineNo: 3
    });

    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  mergeSortHelper(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    highlights: [],
    sortedIndices: Array.from({length: array.length}, (_, k) => k),
    action: 'sorted',
    description: 'Array is fully sorted!',
    lineNo: 0
  });

  return steps;
};
