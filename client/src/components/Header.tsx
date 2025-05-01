import React from 'react';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <span className="material-icons text-primary">health_and_safety</span>
          </div>
          <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            LifeChip
          </h1>
        </div>
        
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <span className="material-icons text-yellow-400">light_mode</span>
          ) : (
            <span className="material-icons text-primary">dark_mode</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
