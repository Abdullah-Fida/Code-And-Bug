"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { Terminal, Moon, Sun } from 'lucide-react';

export default function StickyBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <div className="w-full sticky top-5 z-50 px-4 sm:px-6">
      <header className="max-w-5xl mx-auto h-14 rounded-full border border-gray-200 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/60 backdrop-blur-xl flex items-center justify-between px-6 shadow-2xl">
        <div className="flex items-center space-x-2.5 cursor-pointer">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center transform rotate-12">
            <Terminal className="w-3 h-3 text-white -rotate-12" />
          </div>
          <span className="font-bold tracking-tight text-gray-900 dark:text-white text-base">
            Code<span className="text-cyan-500 dark:text-cyan-400">&</span>Bugs
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-2 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
          <a href="#home" className="hover:text-blue-500 dark:hover:text-white px-4 py-2 rounded-full transition-all duration-300">Home</a>
          <a href="#services" className="hover:text-blue-500 dark:hover:text-white px-4 py-2 rounded-full transition-all duration-300">Services</a>
          <a href="#process" className="hover:text-blue-500 dark:hover:text-white px-4 py-2 rounded-full transition-all duration-300">Process</a>
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          )}
          <a href="#contact" className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-blue-500 rounded-full hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all duration-300">
            Start Project
          </a>
        </div>
      </header>
    </div>
  );
}