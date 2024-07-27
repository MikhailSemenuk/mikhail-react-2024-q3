import './App.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Page404 from './components/Page404/Page404';
import Main from './components/Main/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { ThemeSwitchHeder } from './components/ThemeSwitch/ThemeSwitchHeder';
import { Provider } from 'react-redux';
import { store } from './state/store';

// TODO: All imports in one style

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Navigate to='/list/1' replace />} />
      <Route path='list/:page' element={<Main />}></Route>
      <Route path='404' element={<Page404 />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Route>,
  ),
);

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <ThemeSwitchHeder />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
