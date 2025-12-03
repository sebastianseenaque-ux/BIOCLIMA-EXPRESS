import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const isLanding = currentView === 'landing';

  return (
    <header className={`flex items-center justify-between whitespace-nowrap px-6 sm:px-10 lg:px-20 py-4 border-b border-gray-200 dark:border-gray-800 ${!isLanding ? 'px-10 lg:px-20 xl:px-40' : ''}`}>
      <div 
        className="flex items-center gap-3 text-gray-900 dark:text-white cursor-pointer"
        onClick={() => onNavigate('landing')}
      >
        <div className="w-7 h-7 text-primary">
          {isLanding ? (
             <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.62-1.23 4.96-3.1 6.39z"></path>
           </svg>
          ) : (
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
            </svg>
          )}
        </div>
        <h2 className="text-xl font-bold tracking-tight">BioClima Express</h2>
      </div>

      {isLanding && (
        <>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors">How It Works</a>
            <a href="#" className="text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors">Contact</a>
            <button 
              onClick={() => onNavigate('form')}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
            >
              <span className="truncate">Login</span>
            </button>
          </div>
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </>
      )}
    </header>
  );
};