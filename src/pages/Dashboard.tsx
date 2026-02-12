import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Search, ArrowRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-main mb-8">Choose a Category</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Sorting Card */}
        <Link to="/app/sorting" className="group relative overflow-hidden rounded-2xl bg-surface border border-border-color p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-main mb-3">Sorting Algorithms</h3>
            <p className="text-secondary mb-8 max-w-sm">
              Visualize how different sorting algorithms organize data. Includes Bubble Sort, Selection Sort, and more.
            </p>
            <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
              Explore Sorting <ArrowRight size={20} />
            </div>
          </div>
        </Link>

        {/* Searching Card */}
        <Link to="/app/searching" className="group relative overflow-hidden rounded-2xl bg-surface border border-border-color p-8 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Search size={120} />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-bold text-main mb-3">Searching Algorithms</h3>
            <p className="text-secondary mb-8 max-w-sm">
              Understand how linear and binary search techniques find data within structures.
            </p>
            <div className="flex items-center gap-2 text-accent font-bold group-hover:gap-4 transition-all">
              Explore Searching <ArrowRight size={20} />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};
