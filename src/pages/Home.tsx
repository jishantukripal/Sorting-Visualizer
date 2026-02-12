import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Code2, Layout } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 bg-background relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-color text-sm text-secondary mb-4">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
            v0.1 Released
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-main">
          Visualize Algorithms <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Like Never Before</span>
        </h1>
        
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
          Master sorting and searching algorithms through interactive, step-by-step visualizations. 
          Control the speed, input your own data, and watch code execute in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/app" className="group px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-blue-600 hover:scale-105 transition-all flex items-center gap-3">
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://github.com/jishantukripal/Sorting-Visualizer" target="_blank" className="px-8 py-4 bg-surface text-main border border-border-color rounded-xl font-bold text-lg hover:bg-background hover:text-primary transition-all">
            Star⭐ the Repo
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
            <div className="p-6 rounded-2xl bg-surface/50 border border-border-color backdrop-blur-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-main mb-2">Real-time Visualization</h3>
                <p className="text-secondary">Watch how data moves and changes with every step of the algorithm.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface/50 border border-border-color backdrop-blur-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                    <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-main mb-2">Code Walkthrough</h3>
                <p className="text-secondary">Follow the exact line of code executing at each step to understand the logic.</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface/50 border border-border-color backdrop-blur-sm">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center text-success mb-4">
                    <Layout size={24} />
                </div>
                <h3 className="text-xl font-bold text-main mb-2">Fully Customisable</h3>
                <p className="text-secondary">Input your own datasets, adjust speeds, and switch between light and dark modes.</p>
            </div>
        </div>
      </div>
    </div>
  );
};
