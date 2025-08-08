import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ColorPreset = 'blue' | 'purple' | 'green' | 'orange' | 'red';

interface ThemeContextType {
  theme: Theme;
  colorPreset: ColorPreset;
  toggleTheme: () => void;
  setColorPreset: (preset: ColorPreset) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const colorPresets = {
  blue: {
    primary: '#3B82F6',
    primaryDark: '#1D4ED8',
    secondary: '#EFF6FF',
    accent: '#60A5FA',
  },
  purple: {
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    secondary: '#F3E8FF',
    accent: '#A78BFA',
  },
  green: {
    primary: '#10B981',
    primaryDark: '#059669',
    secondary: '#ECFDF5',
    accent: '#34D399',
  },
  orange: {
    primary: '#F59E0B',
    primaryDark: '#D97706',
    secondary: '#FFFBEB',
    accent: '#FBBF24',
  },
  red: {
    primary: '#EF4444',
    primaryDark: '#DC2626',
    secondary: '#FEF2F2',
    accent: '#F87171',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  const [colorPreset, setColorPresetState] = useState<ColorPreset>(() => {
    const saved = localStorage.getItem('colorPreset');
    return (saved as ColorPreset) || 'blue';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setColorPreset = (preset: ColorPreset) => {
    setColorPresetState(preset);
    localStorage.setItem('colorPreset', preset);
  };

  useEffect(() => {
    const root = document.documentElement;
    const colors = colorPresets[colorPreset];
    
    // Set CSS custom properties
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-dark', colors.primaryDark);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    
    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme, colorPreset]);

  return (
    <ThemeContext.Provider value={{ theme, colorPreset, toggleTheme, setColorPreset }}>
      {children}
    </ThemeContext.Provider>
  );
};