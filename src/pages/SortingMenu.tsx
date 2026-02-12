import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Clock } from 'lucide-react';

const ALGOS = [
    { 
        name: 'Bubble Sort', 
        path: '/app/sorting/bubble', 
        complexity: 'O(n²)', 
        color: 'text-primary',
        desc: 'Simple comparison-based sorting algorithm.'
    },
    { 
        name: 'Selection Sort', 
        path: '/app/sorting/selection', 
        complexity: 'O(n²)', 
        color: 'text-warning',
        desc: 'Repeatedly finds the minimum element.'
    },
    { 
        name: 'Insertion Sort', 
        path: '/app/sorting/insertion', 
        complexity: 'O(n²)', 
        color: 'text-warning',
        desc: 'Builds the sorted array one item at a time.'
    },
    { 
        name: 'Merge Sort', 
        path: '/app/sorting/merge', 
        complexity: 'O(n log n)', 
        color: 'text-success',
        desc: 'Divide and conquer algorithm.'
    }
];

export const SortingMenu: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <Link to="/app" className="inline-flex items-center gap-2 text-secondary hover:text-main mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Categories
      </Link>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <BarChart3 size={32} />
        </div>
        <h2 className="text-3xl font-bold text-main">Sorting Algorithms</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALGOS.map((algo) => (
            <Link 
                key={algo.name} 
                to={algo.path}
                className={`p-6 rounded-xl border border-border-color bg-surface hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg`}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-main">{algo.name}</h3>
                </div>
                <p className="text-secondary text-sm mb-6 h-10">{algo.desc}</p>
                <div className="flex items-center gap-2 text-xs font-mono bg-background p-2 rounded w-fit text-secondary">
                    <Clock size={12} />
                    Worst: <span className={algo.color}>{algo.complexity}</span>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
};
