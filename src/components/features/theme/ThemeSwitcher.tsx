'use client';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light'); // Default theme is light

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded transition-all w-6"
    >
      {theme === 'light' ? (
        <Moon size={24} />
      ) : (
        <Sun
          className="text-primary"
          size={24}
        />
      )}
    </button>
  );
};
