import { useEffect, useState, useCallback } from 'react';

export const useDarkMode = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(systemPrefersDark ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { mode, toggleDarkMode };
};