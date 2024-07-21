import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';
import { createContext, useEffect, useState } from 'react';
import { getThemeIsDark, saveThemeIsDark } from './libs/appLocalStorage';
import { ToggleSwitch } from './components/ToggleSwitch';

export const ThemeContext = createContext(false);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/list/1" replace />} />
      <Route path="list/:page" element={<Main />}></Route>
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Route>,
  ),
);

function App() {
  const [darkTheme, setDarkTheme] = useState(getThemeIsDark());
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', darkTheme ? 'dark' : 'light');
    saveThemeIsDark(darkTheme);
  }, [darkTheme]);

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme);
  }

  return (
    <ErrorBoundary>
      <div className="d-flex flex-row-reverse page">
        <ToggleSwitch
          checked={darkTheme}
          handleClick={() => {
            toggleTheme();
          }}
        ></ToggleSwitch>
      </div>
      <ThemeContext.Provider value={darkTheme}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
