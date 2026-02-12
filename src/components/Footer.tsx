import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t border-border-color bg-surface text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-secondary">
        <span>Built with</span>
        <Heart size={14} className="text-danger fill-danger animate-pulse" />
        <span>by <a href='https://links.jishantukripal.com' target='_blank'>Jishantu Kripal</a></span>
      </div>
    </footer>
  );
};
