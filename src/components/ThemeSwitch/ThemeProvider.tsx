import { createContext, useEffect, useState, ReactNode } from 'react';
import { getThemeIsDark, saveThemeIsDark } from '../../libs/appLocalStorage';

export interface ThemeContextProps {
  darkTheme: boolean;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({ darkTheme: getThemeIsDark() });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(getThemeIsDark());

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', darkTheme ? 'dark' : 'light');
    saveThemeIsDark(darkTheme);
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
