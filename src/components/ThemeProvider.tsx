import { getThemeIsDark, saveThemeIsDark } from '@/libs/appLocalStorage';
import { createContext, useEffect, useState, ReactNode } from 'react';

export interface ThemeContextProps {
  darkTheme: boolean;
  toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({ darkTheme: getThemeIsDark() });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(getThemeIsDark());

  useEffect(() => {
    // setAttribute allows in this task for document.body
    // https://docs.google.com/spreadsheets/d/1zZB-FbbhvkX9SpE14CC1UScAvRS46C5_nqIJ5cD4Elg/edit?gid=2028922094#gid=2028922094&range=D7
    document.body.setAttribute('data-bs-theme', darkTheme ? 'dark' : 'light');
    saveThemeIsDark(darkTheme);
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
