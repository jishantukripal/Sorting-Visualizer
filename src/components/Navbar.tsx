import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="h-16 border-b border-border-color flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <BarChart3 size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-main group-hover:text-primary transition-colors">
            AlgoViz
          </h1>
        </Link>
        
        {!isHome && (
            <div className="hidden md:flex items-center gap-1 ml-4 text-sm font-medium text-secondary">
                <Link to="/app" className="hover:text-primary transition-colors">App</Link>
                <span>/</span>
                <span className="text-primary truncate capitalize">
                    {location.pathname.split('/').pop()?.replace('-', ' ')}
                </span>
            </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 text-secondary hover:text-primary transition-colors">
            <Home size={20} />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};
